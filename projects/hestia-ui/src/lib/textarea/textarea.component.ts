import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  model,
  signal,
} from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { H_FORM_FIELD_CONTROL, HFormFieldControl } from '../field/field.component';

export type TextareaResize = 'none' | 'vertical' | 'both';

let _nextId = 0;

@Component({
  selector: 'h-textarea',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: H_FORM_FIELD_CONTROL, useExisting: HTextareaComponent }],
  template: `
    <div
      [class]="wrapClasses"
      [class.h-textarea-wrap--focus]="focused()"
      [class.h-textarea-wrap--error]="invalid()"
    >
      <textarea
        [id]="nativeId()"
        [rows]="rows()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [attr.aria-invalid]="invalid() ? 'true' : null"
        [attr.aria-describedby]="describedById() ?? null"
        [attr.aria-required]="required() || null"
        [attr.aria-label]="ariaLabel() ?? null"
        [value]="value()"
        (input)="onInput($event)"
        (focus)="focused.set(true)"
        (blur)="onBlur()"
        class="h-textarea-native"
      ></textarea>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }

    .h-textarea-wrap {
      display: block;
      background: var(--h-card);
      border: 1px solid var(--h-border);
      border-radius: 10px;
      padding: 8px 12px;
      transition: border-color var(--h-motion-product-quick) var(--h-motion-product-ease),
                  box-shadow var(--h-motion-product-quick) var(--h-motion-product-ease);
      width: 100%;
    }
    .h-textarea-wrap--focus { border-color: var(--h-ring); box-shadow: 0 0 0 3px rgba(0,61,165,0.20); }
    .h-textarea-wrap--error { border-color: var(--h-destructive); }
    .h-textarea-wrap--error.h-textarea-wrap--focus { box-shadow: 0 0 0 3px rgba(180,35,24,0.20); }

    .h-textarea-native {
      display: block; width: 100%;
      border: 0; outline: none; background: transparent;
      font-family: var(--h-font-sans); font-size: 13.5px; line-height: 1.6;
      color: var(--h-foreground);
      resize: vertical;
      min-height: 60px;
    }
    .h-textarea-wrap--resize-none .h-textarea-native  { resize: none; }
    .h-textarea-wrap--resize-both .h-textarea-native  { resize: both; }
    .h-textarea-native:disabled { cursor: not-allowed; opacity: 0.5; }
    .h-textarea-native::placeholder { color: var(--h-muted-foreground); }
  `],
})
export class HTextareaComponent implements FormValueControl<string>, HFormFieldControl {
  private readonly _autoId = `h-textarea-${_nextId++}`;

  readonly nativeId = computed(() => this.inputId() ?? this._autoId);

  readonly value    = model<string>('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid  = input(false, { transform: booleanAttribute });
  readonly errors   = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touched  = model<boolean>(false);
  readonly required = input(false, { transform: booleanAttribute });

  readonly rows        = input(3);
  readonly placeholder = input('');
  readonly resize      = input<TextareaResize>('vertical');
  readonly inputId     = input<string | undefined>(undefined);
  readonly ariaLabel   = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly describedById = input<string | undefined>(undefined, { alias: 'aria-describedby' });

  protected readonly focused = signal(false);

  protected onInput(e: Event): void {
    this.value.set((e.target as HTMLTextAreaElement).value);
  }

  protected onBlur(): void {
    this.focused.set(false);
    this.touched.set(true);
  }

  get wrapClasses(): string {
    return [
      'h-textarea-wrap',
      this.resize() !== 'vertical' ? `h-textarea-wrap--resize-${this.resize()}` : '',
    ].filter(Boolean).join(' ');
  }
}
