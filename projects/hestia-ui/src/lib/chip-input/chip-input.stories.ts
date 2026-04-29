import type { Meta, StoryObj } from '@storybook/angular';
import { HChipInputComponent } from './chip-input.component';
import { HFieldComponent } from '../field/field.component';

const meta: Meta<HChipInputComponent> = {
  title: 'Form/ChipInput',
  component: HChipInputComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    separator:   { control: 'select', options: ['enter', 'comma', 'both'] },
    disabled:    { control: 'boolean' },
    invalid:     { control: 'boolean' },
    required:    { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:360px;">
        <h-chip-input
          [placeholder]="placeholder"
          [separator]="separator"
          [disabled]="disabled"
          [invalid]="invalid"
          [required]="required">
        </h-chip-input>
      </div>
    `,
    moduleMetadata: { imports: [HChipInputComponent] },
  }),
};

export default meta;
type Story = StoryObj<HChipInputComponent>;

export const Default: Story = {
  args: { placeholder: 'Add tag…', separator: 'both', disabled: false, invalid: false },
};

export const WithPresetChips: Story = {
  render: () => ({
    props: { chips: ['cotton', 'merino', 'linen'] },
    template: `
      <div style="width:360px;">
        <h-chip-input [value]="chips" placeholder="Add material…"></h-chip-input>
      </div>
    `,
    moduleMetadata: { imports: [HChipInputComponent] },
  }),
};

export const EnterOnly: Story = {
  args: { placeholder: 'Press Enter to add…', separator: 'enter' },
};

export const Invalid: Story = {
  render: () => ({
    props: { chips: ['cotton'] },
    template: `
      <div style="width:360px;">
        <h-chip-input [value]="chips" [invalid]="true" placeholder="Add material…"></h-chip-input>
      </div>
    `,
    moduleMetadata: { imports: [HChipInputComponent] },
  }),
};

export const Disabled: Story = {
  render: () => ({
    props: { chips: ['cotton', 'merino'] },
    template: `
      <div style="width:360px;">
        <h-chip-input [value]="chips" [disabled]="true"></h-chip-input>
      </div>
    `,
    moduleMetadata: { imports: [HChipInputComponent] },
  }),
};

export const WithField: Story = {
  render: () => ({
    template: `
      <div style="width:360px;">
        <h-field label="Material tags" hint="Press Enter or comma to add a tag">
          <h-chip-input placeholder="e.g. cotton, merino…"></h-chip-input>
        </h-field>
      </div>
    `,
    moduleMetadata: { imports: [HChipInputComponent, HFieldComponent] },
  }),
};
