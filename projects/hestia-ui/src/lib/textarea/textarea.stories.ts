import type { Meta, StoryObj } from '@storybook/angular';
import { HTextareaComponent } from './textarea.component';
import { HFieldComponent } from '../field/field.component';

const meta: Meta<HTextareaComponent> = {
  title: 'Form/Textarea',
  component: HTextareaComponent,
  tags: ['autodocs'],
  argTypes: {
    resize:      { control: 'select', options: ['none', 'vertical', 'both'] },
    rows:        { control: 'number' },
    placeholder: { control: 'text' },
    disabled:    { control: 'boolean' },
    invalid:     { control: 'boolean' },
    required:    { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:320px;">
        <h-textarea
          [rows]="rows"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [invalid]="invalid"
          [required]="required"
          [resize]="resize">
        </h-textarea>
      </div>
    `,
    moduleMetadata: { imports: [HTextareaComponent] },
  }),
};

export default meta;
type Story = StoryObj<HTextareaComponent>;

export const Default: Story = {
  args: { rows: 3, placeholder: 'Enter notes…', disabled: false, invalid: false },
};

export const NoResize: Story = {
  args: { rows: 4, placeholder: 'Fixed height, no resize', resize: 'none' },
};

export const Invalid: Story = {
  args: { rows: 3, placeholder: 'Enter notes…', invalid: true },
};

export const Disabled: Story = {
  args: { rows: 3, placeholder: 'Disabled textarea', disabled: true },
};

export const WithField: Story = {
  render: () => ({
    template: `
      <div style="width:320px;">
        <h-field label="Production notes" hint="Visible to operators on the floor" [required]="true">
          <h-textarea placeholder="Describe the process adjustment…" [rows]="4"></h-textarea>
        </h-field>
      </div>
    `,
    moduleMetadata: { imports: [HTextareaComponent, HFieldComponent] },
  }),
};

export const WithError: Story = {
  render: () => ({
    template: `
      <div style="width:320px;">
        <h-field label="Defect description" error="Description is required">
          <h-textarea [invalid]="true" placeholder="Describe the defect…"></h-textarea>
        </h-field>
      </div>
    `,
    moduleMetadata: { imports: [HTextareaComponent, HFieldComponent] },
  }),
};
