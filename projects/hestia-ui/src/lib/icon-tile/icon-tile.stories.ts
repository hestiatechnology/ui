import type { Meta, StoryObj } from "@storybook/angular";
import { LucideCpu, LucideLayers, LucidePackage, LucideDroplets, LucideScissors, LucideHouse, LucideGauge, LucideWand2 } from "@lucide/angular";
import { HIconTileComponent } from "./icon-tile.component";

const meta: Meta<HIconTileComponent> = {
  title: "Display/IconTile",
  component: HIconTileComponent,
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["primary", "running", "idle", "error", "hold", "maintenance", "cotton"] },
    size: { control: { type: "range", min: 24, max: 80, step: 4 } },
  },
  render: (args) => ({
    props: args,
    template: `
      <h-icon-tile [tone]="tone" [size]="size">
        <svg lucideCpu [size]="size * 0.5"></svg>
      </h-icon-tile>
    `,
    moduleMetadata: { imports: [HIconTileComponent, LucideCpu] },
  }),
};

export default meta;
type Story = StoryObj<HIconTileComponent>;

export const Default: Story = {
  args: { tone: "primary", size: 36 },
};

export const AllTones: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
        <h-icon-tile tone="primary"     [size]="36"><svg lucideCpu      [size]="18"></svg></h-icon-tile>
        <h-icon-tile tone="running"     [size]="36"><svg lucideGauge    [size]="18"></svg></h-icon-tile>
        <h-icon-tile tone="idle"        [size]="36"><svg lucideLayers   [size]="18"></svg></h-icon-tile>
        <h-icon-tile tone="error"       [size]="36"><svg lucideScissors [size]="18"></svg></h-icon-tile>
        <h-icon-tile tone="hold"        [size]="36"><svg lucidePackage  [size]="18"></svg></h-icon-tile>
        <h-icon-tile tone="maintenance" [size]="36"><svg lucideWand2    [size]="18"></svg></h-icon-tile>
        <h-icon-tile tone="cotton"      [size]="36"><svg lucideDroplets [size]="18"></svg></h-icon-tile>
      </div>
    `,
    moduleMetadata: { imports: [HIconTileComponent, LucideCpu, LucideGauge, LucideLayers, LucideScissors, LucidePackage, LucideWand2, LucideDroplets] },
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center;">
        <h-icon-tile tone="primary" [size]="24"><svg lucideCpu [size]="12"></svg></h-icon-tile>
        <h-icon-tile tone="primary" [size]="32"><svg lucideCpu [size]="16"></svg></h-icon-tile>
        <h-icon-tile tone="primary" [size]="40"><svg lucideCpu [size]="20"></svg></h-icon-tile>
        <h-icon-tile tone="primary" [size]="48"><svg lucideCpu [size]="24"></svg></h-icon-tile>
        <h-icon-tile tone="primary" [size]="56"><svg lucideCpu [size]="28"></svg></h-icon-tile>
      </div>
    `,
    moduleMetadata: { imports: [HIconTileComponent, LucideCpu] },
  }),
};

export const WithLabel: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:20px;flex-wrap:wrap;">
        <div style="display:flex;align-items:center;gap:10px;">
          <h-icon-tile tone="primary" [size]="36"><svg lucideCpu [size]="18"></svg></h-icon-tile>
          <div>
            <div style="font-size:13.5px;font-weight:600;color:var(--h-foreground);font-family:var(--h-font-sans);">CK-01</div>
            <div style="font-size:12px;color:var(--h-muted-foreground);font-family:var(--h-font-sans);">Circular knitting</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <h-icon-tile tone="cotton" [size]="36"><svg lucideLayers [size]="18"></svg></h-icon-tile>
          <div>
            <div style="font-size:13.5px;font-weight:600;color:var(--h-foreground);font-family:var(--h-font-sans);">Cotton yarn</div>
            <div style="font-size:12px;color:var(--h-muted-foreground);font-family:var(--h-font-sans);">100% organic</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <h-icon-tile tone="running" [size]="36"><svg lucideHouse [size]="18"></svg></h-icon-tile>
          <div>
            <div style="font-size:13.5px;font-weight:600;color:var(--h-foreground);font-family:var(--h-font-sans);">Maia Factory</div>
            <div style="font-size:12px;color:var(--h-muted-foreground);font-family:var(--h-font-sans);">Line A · 18 machines</div>
          </div>
        </div>
      </div>
    `,
    moduleMetadata: { imports: [HIconTileComponent, LucideCpu, LucideLayers, LucideHouse] },
  }),
};
