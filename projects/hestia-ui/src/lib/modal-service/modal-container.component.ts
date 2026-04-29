import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  Type,
  ViewContainerRef,
  inject,
  viewChild,
} from '@angular/core';
import { HModalRef } from './modal-ref';

@Component({
  selector: 'h-modal-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog
      #dialogRef
      class="h-modal-sc"
      [class.h-modal-sc--sm]="size === 'sm'"
      [class.h-modal-sc--lg]="size === 'lg'"
      [class.h-modal-sc--xl]="size === 'xl'"
      (cancel)="onCancel($event)"
      (click)="onDialogClick($event)"
    >
      <div class="h-modal-sc-content" (click)="$event.stopPropagation()">
        @if (title) {
          <div class="h-modal-sc-header">
            <h2 class="h-modal-sc-title">{{ title }}</h2>
            @if (closeable) {
              <button
                type="button"
                class="h-modal-sc-close"
                (click)="_modalRef.close()"
                aria-label="Close dialog"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            }
          </div>
        }
        <ng-container #outlet></ng-container>
      </div>
    </dialog>
  `,
  styles: [`
    .h-modal-sc {
      margin: auto; padding: 0; border: none;
      border-radius: var(--h-radius-xl); box-shadow: var(--h-shadow-xl);
      background: var(--h-card); color: var(--h-card-foreground);
      max-width: min(560px, calc(100vw - 32px)); width: 100%;
      font-family: var(--h-font-sans); max-height: calc(100dvh - 48px); overflow: auto;
    }
    .h-modal-sc--sm { max-width: min(420px,  calc(100vw - 32px)); }
    .h-modal-sc--lg { max-width: min(720px,  calc(100vw - 32px)); }
    .h-modal-sc--xl { max-width: min(960px,  calc(100vw - 32px)); }

    .h-modal-sc::backdrop {
      background: oklch(0 0 0 / 0.45);
      backdrop-filter: blur(2px);
    }

    .h-modal-sc-content { display: flex; flex-direction: column; }

    .h-modal-sc-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 24px 0; gap: 12px;
    }
    .h-modal-sc-title {
      font-size: var(--h-text-lg); font-weight: 600;
      color: var(--h-foreground); margin: 0; line-height: 1.3;
    }
    .h-modal-sc-close {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border-radius: var(--h-radius-sm);
      border: none; background: none; color: var(--h-muted-foreground);
      cursor: pointer; flex-shrink: 0;
      transition: background var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    .h-modal-sc-close:hover  { background: var(--h-secondary); color: var(--h-foreground); }
    .h-modal-sc-close:focus-visible { outline: 2px solid var(--h-ring); outline-offset: 2px; }
  `],
})
export class HModalContainerComponent implements AfterViewInit {
  size: 'sm' | 'default' | 'lg' | 'xl' = 'default';
  closeable = true;
  title?: string;
  componentType!: Type<unknown>;

  readonly _modalRef = inject(HModalRef);

  private readonly _dialogEl  = viewChild.required<ElementRef<HTMLDialogElement>>('dialogRef');
  private readonly _outletVcr = viewChild.required('outlet', { read: ViewContainerRef });
  private readonly _injector  = inject(Injector);

  ngAfterViewInit(): void {
    const dialog = this._dialogEl().nativeElement;
    if (!dialog.open) dialog.showModal();
    this._outletVcr().createComponent(this.componentType, { injector: this._injector });
  }

  onCancel(e: Event): void {
    e.preventDefault();
    if (this.closeable) this._modalRef.close();
  }

  onDialogClick(event: MouseEvent): void {
    const dialog = this._dialogEl().nativeElement;
    const rect   = dialog.getBoundingClientRect();
    const outside =
      event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top  || event.clientY > rect.bottom;

    if (outside) {
      this._modalRef._emitBackdropClick();
      if (this.closeable) this._modalRef.close();
    }
  }

  _closeDialog(): void {
    const dialog = this._dialogEl()?.nativeElement;
    if (dialog?.open) dialog.close();
  }
}
