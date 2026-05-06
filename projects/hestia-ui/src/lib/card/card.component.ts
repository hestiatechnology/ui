import { Component, ChangeDetectionStrategy, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'h-card',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="cardClasses" [attr.aria-label]="ariaLabel() || null">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .h-card {
      background: var(--h-card); border: 1px solid var(--h-border);
      border-radius: 12px; box-shadow: var(--h-shadow-sm);
    }
    .h-card--padded { padding: 20px; }
    .h-card--featured {
      background: rgba(0,61,165,0.04);
      border: 2px solid rgba(0,61,165,0.30);
    }
  `]
})
export class HCardComponent {
  readonly padded = input(true, { transform: booleanAttribute });
  readonly featured = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  get cardClasses() {
    return ['h-card', this.padded() ? 'h-card--padded' : '', this.featured() ? 'h-card--featured' : ''].filter(Boolean).join(' ');
  }
}
