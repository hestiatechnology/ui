import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  effect,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';

export type ConfirmDialogTone = 'error' | 'idle' | 'primary';

@Component({
  selector: 'h-confirm-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog
      #dialogRef
      class="h-confirm-dialog"
      (close)="onClose()"
      (click)="onBackdropClick($event)"
    >
      <div class="h-confirm-content" (click)="$event.stopPropagation()">
        <div class="h-confirm-body">
          <div class="h-confirm-icon" [class]="iconClass">
            @switch (tone()) {
              @case ('error') {
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m10.29 3.86-8.27 14.34A1.7 1.7 0 0 0 3.46 21h17.08a1.7 1.7 0 0 0 1.44-2.8L13.7 3.86a2 2 0 0 0-3.41 0Z"/><path d="M12 9v4M12 17h.01"/></svg>
              }
              @case ('idle') {
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              }
              @default {
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              }
            }
          </div>
          <div class="h-confirm-text">
            <div class="h-confirm-title">{{ title() }}</div>
            @if (description()) {
              <p class="h-confirm-desc">{{ description() }}</p>
            }
            <ng-content />
          </div>
        </div>
        <div class="h-confirm-footer">
          <button type="button" class="h-confirm-cancel" (click)="onCancel()">{{ cancelLabel() }}</button>
          <button type="button" class="h-confirm-confirm" [class]="confirmClass" (click)="onConfirm()">{{ confirmLabel() }}</button>
        </div>
      </div>
    </dialog>
  `,
  styles: [`
    :host { display: contents; }
    .h-confirm-dialog {
      margin: auto; padding: 0; border: none; border-radius: 14px;
      width: 420px; max-width: calc(100vw - 32px);
      background: var(--h-card); border: 1px solid var(--h-border);
      box-shadow: var(--h-shadow-2xl);
    }
    .h-confirm-dialog::backdrop {
      background: rgba(0,0,0,0.4); backdrop-filter: blur(2px);
    }
    .h-confirm-content { padding: 20px; }
    .h-confirm-body { display: flex; gap: 14px; align-items: flex-start; }
    .h-confirm-icon {
      width: 40px; height: 40px; border-radius: 10px;
      display: grid; place-items: center; flex-shrink: 0;
    }
    .h-confirm-icon--error { background: var(--h-status-error-bg); color: var(--h-status-error); }
    .h-confirm-icon--idle  { background: var(--h-status-idle-bg);  color: var(--h-status-idle); }
    .h-confirm-icon--primary { background: rgba(0,61,165,0.08); color: var(--h-primary); }
    .h-confirm-title { font-size: 15px; font-weight: 600; color: var(--h-foreground); font-family: var(--h-font-sans); }
    .h-confirm-desc {
      font-size: 13px; color: var(--h-muted-foreground);
      margin: 6px 0 0; line-height: 1.55; font-family: var(--h-font-sans);
    }
    .h-confirm-footer {
      display: flex; justify-content: flex-end; gap: 8px; margin-top: 18px;
    }
    .h-confirm-cancel {
      padding: 0 14px; height: 36px; border-radius: 10px;
      border: 1px solid var(--h-border); background: var(--h-card);
      color: var(--h-foreground); font-size: 13.5px; font-weight: 500;
      font-family: var(--h-font-sans); cursor: pointer;
    }
    .h-confirm-cancel:hover { background: var(--h-muted); }
    .h-confirm-cancel:focus-visible { outline: 2px solid var(--h-ring); outline-offset: 2px; }
    .h-confirm-confirm {
      padding: 0 14px; height: 36px; border-radius: 10px; border: none;
      font-size: 13.5px; font-weight: 500; font-family: var(--h-font-sans); cursor: pointer;
    }
    .h-confirm-confirm--error { background: var(--h-destructive); color: #fff; }
    .h-confirm-confirm--error:hover { opacity: 0.9; }
    .h-confirm-confirm--idle { background: var(--h-status-idle); color: #fff; }
    .h-confirm-confirm--primary { background: var(--h-primary); color: #fff; }
    .h-confirm-confirm--primary:hover { opacity: 0.9; }
    .h-confirm-confirm:focus-visible { outline: 2px solid var(--h-ring); outline-offset: 2px; }
  `],
})
export class HConfirmDialogComponent implements OnDestroy {
  readonly open     = model(false);
  readonly tone     = input<ConfirmDialogTone>('error');
  readonly title    = input('Are you sure?');
  readonly description = input('');
  readonly confirmLabel = input('Confirm');
  readonly cancelLabel  = input('Cancel');

  readonly confirmed = output<void>();
  readonly cancelled = output<void>();

  private readonly dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialogRef');

  constructor() {
    effect(() => {
      const el = this.dialogRef().nativeElement;
      if (this.open()) {
        if (!el.open) el.showModal();
      } else {
        if (el.open) el.close();
      }
    });
  }

  get iconClass(): string { return `h-confirm-icon h-confirm-icon--${this.tone()}`; }
  get confirmClass(): string { return `h-confirm-confirm h-confirm-confirm--${this.tone()}`; }

  onConfirm(): void { this.confirmed.emit(); this.open.set(false); }
  onCancel(): void  { this.cancelled.emit(); this.open.set(false); }
  onClose(): void   { this.open.set(false); }

  onBackdropClick(e: MouseEvent): void {
    const rect = this.dialogRef().nativeElement.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
      this.onCancel();
    }
  }

  ngOnDestroy(): void {
    const el = this.dialogRef().nativeElement;
    if (el.open) el.close();
  }
}
