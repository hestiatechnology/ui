import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  computed,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { H_FORM_FIELD_CONTROL, HFormFieldControl } from '../field/field.component';

let _nextId = 0;

@Component({
  selector: 'h-chip-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: H_FORM_FIELD_CONTROL, useExisting: HChipInputComponent }],
  template: `
    <div
      class="h-chip-wrap"
      [class.h-chip-wrap--focus]="focused()"
      [class.h-chip-wrap--error]="invalid()"
      [class.h-chip-wrap--disabled]="disabled()"
      (click)="focusInput()"
    >
      @for (chip of value(); track chip; let i = $index) {
        <span class="h-chip">
          <span class="h-chip-label">{{ chip }}</span>
          @if (!disabled()) {
            <button
              type="button"
              class="h-chip-remove"
              (click)="removeChip(i); $event.stopPropagation()"
              [attr.aria-label]="'Remove ' + chip"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          }
        </span>
      }

      <input
        #inputRef
        [id]="nativeId()"
        type="text"
        class="h-chip-input-native"
        [placeholder]="value().length === 0 ? placeholder() : ''"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel() ?? null"
        [attr.aria-required]="required() || null"
        [attr.aria-invalid]="invalid() ? 'true' : null"
        [style.width.px]="_inputWidth()"
        [value]="_draft()"
        (input)="onInput($event)"
        (keydown)="onKeydown($event)"
        (focus)="focused.set(true)"
        (blur)="onBlur()"
      />
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }

    .h-chip-wrap {
      display: flex; flex-wrap: wrap; align-items: center; gap: 4px;
      min-height: 36px; padding: 4px 10px;
      background: var(--h-card); border: 1px solid var(--h-border);
      border-radius: 10px; cursor: text;
      transition: border-color var(--h-motion-product-quick) var(--h-motion-product-ease),
                  box-shadow var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-chip-wrap--focus   { border-color: var(--h-ring); box-shadow: 0 0 0 3px rgba(0,61,165,0.20); }
    .h-chip-wrap--error   { border-color: var(--h-destructive); }
    .h-chip-wrap--error.h-chip-wrap--focus { box-shadow: 0 0 0 3px rgba(180,35,24,0.20); }
    .h-chip-wrap--disabled { opacity: 0.5; cursor: not-allowed; }

    .h-chip {
      display: inline-flex; align-items: center; gap: 4px;
      background: rgba(0,61,165,0.08); color: var(--h-primary);
      border: 1px solid rgba(0,61,165,0.18); border-radius: 6px;
      padding: 1px 6px; font-size: 12px; font-family: var(--h-font-sans);
      font-weight: 500; max-width: 200px;
    }
    .h-chip-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .h-chip-remove {
      display: flex; align-items: center; justify-content: center;
      width: 14px; height: 14px; border: none; background: none;
      color: inherit; cursor: pointer; padding: 0; border-radius: 3px; flex-shrink: 0;
      opacity: 0.7;
      transition: opacity var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    .h-chip-remove:hover { opacity: 1; }

    .h-chip-input-native {
      flex: 1; min-width: 80px; border: 0; outline: none; background: transparent;
      font-family: var(--h-font-sans); font-size: 13.5px; color: var(--h-foreground);
      padding: 0;
    }
    .h-chip-input-native::placeholder { color: var(--h-muted-foreground); }
    .h-chip-input-native:disabled { cursor: not-allowed; }
  `],
})
export class HChipInputComponent implements FormValueControl<string[]>, HFormFieldControl {
  private readonly _autoId = `h-chip-input-${_nextId++}`;

  readonly nativeId = computed(() => this.inputId() ?? this._autoId);

  readonly value    = model<string[]>([]);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid  = input(false, { transform: booleanAttribute });
  readonly errors   = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touched  = model<boolean>(false);
  readonly required = input(false, { transform: booleanAttribute });

  readonly placeholder = input('Add…');
  readonly separator   = input<'enter' | 'comma' | 'both'>('both');
  readonly inputId     = input<string | undefined>(undefined);
  readonly ariaLabel   = input<string | undefined>(undefined, { alias: 'aria-label' });

  protected readonly focused = signal(false);
  protected readonly _draft  = signal('');

  protected readonly _inputWidth = computed(() => {
    const len = this._draft().length;
    return Math.max(80, len * 8 + 20);
  });

  private readonly _inputRef = viewChild<ElementRef<HTMLInputElement>>('inputRef');

  focusInput(): void {
    this._inputRef()?.nativeElement.focus();
  }

  protected onInput(e: Event): void {
    const raw = (e.target as HTMLInputElement).value;
    const sep = this.separator();
    if ((sep === 'comma' || sep === 'both') && raw.endsWith(',')) {
      this._addChip(raw.slice(0, -1));
    } else {
      this._draft.set(raw);
    }
  }

  protected onKeydown(e: KeyboardEvent): void {
    const sep = this.separator();
    if (e.key === 'Enter' && (sep === 'enter' || sep === 'both')) {
      e.preventDefault();
      this._addChip(this._draft());
    } else if (e.key === 'Backspace' && this._draft() === '') {
      const chips = this.value();
      if (chips.length > 0) {
        this.value.set(chips.slice(0, -1));
      }
    }
  }

  protected onBlur(): void {
    if (this._draft().trim()) this._addChip(this._draft());
    this.focused.set(false);
    this.touched.set(true);
  }

  protected removeChip(index: number): void {
    this.value.update(chips => chips.filter((_, i) => i !== index));
  }

  private _addChip(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) {
      this._draft.set('');
      return;
    }
    if (!this.value().includes(trimmed)) {
      this.value.update(chips => [...chips, trimmed]);
    }
    this._draft.set('');
    const inputEl = this._inputRef()?.nativeElement;
    if (inputEl) inputEl.value = '';
  }
}
