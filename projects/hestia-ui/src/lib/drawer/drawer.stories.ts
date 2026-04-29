import type { Meta, StoryObj } from '@storybook/angular';
import { HDrawerComponent } from './drawer.component';
import { HButtonComponent } from '../button/button.component';
import { HStatusPillComponent } from '../status-pill/status-pill.component';
import { HBadgeComponent } from '../badge/badge.component';
import { HProgressComponent } from '../progress/progress.component';

const meta: Meta<HDrawerComponent> = {
  title: 'Overlays/Drawer',
  component: HDrawerComponent,
  tags: ['autodocs'],
  argTypes: {
    title:     { control: 'text' },
    eyebrow:   { control: 'text' },
    size:      { control: 'select', options: ['sm', 'default', 'lg'] },
    open:      { control: 'boolean' },
    closeable: { control: 'boolean' },
    showClose: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<HDrawerComponent>;

export const Default: Story = {
  args: { open: true, title: 'LOT-2A-0094', eyebrow: 'Lot', size: 'default', closeable: true, showClose: true },
  render: (args) => ({
    props: args,
    template: `
      <h-drawer [open]="open" [title]="title" [eyebrow]="eyebrow" [size]="size" [closeable]="closeable" [showClose]="showClose">
        <div style="display:flex;gap:8px;margin-bottom:16px;">
          <h-status-pill status="running">Running</h-status-pill>
          <h-badge tone="primary" [dot]="true">DPP draft</h-badge>
          <h-badge tone="neutral">Knit · Loom 7</h-badge>
        </div>
        <dl style="display:grid;grid-template-columns:120px 1fr;gap:10px 14px;font-size:13px;margin:0 0 16px;">
          <dt style="color:var(--h-muted-foreground)">SKU</dt>
          <dd style="margin:0;font-family:var(--h-font-mono)">LIN-180-NAT</dd>
          <dt style="color:var(--h-muted-foreground)">Customer</dt>
          <dd style="margin:0">Inditex · Order #443120</dd>
          <dt style="color:var(--h-muted-foreground)">Quantity</dt>
          <dd style="margin:0;font-family:var(--h-font-mono)">4,200 m</dd>
          <dt style="color:var(--h-muted-foreground)">Started</dt>
          <dd style="margin:0">Apr 27 · 06:14</dd>
          <dt style="color:var(--h-muted-foreground)">ETA</dt>
          <dd style="margin:0">Apr 28 · 14:00</dd>
        </dl>
        <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground);margin-bottom:8px;">Progress</div>
        <h-progress [value]="62" [showValue]="true" ariaLabel="Lot progress"></h-progress>

        <div hDrawerFooter style="display:flex;justify-content:space-between;padding:12px 20px;border-top:1px solid var(--h-border);">
          <h-button variant="outline" size="sm">Pause</h-button>
          <div style="display:flex;gap:8px;">
            <h-button variant="outline" size="sm">Edit</h-button>
            <h-button size="sm">Open detail</h-button>
          </div>
        </div>
      </h-drawer>
    `,
    moduleMetadata: { imports: [HDrawerComponent, HButtonComponent, HStatusPillComponent, HBadgeComponent, HProgressComponent] },
  }),
};

export const Small: Story = {
  args: { open: true, title: 'Machine details', eyebrow: 'Machine', size: 'sm', closeable: true },
  render: (args) => ({
    props: args,
    template: `
      <h-drawer [open]="open" [title]="title" [eyebrow]="eyebrow" size="sm" [closeable]="closeable">
        <p style="font-size:13.5px;color:var(--h-muted-foreground);margin:0;">
          L7-KNIT-03 · Loom 7 is currently running lot 2A-0094 at 82% OEE with a cycle time of 12.4 s.
        </p>
      </h-drawer>
    `,
    moduleMetadata: { imports: [HDrawerComponent, HButtonComponent] },
  }),
};

export const Large: Story = {
  args: { open: true, title: 'Lot history & audit trail', size: 'lg', closeable: true },
  render: (args) => ({
    props: args,
    template: `
      <h-drawer [open]="open" [title]="title" size="lg" [closeable]="closeable">
        <p style="font-size:13.5px;color:var(--h-muted-foreground);margin:0;">
          Full timeline, QC inspections, and DPP export history for this lot.
        </p>
      </h-drawer>
    `,
    moduleMetadata: { imports: [HDrawerComponent] },
  }),
};
