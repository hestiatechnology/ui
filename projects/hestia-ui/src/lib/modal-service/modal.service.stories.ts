import type { Meta, StoryObj } from '@storybook/angular';
import { Component, inject } from '@angular/core';
import { HModalService, HModalConfig } from './modal.service';
import { H_MODAL_DATA, HModalRef } from './modal-ref';
import { HButtonComponent } from '../button/button.component';

// ── Demo content component ──────────────────────────────────────────────────
@Component({
  selector: 'demo-confirm-content',
  standalone: true,
  imports: [HButtonComponent],
  template: `
    <div style="padding: 16px 24px 20px;">
      <p style="margin:0 0 16px;font-size:14px;color:var(--h-muted-foreground);line-height:1.6;">
        This action <strong>cannot be undone</strong>. The production order will be permanently deleted
        and all associated records will be removed from the system.
      </p>
      <div style="display:flex;gap:8px;justify-content:flex-end;">
        <h-button variant="outline" (click)="cancel()">Cancel</h-button>
        <h-button variant="destructive" (click)="confirm()">Delete order</h-button>
      </div>
    </div>
  `,
})
class DemoConfirmContentComponent {
  private readonly _ref  = inject(HModalRef);
  confirm(): void { this._ref.close(true);  }
  cancel():  void { this._ref.close(false); }
}

// ── Demo form content ────────────────────────────────────────────────────────
@Component({
  selector: 'demo-form-content',
  standalone: true,
  imports: [HButtonComponent],
  template: `
    <div style="padding: 16px 24px 20px;">
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">
        <div>
          <label style="font-size:13px;font-weight:500;color:var(--h-foreground);display:block;margin-bottom:4px;">
            Client reference
          </label>
          <input style="height:36px;width:100%;border:1px solid var(--h-border);border-radius:8px;padding:0 12px;font-family:var(--h-font-sans);font-size:13.5px;background:var(--h-card);" placeholder="e.g. ZAR-2025-001" />
        </div>
        <div>
          <label style="font-size:13px;font-weight:500;color:var(--h-foreground);display:block;margin-bottom:4px;">
            Quantity (kg)
          </label>
          <input type="number" style="height:36px;width:100%;border:1px solid var(--h-border);border-radius:8px;padding:0 12px;font-family:var(--h-font-mono);font-size:13.5px;background:var(--h-card);" placeholder="0.00" />
        </div>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end;">
        <h-button variant="outline" (click)="dismiss()">Cancel</h-button>
        <h-button variant="default" (click)="save()">Create order</h-button>
      </div>
    </div>
  `,
})
class DemoFormContentComponent {
  private readonly _ref = inject(HModalRef);
  save():    void { this._ref.close('saved');    }
  dismiss(): void { this._ref.close(undefined);  }
}

// ── Demo data content ────────────────────────────────────────────────────────
@Component({
  selector: 'demo-data-content',
  standalone: true,
  imports: [HButtonComponent],
  template: `
    <div style="padding:16px 24px 20px;">
      <p style="margin:0 0 8px;font-size:13px;color:var(--h-muted-foreground);">
        Injected via <code>H_MODAL_DATA</code>:
      </p>
      <pre style="background:var(--h-muted);border-radius:8px;padding:12px;font-size:12px;overflow:auto;">{{ data | json }}</pre>
      <div style="display:flex;justify-content:flex-end;margin-top:16px;">
        <h-button variant="outline" (click)="close()">Close</h-button>
      </div>
    </div>
  `,
})
class DemoDataContentComponent {
  readonly data  = inject(H_MODAL_DATA);
  private readonly _ref = inject(HModalRef);
  close(): void { this._ref.close(); }
}

// ── Storybook host ───────────────────────────────────────────────────────────
@Component({
  selector: 'story-modal-host',
  standalone: true,
  imports: [HButtonComponent],
  template: `
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <h-button (click)="openConfirm()">Open confirm modal</h-button>
      <h-button variant="secondary" (click)="openForm()">Open form modal</h-button>
      <h-button variant="outline" (click)="openData()">Open with data</h-button>
    </div>
    @if (lastResult !== undefined) {
      <p style="margin-top:12px;font-size:13px;color:var(--h-muted-foreground);">
        Last result: <code>{{ lastResult | json }}</code>
      </p>
    }
  `,
  providers: [],
})
class StoryModalHostComponent {
  private readonly _modal = inject(HModalService);
  lastResult: unknown = undefined;

  openConfirm(): void {
    this._modal.open(DemoConfirmContentComponent, {
      title: 'Delete production order PO-2025-0487?',
      size: 'sm',
    })
    .afterClosed()
    .subscribe(result => { this.lastResult = result; });
  }

  openForm(): void {
    this._modal.open(DemoFormContentComponent, {
      title: 'New production order',
      size: 'default',
    })
    .afterClosed()
    .subscribe(result => { this.lastResult = result; });
  }

  openData(): void {
    this._modal.open(DemoDataContentComponent, {
      title: 'Injected data',
      data: { orderId: 'PO-2025-0487', client: 'Zara Portugal', qty: 1200 },
    })
    .afterClosed()
    .subscribe(result => { this.lastResult = result; });
  }
}

// ── Meta ─────────────────────────────────────────────────────────────────────
const meta: Meta<StoryModalHostComponent> = {
  title: 'Overlays/ModalService',
  component: StoryModalHostComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<StoryModalHostComponent>;

export const Default: Story = {
  render: () => ({
    template: `<story-modal-host></story-modal-host>`,
    moduleMetadata: {
      imports: [StoryModalHostComponent],
    },
  }),
};
