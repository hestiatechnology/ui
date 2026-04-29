import type { Meta, StoryObj } from '@storybook/angular';
import { HBadgeComponent } from './badge.component';

const meta: Meta<HBadgeComponent> = {
  title: 'Display/Badge',
  component: HBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'primary', 'running', 'idle', 'error', 'hold', 'maintenance'] },
    dot: { control: 'boolean' },
    solid: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<h-badge [tone]="tone" [dot]="dot" [solid]="solid">Badge</h-badge>`,
    moduleMetadata: { imports: [HBadgeComponent] },
  }),
};

export default meta;
type Story = StoryObj<HBadgeComponent>;

export const Default: Story = {
  args: { tone: 'neutral', dot: false, solid: false },
};

export const WithDot: Story = {
  args: { tone: 'running', dot: true },
};

export const Solid: Story = {
  args: { tone: 'primary', solid: true },
};

export const AllTones: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
        <h-badge tone="neutral">Neutral</h-badge>
        <h-badge tone="primary">Primary</h-badge>
        <h-badge tone="running" [dot]="true">Running</h-badge>
        <h-badge tone="idle" [dot]="true">Idle</h-badge>
        <h-badge tone="error" [dot]="true">Error</h-badge>
        <h-badge tone="hold" [dot]="true">Hold</h-badge>
        <h-badge tone="maintenance" [dot]="true">Maintenance</h-badge>
      </div>
    `,
    moduleMetadata: { imports: [HBadgeComponent] },
  }),
};

export const SolidVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
        <h-badge tone="primary" [solid]="true">Primary</h-badge>
        <h-badge tone="running" [solid]="true">Running</h-badge>
        <h-badge tone="idle" [solid]="true">Idle</h-badge>
        <h-badge tone="error" [solid]="true">Error</h-badge>
        <h-badge tone="hold" [solid]="true">Hold</h-badge>
      </div>
    `,
    moduleMetadata: { imports: [HBadgeComponent] },
  }),
};
