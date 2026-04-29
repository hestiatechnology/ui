import type { Meta, StoryObj } from '@storybook/angular';
import { HDateInputComponent } from './date-input.component';
import { HFieldComponent } from '../field/field.component';

const meta: Meta<HDateInputComponent> = {
  title: 'Form/DateInput',
  component: HDateInputComponent,
  tags: ['autodocs'],
  argTypes: {
    mode:     { control: 'select', options: ['single', 'range'] },
    size:     { control: 'select', options: ['sm', 'default', 'lg'] },
    disabled: { control: 'boolean' },
    invalid:  { control: 'boolean' },
    required: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:260px;">
        <h-date-input
          [mode]="mode"
          [size]="size"
          [disabled]="disabled"
          [invalid]="invalid"
          [required]="required">
        </h-date-input>
      </div>
    `,
    moduleMetadata: { imports: [HDateInputComponent] },
  }),
};

export default meta;
type Story = StoryObj<HDateInputComponent>;

export const Default: Story = {
  args: { mode: 'single', size: 'default', disabled: false, invalid: false },
};

export const RangeMode: Story = {
  args: { mode: 'range', size: 'default' },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:320px;">
        <h-date-input mode="range" [size]="size"></h-date-input>
      </div>
    `,
    moduleMetadata: { imports: [HDateInputComponent] },
  }),
};

export const WithPresetDate: Story = {
  render: () => ({
    props: { date: new Date(2025, 3, 29) },
    template: `
      <div style="width:260px;">
        <h-date-input [value]="date"></h-date-input>
      </div>
    `,
    moduleMetadata: { imports: [HDateInputComponent] },
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:280px;">
        <h-date-input size="sm"      placeholder="Small"></h-date-input>
        <h-date-input size="default" placeholder="Default"></h-date-input>
        <h-date-input size="lg"      placeholder="Large · Operations"></h-date-input>
      </div>
    `,
    moduleMetadata: { imports: [HDateInputComponent] },
  }),
};

export const WithField: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;width:280px;">
        <h-field label="Production date" hint="Click to open calendar or type dd/mm/yyyy">
          <h-date-input></h-date-input>
        </h-field>
        <h-field label="Reporting period" hint="Select a start and end date">
          <h-date-input mode="range"></h-date-input>
        </h-field>
      </div>
    `,
    moduleMetadata: { imports: [HDateInputComponent, HFieldComponent] },
  }),
};

export const Invalid: Story = {
  render: () => ({
    template: `
      <div style="width:260px;">
        <h-field label="Delivery date" error="Date is required">
          <h-date-input [invalid]="true"></h-date-input>
        </h-field>
      </div>
    `,
    moduleMetadata: { imports: [HDateInputComponent, HFieldComponent] },
  }),
};
