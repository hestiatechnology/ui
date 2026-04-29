import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  effect,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'h-drawer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open()) {
      <div
        class="h-drawer-scrim"
        aria-hidden="true"
        (click)="closeable() && close()"
      ></div>
    }
    <div
      #panelRef
      class="h-drawer-panel"
      [class.h-drawer-panel--open]="open()"
      [class.h-drawer-panel--sm]="size() === 'sm'"
      [class.h-drawer-panel--lg]="size() === 'lg'"
      role="dialog"
      aria-modal="true"
      [attr.aria-labelledby]="title() ? 'h-drawer-title' : null"
      [attr.inert]="open() ? null : true"
    >
      @if (title() || showClose()) {
        <div class="h-drawer-header">
          <div>
            @if (eyebrow()) {
              <span class="h-drawer-eyebrow">{{ eyebrow() }}</span>
            }
            @if (title()) {
              <h2 class="h-drawer-title" id="h-drawer-title">{{ title() }}</h2>
            }
          </div>
          @if (showClose()) {
            <button
              type="button"
              class="h-drawer-close"
              (click)="close()"
              aria-label="Close drawer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          }
        </div>
      }

      <div class="h-drawer-body">
        <ng-content />
      </div>

      <ng-content select="[hDrawerFooter]" />
    </div>
  `,
  styles: [`
    :host { display: contents; }

    .h-drawer-scrim {
      position: fixed; inset: 0; z-index: 40;
      background: oklch(0 0 0 / 0.35);
      backdrop-filter: blur(2px);
      animation: h-drawer-fade-in var(--h-motion-product-base) var(--h-motion-product-ease) forwards;
    }

    .h-drawer-panel {
      position: fixed; top: 0; right: 0; bottom: 0; z-index: 50;
      width: 480px; max-width: calc(100vw - 32px);
      background: var(--h-card); border-left: 1px solid var(--h-border);
      box-shadow: var(--h-shadow-xl);
      display: flex; flex-direction: column;
      transform: translateX(100%);
      transition: transform var(--h-motion-product-base) var(--h-motion-product-ease);
      font-family: var(--h-font-sans);
    }
    .h-drawer-panel--open { transform: translateX(0); }
    .h-drawer-panel--sm { width: 360px; }
    .h-drawer-panel--lg { width: 640px; }

    .h-drawer-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 20px; border-bottom: 1px solid var(--h-border); flex-shrink: 0;
      gap: 12px;
    }

    .h-drawer-eyebrow {
      display: block; font-size: 11px; font-weight: 700;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--h-muted-foreground); margin-bottom: 4px;
    }

    .h-drawer-title {
      font-size: 15px; font-weight: 600; color: var(--h-foreground);
      font-family: var(--h-font-mono); margin: 0; line-height: 1.3;
    }

    .h-drawer-close {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border-radius: var(--h-radius-sm);
      border: none; background: none; color: var(--h-muted-foreground);
      cursor: pointer; flex-shrink: 0;
      transition: background var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    .h-drawer-close:hover { background: var(--h-secondary); color: var(--h-foreground); }
    .h-drawer-close:focus-visible { outline: 2px solid var(--h-ring); outline-offset: 2px; }

    .h-drawer-body { flex: 1; overflow: auto; padding: 20px; }

    @keyframes h-drawer-fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  `],
})
export class HDrawerComponent implements OnDestroy {
  readonly open = model<boolean>(false);
  readonly title = input('');
  readonly eyebrow = input('');
  readonly size = input<'sm' | 'default' | 'lg'>('default');
  readonly closeable = input(true);
  readonly showClose = input(true);
  readonly dismissed = output<void>();

  close() {
    this.open.set(false);
    this.dismissed.emit();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open() && this.closeable()) this.close();
  }

  ngOnDestroy() { this.open.set(false); }
}
