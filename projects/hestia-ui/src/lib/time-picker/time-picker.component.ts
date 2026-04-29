import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  signal,
  untracked,
} from '@angular/core';

export interface HTimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

function pad2(n: number): string {
  return n.toString().padStart(2, '0');
}

const CHEVRON_UP   = `<path d="m18 15-6-6-6 6"/>`;
const CHEVRON_DOWN = `<path d="m6 9 6 6 6-6"/>`;

function chevronSvg(path: string): string {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

@Component({
  selector: 'h-time-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-time-picker-host' },
  template: `
    <div class="h-timepicker">
      <!-- Hours -->
      <div class="h-tp-col" role="group" aria-label="Hours">
        <button type="button" class="h-tp-btn" (click)="_step('h', -1)" aria-label="Previous hour">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
        <div class="h-tp-drum" (wheel)="_onWheel($event, 'h')" aria-label="Hour value">
          @for (item of _visH(); track item.v + '-' + item.offset) {
            <button type="button" class="h-tp-item"
              [attr.data-offset]="item.offset"
              [attr.aria-selected]="item.offset === 0"
              [attr.aria-label]="item.offset === 0 ? 'Hour ' + item.label : null"
              (click)="_clickDrum('h', item.offset)">
              {{ item.label }}
            </button>
          }
        </div>
        <button type="button" class="h-tp-btn" (click)="_step('h', 1)" aria-label="Next hour">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      </div>

      <span class="h-tp-sep" aria-hidden="true">:</span>

      <!-- Minutes -->
      <div class="h-tp-col" role="group" aria-label="Minutes">
        <button type="button" class="h-tp-btn" (click)="_step('m', -1)" aria-label="Previous minute">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
        <div class="h-tp-drum" (wheel)="_onWheel($event, 'm')" aria-label="Minute value">
          @for (item of _visM(); track item.v + '-' + item.offset) {
            <button type="button" class="h-tp-item"
              [attr.data-offset]="item.offset"
              [attr.aria-selected]="item.offset === 0"
              (click)="_clickDrum('m', item.offset)">
              {{ item.label }}
            </button>
          }
        </div>
        <button type="button" class="h-tp-btn" (click)="_step('m', 1)" aria-label="Next minute">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      </div>

      @if (showSeconds()) {
        <span class="h-tp-sep" aria-hidden="true">:</span>

        <!-- Seconds -->
        <div class="h-tp-col" role="group" aria-label="Seconds">
          <button type="button" class="h-tp-btn" (click)="_step('s', -1)" aria-label="Previous second">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </button>
          <div class="h-tp-drum" (wheel)="_onWheel($event, 's')" aria-label="Second value">
            @for (item of _visS(); track item.v + '-' + item.offset) {
              <button type="button" class="h-tp-item"
                [attr.data-offset]="item.offset"
                [attr.aria-selected]="item.offset === 0"
                (click)="_clickDrum('s', item.offset)">
                {{ item.label }}
              </button>
            }
          </div>
          <button type="button" class="h-tp-btn" (click)="_step('s', 1)" aria-label="Next second">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: inline-block; }

    .h-timepicker {
      display: inline-flex; align-items: center; gap: 2px;
      background: var(--h-popover); border: 1px solid var(--h-border);
      border-radius: var(--h-radius-lg); box-shadow: var(--h-shadow-md);
      padding: 10px 14px; font-family: var(--h-font-sans);
      user-select: none;
    }

    /* ── Column ────────────────────────────────────── */
    .h-tp-col {
      display: flex; flex-direction: column; align-items: center; gap: 2px;
      width: 56px;
    }

    /* ── Arrow buttons ──────────────────────────────── */
    .h-tp-btn {
      display: flex; align-items: center; justify-content: center;
      width: 36px; height: 26px; border: none; background: none;
      color: var(--h-muted-foreground); cursor: pointer;
      border-radius: var(--h-radius-sm);
      transition: background var(--h-motion-product-instant) var(--h-motion-product-ease),
                  color     var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    .h-tp-btn:hover     { background: var(--h-muted); color: var(--h-foreground); }
    .h-tp-btn:focus-visible { outline: 2px solid var(--h-ring); outline-offset: 2px; }

    /* ── Drum ──────────────────────────────────────── */
    .h-tp-drum {
      position: relative; overflow: hidden;
      width: 56px; height: 160px; /* 5 × 32px */
      /* fade top/bottom so items bleed out gracefully */
      mask-image: linear-gradient(
        to bottom,
        transparent 0%,
        black       18%,
        black       82%,
        transparent 100%
      );
      -webkit-mask-image: linear-gradient(
        to bottom,
        transparent 0%,
        black       18%,
        black       82%,
        transparent 100%
      );
    }

    /* ── Individual drum items ─────────────────────── */
    .h-tp-item {
      display: flex; align-items: center; justify-content: center;
      width: 56px; height: 32px; border: none;
      font-family: var(--h-font-mono); cursor: pointer;
      border-radius: var(--h-radius-sm); background: transparent;
      transition: all var(--h-motion-product-quick) var(--h-motion-product-ease);
    }

    /* selected — center row */
    .h-tp-item[data-offset="0"] {
      font-size: 20px; font-weight: 700;
      color: var(--h-primary); opacity: 1;
      background: rgba(0, 61, 165, 0.08);
    }
    .h-tp-item[data-offset="0"]:hover { background: rgba(0, 61, 165, 0.14); }

    /* adjacent rows ±1 */
    .h-tp-item[data-offset="-1"],
    .h-tp-item[data-offset="1"] {
      font-size: 15px; font-weight: 500; opacity: 0.5;
      color: var(--h-foreground);
    }
    .h-tp-item[data-offset="-1"]:hover,
    .h-tp-item[data-offset="1"]:hover  { opacity: 0.75; background: var(--h-muted); }

    /* outer rows ±2 */
    .h-tp-item[data-offset="-2"],
    .h-tp-item[data-offset="2"] {
      font-size: 13px; opacity: 0.2;
      color: var(--h-foreground);
    }
    .h-tp-item[data-offset="-2"]:hover,
    .h-tp-item[data-offset="2"]:hover  { opacity: 0.4; background: var(--h-muted); }

    /* ── Separator ─────────────────────────────────── */
    .h-tp-sep {
      font-size: 22px; font-weight: 700; line-height: 1;
      color: var(--h-muted-foreground); font-family: var(--h-font-mono);
      padding: 0 1px; align-self: center; margin-top: -4px;
    }
  `],
})
export class HTimePickerComponent {
  readonly value       = model<HTimeValue | null>(null);
  readonly showSeconds = input(false);
  /** Minute step: 1, 5, 10, 15, 30 */
  readonly step        = input(1);

  protected readonly _hVal = signal(0);
  protected readonly _mVal = signal(0);
  protected readonly _sVal = signal(0);

  constructor() {
    effect(() => {
      const v = this.value();
      untracked(() => {
        if (v) {
          this._hVal.set(Math.max(0, Math.min(23, v.hours)));
          this._mVal.set(this._snapMin(v.minutes));
          this._sVal.set(Math.max(0, Math.min(59, v.seconds ?? 0)));
        }
      });
    });
  }

  private _snapMin(m: number): number {
    const s = this.step();
    return s <= 1 ? Math.max(0, Math.min(59, m)) : Math.round(m / s) * s % 60;
  }

  protected readonly _visH = computed(() => this._vis(this._hVal(), 24, 1));
  protected readonly _visM = computed(() => this._vis(this._mVal(), 60, this.step()));
  protected readonly _visS = computed(() => this._vis(this._sVal(), 60, 1));

  private _vis(cur: number, max: number, step: number) {
    return [-2, -1, 0, 1, 2].map(offset => {
      const v = ((cur + offset * step) % max + max) % max;
      return { v, label: pad2(v), offset };
    });
  }

  protected _step(part: 'h' | 'm' | 's', dir: 1 | -1): void {
    const step = part === 'm' ? this.step() : 1;
    const max  = part === 'h' ? 24 : 60;
    const sig  = part === 'h' ? this._hVal : part === 'm' ? this._mVal : this._sVal;
    sig.update(v => ((v + dir * step) % max + max) % max);
    this._emit();
  }

  protected _clickDrum(part: 'h' | 'm' | 's', offset: number): void {
    if (offset === 0) return;
    const dir = (offset < 0 ? -1 : 1) as 1 | -1;
    for (let i = 0; i < Math.abs(offset); i++) this._step(part, dir);
  }

  protected _onWheel(e: WheelEvent, part: 'h' | 'm' | 's'): void {
    e.preventDefault();
    this._step(part, e.deltaY > 0 ? 1 : -1);
  }

  private _emit(): void {
    this.value.set({
      hours:   this._hVal(),
      minutes: this._mVal(),
      ...(this.showSeconds() ? { seconds: this._sVal() } : {}),
    });
  }
}
