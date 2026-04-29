import type { Meta, StoryObj } from '@storybook/angular';
import { HRingProgressComponent } from './ring-progress.component';

const meta: Meta<HRingProgressComponent> = {
  title: 'Feedback/RingProgress',
  component: HRingProgressComponent,
  tags: ['autodocs'],
  argTypes: {
    value:       { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size:        { control: { type: 'range', min: 24, max: 120, step: 4 } },
    strokeWidth: { control: { type: 'range', min: 2, max: 10, step: 1 } },
    color:       { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<HRingProgressComponent>;

export const Default: Story = {
  args: { value: 72, size: 40, strokeWidth: 3 },
};

export const Upload: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:12px;">
        <h-ring-progress [value]="72" [size]="40"></h-ring-progress>
        <div>
          <div style="font-size:12px;color:var(--h-muted-foreground)">Uploading…</div>
          <div style="font-family:var(--h-font-mono);font-size:13px;font-weight:600">3.2 / 4.4 MB</div>
        </div>
      </div>
    `,
    moduleMetadata: { imports: [HRingProgressComponent] },
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
        <h-ring-progress [value]="65" [size]="32" [stroke-width]="2"></h-ring-progress>
        <h-ring-progress [value]="65" [size]="40" [stroke-width]="3"></h-ring-progress>
        <h-ring-progress [value]="65" [size]="56" [stroke-width]="4"></h-ring-progress>
        <h-ring-progress [value]="65" [size]="80" [stroke-width]="6"></h-ring-progress>
      </div>
    `,
    moduleMetadata: { imports: [HRingProgressComponent] },
  }),
};

export const StatusColors: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12px;color:var(--h-muted-foreground)">
          <h-ring-progress [value]="78" [size]="48" color="var(--h-primary)"></h-ring-progress>
          Primary
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12px;color:var(--h-muted-foreground)">
          <h-ring-progress [value]="94" [size]="48" color="var(--h-status-running)"></h-ring-progress>
          Running
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12px;color:var(--h-muted-foreground)">
          <h-ring-progress [value]="40" [size]="48" color="var(--h-status-idle)"></h-ring-progress>
          Idle
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12px;color:var(--h-muted-foreground)">
          <h-ring-progress [value]="12" [size]="48" color="var(--h-status-error)"></h-ring-progress>
          Error
        </div>
      </div>
    `,
    moduleMetadata: { imports: [HRingProgressComponent] },
  }),
};
