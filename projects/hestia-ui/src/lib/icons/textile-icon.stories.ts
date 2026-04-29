import type { Meta, StoryObj } from "@storybook/angular";
import { HTextileIconComponent, TextileIconName } from "./textile-icon.component";

const ICON_NAMES: TextileIconName[] = [
  "lot", "machine", "yarn", "fabric", "dye",
  "knit", "weave", "cut", "sew", "finish",
  "pack", "ship", "qc", "dpp", "plant", "thread",
];

const meta: Meta<HTextileIconComponent> = {
  title: "Domain/TextileIcon",
  component: HTextileIconComponent,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: ICON_NAMES },
    size: { control: { type: "range", min: 12, max: 64, step: 2 } },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<HTextileIconComponent>;

export const Default: Story = {
  args: { name: "machine", size: 24 },
};

export const Large: Story = {
  args: { name: "dpp", size: 40 },
};

export const AllIcons: Story = {
  render: () => ({
    props: { icons: ICON_NAMES },
    template: `
      <div style="display:grid;grid-template-columns:repeat(8,1fr);gap:16px;max-width:640px;">
        @for (name of icons; track name) {
          <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
            <h-textile-icon [name]="name" [size]="24"></h-textile-icon>
            <span style="font-size:11px;color:var(--h-muted-foreground);font-family:var(--h-font-sans);">{{ name }}</span>
          </div>
        }
      </div>
    `,
    moduleMetadata: { imports: [HTextileIconComponent] },
  }),
};

export const InContext: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:10px;">
        @for (row of rows; track row.name) {
          <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border:1px solid var(--h-border);border-radius:10px;background:var(--h-card);">
            <h-textile-icon [name]="row.name" [size]="20" style="color:var(--h-primary)"></h-textile-icon>
            <span style="font-size:13.5px;font-weight:500;color:var(--h-foreground);font-family:var(--h-font-sans);">{{ row.label }}</span>
          </div>
        }
      </div>
    `,
    props: {
      rows: [
        { name: "yarn",    label: "Yarn preparation" },
        { name: "knit",    label: "Knitting" },
        { name: "dye",     label: "Dyeing" },
        { name: "finish",  label: "Finishing" },
        { name: "qc",      label: "Quality control" },
        { name: "dpp",     label: "Digital Product Passport" },
      ],
    },
    moduleMetadata: { imports: [HTextileIconComponent] },
  }),
};
