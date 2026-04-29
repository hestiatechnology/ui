import type { Meta, StoryObj } from '@storybook/angular';
import { HDefListComponent, HDefRowComponent } from './def-list.component';

const meta: Meta<HDefListComponent> = {
  title: 'Display/DefList',
  component: HDefListComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<HDefListComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div style="width:480px;padding:20px;">
        <h-def-list>
          <h-def-row term="SKU"><code style="font-family:var(--h-font-mono)">LIN-180-NAT</code></h-def-row>
          <h-def-row term="Customer">Inditex · Order #443120</h-def-row>
          <h-def-row term="Quantity"><span style="font-family:var(--h-font-mono)">4,200 m</span></h-def-row>
          <h-def-row term="Started">Apr 27 · 06:14</h-def-row>
          <h-def-row term="ETA">Apr 28 · 14:00</h-def-row>
        </h-def-list>
      </div>
    `,
    moduleMetadata: { imports: [HDefListComponent, HDefRowComponent] },
  }),
};

export const LotDetail: Story = {
  render: () => ({
    template: `
      <div style="width:480px;padding:20px;background:var(--h-card);border:1px solid var(--h-border);border-radius:12px;">
        <h-def-list>
          <h-def-row term="Lot ID"><span style="font-family:var(--h-font-mono);font-weight:500">LOT-2A-0094</span></h-def-row>
          <h-def-row term="SKU"><span style="font-family:var(--h-font-mono)">LIN-180-NAT</span></h-def-row>
          <h-def-row term="Customer">Inditex · Order #443120</h-def-row>
          <h-def-row term="Quantity"><span style="font-family:var(--h-font-mono)">4,200 m</span></h-def-row>
          <h-def-row term="Stage">Knit · Loom 7</h-def-row>
          <h-def-row term="Started">Apr 27 · 06:14</h-def-row>
          <h-def-row term="ETA">Apr 28 · 14:00</h-def-row>
          <h-def-row term="Notes">Handle GSM tolerance ±5%</h-def-row>
        </h-def-list>
      </div>
    `,
    moduleMetadata: { imports: [HDefListComponent, HDefRowComponent] },
  }),
};

export const WideKey: Story = {
  render: () => ({
    template: `
      <div style="width:520px;padding:20px;">
        <h-def-list style="--h-def-list-key-width:160px">
          <h-def-row term="Certification body">Bureau Veritas</h-def-row>
          <h-def-row term="Standard">GOTS 6.0</h-def-row>
          <h-def-row term="Certificate number"><span style="font-family:var(--h-font-mono)">BV-2024-0042</span></h-def-row>
          <h-def-row term="Valid until">Dec 31 · 2025</h-def-row>
        </h-def-list>
      </div>
    `,
    moduleMetadata: { imports: [HDefListComponent, HDefRowComponent] },
  }),
};
