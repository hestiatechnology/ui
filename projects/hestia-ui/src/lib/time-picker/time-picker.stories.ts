import type { Meta, StoryObj } from '@storybook/angular';
import { HTimePickerComponent } from './time-picker.component';
import { HFieldComponent } from '../field/field.component';

const meta: Meta<HTimePickerComponent> = {
  title: 'Form/TimePicker',
  component: HTimePickerComponent,
  tags: ['autodocs'],
  argTypes: {
    showSeconds: { control: 'boolean' },
    step: { control: 'select', options: [1, 5, 10, 15, 30] },
  },
  render: (args) => ({
    props: args,
    template: `<h-time-picker [showSeconds]="showSeconds" [step]="step"></h-time-picker>`,
    moduleMetadata: { imports: [HTimePickerComponent] },
  }),
};

export default meta;
type Story = StoryObj<HTimePickerComponent>;

export const Default: Story = {
  args: { showSeconds: false, step: 1 },
};

export const WithSeconds: Story = {
  args: { showSeconds: true, step: 1 },
};

export const Step15Minutes: Story = {
  args: { showSeconds: false, step: 15 },
};

export const PresetTime: Story = {
  render: () => ({
    props: { time: { hours: 14, minutes: 30 } },
    template: `<h-time-picker [value]="time"></h-time-picker>`,
    moduleMetadata: { imports: [HTimePickerComponent] },
  }),
};

export const AllSteps: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start;">
        <div>
          <p style="font-size:12px;color:var(--h-muted-foreground);margin:0 0 8px;font-family:var(--h-font-sans);">step=1 (default)</p>
          <h-time-picker></h-time-picker>
        </div>
        <div>
          <p style="font-size:12px;color:var(--h-muted-foreground);margin:0 0 8px;font-family:var(--h-font-sans);">step=15</p>
          <h-time-picker [step]="15"></h-time-picker>
        </div>
        <div>
          <p style="font-size:12px;color:var(--h-muted-foreground);margin:0 0 8px;font-family:var(--h-font-sans);">step=30</p>
          <h-time-picker [step]="30"></h-time-picker>
        </div>
        <div>
          <p style="font-size:12px;color:var(--h-muted-foreground);margin:0 0 8px;font-family:var(--h-font-sans);">with seconds</p>
          <h-time-picker [showSeconds]="true"></h-time-picker>
        </div>
      </div>
    `,
    moduleMetadata: { imports: [HTimePickerComponent] },
  }),
};
