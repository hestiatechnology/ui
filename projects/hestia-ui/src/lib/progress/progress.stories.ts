import type { Meta, StoryObj } from '@storybook/angular';
import { HProgressComponent } from './progress.component';

const meta: Meta<HProgressComponent> = {
  title: 'Feedback/Progress',
  component: HProgressComponent,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: { type: 'number', min: 1 } },
    indeterminate: { control: 'boolean' },
    showValue: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<HProgressComponent>;

export const Default: Story = {
  args: { value: 65, max: 100, indeterminate: false, showValue: true },
};

export const Empty: Story = {
  args: { value: 0, max: 100, showValue: true },
};

export const Complete: Story = {
  args: { value: 100, max: 100, showValue: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, ariaLabel: 'Loading production data…' },
};

export const NoLabel: Story = {
  args: { value: 42, max: 100, showValue: false },
};

export const CustomMax: Story = {
  args: { value: 1200, max: 5000, showValue: false, ariaLabel: 'Units produced' },
};

export const Steps: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;width:400px;">
        <div>
          <div style="font-size:12px;color:var(--h-muted-foreground);margin-bottom:6px;">Spinning — 100%</div>
          <h-progress [value]="100"></h-progress>
        </div>
        <div>
          <div style="font-size:12px;color:var(--h-muted-foreground);margin-bottom:6px;">Knitting — 75%</div>
          <h-progress [value]="75"></h-progress>
        </div>
        <div>
          <div style="font-size:12px;color:var(--h-muted-foreground);margin-bottom:6px;">Dyeing — 40%</div>
          <h-progress [value]="40"></h-progress>
        </div>
        <div>
          <div style="font-size:12px;color:var(--h-muted-foreground);margin-bottom:6px;">Finishing — 0%</div>
          <h-progress [value]="0"></h-progress>
        </div>
      </div>
    `,
    moduleMetadata: { imports: [HProgressComponent] },
  }),
};
