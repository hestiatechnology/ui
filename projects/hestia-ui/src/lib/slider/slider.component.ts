import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  computed,
  input,
  model,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'h-slider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-slider-host' },
  template: `
    <div class="h-slider" [class.h-slider--disabled]="disabled()">
      <div
        #trackRef
        class="h-slider-track"
        (pointerdown)="onTrackPointerDown($event)"
      >
        <div class="h-slider-range" [style.width.%]="pct()"></div>
        <div
          class="h-slider-thumb"
          role="slider"
          tabindex="0"
          [style.left]="'calc(' + pct() + '% - 8px)'"
          [attr.aria-valuenow]="value()"
          [attr.aria-valuemin]="min()"
          [attr.aria-valuemax]="max()"
          [attr.aria-disabled]="disabled() || null"
          [attr.aria-label]="ariaLabel() || null"
          (keydown)="onThumbKeydown($event)"
        ></div>
      </div>
      @if (showLabels()) {
        <div class="h-slider-labels">
          <span>{{ min() }}</span>
          <span class="h-slider-labels-value">{{ value() }}</span>
          <span>{{ max() }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }

    .h-slider { padding: 8px 0; user-select: none; }

    .h-slider-track {
      position: relative; height: 4px;
      background: var(--h-border); border-radius: 4px; cursor: pointer;
    }
    .h-slider--disabled .h-slider-track { cursor: not-allowed; opacity: 0.5; }

    .h-slider-range {
      position: absolute; left: 0; top: 0; bottom: 0;
      background: var(--h-primary); border-radius: 4px;
    }

    .h-slider-thumb {
      position: absolute; top: 50%; transform: translateY(-50%);
      width: 16px; height: 16px; border-radius: 9999px;
      background: #fff; border: 2px solid var(--h-primary);
      box-shadow: var(--h-shadow-sm); cursor: grab;
      transition: box-shadow var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-slider-thumb:hover {
      box-shadow: var(--h-shadow-sm), 0 0 0 4px rgba(0, 61, 165, 0.12);
    }
    .h-slider-thumb:focus-visible {
      outline: none;
      box-shadow: var(--h-shadow-sm), 0 0 0 4px rgba(0, 61, 165, 0.25);
    }
    .h-slider-thumb:active { cursor: grabbing; }

    .h-slider-labels {
      display: flex; justify-content: space-between;
      margin-top: 6px; font-family: var(--h-font-mono); font-size: 11px;
      color: var(--h-muted-foreground);
    }
    .h-slider-labels-value { color: var(--h-primary); font-weight: 600; }
  `],
})
export class HSliderComponent implements OnDestroy {
  readonly value = model<number>(0);
  readonly min = input(0);
  readonly max = input(100);
  readonly step = input(1);
  readonly disabled = input(false);
  readonly showLabels = input(true);
  readonly ariaLabel = input('');

  private readonly _trackRef = viewChild<ElementRef<HTMLDivElement>>('trackRef');
  private _dragging = false;

  protected readonly pct = computed(() => {
    const range = this.max() - this.min();
    if (range === 0) return 0;
    return Math.max(0, Math.min(100, ((this.value() - this.min()) / range) * 100));
  });

  onTrackPointerDown(event: PointerEvent) {
    if (this.disabled()) return;
    this._dragging = true;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    this._updateFromPointer(event);

    const onMove = (e: PointerEvent) => { if (this._dragging) this._updateFromPointer(e); };
    const onUp = () => {
      this._dragging = false;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  onThumbKeydown(event: KeyboardEvent) {
    if (this.disabled()) return;
    const step = this.step();
    let next = this.value();
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next += step;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next -= step;
    else if (event.key === 'Home') next = this.min();
    else if (event.key === 'End') next = this.max();
    else return;
    event.preventDefault();
    this.value.set(this._clamp(this._snap(next)));
  }

  private _updateFromPointer(event: PointerEvent) {
    const track = this._trackRef()?.nativeElement;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const raw = this.min() + ratio * (this.max() - this.min());
    this.value.set(this._clamp(this._snap(raw)));
  }

  private _snap(v: number) {
    const step = this.step();
    return Math.round(v / step) * step;
  }

  private _clamp(v: number) {
    return Math.max(this.min(), Math.min(this.max(), v));
  }

  ngOnDestroy() { this._dragging = false; }
}
