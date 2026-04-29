import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  input,
  model,
} from '@angular/core';
import { FormCheckboxControl, ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'h-checkbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="h-checkbox-label" [class.h-checkbox-label--disabled]="disabled()">
      <span
        class="h-checkbox-box"
        [class.h-checkbox-box--checked]="checked()"
        [class.h-checkbox-box--indeterminate]="indeterminate()">
        <input
          type="checkbox"
          [checked]="checked()"
          [indeterminate]="indeterminate()"
          [disabled]="disabled()"
          [attr.aria-checked]="indeterminate() ? 'mixed' : checked()"
          [attr.aria-label]="ariaLabel() ?? null"
          (change)="toggle()"
          (blur)="touched.set(true)"
          class="h-checkbox-native">
        @if (checked() && !indeterminate()) {
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
        }
        @if (indeterminate()) {
          <span class="h-checkbox-dash" aria-hidden="true"></span>
        }
      </span>
      @if (label()) { <span>{{ label() }}</span> }
      <ng-content></ng-content>
    </label>
  `,
  styles: [`
    :host { display: inline-block; }
    .h-checkbox-label {
      display: inline-flex; align-items: center; gap: 10px;
      font-size: 13.5px; cursor: pointer; color: var(--h-foreground);
      font-family: var(--h-font-sans); user-select: none;
    }
    .h-checkbox-label--disabled { cursor: not-allowed; color: var(--h-muted-foreground); opacity: 0.6; }
    .h-checkbox-box {
      width: 16px; height: 16px; border-radius: 4px; flex-shrink: 0;
      border: 1px solid var(--h-border); background: var(--h-card);
      display: grid; place-items: center; position: relative;
      transition: border-color var(--h-motion-product-quick) var(--h-motion-product-ease),
                  background var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-checkbox-box--checked, .h-checkbox-box--indeterminate {
      border-color: var(--h-primary); background: var(--h-primary);
    }
    .h-checkbox-native {
      position: absolute; inset: 0; opacity: 0; cursor: inherit;
      width: 100%; height: 100%; margin: 0;
    }
    .h-checkbox-native:focus-visible + * { outline: 2px solid var(--h-ring); outline-offset: 2px; }
    .h-checkbox-box:has(.h-checkbox-native:focus-visible) { outline: 2px solid var(--h-ring); outline-offset: 2px; }
    .h-checkbox-dash { width: 8px; height: 2px; background: white; }
  `],
})
export class HCheckboxComponent implements FormCheckboxControl {
  readonly checked = model<boolean>(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touched = model<boolean>(false);
  readonly required = input(false, { transform: booleanAttribute });

  readonly label = input<string | undefined>(undefined);
  readonly indeterminate = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  protected toggle(): void {
    if (this.disabled()) return;
    this.checked.set(!this.checked());
  }
}
