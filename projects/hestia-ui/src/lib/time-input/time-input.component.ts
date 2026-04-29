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
  untracked,
  viewChild,
} from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { H_FORM_FIELD_CONTROL, HFormFieldControl } from '../field/field.component';
import { HTimePickerComponent, HTimeValue } from '../time-picker/time-picker.component';

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top',    offsetY: 4  },
  { originX: 'start', originY: 'top',    overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

let _nextId = 0;

function pad2(n: number): string { return n.toString().padStart(2, '0'); }

function formatTime(v: HTimeValue, seconds: boolean): string {
  return seconds
    ? `${pad2(v.hours)}:${pad2(v.minutes)}:${pad2(v.seconds ?? 0)}`
    : `${pad2(v.hours)}:${pad2(v.minutes)}`;
}

function parseTime(s: string): HTimeValue | null {
  const parts = s.trim().split(':').map(Number);
  if (parts.length < 2) return null;
  const [h, m, sec = 0] = parts;
  if (isNaN(h) || isNaN(m) || isNaN(sec)) return null;
  if (h < 0 || h > 23 || m < 0 || m > 59 || sec < 0 || sec > 59) return null;
  return { hours: h, minutes: m, seconds: sec };
}

@Component({
  selector: 'h-time-input',
  standalone: true,
  imports: [HTimePickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: H_FORM_FIELD_CONTROL, useExisting: HTimeInputComponent }],
  template: `
    <div
      class="h-ti-wrap"
      [class.h-ti-wrap--focus]="focused()"
      [class.h-ti-wrap--error]="invalid()"
      [class.h-ti-wrap--sm]="size() === 'sm'"
      [class.h-ti-wrap--lg]="size() === 'lg'"
    >
      <!-- Clock icon -->
      <svg class="h-ti-icon" width="14" height="14" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>

      <input
        #inputEl
        [id]="nativeId()"
        type="text"
        class="h-ti-native"
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
        (input)="_rawText.set($any($event.target).value)"
        (focus)="focused.set(true)"
        (blur)="onBlur()"
        (keydown)="onKeydown($event)"
      />

      @if (value() !== null && !disabled()) {
        <button type="button" class="h-ti-clear" (click)="clear()" aria-label="Clear time" tabindex="-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      }
    </div>

    <ng-template #pickerTpl>
      <h-time-picker
        [value]="_pickerValue()"
        [showSeconds]="showSeconds()"
        [step]="step()"
        (valueChange)="onTimeChange($event)"
      ></h-time-picker>
    </ng-template>
  `,
  styles: [`
    :host { display: block; width: 100%; }

    .h-ti-wrap {
      display: inline-flex; align-items: center; gap: 8px;
      height: 36px; padding: 0 10px;
      background: var(--h-card); border: 1px solid var(--h-border);
      border-radius: 10px; width: 100%;
      transition: border-color var(--h-motion-product-quick) var(--h-motion-product-ease),
                  box-shadow   var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-ti-wrap--sm  { height: 32px; }
    .h-ti-wrap--lg  { height: 44px; }
    .h-ti-wrap--focus { border-color: var(--h-ring); box-shadow: 0 0 0 3px rgba(0,61,165,0.20); }
    .h-ti-wrap--error { border-color: var(--h-destructive); }
    .h-ti-wrap--error.h-ti-wrap--focus { box-shadow: 0 0 0 3px rgba(180,35,24,0.20); }

    .h-ti-icon { color: var(--h-muted-foreground); flex-shrink: 0; }

    .h-ti-native {
      flex: 1; min-width: 0; border: 0; outline: none; background: transparent;
      font-family: var(--h-font-mono); font-size: 13px; color: var(--h-foreground);
      letter-spacing: 0.02em;
    }
    .h-ti-wrap--sm .h-ti-native { font-size: 12.5px; }
    .h-ti-wrap--lg .h-ti-native { font-size: 13.5px; }
    .h-ti-native:disabled { cursor: not-allowed; opacity: 0.5; }
    .h-ti-native::placeholder { color: var(--h-muted-foreground); font-family: var(--h-font-sans); font-size: 13px; }

    .h-ti-clear {
      display: flex; align-items: center; justify-content: center;
      width: 16px; height: 16px; flex-shrink: 0;
      border: none; background: none; cursor: pointer; padding: 0;
      color: var(--h-muted-foreground); border-radius: 4px;
      transition: color var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    .h-ti-clear:hover { color: var(--h-foreground); }
  `],
})
export class HTimeInputComponent implements FormValueControl<HTimeValue | null>, HFormFieldControl, AfterViewInit, OnDestroy {
  private readonly _autoId  = `h-ti-${_nextId++}`;
  private readonly _el      = inject(ElementRef<HTMLElement>);
  private readonly _overlay = inject(Overlay);
  private readonly _vcr     = inject(ViewContainerRef);

  readonly nativeId = computed(() => this.inputId() ?? this._autoId);

  readonly value    = model<HTimeValue | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid  = input(false, { transform: booleanAttribute });
  readonly errors   = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touched  = model<boolean>(false);
  readonly required = input(false, { transform: booleanAttribute });

  readonly size        = input<'sm' | 'default' | 'lg'>('default');
  readonly showSeconds = input(false);
  readonly step        = input(1);
  readonly placeholder = input<string | undefined>(undefined);
  readonly inputId     = input<string | undefined>(undefined);
  readonly ariaLabel   = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly describedById = input<string | undefined>(undefined, { alias: 'aria-describedby' });

  protected readonly focused   = signal(false);
  protected readonly _open     = signal(false);
  protected readonly _rawText  = signal<string | null>(null);

  private readonly _inputEl   = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');
  private readonly _pickerTpl = viewChild.required<TemplateRef<unknown>>('pickerTpl');
  private _overlayRef!: OverlayRef;

  protected readonly _placeholder = computed(() =>
    this.placeholder() ?? (this.showSeconds() ? 'HH:mm:ss' : 'HH:mm')
  );

  protected readonly _displayText = computed(() => {
    const raw = this._rawText();
    if (raw !== null) return raw;
    const v = this.value();
    return v ? formatTime(v, this.showSeconds()) : '';
  });

  protected readonly _pickerValue = computed(() => this.value());

  constructor() {
    effect(() => {
      this.value();
      untracked(() => this._rawText.set(null));
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

    this._overlayRef.backdropClick().subscribe(() => this._closePicker(false));
    this._overlayRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') this._closePicker(true);
    });
  }

  protected onBlur(): void {
    this.focused.set(false);
    this.touched.set(true);
    const raw = this._rawText();
    if (raw !== null) {
      const parsed = parseTime(raw);
      if (parsed) { this.value.set(parsed); }
      this._rawText.set(null);
    }
  }

  protected onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      const raw = this._rawText();
      if (raw !== null) {
        const parsed = parseTime(raw);
        if (parsed) { this.value.set(parsed); this._rawText.set(null); }
      } else {
        this._open() ? this._closePicker(true) : this._openPicker();
      }
    } else if (e.key === 'Escape') {
      this._closePicker(true);
    } else if (e.key === 'ArrowDown' || e.key === ' ') {
      if (!this._open()) { e.preventDefault(); this._openPicker(); }
    }
  }

  protected onTimeChange(v: HTimeValue | null): void {
    this.value.set(v);
    this._rawText.set(null);
  }

  protected clear(): void {
    this.value.set(null);
    this._rawText.set(null);
  }

  private _openPicker(): void {
    if (this._open() || this._overlayRef?.hasAttached()) return;
    this._overlayRef.attach(new TemplatePortal(this._pickerTpl(), this._vcr));
    this._open.set(true);
  }

  private _closePicker(focusInput: boolean): void {
    if (!this._open()) return;
    this._overlayRef.detach();
    this._open.set(false);
    if (focusInput) this._inputEl().nativeElement.focus();
  }

  ngOnDestroy(): void {
    this._overlayRef?.dispose();
  }
}
