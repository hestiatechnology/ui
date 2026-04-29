import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

const POSITIONS: Record<string, ConnectedPosition[]> = {
  bottom: [
    { originX: 'start',  originY: 'bottom', overlayX: 'start',  overlayY: 'top',    offsetY: 8 },
    { originX: 'start',  originY: 'top',    overlayX: 'start',  overlayY: 'bottom', offsetY: -8 },
  ],
  top: [
    { originX: 'start',  originY: 'top',    overlayX: 'start',  overlayY: 'bottom', offsetY: -8 },
    { originX: 'start',  originY: 'bottom', overlayX: 'start',  overlayY: 'top',    offsetY: 8 },
  ],
  right: [
    { originX: 'end',    originY: 'center', overlayX: 'start',  overlayY: 'center', offsetX: 8 },
  ],
  left: [
    { originX: 'start',  originY: 'center', overlayX: 'end',    overlayY: 'center', offsetX: -8 },
  ],
};

@Directive({
  selector: '[hPopoverTrigger]',
  standalone: true,
  exportAs: 'hPopoverTrigger',
  host: {
    '(click)': 'toggle()',
    '[attr.aria-expanded]': '_open',
    '[attr.aria-haspopup]': '"dialog"',
  },
})
export class HPopoverTriggerDirective implements OnInit, OnDestroy {
  readonly hPopoverTrigger = input.required<TemplateRef<unknown>>();
  readonly popoverPosition = input<'top' | 'bottom' | 'left' | 'right'>('bottom');

  protected _open = false;

  private readonly _el = inject(ElementRef<HTMLElement>);
  private readonly _overlay = inject(Overlay);
  private readonly _vcr = inject(ViewContainerRef);
  private _overlayRef!: OverlayRef;

  ngOnInit() {
    const strategy = this._overlay
      .position()
      .flexibleConnectedTo(this._el)
      .withPositions(POSITIONS[this.popoverPosition()]);

    this._overlayRef = this._overlay.create({
      positionStrategy: strategy,
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this._overlayRef.backdropClick().subscribe(() => this.close());
    this._overlayRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') this.close();
    });
  }

  toggle() {
    this._open ? this.close() : this.open();
  }

  open() {
    if (this._open || this._overlayRef.hasAttached()) return;
    this._open = true;
    this._overlayRef.attach(new TemplatePortal(this.hPopoverTrigger(), this._vcr));
    this._overlayRef.updatePosition();
  }

  close() {
    if (!this._open) return;
    this._open = false;
    this._overlayRef.detach();
  }

  ngOnDestroy() {
    this._overlayRef?.dispose();
  }
}

@Component({
  selector: 'h-popover',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-popover"
         [class.h-popover--sm]="size() === 'sm'"
         [class.h-popover--lg]="size() === 'lg'"
         role="dialog">
      <ng-content />
    </div>
  `,
  styles: [`
    :host { display: block; }

    .h-popover {
      width: 320px; max-width: calc(100vw - 32px);
      background: var(--h-popover); border: 1px solid var(--h-border);
      border-radius: var(--h-radius-lg); box-shadow: var(--h-shadow-md);
      padding: 16px; font-family: var(--h-font-sans);
      animation: h-popover-in var(--h-motion-product-base) var(--h-motion-product-ease) forwards;
    }
    .h-popover--sm { width: 240px; padding: 12px; }
    .h-popover--lg { width: 420px; }

    @keyframes h-popover-in {
      from { opacity: 0; transform: scale(0.96) translateY(-4px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
  `],
})
export class HPopoverComponent {
  readonly size = input<'sm' | 'default' | 'lg'>('default');
}
