import type { Meta, StoryObj } from '@storybook/angular';
import { HAlertComponent } from './alert.component';

const meta: Meta<HAlertComponent> = {
  title: 'Feedback/Alert',
  component: HAlertComponent,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: ['primary', 'running', 'idle', 'error', 'hold'] },
    title: { control: 'text' },
    description: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<HAlertComponent>;

export const Default: Story = {
  args: {
    tone: 'primary',
    title: 'Certification pending',
    description: 'Lot LOT-2024-0042 is awaiting GOTS certification review.',
    dismissible: false,
  },
};

export const Success: Story = {
  args: {
    tone: 'running',
    title: 'Lot certified',
    description: 'GOTS certification approved for lot LOT-2024-0042.',
  },
};

export const Warning: Story = {
  args: {
    tone: 'idle',
    title: 'Machine idle',
    description: 'CK-01 has been idle for more than 2 hours. Check the production schedule.',
  },
};

export const Error: Story = {
  args: {
    tone: 'error',
    title: 'Quality check failed',
    description: 'Lot LOT-2024-0038 failed tensile strength test. Batch quarantined.',
  },
};

export const OnHold: Story = {
  args: {
    tone: 'hold',
    title: 'Production on hold',
    description: 'Line A is paused pending raw material delivery.',
  },
};

export const Dismissible: Story = {
  args: {
    tone: 'primary',
    title: 'New THREAD standard published',
    description: 'Version 2.1 of the THREAD open standard is now available.',
    dismissible: true,
  },
};

export const AllTones: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:480px;">
        <h-alert tone="primary" title="Information" description="This is an informational message."></h-alert>
        <h-alert tone="running" title="Success" description="Operation completed successfully."></h-alert>
        <h-alert tone="idle" title="Warning" description="This action may have side effects."></h-alert>
        <h-alert tone="error" title="Error" description="Something went wrong. Please try again."></h-alert>
        <h-alert tone="hold" title="On hold" description="This process is temporarily paused."></h-alert>
      </div>
    `,
    moduleMetadata: { imports: [HAlertComponent] },
  }),
};
