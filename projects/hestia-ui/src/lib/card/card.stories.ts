import type { Meta, StoryObj } from '@storybook/angular';
import { HCardComponent } from './card.component';

const meta: Meta<HCardComponent> = {
  title: 'Display/Card',
  component: HCardComponent,
  tags: ['autodocs'],
  argTypes: {
    padded: { control: 'boolean' },
    featured: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<HCardComponent>;

export const Default: Story = {
  args: { padded: true, featured: false },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:320px;">
        <h-card [padded]="padded" [featured]="featured">
          <h3 style="margin:0 0 6px;font-size:14px;font-weight:600;color:var(--h-foreground);">Lot LOT-2024-0042</h3>
          <p style="margin:0;font-size:13px;color:var(--h-muted-foreground);">Cotton yarn — 500 kg · Maia Factory · Line A</p>
        </h-card>
      </div>
    `,
    moduleMetadata: { imports: [HCardComponent] },
  }),
};

export const Featured: Story = {
  args: { padded: true, featured: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:320px;">
        <h-card [padded]="padded" [featured]="featured">
          <h3 style="margin:0 0 6px;font-size:14px;font-weight:600;color:var(--h-foreground);">Gold DPP Certified</h3>
          <p style="margin:0;font-size:13px;color:var(--h-muted-foreground);">This lot holds Gold-tier Digital Product Passport verification.</p>
        </h-card>
      </div>
    `,
    moduleMetadata: { imports: [HCardComponent] },
  }),
};

export const NoPadding: Story = {
  render: () => ({
    template: `
      <div style="width:320px;">
        <h-card [padded]="false">
          <div style="padding:16px;border-bottom:1px solid var(--h-border);">
            <strong style="font-size:13.5px;color:var(--h-foreground);">LOT-2024-0042</strong>
          </div>
          <div style="padding:12px 16px;">
            <p style="margin:0;font-size:13px;color:var(--h-muted-foreground);">Cotton · 500 kg · Running</p>
          </div>
        </h-card>
      </div>
    `,
    moduleMetadata: { imports: [HCardComponent] },
  }),
};

export const Grid: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:700px;">
        <h-card>
          <h4 style="margin:0 0 4px;font-size:13px;font-weight:600;color:var(--h-foreground);">Active lots</h4>
          <p style="margin:0;font-size:22px;font-weight:700;color:var(--h-primary);">142</p>
        </h-card>
        <h-card>
          <h4 style="margin:0 0 4px;font-size:13px;font-weight:600;color:var(--h-foreground);">Machines running</h4>
          <p style="margin:0;font-size:22px;font-weight:700;color:var(--h-status-running);">18</p>
        </h-card>
        <h-card>
          <h4 style="margin:0 0 4px;font-size:13px;font-weight:600;color:var(--h-foreground);">Quality alerts</h4>
          <p style="margin:0;font-size:22px;font-weight:700;color:var(--h-status-error);">3</p>
        </h-card>
      </div>
    `,
    moduleMetadata: { imports: [HCardComponent] },
  }),
};
