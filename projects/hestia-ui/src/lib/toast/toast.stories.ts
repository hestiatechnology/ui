import { Component, inject } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { HToastOutletComponent } from './toast.component';
import { HButtonComponent } from '../button/button.component';
import { ToastService } from './toast.service';

@Component({
  selector: 'h-toast-demo',
  standalone: true,
  imports: [HToastOutletComponent, HButtonComponent],
  template: `
    <div style="display:flex;gap:12px;flex-wrap:wrap;padding:16px;">
      <h-button variant="outline" (click)="info()">Info toast</h-button>
      <h-button variant="outline" (click)="success()">Success toast</h-button>
      <h-button variant="outline" (click)="warning()">Warning toast</h-button>
      <h-button variant="destructive" (click)="error()">Error toast</h-button>
    </div>
    <h-toast-outlet></h-toast-outlet>
  `,
})
class ToastDemoComponent {
  private toast = inject(ToastService);
  info()    { this.toast.info('Information', 'Lot LOT-2024-0042 has been updated.'); }
  success() { this.toast.success('Certified!', 'GOTS certification approved.'); }
  warning() { this.toast.warning('Idle warning', 'Machine CK-01 has been idle for 2 hours.'); }
  error()   { this.toast.error('Quality check failed', 'Batch quarantined for review.'); }
}

const meta: Meta<ToastDemoComponent> = {
  title: 'Feedback/Toast',
  component: ToastDemoComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ToastDemoComponent>;

export const Interactive: Story = {};

export const Outlet: Story = {
  render: () => ({
    template: `
      <p style="font-size:13.5px;color:var(--h-muted-foreground);padding:16px;">
        The <code>h-toast-outlet</code> renders active toasts. Add it once at the root of your app and trigger toasts
        via <code>ToastService</code>.
      </p>
      <h-toast-outlet></h-toast-outlet>
    `,
    moduleMetadata: { imports: [HToastOutletComponent] },
  }),
};
