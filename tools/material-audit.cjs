#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const rootArg = process.argv[2] ?? 'projects/hestia-ui/src';
const failOnMatch = process.argv.includes('--fail-on-match');
const jsonOutput = process.argv.includes('--json');
const root = path.resolve(process.cwd(), rootArg);

const MATERIAL_IMPORT_RE = /from\s+['"]@angular\/material(?:\/[^'"]+)?['"]/g;

function walk(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name.startsWith('.')) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
      continue;
    }

    if (/\.(ts|tsx|js|jsx|html|scss|css)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function bucketFromFile(filePath) {
  const rel = path.relative(root, filePath).replace(/\\/g, '/');
  const parts = rel.split('/');

  if (parts[0] === 'lib' && parts[1]) {
    return `lib/${parts[1]}`;
  }

  return parts[0] || 'root';
}

if (!fs.existsSync(root)) {
  console.error(`Path not found: ${rootArg}`);
  process.exit(1);
}

const matches = [];
for (const filePath of walk(root)) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (MATERIAL_IMPORT_RE.test(line)) {
      matches.push({
        file: path.relative(process.cwd(), filePath).replace(/\\/g, '/'),
        line: i + 1,
        bucket: bucketFromFile(filePath),
        text: line.trim(),
      });
    }
    MATERIAL_IMPORT_RE.lastIndex = 0;
  }
}

const counts = new Map();
for (const match of matches) {
  counts.set(match.bucket, (counts.get(match.bucket) ?? 0) + 1);
}

const grouped = [...counts.entries()]
  .map(([bucket, count]) => ({ bucket, count }))
  .sort((a, b) => b.count - a.count || a.bucket.localeCompare(b.bucket));

if (jsonOutput) {
  process.stdout.write(JSON.stringify({ root: rootArg, total: matches.length, grouped, matches }, null, 2));
} else {
  console.log(`Material import audit for ${rootArg}`);
  console.log('');
  if (!matches.length) {
    console.log('No @angular/material imports found.');
  } else {
    console.log(`Total material imports: ${matches.length}`);
    console.log('');
    for (const row of grouped) {
      console.log(`${row.bucket.padEnd(30, ' ')} ${String(row.count).padStart(3, ' ')}`);
    }

    console.log('');
    console.log('Matches:');
    for (const match of matches) {
      console.log(`- ${match.file}:${match.line} ${match.text}`);
    }
  }
}

if (failOnMatch && matches.length > 0) {
  process.exit(2);
}
