import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { H_FORM_FIELD_CONTROL, HFormFieldControl } from '../field/field.component';
import { HDatePickerComponent, DateRange } from '../date-picker/date-picker.component';
import { HTimePickerComponent, HTimeValue } from '../time-picker/time-picker.component';

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top',    offsetY: 4  },
  { originX: 'start', originY: 'top',    overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

let _nextId = 0;

function formatPtDate(d: Date, withTime = false): string {
  const date = [
    d.getDate().toString().padStart(2, '0'),
    (d.getMonth() + 1).toString().padStart(2, '0'),
    d.getFullYear(),
  ].join('/');
  if (!withTime) return date;
  const time = [
    d.getHours().toString().padStart(2, '0'),
    d.getMinutes().toString().padStart(2, '0'),
  ].join(':');
  return `${date} ${time}`;
}

function parsePtDate(s: string, withTime = false): Date | null {
  const str = s.trim();
  let datePart = str;
  let h = 0, m = 0;
  if (withTime) {
    const spaceIdx = str.lastIndexOf(' ');
    if (spaceIdx !== -1) {
      datePart = str.slice(0, spaceIdx);
      const timeParts = str.slice(spaceIdx + 1).split(':').map(Number);
      if (timeParts.length >= 2 && !isNaN(timeParts[0]) && !isNaN(timeParts[1])) {
        h = timeParts[0]; m = timeParts[1];
      }
    }
  }
  const parts = datePart.split('/');
  if (parts.length !== 3) return null;
  const [dd, mm, yyyy] = parts.map(Number);
  if (!dd || !mm || !yyyy || isNaN(dd) || isNaN(mm) || isNaN(yyyy)) return null;
  if (dd < 1 || dd > 31 || mm < 1 || mm > 12 || yyyy < 1900 || yyyy > 2100) return null;
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  const date = new Date(yyyy, mm - 1, dd, h, m, 0, 0);
  if (date.getMonth() !== mm - 1) return null;
  return date;
}

@Component({
  selector: 'h-date-input',
  standalone: true,
  imports: [HDatePickerComponent, HTimePickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: H_FORM_FIELD_CONTROL, useExisting: HDateInputComponent }],
  template: `
    <div
      class="h-di-wrap"
      [class.h-di-wrap--focus]="focused()"
      [class.h-di-wrap--error]="invalid()"
      [class.h-di-wrap--sm]="size() === 'sm'"
      [class.h-di-wrap--lg]="size() === 'lg'"
    >
      <svg class="h-di-icon" width="14" height="14" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8"  y1="2" x2="8"  y2="6"/>
        <line x1="3"  y1="10" x2="21" y2="10"/>
      </svg>
      <input
        #inputEl
        [id]="nativeId()"
        type="text"
        class="h-di-native"
        [placeholder]="_placeholder()"
        [disabled]="disabled()"
        [value]="_displayText()"
        [attr.aria-required]="required() || null"
        [attr.aria-invalid]="invalid() ? 'true' : null"
        [attr.aria-label]="ariaLabel() ?? null"
        [attr.aria-describedby]="describedById() ?? null"
        [attr.aria-expanded]="_open()"
        [attr.aria-haspopup]="'dialog'"
        autocomplete="off"
        (input)="onInput($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
        (keydown)="onKeydown($event)"
      />
      @if (_hasValue() && !disabled()) {
        <button type="button" class="h-di-clear" (click)="clear()" aria-label="Clear date" tabindex="-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      }
    </div>

    <ng-template #calendarTpl>
      <div class="h-di-popup">
        <h-date-picker
          [mode]="mode()"
          [value]="_pickerValue()"
          [rangeValue]="_pickerRange()"
          (dateSelected)="onDateSelected($event)"
          (rangeSelected)="onRangeSelected($event)"
        ></h-date-picker>
        @if (showTime() && mode() === 'single') {
          <div class="h-di-time-row">
            <h-time-picker
              [value]="_pickerTime()"
              (valueChange)="onTimeChange($event)"
            ></h-time-picker>
          </div>
        }
      </div>
    </ng-template>
  `,
  styles: [`
    :host { display: block; width: 100%; }

    .h-di-wrap {
      display: inline-flex; align-items: center; gap: 8px;
      height: 36px; padding: 0 10px 0 10px;
      background: var(--h-card); border: 1px solid var(--h-border); border-radius: 10px;
      width: 100%;
      transition: border-color var(--h-motion-product-quick) var(--h-motion-product-ease),
                  box-shadow var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-di-wrap--sm  { height: 32px; }
    .h-di-wrap--lg  { height: 44px; }
    .h-di-wrap--focus { border-color: var(--h-ring); box-shadow: 0 0 0 3px rgba(0,61,165,0.20); }
    .h-di-wrap--error { border-color: var(--h-destructive); }
    .h-di-wrap--error.h-di-wrap--focus { box-shadow: 0 0 0 3px rgba(180,35,24,0.20); }

    .h-di-icon { color: var(--h-muted-foreground); flex-shrink: 0; }

    .h-di-native {
      flex: 1; min-width: 0; border: 0; outline: none; background: transparent;
      font-family: var(--h-font-mono); font-size: 13px; color: var(--h-foreground); letter-spacing: 0.01em;
    }
    .h-di-wrap--sm .h-di-native  { font-size: 12.5px; }
    .h-di-wrap--lg .h-di-native  { font-size: 13.5px; }
    .h-di-native:disabled { cursor: not-allowed; opacity: 0.5; }
    .h-di-native::placeholder { color: var(--h-muted-foreground); font-family: var(--h-font-sans); font-size: 13px; }

    .h-di-clear {
      display: flex; align-items: center; justify-content: center;
      width: 16px; height: 16px; flex-shrink: 0;
      border: none; background: none; cursor: pointer; padding: 0;
      color: var(--h-muted-foreground); border-radius: 4px;
      transition: color var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    .h-di-clear:hover { color: var(--h-foreground); }

    .h-di-popup {
      background: var(--h-popover); border: 1px solid var(--h-border);
      border-radius: var(--h-radius-lg); box-shadow: var(--h-shadow-md);
      overflow: hidden;
    }
    .h-di-popup h-date-picker { display: block; border: none; box-shadow: none; border-radius: 0; }
    .h-di-time-row {
      display: flex; justify-content: center;
      padding: 10px 14px 12px;
      border-top: 1px solid var(--h-border);
    }
    .h-di-time-row h-time-picker { display: block; }
    .h-di-time-row h-time-picker .h-timepicker {
      border: none; box-shadow: none; padding: 0; background: transparent;
    }
  `],
})
export class HDateInputComponent implements FormValueControl<Date | null>, HFormFieldControl, AfterViewInit, OnDestroy {
  private readonly _autoId  = `h-di-${_nextId++}`;
  private readonly _el      = inject(ElementRef<HTMLElement>);
  private readonly _overlay = inject(Overlay);
  private readonly _vcr     = inject(ViewContainerRef);

  readonly nativeId = computed(() => this.inputId() ?? this._autoId);

  readonly value     = model<Date | null>(null);
  readonly rangeValue = model<DateRange>({ start: null, end: null });
  readonly disabled  = input(false, { transform: booleanAttribute });
  readonly invalid   = input(false, { transform: booleanAttribute });
  readonly errors    = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touched   = model<boolean>(false);
  readonly required  = input(false, { transform: booleanAttribute });

  readonly mode        = input<'single' | 'range'>('single');
  readonly showTime    = input(false, { transform: booleanAttribute });
  readonly size        = input<'sm' | 'default' | 'lg'>('default');
  readonly placeholder = input<string | undefined>(undefined);
  readonly inputId     = input<string | undefined>(undefined);
  readonly ariaLabel   = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly describedById = input<string | undefined>(undefined, { alias: 'aria-describedby' });

  protected readonly focused  = signal(false);
  protected readonly _open    = signal(false);
  protected readonly _rawText = signal<string | null>(null);

  private readonly _inputEl    = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');
  private readonly _calendarTpl = viewChild.required<TemplateRef<unknown>>('calendarTpl');
  private _overlayRef!: OverlayRef;

  protected readonly _placeholder = computed(() => {
    if (this.placeholder() !== undefined) return this.placeholder()!;
    if (this.mode() === 'range') return 'dd/mm/yyyy – dd/mm/yyyy';
    return this.showTime() ? 'dd/mm/yyyy HH:mm' : 'dd/mm/yyyy';
  });

  protected readonly _displayText = computed(() => {
    const raw = this._rawText();
    if (raw !== null) return raw;
    if (this.mode() === 'single') {
      const v = this.value();
      return v ? formatPtDate(v, this.showTime()) : '';
    }
    const r = this.rangeValue();
    if (r.start && r.end) return `${formatPtDate(r.start)} – ${formatPtDate(r.end)}`;
    if (r.start) return `${formatPtDate(r.start)} – `;
    return '';
  });

  protected readonly _hasValue = computed(() => {
    if (this.mode() === 'single') return this.value() !== null;
    const r = this.rangeValue();
    return r.start !== null || r.end !== null;
  });

  protected readonly _pickerValue = computed(() => this.mode() === 'single' ? this.value() : null);
  protected readonly _pickerRange = computed(() => this.mode() === 'range' ? this.rangeValue() : { start: null, end: null });
  protected readonly _pickerTime  = computed((): HTimeValue | null => {
    const v = this.value();
    if (!v) return null;
    return { hours: v.getHours(), minutes: v.getMinutes() };
  });

  constructor() {
    effect(() => {
      this.value();
      this.rangeValue();
      this._rawText.set(null);
    });
  }

  ngAfterViewInit(): void {
    const strategy = this._overlay.position()
      .flexibleConnectedTo(this._el)
      .withPositions(POSITIONS)
      .withPush(false);

    this._overlayRef = this._overlay.create({
      positionStrategy: strategy,
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this._overlayRef.backdropClick().subscribe(() => this._closeCalendar(false));
    this._overlayRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') this._closeCalendar(true);
    });
  }

  protected onFocus(): void {
    this.focused.set(true);
  }

  protected onInput(e: Event): void {
    this._rawText.set((e.target as HTMLInputElement).value);
  }

  protected onBlur(): void {
    this.focused.set(false);
    this.touched.set(true);
    const raw = this._rawText();
    if (raw !== null) this._parseAndCommit(raw);
  }

  protected onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      const raw = this._rawText();
      if (raw !== null) this._parseAndCommit(raw);
      else this._toggleCalendar();
    } else if (e.key === 'Escape') {
      this._closeCalendar(true);
    } else if (e.key === ' ' || e.key === 'ArrowDown') {
      if (!this._open()) { e.preventDefault(); this._openCalendar(); }
    }
  }

  protected onDateSelected(date: Date): void {
    const existing = this.value();
    if (this.showTime() && existing) {
      date.setHours(existing.getHours(), existing.getMinutes(), 0, 0);
    }
    this.value.set(date);
    this._rawText.set(null);
    if (!this.showTime()) this._closeCalendar(true);
  }

  protected onRangeSelected(range: DateRange): void {
    this.rangeValue.set(range);
    this._rawText.set(null);
    this._closeCalendar(true);
  }

  protected onTimeChange(t: HTimeValue | null): void {
    const d = this.value();
    if (!d || !t) return;
    const updated = new Date(d);
    updated.setHours(t.hours, t.minutes, 0, 0);
    this.value.set(updated);
    this._rawText.set(null);
  }

  protected clear(): void {
    if (this.mode() === 'single') {
      this.value.set(null);
    } else {
      this.rangeValue.set({ start: null, end: null });
    }
    this._rawText.set(null);
  }

  private _toggleCalendar(): void {
    this._open() ? this._closeCalendar(true) : this._openCalendar();
  }

  private _openCalendar(): void {
    if (this._open() || this._overlayRef?.hasAttached()) return;
    this._overlayRef.attach(new TemplatePortal(this._calendarTpl(), this._vcr));
    this._open.set(true);
  }

  private _closeCalendar(focusInput: boolean): void {
    if (!this._open()) return;
    this._overlayRef.detach();
    this._open.set(false);
    if (focusInput) this._inputEl().nativeElement.focus();
  }

  private _parseAndCommit(raw: string): void {
    if (this.mode() === 'single') {
      if (!raw.trim()) { this.value.set(null); this._rawText.set(null); return; }
      const d = parsePtDate(raw, this.showTime());
      if (d) { this.value.set(d); this._rawText.set(null); }
    } else {
      if (!raw.trim()) { this.rangeValue.set({ start: null, end: null }); this._rawText.set(null); return; }
      const parts = raw.split('–').map(s => s.trim());
      const start = parts[0] ? parsePtDate(parts[0]) : null;
      const end   = parts[1] ? parsePtDate(parts[1]) : null;
      if (start) { this.rangeValue.set({ start, end: end ?? null }); this._rawText.set(null); }
    }
  }

  ngOnDestroy(): void {
    this._overlayRef?.dispose();
  }
}
