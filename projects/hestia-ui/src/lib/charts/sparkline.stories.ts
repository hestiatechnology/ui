import type { Meta, StoryObj } from '@storybook/angular';
import { HSparklineComponent } from './sparkline.component';
import { HCardComponent } from '../card/card.component';

const meta: Meta<HSparklineComponent> = {
  title: 'Charts/Sparkline',
  component: HSparklineComponent,
  tags: ['autodocs'],
  argTypes: {
    values: { control: 'object' },
    mini:   { control: 'boolean' },
    color:  { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<HSparklineComponent>;

export const Default: Story = {
  args: { values: [62, 64, 60, 66, 70, 74, 78], mini: false },
};

export const Mini: Story = {
  args: { values: [62, 64, 60, 66, 70, 74, 78], mini: true },
};

export const InKPICard: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:700px;">
        <h-card>
          <div style="font-size:12px;color:var(--h-muted-foreground);font-weight:500;font-family:var(--h-font-sans);">OEE · 7 days</div>
          <div style="font-size:28px;font-weight:600;font-family:var(--h-font-mono);margin-top:8px;">78.4%</div>
          <h-sparkline [values]="oee"></h-sparkline>
        </h-card>
        <h-card>
          <div style="font-size:12px;color:var(--h-muted-foreground);font-weight:500;font-family:var(--h-font-sans);">QC pass rate</div>
          <div style="font-size:28px;font-weight:600;font-family:var(--h-font-mono);margin-top:8px;">98.2%</div>
          <h-sparkline [values]="qc" color="var(--h-status-running)"></h-sparkline>
        </h-card>
        <h-card>
          <div style="font-size:12px;color:var(--h-muted-foreground);font-weight:500;font-family:var(--h-font-sans);">Reject rate</div>
          <div style="font-size:28px;font-weight:600;font-family:var(--h-font-mono);margin-top:8px;">1.8%</div>
          <h-sparkline [values]="reject" color="var(--h-status-error)"></h-sparkline>
        </h-card>
      </div>
    `,
    props: {
      oee:    [62, 64, 60, 66, 70, 74, 78],
      qc:     [97.1, 97.8, 98.0, 97.9, 98.2, 98.1, 98.2],
      reject: [2.9, 2.2, 2.0, 2.1, 1.8, 1.9, 1.8],
    },
    moduleMetadata: { imports: [HSparklineComponent, HCardComponent] },
  }),
};
