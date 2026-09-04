import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  Signal,
  booleanAttribute,
  computed,
  contentChild,
  input,
} from '@angular/core';
import { LucideAlertCircle } from '@lucide/angular';

export type HFieldShowErrorWhen = 'touched' | 'dirty' | 'always' | 'never';

export interface HFormFieldControl {
  readonly nativeId: Signal<string>;
  readonly touched?: Signal<boolean>;
  readonly dirty?: Signal<boolean>;
  readonly invalid?: Signal<boolean>;
  readonly showError?: Signal<boolean>;
}

export const H_FORM_FIELD_CONTROL = new InjectionToken<HFormFieldControl>('H_FORM_FIELD_CONTROL');

@Component({
  selector: 'h-field',
  standalone: true,
  imports: [LucideAlertCircle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-field">
      @if (label()) {
        <label [attr.for]="_effectiveForId()" class="h-field-label">
          {{ label() }}
          @if (required()) { <span class="h-field-required" aria-hidden="true">*</span> }
        </label>
      }
      <ng-content></ng-content>
      @if (hint() && !_hasVisibleError()) {
        <span class="h-field-hint" [id]="hintId()">{{ hint() }}</span>
      }
      @if (_hasVisibleError()) {
        <span class="h-field-error" [id]="errorId()" role="alert">
          <svg lucideAlertCircle [size]="12" aria-hidden="true"></svg>
          {{ error() }}
        </span>
      }
    </div>
  `,
  styles: [`
    .h-field { display: flex; flex-direction: column; gap: 6px; width: 100%; }
    .h-field-label { font-size: 13px; font-weight: 500; color: var(--h-foreground); font-family: var(--h-font-sans); }
    .h-field-required { color: var(--h-destructive); margin-left: 2px; }
    .h-field-hint  { font-size: 12px; color: var(--h-muted-foreground); }
    .h-field-error { font-size: 12px; color: var(--h-destructive); display: flex; align-items: center; gap: 4px; }
  `],
})
export class HFieldComponent {
  private readonly _control = contentChild(H_FORM_FIELD_CONTROL);

  protected readonly _effectiveForId = computed(() => {
    const control = this._control();
    return control ? control.nativeId() : (this.forId ?? null);
  });

  readonly label = input<string | undefined>(undefined);
  readonly hint = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly showError = input<boolean | undefined>(undefined);
  readonly showErrorWhen = input<HFieldShowErrorWhen>('touched');
  readonly required = input(false, { transform: booleanAttribute });
  readonly forId = input<string | undefined>(undefined, { alias: 'for' });
  readonly hintId = input<string | undefined>(undefined);
  readonly errorId = input<string | undefined>(undefined);

  protected readonly _hasVisibleError = computed(() => {
    const errorText = this.error();
    if (!errorText) return false;

    // Explicit manual override via [showError]
    const explicitShowError = this.showError();
    if (explicitShowError !== undefined) {
      return explicitShowError;
    }

    const control = this._control();
    // If no control is projected, show the error directly if provided
    if (!control) {
      return true;
    }

    const when = this.showErrorWhen();
    if (when === 'always') return true;
    if (when === 'never') return false;
    if (when === 'dirty') return Boolean(control.dirty?.());
    // Default 'touched'
    return Boolean(control.touched?.());
  });
}
