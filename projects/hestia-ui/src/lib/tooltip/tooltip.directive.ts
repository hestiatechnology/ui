import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
} from '@angular/core';
import { AriaDescriber } from '@angular/cdk/a11y';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'h-tooltip-overlay',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="h-tooltip-bubble" role="tooltip">{{ text }}</div>`,
  styles: [
    `
      :host {
        display: block;
      }

      .h-tooltip-bubble {
        background: var(--h-foreground);
        color: var(--h-background);
        font-size: 12px;
        font-weight: 500;
        font-family: var(--h-font-sans);
        line-height: 1.4;
        padding: 5px 9px;
        border-radius: var(--h-radius-sm);
        white-space: nowrap;
        max-width: 260px;
        white-space: pre-wrap;
        box-shadow: var(--h-shadow-md);
        animation: h-tooltip-in 120ms cubic-bezier(0.2, 0, 0, 1.2) forwards;
      }

      :host.h-tooltip--leaving .h-tooltip-bubble {
        animation: h-tooltip-out 80ms ease-in forwards;
      }

      @keyframes h-tooltip-in {
        from { opacity: 0; transform: scale(0.88); }
        to   { opacity: 1; transform: scale(1); }
      }

      @keyframes h-tooltip-out {
        from { opacity: 1; transform: scale(1); }
        to   { opacity: 0; transform: scale(0.88); }
      }
    `,
  ],
})
export class HTooltipOverlayComponent {
  text = '';
}

const POSITIONS: Record<string, ConnectedPosition> = {
  top:    { originX: 'center', originY: 'top',    overlayX: 'center', overlayY: 'bottom', offsetY: -8 },
  bottom: { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top',    offsetY: 8  },
  left:   { originX: 'start',  originY: 'center', overlayX: 'end',    overlayY: 'center', offsetX: -8 },
  right:  { originX: 'end',    originY: 'center', overlayX: 'start',  overlayY: 'center', offsetX: 8  },
};

@Directive({
  selector: '[hTooltip]',
  standalone: true,
})
export class HTooltipDirective implements OnInit, OnDestroy {
  readonly hTooltip = input.required<string>();
  readonly tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('top');

  private readonly _el = inject(ElementRef<HTMLElement>);
  private readonly _overlay = inject(Overlay);
  private readonly _ariaDescriber = inject(AriaDescriber);

  private _overlayRef!: OverlayRef;
  private _showTimer: ReturnType<typeof setTimeout> | null = null;
  private _hideTimer: ReturnType<typeof setTimeout> | null = null;
  private _cancelLeave: (() => void) | null = null;

  constructor() {
    const el: HTMLElement = this._el.nativeElement;
    el.addEventListener('mouseenter', this._onEnter);
    el.addEventListener('mouseleave', this._onLeave);
    el.addEventListener('focusin', this._onEnter);
    el.addEventListener('focusout', this._onLeave);
  }

  ngOnInit() {
    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(this._el)
      .withPositions([POSITIONS[this.tooltipPosition()]]);

    this._overlayRef = this._overlay.create({ positionStrategy });
  }

  private _onEnter = () => {
    if (this._hideTimer) clearTimeout(this._hideTimer);
    // If leave animation is in flight, cancel it and keep the tooltip visible
    if (this._cancelLeave) {
      this._cancelLeave();
      this._cancelLeave = null;
      return;
    }
    this._showTimer = setTimeout(() => this._show(), 300);
  };

  private _onLeave = () => {
    if (this._showTimer) clearTimeout(this._showTimer);
    this._hideTimer = setTimeout(() => this._hide(), 100);
  };

  private _show() {
    const text = this.hTooltip();
    if (!text || this._overlayRef.hasAttached()) return;

    const ref = this._overlayRef.attach(new ComponentPortal(HTooltipOverlayComponent));
    ref.instance.text = text;
    ref.changeDetectorRef.markForCheck();

    this._ariaDescriber.describe(this._el.nativeElement, text);
  }

  private _hide() {
    if (!this._overlayRef?.hasAttached()) return;
    const text = this.hTooltip();
    if (text) this._ariaDescriber.removeDescription(this._el.nativeElement, text);

    const hostEl = this._overlayRef.overlayElement.firstElementChild as HTMLElement | null;
    if (!hostEl) {
      this._overlayRef.detach();
      return;
    }

    const detach = () => {
      this._overlayRef.detach();
      this._cancelLeave = null;
    };

    hostEl.addEventListener('animationend', detach, { once: true });
    hostEl.classList.add('h-tooltip--leaving');

    this._cancelLeave = () => {
      hostEl.removeEventListener('animationend', detach);
      hostEl.classList.remove('h-tooltip--leaving');
    };
  }

  ngOnDestroy() {
    const el = this._el.nativeElement;
    el.removeEventListener('mouseenter', this._onEnter);
    el.removeEventListener('mouseleave', this._onLeave);
    el.removeEventListener('focusin', this._onEnter);
    el.removeEventListener('focusout', this._onLeave);
    if (this._showTimer) clearTimeout(this._showTimer);
    if (this._hideTimer) clearTimeout(this._hideTimer);
    this._overlayRef?.dispose();
  }
}
