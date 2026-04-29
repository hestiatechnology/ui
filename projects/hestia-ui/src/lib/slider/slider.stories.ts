import type { Meta, StoryObj } from '@storybook/angular';
import { HSliderComponent } from './slider.component';

const meta: Meta<HSliderComponent> = {
  title: 'Form/Slider',
  component: HSliderComponent,
  tags: ['autodocs'],
  argTypes: {
    value:      { control: 'number' },
    min:        { control: 'number' },
    max:        { control: 'number' },
    step:       { control: 'number' },
    disabled:   { control: 'boolean' },
    showLabels: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<HSliderComponent>;

export const Default: Story = {
  args: { value: 62, min: 0, max: 100, step: 1, disabled: false, showLabels: true },
  render: (args) => ({
    props: args,
    template: `<div style="width:320px;padding:12px;"><h-slider [value]="value" [min]="min" [max]="max" [step]="step" [disabled]="disabled" [showLabels]="showLabels"></h-slider></div>`,
    moduleMetadata: { imports: [HSliderComponent] },
  }),
};

export const GSMTolerance: Story = {
  args: { value: 180, min: 100, max: 400, step: 5, showLabels: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:320px;padding:12px;">
        <div style="font-size:12px;color:var(--h-muted-foreground);margin-bottom:8px;">GSM target (g/m²)</div>
        <h-slider [value]="value" [min]="min" [max]="max" [step]="step" [showLabels]="showLabels" ariaLabel="GSM target"></h-slider>
      </div>
    `,
    moduleMetadata: { imports: [HSliderComponent] },
  }),
};

export const Disabled: Story = {
  args: { value: 40, disabled: true, showLabels: true },
  render: (args) => ({
    props: args,
    template: `<div style="width:320px;padding:12px;"><h-slider [value]="value" [disabled]="disabled" [showLabels]="showLabels"></h-slider></div>`,
    moduleMetadata: { imports: [HSliderComponent] },
  }),
};

export const NoLabels: Story = {
  args: { value: 55, showLabels: false },
  render: (args) => ({
    props: args,
    template: `<div style="width:320px;padding:12px;"><h-slider [value]="value" [showLabels]="showLabels"></h-slider></div>`,
    moduleMetadata: { imports: [HSliderComponent] },
  }),
};
