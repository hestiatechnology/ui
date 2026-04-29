import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

@Component({
  selector: 'h-date-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-date-picker-host' },
  template: `
    <div class="h-datepicker">
      <div class="h-datepicker-nav">
        <button type="button" class="h-datepicker-nav-btn" (click)="prevMonth()" aria-label="Previous month">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <span class="h-datepicker-month-label">{{ monthLabel() }}</span>
        <button type="button" class="h-datepicker-nav-btn" (click)="nextMonth()" aria-label="Next month">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>

      <div class="h-datepicker-weekdays">
        @for (d of weekdays; track d + $index) {
          <span>{{ d }}</span>
        }
      </div>

      <div class="h-datepicker-grid">
        @for (blank of leadingBlanks(); track $index) {
          <span></span>
        }
        @for (day of daysInMonth(); track day) {
          <button
            type="button"
            class="h-datepicker-day"
            [class.h-datepicker-day--selected]="isDaySelected(day)"
            [class.h-datepicker-day--in-range]="isDayInRange(day)"
            [class.h-datepicker-day--range-start]="isDayRangeStart(day)"
            [class.h-datepicker-day--range-end]="isDayRangeEnd(day)"
            [class.h-datepicker-day--today]="isDayToday(day)"
            (click)="selectDay(day)"
          >{{ day }}</button>
        }
      </div>

      @if (mode() === 'range' && rangeValue().start) {
        <div class="h-datepicker-footer">
          <span class="h-datepicker-range-label">
            {{ formatDate(rangeValue().start) }}
            @if (rangeValue().end) { → {{ formatDate(rangeValue().end) }} }
          </span>
          @if (rangeValue().end) {
            <button type="button" class="h-datepicker-apply" (click)="applyRange()">Apply</button>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }

    .h-datepicker {
      width: 280px; padding: 14px;
      background: var(--h-popover); border: 1px solid var(--h-border);
      border-radius: var(--h-radius-lg); box-shadow: var(--h-shadow-md);
      font-family: var(--h-font-sans);
    }

    .h-datepicker-nav {
      display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;
    }

    .h-datepicker-nav-btn {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border-radius: var(--h-radius-sm);
      border: none; background: none; color: var(--h-muted-foreground); cursor: pointer;
      transition: background var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    .h-datepicker-nav-btn:hover { background: var(--h-muted); color: var(--h-foreground); }
    .h-datepicker-nav-btn:focus-visible { outline: 2px solid var(--h-ring); outline-offset: 2px; }

    .h-datepicker-month-label { font-size: 13px; font-weight: 600; color: var(--h-foreground); }

    .h-datepicker-weekdays {
      display: grid; grid-template-columns: repeat(7, 1fr);
      font-size: 11px; color: var(--h-muted-foreground);
      text-align: center; margin-bottom: 4px; gap: 2px;
    }

    .h-datepicker-grid {
      display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px;
    }

    .h-datepicker-day {
      height: 30px; border: none; border-radius: var(--h-radius-sm);
      font-size: 12.5px; font-family: var(--h-font-mono); cursor: pointer;
      background: transparent; color: var(--h-foreground); font-weight: 500;
      transition: background var(--h-motion-product-instant) var(--h-motion-product-ease),
                  color var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    .h-datepicker-day:hover:not(.h-datepicker-day--selected) { background: var(--h-muted); }
    .h-datepicker-day:focus-visible { outline: 2px solid var(--h-ring); outline-offset: 1px; }

    .h-datepicker-day--selected {
      background: var(--h-primary); color: #fff; font-weight: 600;
    }
    .h-datepicker-day--in-range { background: rgba(0, 61, 165, 0.10); color: var(--h-primary); }
    .h-datepicker-day--range-start { border-radius: var(--h-radius-sm) 0 0 var(--h-radius-sm); }
    .h-datepicker-day--range-end   { border-radius: 0 var(--h-radius-sm) var(--h-radius-sm) 0; }

    .h-datepicker-day--today:not(.h-datepicker-day--selected) {
      font-weight: 700; color: var(--h-primary);
    }

    .h-datepicker-footer {
      display: flex; justify-content: space-between; align-items: center;
      margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--h-border);
    }
    .h-datepicker-range-label {
      font-family: var(--h-font-mono); font-size: 11.5px; color: var(--h-muted-foreground);
    }
    .h-datepicker-apply {
      height: 28px; padding: 0 10px; border-radius: var(--h-radius-sm);
      border: none; background: var(--h-primary); color: #fff;
      font-family: var(--h-font-sans); font-size: 12px; font-weight: 500; cursor: pointer;
    }
    .h-datepicker-apply:hover { background: color-mix(in oklch, var(--h-primary) 90%, black); }
    .h-datepicker-apply:focus-visible { outline: 2px solid var(--h-ring); outline-offset: 2px; }
  `],
})
export class HDatePickerComponent {
  readonly mode = input<'single' | 'range'>('single');
  readonly value = model<Date | null>(null);
  readonly rangeValue = model<DateRange>({ start: null, end: null });
  readonly dateSelected = output<Date>();
  readonly rangeSelected = output<DateRange>();

  protected readonly weekdays = WEEKDAYS;

  private readonly _viewDate = signal<Date>(new Date());

  protected readonly monthLabel = computed(() => {
    const d = this._viewDate();
    return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  });

  protected readonly leadingBlanks = computed<number[]>(() => {
    const d = new Date(this._viewDate().getFullYear(), this._viewDate().getMonth(), 1);
    const dow = d.getDay();
    return Array(dow === 0 ? 6 : dow - 1).fill(0);
  });

  protected readonly daysInMonth = computed<number[]>(() => {
    const d = this._viewDate();
    const count = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    return Array.from({ length: count }, (_, i) => i + 1);
  });

  prevMonth() {
    const d = this._viewDate();
    this._viewDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  nextMonth() {
    const d = this._viewDate();
    this._viewDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  selectDay(day: number) {
    const d = this._viewDate();
    const date = new Date(d.getFullYear(), d.getMonth(), day);

    if (this.mode() === 'single') {
      this.value.set(date);
      this.dateSelected.emit(date);
    } else {
      const range = this.rangeValue();
      if (!range.start || (range.start && range.end)) {
        this.rangeValue.set({ start: date, end: null });
      } else {
        const newRange: DateRange = date < range.start
          ? { start: date, end: range.start }
          : { start: range.start, end: date };
        this.rangeValue.set(newRange);
      }
    }
  }

  applyRange() {
    const r = this.rangeValue();
    if (r.start && r.end) this.rangeSelected.emit(r);
  }

  protected isDaySelected(day: number): boolean {
    if (this.mode() === 'single') {
      const v = this.value();
      if (!v) return false;
      const d = this._viewDate();
      return v.getFullYear() === d.getFullYear() && v.getMonth() === d.getMonth() && v.getDate() === day;
    }
    return this.isDayRangeStart(day) || this.isDayRangeEnd(day);
  }

  protected isDayInRange(day: number): boolean {
    const r = this.rangeValue();
    if (!r.start || !r.end) return false;
    const d = this._viewDate();
    const date = new Date(d.getFullYear(), d.getMonth(), day);
    return date > r.start && date < r.end;
  }

  protected isDayRangeStart(day: number): boolean {
    const r = this.rangeValue();
    if (!r.start) return false;
    const d = this._viewDate();
    const date = new Date(d.getFullYear(), d.getMonth(), day);
    return date.getTime() === r.start.getTime();
  }

  protected isDayRangeEnd(day: number): boolean {
    const r = this.rangeValue();
    if (!r.end) return false;
    const d = this._viewDate();
    const date = new Date(d.getFullYear(), d.getMonth(), day);
    return date.getTime() === r.end.getTime();
  }

  protected isDayToday(day: number): boolean {
    const today = new Date();
    const d = this._viewDate();
    return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && day === today.getDate();
  }

  protected formatDate(date: Date | null): string {
    if (!date) return '';
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }
}
