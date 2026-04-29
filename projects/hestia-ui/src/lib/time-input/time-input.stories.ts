import type { Meta, StoryObj } from '@storybook/angular';
import { HTimeInputComponent } from './time-input.component';
import { HFieldComponent } from '../field/field.component';

const meta: Meta<HTimeInputComponent> = {
  title: 'Form/TimeInput',
  component: HTimeInputComponent,
  tags: ['autodocs'],
  argTypes: {
    showSeconds: { control: 'boolean' },
    step:        { control: 'select', options: [1, 5, 10, 15, 30] },
    size:        { control: 'select', options: ['sm', 'default', 'lg'] },
    disabled:    { control: 'boolean' },
    invalid:     { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:240px">
        <h-time-input
          [showSeconds]="showSeconds"
          [step]="step"
          [size]="size"
          [disabled]="disabled"
          [invalid]="invalid"
        ></h-time-input>
      </div>
    `,
    moduleMetadata: { imports: [HTimeInputComponent] },
  }),
};

export default meta;
type Story = StoryObj<HTimeInputComponent>;

export const Default: Story = {
  args: { showSeconds: false, step: 1, size: 'default', disabled: false, invalid: false },
};

export const WithSeconds: Story = {
  args: { showSeconds: true, step: 1, size: 'default', disabled: false, invalid: false },
};

export const Step15: Story = {
  args: { showSeconds: false, step: 15, size: 'default', disabled: false, invalid: false },
};

export const Small: Story = {
  args: { showSeconds: false, step: 1, size: 'sm', disabled: false, invalid: false },
};

export const Large: Story = {
  args: { showSeconds: false, step: 1, size: 'lg', disabled: false, invalid: false },
};

export const Disabled: Story = {
  args: { showSeconds: false, step: 1, size: 'default', disabled: true, invalid: false },
};

export const Invalid: Story = {
  args: { showSeconds: false, step: 1, size: 'default', disabled: false, invalid: true },
};

export const WithField: Story = {
  render: () => ({
    template: `
      <div style="max-width:280px;display:flex;flex-direction:column;gap:16px">
        <h-field label="Start time" hint="HH:mm format">
          <h-time-input></h-time-input>
        </h-field>
        <h-field label="End time (with seconds)">
          <h-time-input [showSeconds]="true"></h-time-input>
        </h-field>
        <h-field label="Meeting time" [error]="'Required'" [showError]="true">
          <h-time-input [invalid]="true"></h-time-input>
        </h-field>
      </div>
    `,
    moduleMetadata: { imports: [HTimeInputComponent, HFieldComponent] },
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="max-width:280px;display:flex;flex-direction:column;gap:12px">
        <h-time-input size="sm"  [placeholder]="'sm  – HH:mm'"></h-time-input>
        <h-time-input             [placeholder]="'default – HH:mm'"></h-time-input>
        <h-time-input size="lg" [placeholder]="'lg  – HH:mm'"></h-time-input>
      </div>
    `,
    moduleMetadata: { imports: [HTimeInputComponent] },
  }),
};
