import { scanComponents } from './dist/index.js';

(async () => {
  try {
    const components = scanComponents();
    console.log(`Found ${components.length} components:\n`);
    for (const c of components) {
      console.log(`- ${c.selector} -> ${c.name}`);
      if (c.inputs && c.inputs.length) console.log(`  inputs: ${c.inputs.join(', ')}`);
      if (c.outputs && c.outputs.length) console.log(`  outputs: ${c.outputs.join(', ')}`);
    }
  } catch (err) {
    console.error('Error scanning components:', err);
    process.exit(1);
  }
})();
