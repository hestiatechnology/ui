import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'h-progress',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <div
        class="h-progress-track"
        role="progressbar"
          [attr.aria-valuenow]="indeterminate() ? null : value()"
        [attr.aria-valuemin]="0"
          [attr.aria-valuemax]="max()"
          [attr.aria-label]="ariaLabel() || null"
          [attr.aria-valuetext]="indeterminate() ? 'Loading…' : value() + '%'">
        <div
          class="h-progress-fill"
            [class.h-progress-fill--indeterminate]="indeterminate()"
            [style.width]="indeterminate() ? null : (value() / max() * 100) + '%'">
        </div>
      </div>
        @if (showValue() && !indeterminate()) {
          <div class="h-progress-label" aria-hidden="true">{{ value() }}%</div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .h-progress-track {
      height: 4px; border-radius: 4px;
      background: var(--h-muted); overflow: hidden;
    }
    .h-progress-fill {
      height: 100%; border-radius: 4px;
      background: var(--h-primary);
      transition: width var(--h-motion-product-base) var(--h-motion-product-ease);
    }
    .h-progress-fill--indeterminate {
      width: 30% !important;
      animation: h-indet 1.4s ease-in-out infinite;
    }
    .h-progress-label {
      font-family: var(--h-font-mono); font-size: 11px;
      color: var(--h-muted-foreground); margin-top: 3px;
    }
    @keyframes h-indet { 0%{margin-left:-30%} 50%{margin-left:50%} 100%{margin-left:120%} }
  `]
})
export class HProgressComponent {
  readonly value = input(0);
  readonly max = input(100);
  readonly indeterminate = input(false);
  readonly showValue = input(true);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
}
