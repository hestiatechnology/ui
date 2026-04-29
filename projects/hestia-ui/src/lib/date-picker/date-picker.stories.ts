import type { Meta, StoryObj } from '@storybook/angular';
import { HDatePickerComponent } from './date-picker.component';

const meta: Meta<HDatePickerComponent> = {
  title: 'Domain/DatePicker',
  component: HDatePickerComponent,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'radio', options: ['single', 'range'] },
  },
};

export default meta;
type Story = StoryObj<HDatePickerComponent>;

export const SingleDate: Story = {
  args: { mode: 'single' },
  render: (args) => ({
    props: args,
    template: `<h-date-picker [mode]="mode"></h-date-picker>`,
    moduleMetadata: { imports: [HDatePickerComponent] },
  }),
};

export const RangeSelection: Story = {
  args: { mode: 'range' },
  render: (args) => ({
    props: args,
    template: `<h-date-picker [mode]="mode"></h-date-picker>`,
    moduleMetadata: { imports: [HDatePickerComponent] },
  }),
};

export const InFilterBar: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:flex-start;gap:16px;flex-wrap:wrap;">
        <div>
          <div style="font-size:12px;font-weight:600;color:var(--h-muted-foreground);margin-bottom:8px;letter-spacing:0.1em;text-transform:uppercase;">From</div>
          <h-date-picker mode="single"></h-date-picker>
        </div>
        <div>
          <div style="font-size:12px;font-weight:600;color:var(--h-muted-foreground);margin-bottom:8px;letter-spacing:0.1em;text-transform:uppercase;">To</div>
          <h-date-picker mode="single"></h-date-picker>
        </div>
      </div>
    `,
    moduleMetadata: { imports: [HDatePickerComponent] },
  }),
};
