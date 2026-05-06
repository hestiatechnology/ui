#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function toPascalCase(name){
  return name.replace(/\.(component|directive|pipe|service)$/, '').split(/[-_]/).map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join('');
}

const repoRoot = path.resolve(__dirname, '..');
const libDir = path.join(repoRoot, 'projects', 'hestia-ui', 'src', 'lib');
const outPath = path.join(repoRoot, 'projects', 'hestia-ui', 'components.json');

if (!fs.existsSync(libDir)) {
  console.error('lib directory not found:', libDir);
  process.exit(1);
}

const out = [];
for (const dirent of fs.readdirSync(libDir, { withFileTypes: true })) {
  if (!dirent.isDirectory()) continue;
  const name = dirent.name;
  const file = path.join(libDir, name, `${name}.component.ts`);
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const selectorMatch = content.match(/selector:\s*['"]([^'"]+)['"]/);
  if (!selectorMatch) continue;
  const selector = selectorMatch[1];
  const fileBase = path.basename(file, '.ts');
  const compName = `${toPascalCase(fileBase)}Component`;
  const inputs = Array.from(content.matchAll(/@Input[^a-z]*(?:\([^)]*\))?\s+(\w+)/gi)).map(m=>m[1]);
  const outputs = Array.from(content.matchAll(/@Output[^a-z]*\s+(\w+)/gi)).map(m=>m[1]);
  const descriptionMatch = content.match(/\/\*\*[\s\S]*?\*\//);
  const description = descriptionMatch ? descriptionMatch[0].replace(/\/\*\*|\*\//g,'').split('\n').map(l=>l.replace(/^\s*\*?\s*/,'')).join(' ').trim() : '';

  out.push({
    name: compName,
    selector,
    path: path.relative(repoRoot, file),
    inputs: [...new Set(inputs)],
    outputs: [...new Set(outputs)],
    description,
  });
}

fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log('Wrote components manifest to', outPath);
