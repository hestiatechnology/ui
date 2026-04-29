import type { Meta, StoryObj } from '@storybook/angular';
import { HCheckboxComponent } from './checkbox.component';

const meta: Meta<HCheckboxComponent> = {
  title: 'Form/Checkbox',
  component: HCheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<HCheckboxComponent>;

export const Default: Story = {
  args: { label: 'Accept terms and conditions', checked: false, disabled: false },
};

export const Checked: Story = {
  args: { label: 'Notifications enabled', checked: true },
};

export const Indeterminate: Story = {
  args: { label: 'Select all', indeterminate: true },
};

export const Disabled: Story = {
  args: { label: 'Unavailable option', disabled: true },
};

export const DisabledChecked: Story = {
  args: { label: 'Locked setting', checked: true, disabled: true },
};

export const Group: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:10px;">
        <h-checkbox label="Knitting" [checked]="true"></h-checkbox>
        <h-checkbox label="Weaving" [checked]="true"></h-checkbox>
        <h-checkbox label="Dyeing"></h-checkbox>
        <h-checkbox label="Finishing" [disabled]="true"></h-checkbox>
      </div>
    `,
    moduleMetadata: { imports: [HCheckboxComponent] },
  }),
};
