import type { Meta, StoryObj } from "@storybook/angular";
import { LucideSettings, LucideArchive, LucideTrash2 } from "@lucide/angular";
import { HTooltipDirective } from "./tooltip.directive";
import { HButtonComponent } from "../button/button.component";
import { HIconButtonComponent } from "../icon-button/icon-button.component";

const meta: Meta = {
  title: "Overlays/Tooltip",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    template: `
      <div style="padding:60px;display:flex;justify-content:center;">
        <h-button [hTooltip]="'Save changes to production lot'">Save</h-button>
      </div>
    `,
    moduleMetadata: { imports: [HTooltipDirective, HButtonComponent] },
  }),
};

export const AllPositions: Story = {
  render: () => ({
    template: `
      <div style="padding:80px;display:grid;grid-template-columns:repeat(2,auto);gap:24px;place-items:center;">
        <h-button [hTooltip]="'Tooltip on top'"    tooltipPosition="top">Top</h-button>
        <h-button [hTooltip]="'Tooltip on bottom'" tooltipPosition="bottom">Bottom</h-button>
        <h-button [hTooltip]="'Tooltip on left'"   tooltipPosition="left">Left</h-button>
        <h-button [hTooltip]="'Tooltip on right'"  tooltipPosition="right">Right</h-button>
      </div>
    `,
    moduleMetadata: { imports: [HTooltipDirective, HButtonComponent] },
  }),
};

export const OnIconButtons: Story = {
  render: () => ({
    template: `
      <div style="padding:60px;display:flex;gap:8px;justify-content:center;">
        <h-icon-button variant="outline" aria-label="Settings" [hTooltip]="'Settings'">
          <svg lucideSettings [size]="16"></svg>
        </h-icon-button>
        <h-icon-button variant="outline" aria-label="Archive" [hTooltip]="'Archive lot'">
          <svg lucideArchive [size]="16"></svg>
        </h-icon-button>
        <h-icon-button variant="danger" aria-label="Delete" [hTooltip]="'Delete — cannot be undone'">
          <svg lucideTrash2 [size]="16"></svg>
        </h-icon-button>
      </div>
    `,
    moduleMetadata: { imports: [HTooltipDirective, HIconButtonComponent, LucideSettings, LucideArchive, LucideTrash2] },
  }),
};
