import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  input,
  model,
} from '@angular/core';
import { FormCheckboxControl, ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'h-switch',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-switch-row">
      @if (label()) {
        <div class="h-switch-text">
          <span class="h-switch-label">{{ label() }}</span>
          @if (description()) { <span class="h-switch-desc">{{ description() }}</span> }
        </div>
      }
      <button
        type="button"
        role="switch"
        [attr.aria-checked]="checked()"
        [attr.aria-label]="ariaLabel() ?? label() ?? null"
        [disabled]="disabled()"
        (click)="toggle()"
        (blur)="touched.set(true)"
        class="h-switch-track"
        [class.h-switch-track--on]="checked()">
        <span class="h-switch-thumb" [class.h-switch-thumb--on]="checked()" aria-hidden="true"></span>
      </button>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .h-switch-row {
      display: flex; align-items: center; justify-content: space-between;
      gap: 16px; padding: 8px 0;
    }
    .h-switch-text { display: flex; flex-direction: column; gap: 1px; }
    .h-switch-label { font-size: 13.5px; font-weight: 500; color: var(--h-foreground); font-family: var(--h-font-sans); }
    .h-switch-desc  { font-size: 12px; color: var(--h-muted-foreground); font-family: var(--h-font-sans); }
    .h-switch-track {
      width: 36px; height: 20px; border-radius: 9999px;
      background: var(--h-border-strong); border: 0; cursor: pointer;
      position: relative; flex-shrink: 0;
      transition: background var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-switch-track:focus-visible { outline: 2px solid var(--h-ring); outline-offset: 2px; }
    .h-switch-track:disabled { opacity: 0.5; cursor: not-allowed; }
    .h-switch-track--on { background: var(--h-primary); }
    .h-switch-thumb {
      position: absolute; top: 2px; left: 2px;
      width: 16px; height: 16px; border-radius: 9999px;
      background: #fff; box-shadow: var(--h-shadow-xs);
      transition: left var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-switch-thumb--on { left: 18px; }
  `],
})
export class HSwitchComponent implements FormCheckboxControl {
  readonly checked = model<boolean>(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touched = model<boolean>(false);

  readonly label = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  protected toggle(): void {
    if (this.disabled()) return;
    this.checked.set(!this.checked());
  }
}
