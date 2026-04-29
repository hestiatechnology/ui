import type { Meta, StoryObj } from '@storybook/angular';
import { HSwitchComponent } from './switch.component';

const meta: Meta<HSwitchComponent> = {
  title: 'Form/Switch',
  component: HSwitchComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<HSwitchComponent>;

export const Default: Story = {
  args: { label: 'Enable notifications', checked: false, disabled: false },
};

export const Checked: Story = {
  args: { label: 'Maintenance mode', checked: true },
};

export const WithDescription: Story = {
  args: {
    label: 'Auto-sync data',
    description: 'Synchronise production data every 5 minutes.',
    checked: false,
  },
};

export const Disabled: Story = {
  args: { label: 'Read-only setting', checked: false, disabled: true },
};

export const DisabledChecked: Story = {
  args: { label: 'System feature', checked: true, disabled: true },
};

export const Group: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;width:360px;border:1px solid var(--h-border);border-radius:12px;overflow:hidden;">
        <div style="padding:12px 16px;border-bottom:1px solid var(--h-border);">
          <h-switch label="Email alerts" description="Receive alerts by email." [checked]="true"></h-switch>
        </div>
        <div style="padding:12px 16px;border-bottom:1px solid var(--h-border);">
          <h-switch label="SMS alerts" description="Receive alerts via SMS."></h-switch>
        </div>
        <div style="padding:12px 16px;">
          <h-switch label="Maintenance window" description="Pause production scheduling." [disabled]="true"></h-switch>
        </div>
      </div>
    `,
    moduleMetadata: { imports: [HSwitchComponent] },
  }),
};
