import type { Meta, StoryObj } from "@storybook/angular";
import { LucidePlus, LucideSettings, LucideTrash2, LucidePencil } from "@lucide/angular";
import { HIconButtonComponent } from "./icon-button.component";

const meta: Meta<HIconButtonComponent> = {
  title: "Form/IconButton",
  component: HIconButtonComponent,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["outline", "ghost", "primary", "danger"] },
    size: { control: "select", options: ["xs", "sm", "default", "lg", "xl"] },
    disabled: { control: "boolean" },
    ariaLabel: { control: "text" },
  },
  render: (args) => ({
    props: args,
    template: `
      <h-icon-button [variant]="variant" [size]="size" [disabled]="disabled" [aria-label]="ariaLabel">
        <svg lucidePlus [size]="16"></svg>
      </h-icon-button>
    `,
    moduleMetadata: { imports: [HIconButtonComponent, LucidePlus] },
  }),
};

export default meta;
type Story = StoryObj<HIconButtonComponent>;

export const Default: Story = {
  args: { variant: "outline", size: "default", disabled: false, ariaLabel: "Add item" },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:12px;">
        <h-icon-button variant="outline" aria-label="Settings">
          <svg lucideSettings [size]="16"></svg>
        </h-icon-button>
        <h-icon-button variant="ghost" aria-label="Edit">
          <svg lucidePencil [size]="16"></svg>
        </h-icon-button>
        <h-icon-button variant="primary" aria-label="Add">
          <svg lucidePlus [size]="16"></svg>
        </h-icon-button>
        <h-icon-button variant="danger" aria-label="Delete">
          <svg lucideTrash2 [size]="16"></svg>
        </h-icon-button>
      </div>
    `,
    moduleMetadata: { imports: [HIconButtonComponent, LucidePlus, LucideSettings, LucideTrash2, LucidePencil] },
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:12px;">
        <h-icon-button size="xs"      aria-label="XSmall"> <svg lucidePlus [size]="12"></svg> </h-icon-button>
        <h-icon-button size="sm"      aria-label="Small">  <svg lucidePlus [size]="14"></svg> </h-icon-button>
        <h-icon-button size="default" aria-label="Default"><svg lucidePlus [size]="16"></svg> </h-icon-button>
        <h-icon-button size="lg"      aria-label="Large">  <svg lucidePlus [size]="18"></svg> </h-icon-button>
        <h-icon-button size="xl"      aria-label="XLarge"> <svg lucidePlus [size]="20"></svg> </h-icon-button>
      </div>
    `,
    moduleMetadata: { imports: [HIconButtonComponent, LucidePlus] },
  }),
};

export const Disabled: Story = {
  args: { variant: "outline", size: "default", disabled: true, ariaLabel: "Disabled" },
};
