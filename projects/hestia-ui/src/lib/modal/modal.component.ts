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

@Component({
  selector: 'h-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog
      #dialogRef
      class="h-modal"
      [class.h-modal--sm]="size() === 'sm'"
      [class.h-modal--lg]="size() === 'lg'"
      [class.h-modal--xl]="size() === 'xl'"
      (close)="close()"
      (click)="onBackdropClick($event)"
    >
      <div class="h-modal-content" (click)="$event.stopPropagation()">
        @if (title()) {
          <div class="h-modal-header">
            <h2 class="h-modal-title" id="modal-title">{{ title() }}</h2>
            @if (closeable()) {
              <button
                type="button"
                class="h-modal-close"
                (click)="close()"
                aria-label="Close dialog"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            }
          </div>
        }
        <div class="h-modal-body">
          <ng-content />
        </div>
        @if (hasFooter) {
          <div class="h-modal-footer">
            <ng-content select="[hModalFooter]" />
          </div>
        }
      </div>
    </dialog>
  `,
  styles: [
    `
      .h-modal {
        margin: auto;
        padding: 0;
        border: none;
        border-radius: var(--h-radius-xl);
        box-shadow: var(--h-shadow-xl);
        background: var(--h-card);
        color: var(--h-card-foreground);
        max-width: min(560px, calc(100vw - 32px));
        width: 100%;
        font-family: var(--h-font-sans);
        max-height: calc(100dvh - 48px);
        overflow: auto;
      }

      .h-modal--sm { max-width: min(420px, calc(100vw - 32px)); }
      .h-modal--lg { max-width: min(720px, calc(100vw - 32px)); }
      .h-modal--xl { max-width: min(960px, calc(100vw - 32px)); }

      .h-modal::backdrop {
        background: oklch(0 0 0 / 0.45);
        backdrop-filter: blur(2px);
      }

      .h-modal-content {
        display: flex;
        flex-direction: column;
      }

      .h-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 24px 0;
        gap: 12px;
      }

      .h-modal-title {
        font-size: var(--h-text-lg);
        font-weight: 600;
        color: var(--h-foreground);
        margin: 0;
        line-height: 1.3;
      }

      .h-modal-close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: var(--h-radius-sm);
        border: none;
        background: none;
        color: var(--h-muted-foreground);
        cursor: pointer;
        flex-shrink: 0;
        transition: background var(--h-motion-product-instant) var(--h-motion-product-ease);
      }

      .h-modal-close:hover {
        background: var(--h-secondary);
        color: var(--h-foreground);
      }

      .h-modal-close:focus-visible {
        outline: 2px solid var(--h-ring);
        outline-offset: 2px;
      }

      .h-modal-body {
        padding: 16px 24px 20px;
        font-size: var(--h-text-sm);
        color: var(--h-muted-foreground);
        line-height: 1.6;
      }

      .h-modal-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        padding: 0 24px 20px;
        border-top: 1px solid var(--h-border);
        padding-top: 16px;
      }
    `,
  ],
})
export class HModalComponent implements OnDestroy {
  readonly open = model<boolean>(false);
  readonly title = input<string>('');
  readonly size = input<'sm' | 'default' | 'lg' | 'xl'>('default');
  readonly closeable = input<boolean>(true);
  readonly dismissed = output<void>();

  protected hasFooter = false;

  private readonly _dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialogRef');

  constructor() {
    effect(() => {
      const dialog = this._dialogRef().nativeElement;
      if (this.open()) {
        if (!dialog.open) dialog.showModal();
      } else {
        if (dialog.open) dialog.close();
      }
    });
  }

  close() {
    this.open.set(false);
    this.dismissed.emit();
  }

  onBackdropClick(event: MouseEvent) {
    const dialog = this._dialogRef().nativeElement;
    const rect = dialog.getBoundingClientRect();
    const isOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (isOutside && this.closeable()) {
      this.close();
    }
  }

  ngOnDestroy() {
    const dialog = this._dialogRef()?.nativeElement;
    if (dialog?.open) dialog.close();
  }
}
