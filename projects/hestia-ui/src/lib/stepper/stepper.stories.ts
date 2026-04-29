import type { Meta, StoryObj } from '@storybook/angular';
import { HStepperComponent } from './stepper.component';

const meta: Meta<HStepperComponent> = {
  title: 'Navigation/Stepper',
  component: HStepperComponent,
  tags: ['autodocs'],
  argTypes: {
    activeIndex:  { control: 'number' },
    orientation:  { control: 'radio', options: ['horizontal', 'vertical'] },
  },
};

export default meta;
type Story = StoryObj<HStepperComponent>;

const LOT_STEPS = [
  { label: 'Connect data' },
  { label: 'Configure rules' },
  { label: 'Run pilot' },
  { label: 'Go live' },
];

const LOT_VSTEPS = [
  { label: 'Customer order received',   description: 'Apr 26 · 14:30' },
  { label: 'Lot created in scheduler',  description: 'Apr 27 · 05:50' },
  { label: 'Knit on Loom 7',            description: 'Apr 27 · 06:14 → ongoing' },
  { label: 'Dye bath',                  description: 'scheduled' },
  { label: 'QC + DPP finalise',         description: 'scheduled' },
];

export const HorizontalStep1: Story = {
  args: { activeIndex: 1, orientation: 'horizontal' },
  render: (args) => ({
    props: { ...args, steps: LOT_STEPS },
    template: `<div style="padding:24px;"><h-stepper [steps]="steps" [activeIndex]="activeIndex" orientation="horizontal"></h-stepper></div>`,
    moduleMetadata: { imports: [HStepperComponent] },
  }),
};

export const HorizontalComplete: Story = {
  args: { activeIndex: 4, orientation: 'horizontal' },
  render: (args) => ({
    props: { ...args, steps: LOT_STEPS },
    template: `<div style="padding:24px;"><h-stepper [steps]="steps" [activeIndex]="activeIndex" orientation="horizontal"></h-stepper></div>`,
    moduleMetadata: { imports: [HStepperComponent] },
  }),
};

export const Vertical: Story = {
  args: { activeIndex: 2, orientation: 'vertical' },
  render: (args) => ({
    props: { ...args, steps: LOT_VSTEPS },
    template: `<div style="padding:24px;width:320px;"><h-stepper [steps]="steps" [activeIndex]="activeIndex" orientation="vertical"></h-stepper></div>`,
    moduleMetadata: { imports: [HStepperComponent] },
  }),
};

export const OnboardingFlow: Story = {
  render: () => ({
    props: {
      steps: [
        { label: 'Connect your data' },
        { label: 'Analyse in real-time' },
        { label: 'Scale with compliance' },
      ],
    },
    template: `<div style="padding:24px;"><h-stepper [steps]="steps" [activeIndex]="1" orientation="horizontal"></h-stepper></div>`,
    moduleMetadata: { imports: [HStepperComponent] },
  }),
};
