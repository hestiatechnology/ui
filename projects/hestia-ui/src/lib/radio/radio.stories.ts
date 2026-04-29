import type { Meta, StoryObj } from '@storybook/angular';
import { HRadioGroupComponent, HRadioComponent } from './radio.component';

const meta: Meta<HRadioGroupComponent> = {
  title: 'Form/Radio',
  component: HRadioGroupComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<HRadioGroupComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <h-radio-group aria-label="Production process">
        <h-radio value="knit" label="Knitting" description="Interlocked loops of yarn"></h-radio>
        <h-radio value="weave" label="Weaving" description="Interlaced horizontal and vertical threads"></h-radio>
        <h-radio value="knot" label="Knotting" description="Decorative textile technique"></h-radio>
      </h-radio-group>
    `,
    moduleMetadata: { imports: [HRadioGroupComponent, HRadioComponent] },
  }),
};

export const WithSelected: Story = {
  render: () => ({
    props: { value: 'weave' },
    template: `
      <h-radio-group [(value)]="value" aria-label="Production process">
        <h-radio value="knit" label="Knitting" description="Interlocked loops of yarn"></h-radio>
        <h-radio value="weave" label="Weaving" description="Interlaced horizontal and vertical threads"></h-radio>
        <h-radio value="knot" label="Knotting" description="Decorative textile technique"></h-radio>
      </h-radio-group>
    `,
    moduleMetadata: { imports: [HRadioGroupComponent, HRadioComponent] },
  }),
};

export const WithDisabledOption: Story = {
  render: () => ({
    template: `
      <h-radio-group aria-label="Machine type">
        <h-radio value="circular" label="Circular knitting"></h-radio>
        <h-radio value="flatbed" label="Flatbed knitting"></h-radio>
        <h-radio value="warp" label="Warp knitting" [disabled]="true"></h-radio>
      </h-radio-group>
    `,
    moduleMetadata: { imports: [HRadioGroupComponent, HRadioComponent] },
  }),
};

export const DisabledGroup: Story = {
  render: () => ({
    template: `
      <h-radio-group [disabled]="true" aria-label="Disabled group">
        <h-radio value="option-a" label="Option A"></h-radio>
        <h-radio value="option-b" label="Option B"></h-radio>
      </h-radio-group>
    `,
    moduleMetadata: { imports: [HRadioGroupComponent, HRadioComponent] },
  }),
};
