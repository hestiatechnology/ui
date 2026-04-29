import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';

export const H_RADIO_GROUP = new InjectionToken<HRadioGroupComponent>('H_RADIO_GROUP');

@Component({
  selector: 'h-radio-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: H_RADIO_GROUP, useExisting: HRadioGroupComponent }],
  host: { role: 'radiogroup', '[attr.aria-label]': 'ariaLabel() ?? null' },
  template: `<div class="h-radio-group"><ng-content></ng-content></div>`,
  styles: [`.h-radio-group { display: flex; flex-direction: column; gap: 8px; }`],
})
export class HRadioGroupComponent implements FormValueControl<unknown> {
  readonly value = model<unknown>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touched = model<boolean>(false);
  readonly required = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
}

@Component({
  selector: 'h-radio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label
      class="h-radio-label"
      [class.h-radio-label--checked]="isChecked()"
      [class.h-radio-label--disabled]="disabled()">
      <input
        type="radio"
        [name]="name() ?? null"
        [value]="value()"
        [checked]="isChecked()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel() ?? null"
        (change)="select()"
        (blur)="onBlur()"
        class="h-radio-native">
      <span class="h-radio-indicator">
        @if (isChecked()) { <span class="h-radio-dot" aria-hidden="true"></span> }
      </span>
      @if (label() || description()) {
        <div class="h-radio-content">
          @if (label()) { <div class="h-radio-label-text">{{ label() }}</div> }
          @if (description()) { <div class="h-radio-desc">{{ description() }}</div> }
        </div>
      }
      <ng-content></ng-content>
    </label>
  `,
  styles: [`
    :host { display: block; }
    .h-radio-label {
      display: flex; align-items: flex-start; gap: 10px; padding: 8px 10px;
      border-radius: 10px; border: 1px solid var(--h-border); background: var(--h-card);
      cursor: pointer; font-family: var(--h-font-sans);
      transition: border-color var(--h-motion-product-quick) var(--h-motion-product-ease),
                  background var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-radio-label--checked { border-color: var(--h-primary); background: rgba(0,61,165,0.04); }
    .h-radio-label--disabled { cursor: not-allowed; opacity: 0.6; }
    .h-radio-native { position: absolute; opacity: 0; width: 0; height: 0; }
    .h-radio-indicator {
      width: 16px; height: 16px; border-radius: 9999px; flex-shrink: 0; margin-top: 2px;
      border: 1px solid var(--h-border); display: grid; place-items: center;
      transition: border-color var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-radio-label--checked .h-radio-indicator { border-color: var(--h-primary); }
    .h-radio-dot { width: 8px; height: 8px; border-radius: 9999px; background: var(--h-primary); }
    .h-radio-native:focus-visible ~ .h-radio-indicator { outline: 2px solid var(--h-ring); outline-offset: 2px; }
    .h-radio-label-text { font-size: 13.5px; font-weight: 500; color: var(--h-foreground); }
    .h-radio-desc { font-size: 12px; color: var(--h-muted-foreground); margin-top: 2px; }
  `],
})
export class HRadioComponent {
  private readonly group = inject(H_RADIO_GROUP, { optional: true });

  readonly value = input<unknown>(undefined);
  readonly name = input<string | undefined>(undefined);
  readonly label = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  protected readonly isChecked = computed(() => this.group != null && this.group.value() === this.value());

  protected select(): void {
    if (this.disabled() || this.group == null) return;
    this.group.value.set(this.value());
    this.group.touched.set(true);
  }

  protected onBlur(): void {
    this.group?.touched.set(true);
  }
}
