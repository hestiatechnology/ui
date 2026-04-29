import type { Meta, StoryObj } from '@storybook/angular';
import { HFieldComponent } from './field.component';
import { HInputComponent } from '../input/input.component';

const meta: Meta<HFieldComponent> = {
  title: 'Form/Field',
  component: HFieldComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<HFieldComponent>;

export const Default: Story = {
  args: { label: 'Email address', hint: 'Used only for account notifications.' },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:320px;">
        <h-field [label]="label" [hint]="hint" [error]="error" [required]="required">
          <h-input placeholder="you@example.com" type="email"></h-input>
        </h-field>
      </div>
    `,
    moduleMetadata: { imports: [HFieldComponent, HInputComponent] },
  }),
};

export const Required: Story = {
  render: () => ({
    template: `
      <div style="width:320px;">
        <h-field label="Full name" [required]="true">
          <h-input placeholder="John Smith"></h-input>
        </h-field>
      </div>
    `,
    moduleMetadata: { imports: [HFieldComponent, HInputComponent] },
  }),
};

export const WithError: Story = {
  render: () => ({
    template: `
      <div style="width:320px;">
        <h-field label="Email address" error="Please enter a valid email address.">
          <h-input placeholder="you@example.com" type="email" [invalid]="true"></h-input>
        </h-field>
      </div>
    `,
    moduleMetadata: { imports: [HFieldComponent, HInputComponent] },
  }),
};

export const WithHint: Story = {
  render: () => ({
    template: `
      <div style="width:320px;">
        <h-field label="Lot code" hint="Alphanumeric, up to 20 characters.">
          <h-input placeholder="LOT-2024-001"></h-input>
        </h-field>
      </div>
    `,
    moduleMetadata: { imports: [HFieldComponent, HInputComponent] },
  }),
};
