import type { Meta, StoryObj } from '@storybook/angular';
import { HDonutComponent, HChartLegendComponent } from './donut.component';
import { HCardComponent } from '../card/card.component';

const meta: Meta<HDonutComponent> = {
  title: 'Charts/Donut',
  component: HDonutComponent,
  tags: ['autodocs'],
  argTypes: {
    segments:    { control: 'object' },
    size:        { control: { type: 'range', min: 48, max: 160, step: 8 } },
    strokeWidth: { control: { type: 'range', min: 6, max: 24, step: 2 } },
  },
};

export default meta;
type Story = StoryObj<HDonutComponent>;

const statusSegments = [
  { value: 62, color: 'var(--h-status-running)',     label: 'Running' },
  { value: 22, color: 'var(--h-status-idle)',        label: 'Idle' },
  { value:  9, color: 'var(--h-status-hold)',        label: 'Hold' },
  { value:  7, color: 'var(--h-status-maintenance)', label: 'Maint.' },
];

export const Default: Story = {
  args: { segments: statusSegments, size: 80, strokeWidth: 12 },
};

export const WithLegend: Story = {
  render: () => ({
    template: `
      <h-card style="width:280px;">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground);font-family:var(--h-font-sans);margin-bottom:12px;">Status mix</div>
        <div style="display:flex;align-items:center;gap:16px;">
          <h-donut [segments]="segments" [size]="80" [strokeWidth]="12"></h-donut>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <h-chart-legend color="var(--h-status-running)"     label="Running" value="62%"></h-chart-legend>
            <h-chart-legend color="var(--h-status-idle)"        label="Idle"    value="22%"></h-chart-legend>
            <h-chart-legend color="var(--h-status-hold)"        label="Hold"    value="9%"></h-chart-legend>
            <h-chart-legend color="var(--h-status-maintenance)" label="Maint."  value="7%"></h-chart-legend>
          </div>
        </div>
      </h-card>
    `,
    props: { segments: statusSegments },
    moduleMetadata: { imports: [HDonutComponent, HChartLegendComponent, HCardComponent] },
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
        <h-donut [segments]="segments" [size]="56"  [strokeWidth]="8"></h-donut>
        <h-donut [segments]="segments" [size]="80"  [strokeWidth]="12"></h-donut>
        <h-donut [segments]="segments" [size]="112" [strokeWidth]="16"></h-donut>
      </div>
    `,
    props: { segments: statusSegments },
    moduleMetadata: { imports: [HDonutComponent] },
  }),
};

export const LegendOnly: Story = {
  name: 'ChartLegend',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;width:180px;">
        <h-chart-legend color="var(--h-status-running)"     label="Running" value="62%"></h-chart-legend>
        <h-chart-legend color="var(--h-status-idle)"        label="Idle"    value="22%"></h-chart-legend>
        <h-chart-legend color="var(--h-status-hold)"        label="Hold"    value="9%"></h-chart-legend>
        <h-chart-legend color="var(--h-status-maintenance)" label="Maint."  value="7%"></h-chart-legend>
      </div>
    `,
    moduleMetadata: { imports: [HChartLegendComponent] },
  }),
};
