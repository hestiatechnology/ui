import type { Meta, StoryObj } from '@storybook/angular';
import { HStatusPillComponent } from './status-pill.component';

const meta: Meta<HStatusPillComponent> = {
  title: 'Display/StatusPill',
  component: HStatusPillComponent,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['running', 'idle', 'error', 'maintenance', 'hold'] },
    ariaLabel: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `<h-status-pill [status]="status" [aria-label]="ariaLabel">{{ status }}</h-status-pill>`,
    moduleMetadata: { imports: [HStatusPillComponent] },
  }),
};

export default meta;
type Story = StoryObj<HStatusPillComponent>;

export const Running: Story = {
  args: { status: 'running' },
};

export const Idle: Story = {
  args: { status: 'idle' },
};

export const Error: Story = {
  args: { status: 'error' },
};

export const Maintenance: Story = {
  args: { status: 'maintenance' },
};

export const Hold: Story = {
  args: { status: 'hold' },
};

export const AllStatuses: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
        <h-status-pill status="running">Running</h-status-pill>
        <h-status-pill status="idle">Idle</h-status-pill>
        <h-status-pill status="error">Error</h-status-pill>
        <h-status-pill status="maintenance">Maintenance</h-status-pill>
        <h-status-pill status="hold">Hold</h-status-pill>
      </div>
    `,
    moduleMetadata: { imports: [HStatusPillComponent] },
  }),
};
