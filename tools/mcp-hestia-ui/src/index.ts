#!/usr/bin/env node

/**
 * Hestia UI MCP Server
 *
 * An MCP (Model Context Protocol) server that enables AI agents to discover,
 * learn about, and help developers integrate Hestia UI components.
 *
 * Copyright (c) 2024 Hestia Technology
 * Licensed under the MIT License
 *
 * @see https://github.com/hestiatechnology/ui/tree/main/tools/mcp-hestia-ui
 * @see https://modelcontextprotocol.io/
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  CallToolRequest,
} from "@modelcontextprotocol/sdk/types";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from 'url';

interface ComponentMetadata {
  name: string;
  selector: string;
  path: string;
  inputs: string[];
  outputs: string[];
  description: string;
}

function toPascalCase(value: string): string {
  return value
    .replace(/\.(component|directive|pipe|service)$/, "")
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve components directory robustly. Prefer workspace-relative `projects/...` from cwd,
// fall back to paths relative to this file (works when imported from dist).
function resolveComponentsDir(): string {
  // Helper to walk up directories looking for repo root indicators
  function findRepoRoot(start: string): string | null {
    let cur = path.resolve(start);
    while (true) {
      if (fs.existsSync(path.join(cur, 'angular.json')) || fs.existsSync(path.join(cur, 'package.json'))) {
        return cur;
      }
      const parent = path.dirname(cur);
      if (parent === cur) return null;
      cur = parent;
    }
  }

  const repoFromCwd = findRepoRoot(process.cwd());
  const repoFromFile = findRepoRoot(__dirname);

  const candidates: string[] = [];
  if (repoFromCwd) candidates.push(path.join(repoFromCwd, 'projects', 'hestia-ui', 'src', 'lib'));
  if (repoFromFile && repoFromFile !== repoFromCwd) candidates.push(path.join(repoFromFile, 'projects', 'hestia-ui', 'src', 'lib'));
  // Fallbacks relative to this package
  candidates.push(path.resolve(process.cwd(), 'projects', 'hestia-ui', 'src', 'lib'));
  candidates.push(path.resolve(__dirname, '..', '..', 'projects', 'hestia-ui', 'src', 'lib'));
  candidates.push(path.resolve(__dirname, '..', '..', '..', 'projects', 'hestia-ui', 'src', 'lib'));

  for (const c of candidates) {
    try {
      if (fs.existsSync(c) && fs.statSync(c).isDirectory()) return c;
    } catch (e) {
      // ignore
    }
  }

  // Default to first candidate so callers get a predictable path and an explicit error
  return candidates[0];
}

const COMPONENTS_DIR = resolveComponentsDir();

function extractComponentMetadata(filePath: string): ComponentMetadata | null {
  try {
    const content = fs.readFileSync(filePath, "utf-8");

    // Extract selector
    const selectorMatch = content.match(/selector:\s*['"]([^'"]+)['"]/);
    const selector = selectorMatch ? selectorMatch[1] : null;

    // Extract component name from filename
    const fileName = path.basename(filePath, ".ts");
    const componentName = `${toPascalCase(fileName)}Component`;

    // Extract @Input properties
    const inputMatches = [...content.matchAll(/@Input[^a-z]*(?:\([^)]*\))?\s+(\w+)/gi)];
    const inputs = inputMatches
      .map((m) => m[1])
      .filter((v, i, a) => a.indexOf(v) === i);

    // Extract @Output properties
    const outputMatches = [...content.matchAll(/@Output[^a-z]*\s+(\w+)/gi)];
    const outputs = outputMatches
      .map((m) => m[1])
      .filter((v, i, a) => a.indexOf(v) === i);

    // Extract description from comments
    const commentMatch = content.match(/\/\*\*[\s\S]*?\*\/([\s\S]*?)@Component/);
    const description = commentMatch
      ? commentMatch[0]
          .replace(/\/\*\*[\s\*]*|\*\/[\s]*/g, "")
          .replace(/^\s*\*\s?/gm, "")
          .trim()
          .split("\n")[0]
      : "";

    if (!selector) {
      return null;
    }

    return {
      name: componentName,
      selector,
      path: filePath.replace(COMPONENTS_DIR, ""),
      inputs,
      outputs,
      description,
    };
  } catch (error) {
    return null;
  }
}

function scanComponents(): ComponentMetadata[] {
  const components: ComponentMetadata[] = [];

  try {
    const entries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const componentFile = path.join(
          COMPONENTS_DIR,
          entry.name,
          `${entry.name}.component.ts`
        );
        if (fs.existsSync(componentFile)) {
          const metadata = extractComponentMetadata(componentFile);
          if (metadata) {
            components.push(metadata);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error scanning components:", error);
  }

  return components.sort((a, b) => a.name.localeCompare(b.name));
}

function getComponentDetails(selector: string): ComponentMetadata | null {
  const components = scanComponents();
  return components.find((c) => c.selector === selector) || null;
}

export function buildComponentExample(selector: string): string | null {
  const component = getComponentDetails(selector);

  if (!component) {
    return null;
  }

  const examples: Record<string, string> = {
    "h-page-header": `<!-- Complete page header example inspired by Storybook -->
<h-page-header
  title="Nova Fatura"
  subtitle="· Rascunho · não emitida"
  eyebrow="Faturação · Documentos de Venda"
  eyebrowTone="primary"
>
  <h-breadcrumbs
    hPageHeaderBreadcrumbs
    [items]="['Início', 'Faturação', 'Documentos de Venda', 'Faturas', 'Nova Fatura']"
  ></h-breadcrumbs>

  <ng-container hPageHeaderActions>
    <h-icon-button variant="outline" size="sm" aria-label="Histórico">
      <svg lucideClock [size]="15"></svg>
    </h-icon-button>
    <h-icon-button variant="outline" size="sm" aria-label="Mais opções">
      <svg lucideMoreVertical [size]="15"></svg>
    </h-icon-button>
    <div style="width: 1px; height: 22px; background: var(--h-border); margin: 0 2px;"></div>
    <h-button variant="outline" size="sm">
      <svg lucideX [size]="13"></svg>
      Cancelar
    </h-button>
    <h-button size="sm">
      <svg lucideZap [size]="13"></svg>
      Emitir Fatura
    </h-button>
  </ng-container>

  <h-icon-tile hPageHeaderIcon tone="primary" [size]="40">
    <svg lucideTag [size]="18"></svg>
  </h-icon-tile>

  <ng-container hPageHeaderStatus>
    <h-ph-status-pill label="Rascunho" status="idle"></h-ph-status-pill>
    <h-ph-toggle-chip label="Paperless" value="ON" [active]="true">
      <svg hToggleIcon lucideFileText [size]="14"></svg>
    </h-ph-toggle-chip>
  </ng-container>

  <ng-container hPageHeaderMeta>
    <h-ph-meta-cell label="Série" value="FT 2026" [clickable]="true" [mono]="true"></h-ph-meta-cell>
    <h-ph-meta-cell label="Data de Emissão" value="04/05/2026" [mono]="true"></h-ph-meta-cell>
    <h-ph-meta-cell label="Código do Documento"></h-ph-meta-cell>
    <h-ph-meta-cell label="Cliente" value="Cortefiel Group · ES"></h-ph-meta-cell>
    <h-ph-meta-cell label="Condições de Pagamento" value="30 dias" [clickable]="true"></h-ph-meta-cell>
  </ng-container>
</h-page-header>`,

    "h-button": `<!-- Basic button -->
<${component.selector}>Click me</${component.selector}>

<!-- With variant -->
<${component.selector} variant="primary">Primary</${component.selector}>

<!-- Loading state -->
<${component.selector} [loading]="true">Loading</${component.selector}>

<!-- Disabled -->
<${component.selector} [disabled]="true">Disabled</${component.selector}>`,

    "h-input": `<!-- Basic input -->
<${component.selector} placeholder="Enter text"></${component.selector}>

<!-- With label -->
<label>
  Name
  <${component.selector} type="text"></${component.selector}>
</label>

<!-- Disabled -->
<${component.selector} [disabled]="true"></${component.selector}>`,

    "h-checkbox": `<!-- Basic checkbox -->
<${component.selector}></${component.selector}>

<!-- With label -->
<label>
  <${component.selector}></${component.selector}>
  Accept terms
</label>

<!-- Checked by default -->
<${component.selector} [checked]="true"></${component.selector}>`,

    "h-select": `<!-- Basic select -->
<${component.selector}>
  <option value="">Select an option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</${component.selector}>`,

    "h-alert": `<!-- Info alert -->
<${component.selector} type="info">This is an informational alert</${component.selector}>

<!-- Success alert -->
<${component.selector} type="success">Operation completed successfully</${component.selector}>

<!-- Error alert -->
<${component.selector} type="error">An error occurred</${component.selector}>`,
  };

  return examples[selector] || `<${component.selector}></${component.selector}>`;
}

class HestiaUIServer {
  private server: McpServer;

  constructor() {
    this.server = new McpServer({
      name: "hestia-ui",
      version: "0.1.0",
    });

    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "list_components",
            description:
              "List all available Hestia UI components with their selectors and basic info",
            inputSchema: {
              type: "object" as const,
              properties: {
                category: {
                  type: "string",
                  description:
                    "Filter by category: form-controls, navigation, overlay, feedback, or data",
                  enum: [
                    "form-controls",
                    "navigation",
                    "overlay",
                    "feedback",
                    "data",
                  ],
                },
              },
            },
          },
          {
            name: "get_component_details",
            description:
              "Get detailed information about a specific component including inputs, outputs, and usage",
            inputSchema: {
              type: "object" as const,
              properties: {
                selector: {
                  type: "string",
                  description: 'Component selector (e.g., "h-button")',
                },
              },
              required: ["selector"],
            },
          },
          {
            name: "get_component_example",
            description:
              "Get a usage example for a component based on its selector",
            inputSchema: {
              type: "object" as const,
              properties: {
                selector: {
                  type: "string",
                  description: 'Component selector (e.g., "h-button")',
                },
                variant: {
                  type: "string",
                  description:
                    "Optional variant or use case (e.g., loading, disabled, outline)",
                },
              },
              required: ["selector"],
            },
          },
        ],
      };
    });

    this.server.server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest) => {
      switch (request.params.name) {
        case "list_components":
          return this.handleListComponents(request.params.arguments as Record<string,unknown>);
        case "get_component_details":
          return this.handleGetComponentDetails(request.params.arguments as Record<string,unknown>);
        case "get_component_example":
          return this.handleGetComponentExample(request.params.arguments as Record<string,unknown>);
        default:
          return {
            content: [
              {
                type: "text",
                text: `Unknown tool: ${request.params.name}`,
              },
            ],
            isError: true,
          };
      }
    });
  }

  private handleListComponents(args: Record<string,unknown>) {
    const category = args.category as string | undefined;
    const components = scanComponents();

    const categoryMap: Record<string, string[]> = {
      "form-controls": [
        "button",
        "input",
        "checkbox",
        "radio",
        "select",
        "switch",
      ],
      navigation: ["tabs", "pagination", "breadcrumbs", "sidebar", "topbar"],
      overlay: ["modal", "drawer", "popover", "tooltip"],
      feedback: ["alert", "toast", "progress"],
      data: ["table", "datatable"],
    };

    let filtered = components;
    if (category && categoryMap[category]) {
      filtered = components.filter((c) =>
        categoryMap[category].some((cat) =>
          c.selector.includes(cat)
        )
      );
    }

    const summary = filtered
      .map((c) => `${c.selector} - ${c.name}${c.description ? ": " + c.description : ""}`)
      .join("\n");

    return {
      content: [
        {
          type: "text",
          text: `Found ${filtered.length} components:\n\n${summary}\n\nUse get_component_details to get more info about a specific component.`,
        },
      ],
    };
  }

  private handleGetComponentDetails(args: Record<string,unknown>) {
    const selector = args.selector as string;
    const component = getComponentDetails(selector);

    if (!component) {
      return {
        content: [
          {
            type: "text",
            text: `Component with selector "${selector}" not found.`,
          },
        ],
        isError: true,
      };
    }

    let details = `# ${component.name} (${component.selector})\n\n`;
    details += `**Path**: ${component.path}\n\n`;

    if (component.description) {
      details += `**Description**: ${component.description}\n\n`;
    }

    if (component.inputs.length > 0) {
      details += `**Inputs**:\n${component.inputs.map((i) => `- @Input ${i}`).join("\n")}\n\n`;
    }

    if (component.outputs.length > 0) {
      details += `**Outputs**:\n${component.outputs.map((o) => `- @Output ${o}`).join("\n")}\n\n`;
    }

    details += `**Selector**: \`${component.selector}\``;

    return {
      content: [
        {
          type: "text",
          text: details,
        },
      ],
    };
  }

  private handleGetComponentExample(args: Record<string, unknown>) {
    const selector = args.selector as string;
    const variant = args.variant as string | undefined;
    const component = getComponentDetails(selector);

    if (!component) {
      return {
        content: [
          {
            type: "text",
            text: `Component with selector "${selector}" not found.`,
          },
        ],
        isError: true,
      };
    }

    const example = buildComponentExample(selector) || `<${component.selector}></${component.selector}>`;

    const importMap: Record<string, string[]> = {
      "h-page-header": [
        "HPageHeaderComponent",
        "HPageHeaderMetaCellComponent",
        "HPageHeaderStatusPillComponent",
        "HPageHeaderToggleChipComponent",
        "HBreadcrumbsComponent",
        "HIconTileComponent",
        "HIconButtonComponent",
        "HButtonComponent",
        "LucideClock",
        "LucideMoreVertical",
        "LucideX",
        "LucideZap",
        "LucideTag",
        "LucideFileText",
      ],
    };

    const imports = importMap[selector] ?? [`${component.name}`];

    return {
      content: [
        {
          type: "text",
          text: `# ${component.name} Usage Example\n\n\`\`\`html\n${example}\n\`\`\`\n\nImport in your component:\n\`\`\`typescript\nimport { ${imports.join(", ")} } from 'hestia-ui';\n\n@Component({\n  imports: [${imports.filter((item) => item.endsWith('Component')).join(", ")}],\n})\nexport class MyComponent {}\n\`\`\``,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Hestia UI MCP server running on stdio");
  }
}

// Export utilities for testing and programmatic use
export { scanComponents, getComponentDetails, HestiaUIServer };

// Only run the server when this file is the entrypoint (not when imported)
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  const server = new HestiaUIServer();
  server.run().catch(console.error);
}
