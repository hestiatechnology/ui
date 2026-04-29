import type { Meta, StoryObj } from '@storybook/angular';
import { HKpiComponent } from './kpi.component';

const meta: Meta<HKpiComponent> = {
  title: 'Data/KPI',
  component: HKpiComponent,
  tags: ['autodocs'],
  argTypes: {
    label:       { control: 'text' },
    value:       { control: 'text' },
    delta:       { control: 'text' },
    trend:       { control: 'radio', options: ['up', 'down'] },
    invertTrend: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<HKpiComponent>;

export const Default: Story = {
  args: { label: 'Active lots', value: '31', delta: '+4', trend: 'up', invertTrend: false },
};

export const OEE: Story = {
  args: {
    label: 'OEE · today', value: '78.4%', delta: '+2.1pp', trend: 'up', invertTrend: false,
  },
  render: (args) => ({
    props: { ...args, spark: [62, 64, 60, 66, 70, 74, 78] },
    template: `<div style="width:220px;"><h-kpi [label]="label" [value]="value" [delta]="delta" [trend]="trend" [sparkValues]="spark"></h-kpi></div>`,
    moduleMetadata: { imports: [HKpiComponent] },
  }),
};

export const RejectRate: Story = {
  args: { label: 'Reject rate', value: '1.8%', delta: '-0.4pp', trend: 'down', invertTrend: true },
  render: (args) => ({
    props: args,
    template: `<div style="width:220px;"><h-kpi [label]="label" [value]="value" [delta]="delta" [trend]="trend" [invertTrend]="invertTrend"></h-kpi></div>`,
    moduleMetadata: { imports: [HKpiComponent] },
  }),
};

export const NegativeTrend: Story = {
  args: { label: 'On-time delivery', value: '94.2%', delta: '-1.1pp', trend: 'down', invertTrend: true },
};

export const Dashboard: Story = {
  render: () => ({
    props: {
      spark1: [62, 64, 60, 66, 70, 74, 78],
      spark2: [820, 940, 1020, 980, 1180, 1240, 1140],
      spark3: [97.1, 97.8, 98.0, 97.9, 98.2, 98.1, 98.2],
    },
    template: `
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:900px;">
        <h-kpi label="Active lots"     value="31"    delta="+4"     trend="up"></h-kpi>
        <h-kpi label="OEE · today"     value="78.4%" delta="+2.1pp" trend="up"   [sparkValues]="spark1"></h-kpi>
        <h-kpi label="Reject rate"     value="1.8%"  delta="-0.4pp" trend="down" [invertTrend]="true"></h-kpi>
        <h-kpi label="On-time delivery" value="94.2%" delta="-1.1pp" trend="down" [invertTrend]="true"></h-kpi>
        <h-kpi label="Throughput · m/h" value="1,240" delta="+8.2%" trend="up"   [sparkValues]="spark2"></h-kpi>
        <h-kpi label="Energy · kWh"    value="342"   delta="-3.1%" trend="down" [invertTrend]="true" [sparkValues]="spark2"></h-kpi>
        <h-kpi label="QC pass rate"    value="98.2%" delta="+0.4pp" trend="up"   [sparkValues]="spark3"></h-kpi>
      </div>
    `,
    moduleMetadata: { imports: [HKpiComponent] },
  }),
};
