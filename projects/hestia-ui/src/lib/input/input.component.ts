import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { H_FORM_FIELD_CONTROL, HFormFieldControl } from '../field/field.component';

export type InputSize = 'sm' | 'default' | 'lg';

let _nextId = 0;

@Component({
  selector: 'h-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: H_FORM_FIELD_CONTROL, useExisting: HInputComponent }],
  template: `
    <div [class]="wrapClasses" [class.h-input-wrap--focus]="focused()" [class.h-input-wrap--error]="invalid()">
      @if (hasIcon()) {
        <span class="h-input-icon" aria-hidden="true"><ng-content select="[slot=icon]"></ng-content></span>
      }
      <input
        [id]="nativeId()"
        [type]="type()"
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
        class="h-input-native">
      @if (suffix()) {
        <span class="h-input-suffix" aria-hidden="true">{{ suffix() }}</span>
      }
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .h-input-wrap {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--h-card);
      border: 1px solid var(--h-border);
      border-radius: 10px;
      transition: border-color var(--h-motion-product-quick) var(--h-motion-product-ease),
                  box-shadow var(--h-motion-product-quick) var(--h-motion-product-ease);
      width: 100%;
    }
    .h-input-wrap--sm      { height: 32px; padding: 0 12px 0 10px; }
    .h-input-wrap--default { height: 36px; padding: 0 12px 0 10px; }
    .h-input-wrap--lg      { height: 44px; padding: 0 14px 0 12px; }
    .h-input-wrap--no-icon.h-input-wrap--sm      { padding: 0 12px; }
    .h-input-wrap--no-icon.h-input-wrap--default { padding: 0 12px; }
    .h-input-wrap--no-icon.h-input-wrap--lg      { padding: 0 14px; }
    .h-input-wrap--focus  { border-color: var(--h-ring); box-shadow: 0 0 0 3px rgba(0,61,165,0.20); }
    .h-input-wrap--error  { border-color: var(--h-destructive); }
    .h-input-wrap--error.h-input-wrap--focus { box-shadow: 0 0 0 3px rgba(180,35,24,0.20); }
    .h-input-native {
      flex: 1; border: 0; outline: none; background: transparent;
      font-family: var(--h-font-sans); color: var(--h-foreground); min-width: 0;
    }
    .h-input-wrap--sm      .h-input-native { font-size: 13px; }
    .h-input-wrap--default .h-input-native { font-size: 13.5px; }
    .h-input-wrap--lg      .h-input-native { font-size: 14.5px; }
    .h-input-native:disabled { cursor: not-allowed; }
    .h-input-native::placeholder { color: var(--h-muted-foreground); }
    .h-input-icon  { color: var(--h-muted-foreground); display: flex; flex-shrink: 0; }
    .h-input-suffix { color: var(--h-muted-foreground); font-size: 12px; font-family: var(--h-font-mono); white-space: nowrap; }
  `],
})
export class HInputComponent implements FormValueControl<string>, HFormFieldControl {
  private readonly _autoId = `h-input-${_nextId++}`;

  readonly nativeId = computed(() => this.inputId() ?? this._autoId);

  readonly value = model<string>('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touched = model<boolean>(false);
  readonly required = input(false, { transform: booleanAttribute });

  readonly size = input<InputSize>('default');
  readonly type = input('text');
  readonly placeholder = input('');
  readonly suffix = input<string | undefined>(undefined);
  readonly hasIcon = input(false, { transform: booleanAttribute });
  readonly inputId = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly describedById = input<string | undefined>(undefined, { alias: 'aria-describedby' });

  protected readonly focused = signal(false);

  protected onInput(e: Event): void {
    this.value.set((e.target as HTMLInputElement).value);
  }

  protected onBlur(): void {
    this.focused.set(false);
    this.touched.set(true);
  }

  get wrapClasses(): string {
    return [
      'h-input-wrap',
      `h-input-wrap--${this.size()}`,
      this.hasIcon() ? '' : 'h-input-wrap--no-icon',
    ].filter(Boolean).join(' ');
  }
}
