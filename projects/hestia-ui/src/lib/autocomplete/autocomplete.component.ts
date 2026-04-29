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

const PANEL_POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top',    offsetY: 4  },
  { originX: 'start', originY: 'top',    overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

let _nextId = 0;

@Component({
  selector: 'h-autocomplete',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: H_FORM_FIELD_CONTROL, useExisting: HAutocompleteComponent }],
  template: `
    <div
      [class]="wrapClasses"
      [class.h-ac-wrap--focus]="focused()"
      [class.h-ac-wrap--error]="invalid()"
    >
      <input
        #inputEl
        [id]="nativeId()"
        type="text"
        class="h-ac-native"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [value]="_inputText()"
        [attr.aria-required]="required() || null"
        [attr.aria-invalid]="invalid() ? 'true' : null"
        [attr.aria-label]="ariaLabel() ?? null"
        [attr.aria-describedby]="describedById() ?? null"
        [attr.aria-expanded]="_open()"
        [attr.aria-haspopup]="'listbox'"
        [attr.aria-autocomplete]="'list'"
        [attr.aria-activedescendant]="_activeDescId()"
        role="combobox"
        autocomplete="off"
        (input)="onInput($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
        (keydown)="onKeydown($event)"
      />
      @if (value() !== null && !disabled()) {
        <button type="button" class="h-ac-clear" (click)="clear()" aria-label="Clear selection" tabindex="-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      }
      <svg class="h-ac-chevron" [class.h-ac-chevron--open]="_open()"
           width="14" height="14" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           aria-hidden="true">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </div>

    <ng-template #panelTpl>
      <div class="h-ac-panel" role="listbox" [attr.aria-label]="ariaLabel() ?? 'Options'">
        @for (opt of _filtered(); track $index) {
          <div
            class="h-ac-option"
            [class.h-ac-option--selected]="_isSelected(opt)"
            [class.h-ac-option--highlighted]="_highlightIdx() === $index"
            [id]="nativeId() + '-opt-' + $index"
            role="option"
            [attr.aria-selected]="_isSelected(opt)"
            (mousedown)="selectOption(opt, $event)"
          >
            {{ displayWith()(opt) }}
            <span class="h-ac-option-check">
              @if (_isSelected(opt)) {
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              }
            </span>
          </div>
        } @empty {
          <div class="h-ac-empty">No options found</div>
        }
      </div>
    </ng-template>
  `,
  styles: [`
    :host { display: block; width: 100%; }

    .h-ac-wrap {
      display: inline-flex; align-items: center; gap: 4px;
      background: var(--h-card); border: 1px solid var(--h-border); border-radius: 10px;
      height: 36px; padding: 0 10px 0 12px; width: 100%;
      transition: border-color var(--h-motion-product-quick) var(--h-motion-product-ease),
                  box-shadow var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-ac-wrap--sm  { height: 32px; }
    .h-ac-wrap--lg  { height: 44px; }
    .h-ac-wrap--focus { border-color: var(--h-ring); box-shadow: 0 0 0 3px rgba(0,61,165,0.20); }
    .h-ac-wrap--error { border-color: var(--h-destructive); }
    .h-ac-wrap--error.h-ac-wrap--focus { box-shadow: 0 0 0 3px rgba(180,35,24,0.20); }

    .h-ac-native {
      flex: 1; min-width: 0; border: 0; outline: none; background: transparent;
      font-family: var(--h-font-sans); font-size: 13.5px; color: var(--h-foreground);
    }
    .h-ac-wrap--sm .h-ac-native { font-size: 13px; }
    .h-ac-wrap--lg .h-ac-native { font-size: 14.5px; }
    .h-ac-native:disabled { cursor: not-allowed; opacity: 0.5; }
    .h-ac-native::placeholder { color: var(--h-muted-foreground); }

    .h-ac-clear {
      display: flex; align-items: center; justify-content: center;
      width: 16px; height: 16px; flex-shrink: 0;
      border: none; background: none; cursor: pointer; padding: 0;
      color: var(--h-muted-foreground); border-radius: 4px;
      transition: color var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    .h-ac-clear:hover { color: var(--h-foreground); }

    .h-ac-chevron {
      flex-shrink: 0; color: var(--h-muted-foreground);
      transition: transform var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-ac-chevron--open { transform: rotate(180deg); }

    /* Panel styles live in the overlay; use :host::ng-deep or global */
    .h-ac-panel {
      background: var(--h-popover); border: 1px solid var(--h-border);
      border-radius: var(--h-radius-md); box-shadow: var(--h-shadow-md);
      padding: 4px; max-height: 240px; overflow-y: auto;
      font-family: var(--h-font-sans);
      animation: h-ac-in var(--h-motion-product-base) var(--h-motion-product-ease) forwards;
    }
    @keyframes h-ac-in {
      from { opacity: 0; transform: translateY(-4px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .h-ac-option {
      display: flex; align-items: center; gap: 10px;
      padding: 8px 10px; border-radius: var(--h-radius-sm);
      font-size: 13.5px; color: var(--h-foreground); cursor: pointer;
      transition: background var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    .h-ac-option:hover { background: var(--h-muted); }
    .h-ac-option--highlighted { background: var(--h-muted); }
    .h-ac-option--selected { background: rgba(0,61,165,0.06); color: var(--h-primary); }
    .h-ac-option-check { width: 14px; flex-shrink: 0; color: var(--h-primary); display: flex; margin-left: auto; }
    .h-ac-empty { padding: 10px; text-align: center; font-size: 13px; color: var(--h-muted-foreground); }
  `],
})
export class HAutocompleteComponent<T = unknown> implements FormValueControl<T | null>, HFormFieldControl, AfterViewInit, OnDestroy {
  private readonly _autoId = `h-ac-${_nextId++}`;
  private readonly _el     = inject(ElementRef<HTMLElement>);
  private readonly _overlay = inject(Overlay);
  private readonly _vcr    = inject(ViewContainerRef);

  readonly nativeId = computed(() => this.inputId() ?? this._autoId);

  readonly value    = model<T | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid  = input(false, { transform: booleanAttribute });
  readonly errors   = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touched  = model<boolean>(false);
  readonly required = input(false, { transform: booleanAttribute });

  readonly options     = input<T[]>([]);
  readonly displayWith = input<(v: T) => string>((v) => String(v));
  readonly compareWith = input<(a: T, b: T) => boolean>((a, b) => a === b);
  readonly placeholder = input('');
  readonly size        = input<'sm' | 'default' | 'lg'>('default');
  readonly inputId     = input<string | undefined>(undefined);
  readonly ariaLabel   = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly describedById = input<string | undefined>(undefined, { alias: 'aria-describedby' });

  protected readonly focused       = signal(false);
  protected readonly _open         = signal(false);
  protected readonly _inputText    = signal('');
  protected readonly _searching    = signal(false);
  protected readonly _highlightIdx = signal(-1);

  private readonly _inputEl   = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');
  private readonly _panelTpl  = viewChild.required<TemplateRef<unknown>>('panelTpl');
  private _overlayRef!: OverlayRef;

  protected readonly _activeDescId = computed(() => {
    const i = this._highlightIdx();
    return i >= 0 ? `${this.nativeId()}-opt-${i}` : null;
  });

  protected readonly _filtered = computed(() => {
    if (!this._searching()) return this.options();
    const q = this._inputText().toLowerCase();
    if (!q) return this.options();
    return this.options().filter(o => this.displayWith()(o).toLowerCase().includes(q));
  });

  get wrapClasses(): string {
    return ['h-ac-wrap', this.size() !== 'default' ? `h-ac-wrap--${this.size()}` : ''].filter(Boolean).join(' ');
  }

  constructor() {
    effect(() => {
      const v = this.value();
      if (v !== null) {
        this._inputText.set(this.displayWith()(v));
      } else {
        if (!this._searching()) this._inputText.set('');
      }
    });
  }

  ngAfterViewInit(): void {
    const strategy = this._overlay.position()
      .flexibleConnectedTo(this._el)
      .withPositions(PANEL_POSITIONS)
      .withPush(false);

    this._overlayRef = this._overlay.create({
      positionStrategy: strategy,
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this._overlayRef.backdropClick().subscribe(() => this._closePanel(false));
    this._overlayRef.keydownEvents().subscribe(e => {
      if (e.key === 'Escape') this._closePanel(true);
    });
  }

  protected onFocus(): void {
    this.focused.set(true);
    if (!this._open()) {
      this._searching.set(false);
      this._openPanel();
    }
  }

  protected onInput(e: Event): void {
    const text = (e.target as HTMLInputElement).value;
    this._inputText.set(text);
    this._searching.set(true);
    this._highlightIdx.set(-1);
    if (!this._open()) this._openPanel();
    else this._overlayRef.updatePosition();
  }

  protected onBlur(): void {
    this.focused.set(false);
    this.touched.set(true);
    const v = this.value();
    if (!this._searching() || v === null) {
      this._inputText.set(v !== null ? this.displayWith()(v) : '');
    }
    this._searching.set(false);
  }

  protected onKeydown(e: KeyboardEvent): void {
    const opts = this._filtered();
    const idx  = this._highlightIdx();

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!this._open()) { this._openPanel(); return; }
      this._highlightIdx.set(Math.min(idx + 1, opts.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._highlightIdx.set(Math.max(idx - 1, 0));
    } else if (e.key === 'Enter') {
      if (this._open() && idx >= 0 && opts[idx]) {
        e.preventDefault();
        this._commitOption(opts[idx]);
      }
    } else if (e.key === 'Escape') {
      this._closePanel(true);
    }
  }

  protected selectOption(opt: T, e: MouseEvent): void {
    e.preventDefault();
    this._commitOption(opt);
  }

  protected clear(): void {
    this.value.set(null);
    this._inputText.set('');
    this._searching.set(false);
    this._highlightIdx.set(-1);
    this._inputEl().nativeElement.focus();
  }

  protected _isSelected(opt: T): boolean {
    const v = this.value();
    if (v === null) return false;
    return this.compareWith()(opt, v);
  }

  private _commitOption(opt: T): void {
    this._searching.set(false);
    this.value.set(opt);
    this._inputText.set(this.displayWith()(opt));
    this._highlightIdx.set(-1);
    this._closePanel(true);
  }

  private _openPanel(): void {
    if (this._open() || this._overlayRef?.hasAttached()) return;
    this._overlayRef.updateSize({ width: this._el.nativeElement.offsetWidth });
    this._overlayRef.attach(new TemplatePortal(this._panelTpl(), this._vcr));
    this._open.set(true);
  }

  private _closePanel(focusInput: boolean): void {
    if (!this._open()) return;
    this._overlayRef.detach();
    this._open.set(false);
    this._highlightIdx.set(-1);
    if (focusInput) this._inputEl().nativeElement.focus();
  }

  ngOnDestroy(): void {
    this._overlayRef?.dispose();
  }
}
