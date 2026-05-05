# Hestia UI MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@hestiatechnology/mcp-hestia-ui)](https://www.npmjs.com/package/@hestiatechnology/mcp-hestia-ui)

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) server that enables AI agents like Claude and GitHub Copilot to discover, learn about, and help developers integrate [Hestia UI](https://github.com/hestiatechnology/ui) components.

## Overview

This MCP server provides a structured interface for AI models to:
- **Discover** all available Hestia UI components with smart filtering
- **Learn** detailed specifications (inputs, outputs, descriptions) for any component
- **Generate** practical, production-ready code examples
- **Assist** developers in building UIs with Hestia UI components

The server automatically scans the component library and extracts metadata from TypeScript source files, ensuring information is always in sync.

## Features

- 🔍 **Component Discovery**: Browse and filter all Hestia UI components by category
- 📋 **Detailed Metadata**: Get inputs, outputs, and descriptions for each component
- 💡 **Smart Examples**: Generate usage examples with variants and customization
- 🔄 **Auto-Sync**: Metadata extracted directly from component source files
- 🚀 **Zero-Config**: Works out of the box with Claude and Copilot

## Installation

### For npm

```bash
npm install --save-dev @hestiatechnology/mcp-hestia-ui
```

### For Development

```bash
# Clone the repository
git clone https://github.com/hestiatechnology/ui.git
cd ui/tools/mcp-hestia-ui

# Install dependencies
pnpm install

# Build
pnpm run build

# Run in dev mode
pnpm run dev

# Watch mode for development
pnpm run watch
```

## Configuration

### Claude Desktop

Add to your `~/.claude/mcp.json`:

```json
{
  "servers": {
    "hestia-ui": {
      "command": "node",
      "args": ["/path/to/mcp-hestia-ui/dist/index.js"]
    }
  }
}
```

### GitHub Copilot

The MCP is configured in `.vscode/mcp.json` if you have the workspace open.

### VS Code

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "hestia-ui": {
      "command": "node",
      "args": ["./tools/mcp-hestia-ui/dist/index.js"],
      "cwd": "${workspaceFolder}"
    }
  }
}
```

## Available Tools

### `list_components`

Discover all available Hestia UI components with optional filtering.

**Parameters:**
- `category` (string, optional): Filter by component category
  - `form-controls` — Input elements (buttons, inputs, checkboxes, switches, etc.)
  - `navigation` — Navigation components (tabs, pagination, breadcrumbs, etc.)
  - `overlay` — Dialog/overlay components (modals, drawers, popovers, etc.)
  - `feedback` — Feedback components (alerts, toasts, progress, etc.)
  - `data` — Data display components (tables, trees, etc.)

**Example:**
```
What form components does Hestia UI have?
```

### `get_component_details`

Get comprehensive information about a specific component.

**Parameters:**
- `selector` (string, required): The component selector (e.g., `h-button`, `h-input`)

**Returns:**
- Component name and selector
- File path in the library
- All `@Input` properties with types
- All `@Output` events
- Component description

**Example:**
```
Tell me about the h-button component
What are the inputs and outputs for h-select?
```

### `get_component_example`

Generate practical, copy-paste-ready code examples for a component.

**Parameters:**
- `selector` (string, required): The component selector
- `variant` (string, optional): Specific variant or use case (e.g., "loading", "disabled", "outline")

**Returns:**
- HTML template snippet
- TypeScript import statement
- Module setup instructions
- Live example details

**Example:**
```
Show me how to use h-button
How do I create a disabled input?
I want to use h-select with multiple selection
```

## Usage Examples

### Example 1: Discovering Form Components

```
User: What form input components does Hestia UI have?
Claude: [Calls list_components with category=form-controls]
Claude: Hestia UI provides several excellent form components:
- h-button — Action trigger button
- h-input — Text input field
- h-checkbox — Checkbox with label
- h-radio — Radio button group
- h-switch — Toggle switch
- h-select — Dropdown select
...
```

### Example 2: Getting Component Details

```
User: I need to create a select dropdown. Show me the API.
Claude: [Calls get_component_details with selector='h-select']
Claude: The h-select component provides:
Inputs: options, placeholder, disabled, multiple
Outputs: selectionChange, openChange
...
```

### Example 3: Building with Examples

```
User: How do I create a loading button?
Claude: [Calls get_component_example with selector='h-button', variant='loading']
Claude: Here's how to create a loading button:
<h-button [loading]="isLoading">
  Save Changes
</h-button>
...
```

## Architecture

The MCP server works by:

1. **Scanning** the Hestia UI component library directory
2. **Parsing** TypeScript component files using regex patterns
3. **Extracting** metadata: selector, inputs, outputs, descriptions
4. **Exposing** tools via the MCP protocol for AI models

The server is resilient and handles edge cases like:
- Invalid component files (gracefully skipped)
- Missing directories (fallback search paths)
- Various directory structures (workspace-aware)

## Requirements

- **Node.js**: 18.0.0 or later
- **MCP Client**: Claude, GitHub Copilot, or compatible client

## Development

```bash
# Install dependencies
pnpm install

# Build the project
pnpm run build

# Watch for changes
pnpm run watch

# Run server in dev mode
pnpm run dev
```

## Testing

The server includes a test utility to verify component scanning:

```bash
node test-scan.mjs
```

This will output all discovered components and their metadata.

## Troubleshooting

### Components Not Found

If the server can't find components:
1. Ensure the Hestia UI library is installed in `projects/hestia-ui/src/lib`
2. Check that component files follow naming: `{component-name}.component.ts`
3. Verify component TypeScript files have a `@Component` decorator

### Connection Issues

- Ensure Node.js version is 18+
- Check the MCP client configuration points to correct file path
- Verify `dist/index.js` exists (run `pnpm run build`)

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT — See [LICENSE](LICENSE) for details

## Related

- [Hestia UI Component Library](https://github.com/hestiatechnology/ui)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Claude Documentation](https://claude.ai/docs)
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
AI: [Uses get_component_details for h-select]
AI: Here's the h-select component with its available inputs...
AI: [Uses get_component_example for h-select]
AI: Here's how to use it in your component...
```

### Example 3: Building a Form
```
User: I want to build a contact form with name, email, message, and a submit button
AI: [Uses get_component_example for h-input, h-textarea, h-button]
AI: Here's a complete form template using Hestia UI components...
```

## Development

### Watch Mode
```bash
cd tools/mcp-hestia-ui
pnpm run watch
```

### Testing the Server Locally
```bash
cd tools/mcp-hestia-ui
pnpm run dev
```

## How It Works

1. **Scanning**: The server scans the `projects/hestia-ui/src/lib` directory for component files
2. **Parsing**: Each component file is parsed to extract:
   - Component selector
   - @Input properties
   - @Output properties
   - Description comments
3. **Indexing**: Metadata is cached for fast lookups
4. **Tool Invocation**: When agents query for information, the server returns structured data

## Adding New Components

The MCP server automatically discovers new components when they follow the Hestia UI naming conventions:
- Directory name: component name (e.g., `button`)
- Main file: `{name}.component.ts`
- Selector in @Component decorator: `h-{name}`

Once added to the library, the component is immediately available through the MCP tools.

## Integration Tips for Developers

### Getting Started
```
New to Hestia UI? Start with:
- list_components (see what's available)
- get_component_example h-button (see a simple example)
```

### Building a Component
```
When building a feature:
1. List related components (list_components)
2. Get details for each (get_component_details)
3. Ask for examples (get_component_example)
4. Ask the AI to create the template
```

### Styling & Theming
```
Ask about:
- Design tokens: How do I use the design tokens?
- Styling: How do I customize component appearance?
- Variants: What variants are available for h-button?
```

## Troubleshooting

### Server not detected
1. Ensure `tools/mcp-hestia-ui/dist/index.js` exists
2. Run `npm run build` in the `tools/mcp-hestia-ui` directory
3. Restart Claude/Copilot chat

### Components not found
1. Check that components follow naming conventions
2. Ensure `@Component({ selector: 'h-...' })` decorator exists
3. Verify component file is in the correct directory structure

### MCP not working in Claude
1. Check `.claude/mcp.json` exists in the workspace root
2. Verify paths are absolute or relative from workspace root
3. Ensure MCP feature is enabled in your Claude version
