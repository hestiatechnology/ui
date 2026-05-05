# Development Guide

This document provides guidance for developers maintaining the Hestia UI MCP Server.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10.33.0 or later

### Installation

```bash
pnpm install
```

## Development Workflow

### Build

Compile TypeScript to JavaScript:

```bash
pnpm run build
```

### Watch Mode

Recompile on file changes:

```bash
pnpm run watch
```

### Development Mode

Build and run server in one command:

```bash
pnpm run dev
```

### Testing Components

Scan and verify component discovery:

```bash
node test-scan.mjs
```

This utility will:
- Scan the component library
- Extract metadata from each component
- Display all discovered components
- Report any issues

## Project Structure

```
src/
├── index.ts          # Main MCP server implementation
├── interfaces/       # TypeScript interfaces and types
└── utils/           # Utility functions

dist/               # Compiled JavaScript (generated)
test-scan.mjs       # Component scanning test utility
```

## Making Changes

### Code Style

- Use TypeScript strict mode
- Follow Angular best practices
- Use clear, descriptive variable names
- Add comments for complex logic

### Before Committing

1. Run the build:
   ```bash
   pnpm run build
   ```

2. Test component scanning:
   ```bash
   node test-scan.mjs
   ```

3. Verify types:
   ```bash
   pnpm run build  # Reports any type errors
   ```

## Publishing a New Release

### 1. Update Version

Update `version` in `package.json` following [Semantic Versioning](https://semver.org/):

```json
{
  "version": "X.Y.Z"
}
```

### 2. Update Changelog

Add the release information to `CHANGELOG.md`:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New feature description

### Fixed
- Bug fix description

### Changed
- Breaking change description
```

### 3. Update Source Code

Update the version in `src/index.ts` HestiaUIServer class:

```typescript
this.server = new Server({
  name: "hestia-ui",
  version: "X.Y.Z",  // Update this
});
```

### 4. Build and Test

```bash
pnpm run build
node test-scan.mjs
```

### 5. Tag the Release

```bash
git tag -a v0.1.0 -m "Release version 0.1.0"
git push origin v0.1.0
```

### 6. Publish to npm

```bash
npm publish
```

Or with a specific version tag:

```bash
npm publish --tag latest
```

## Troubleshooting

### Components Not Found

1. Check that components are in `projects/hestia-ui/src/lib`
2. Verify component files are named `{name}.component.ts`
3. Ensure components have `@Component` decorator
4. Run `node test-scan.mjs` to debug

### TypeScript Errors

```bash
pnpm run build  # Shows all errors
```

### Path Resolution Issues

The server uses multiple fallback paths. Debug output:

```typescript
console.log("Components dir:", COMPONENTS_DIR);
```

## Dependencies

### Production

- `@modelcontextprotocol/sdk@^1.0.0` - MCP protocol implementation

### Development

- `typescript@^5.0.0` - TypeScript compiler
- `@types/node@^20.0.0` - Node.js type definitions

## API Documentation

### Core Functions

#### `scanComponents(): ComponentMetadata[]`

Scans the Hestia UI library and returns all discovered components.

**Returns:** Array of component metadata objects sorted by name

#### `getComponentDetails(selector: string): ComponentMetadata | null`

Retrieves metadata for a specific component by selector.

**Parameters:**
- `selector` - Component selector (e.g., "h-button")

**Returns:** Component metadata or null if not found

#### `buildComponentExample(selector: string): string | null`

Generates HTML example code for a component.

**Parameters:**
- `selector` - Component selector

**Returns:** HTML example string or null if not found

### Metadata Structure

```typescript
interface ComponentMetadata {
  name: string;              // PascalCase component name
  selector: string;          // HTML selector (e.g., "h-button")
  path: string;              // File path relative to components directory
  inputs: string[];          // @Input property names
  outputs: string[];         // @Output event names
  description: string;       // Description from JSDoc comment
}
```

## Support

For issues and questions:

1. Check [GitHub Issues](https://github.com/hestiatechnology/ui/issues)
2. Read the [Main README](./README.md)
3. Review [MCP Documentation](https://modelcontextprotocol.io/)

## License

MIT - See [LICENSE](./LICENSE)
