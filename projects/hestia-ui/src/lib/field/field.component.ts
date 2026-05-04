import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  Input,
  Signal,
  booleanAttribute,
  computed,
  contentChild,
} from '@angular/core';
import { LucideAlertCircle } from '@lucide/angular';

export interface HFormFieldControl {
  readonly nativeId: Signal<string>;
}

export const H_FORM_FIELD_CONTROL = new InjectionToken<HFormFieldControl>('H_FORM_FIELD_CONTROL');

@Component({
  selector: 'h-field',
  standalone: true,
  imports: [LucideAlertCircle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-field">
      @if (label) {
        <label [attr.for]="_effectiveForId()" class="h-field-label">
          {{ label }}
          @if (required) { <span class="h-field-required" aria-hidden="true">*</span> }
        </label>
      }
      <ng-content></ng-content>
      @if (hint && !error) {
        <span class="h-field-hint" [id]="hintId">{{ hint }}</span>
      }
      @if (error) {
        <span class="h-field-error" [id]="errorId" role="alert">
          <svg lucideAlertCircle [size]="12" aria-hidden="true"></svg>
          {{ error }}
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

  @Input() label?: string;
  @Input() hint?: string;
  @Input() error?: string;
  @Input({ transform: booleanAttribute }) required = false;
  @Input('for') forId?: string;
  @Input() hintId?: string;
  @Input() errorId?: string;
}
