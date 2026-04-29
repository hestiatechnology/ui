import type { Meta, StoryObj } from '@storybook/angular';
import { HButtonComponent } from './button.component';

const meta: Meta<HButtonComponent> = {
  title: 'Form/Button',
  component: HButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'primary-outline', 'ghost', 'destructive', 'invert', 'dark-out', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'xl'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<h-button [variant]="variant" [size]="size" [type]="type" [loading]="loading" [disabled]="disabled">Button</h-button>`,
    moduleMetadata: { imports: [HButtonComponent] },
  }),
};

export default meta;
type Story = StoryObj<HButtonComponent>;

export const Default: Story = {
  args: { variant: 'default', size: 'default', loading: false, disabled: false },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'default' },
};

export const Outline: Story = {
  args: { variant: 'outline', size: 'default' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'default' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', size: 'default' },
};

export const Link: Story = {
  args: { variant: 'link', size: 'default' },
};

export const Loading: Story = {
  args: { variant: 'default', size: 'default', loading: true },
};

export const Disabled: Story = {
  args: { variant: 'default', size: 'default', disabled: true },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <h-button size="xs">XSmall</h-button>
        <h-button size="sm">Small</h-button>
        <h-button size="default">Default</h-button>
        <h-button size="lg">Large</h-button>
        <h-button size="xl">XLarge</h-button>
      </div>
    `,
    moduleMetadata: { imports: [HButtonComponent] },
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <h-button variant="default">Default</h-button>
        <h-button variant="secondary">Secondary</h-button>
        <h-button variant="outline">Outline</h-button>
        <h-button variant="primary-outline">Primary Outline</h-button>
        <h-button variant="ghost">Ghost</h-button>
        <h-button variant="destructive">Destructive</h-button>
        <h-button variant="link">Link</h-button>
      </div>
    `,
    moduleMetadata: { imports: [HButtonComponent] },
  }),
};
