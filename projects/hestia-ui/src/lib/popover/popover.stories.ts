import type { Meta, StoryObj } from '@storybook/angular';
import { HPopoverComponent, HPopoverTriggerDirective } from './popover.component';
import { HButtonComponent } from '../button/button.component';
import { HIconTileComponent } from '../icon-tile/icon-tile.component';

const meta: Meta<HPopoverComponent> = {
  title: 'Overlays/Popover',
  component: HPopoverComponent,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<HPopoverComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div style="padding:80px;display:flex;justify-content:center;">
        <ng-template #pop>
          <h-popover>
            <div style="display:flex;align-items:flex-start;gap:12px;">
              <h-icon-tile><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></h-icon-tile>
              <div>
                <div style="font-size:14px;font-weight:600;margin-bottom:6px;">What is OEE?</div>
                <p style="font-size:12.5px;color:var(--h-muted-foreground);line-height:1.55;margin:0 0 12px;">
                  Overall Equipment Effectiveness — the product of availability, performance, and quality. Targets: 85% world-class, 60% typical.
                </p>
                <a href="#" style="font-size:13px;color:var(--h-primary);">Learn more →</a>
              </div>
            </div>
          </h-popover>
        </ng-template>
        <h-button variant="outline" size="sm" [hPopoverTrigger]="pop">What is OEE?</h-button>
      </div>
    `,
    moduleMetadata: { imports: [HPopoverComponent, HPopoverTriggerDirective, HButtonComponent, HIconTileComponent] },
  }),
};

export const DPPInfo: Story = {
  render: () => ({
    template: `
      <div style="padding:80px;display:flex;justify-content:center;">
        <ng-template #dppPop>
          <h-popover>
            <div style="font-size:13px;font-weight:600;margin-bottom:6px;">Digital Product Passport</div>
            <p style="font-size:12.5px;color:var(--h-muted-foreground);line-height:1.55;margin:0 0 10px;">
              EU regulation 2027 mandates a DPP for each textile lot. Hestia generates and signs it automatically at lot close.
            </p>
            <div style="font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--h-status-running);">DPP READY · LOT-2A-0094</div>
          </h-popover>
        </ng-template>
        <h-button variant="outline" size="sm" [hPopoverTrigger]="dppPop">DPP status</h-button>
      </div>
    `,
    moduleMetadata: { imports: [HPopoverComponent, HPopoverTriggerDirective, HButtonComponent] },
  }),
};

export const PositionRight: Story = {
  render: () => ({
    template: `
      <div style="padding:80px;display:flex;justify-content:flex-start;">
        <ng-template #rPop>
          <h-popover size="sm">
            <div style="font-size:13px;color:var(--h-muted-foreground);">Cycle time: <strong style="color:var(--h-foreground);">12.4 s</strong></div>
          </h-popover>
        </ng-template>
        <h-button variant="outline" size="sm" [hPopoverTrigger]="rPop" popoverPosition="right">Cycle info</h-button>
      </div>
    `,
    moduleMetadata: { imports: [HPopoverComponent, HPopoverTriggerDirective, HButtonComponent] },
  }),
};
