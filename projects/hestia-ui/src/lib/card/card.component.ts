import { Component, Input, ChangeDetectionStrategy, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'h-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="cardClasses" [attr.aria-label]="ariaLabel || null">
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
  @Input({ transform: booleanAttribute }) padded = true;
  @Input({ transform: booleanAttribute }) featured = false;
  @Input('aria-label') ariaLabel?: string;

  get cardClasses() {
    return ['h-card', this.padded ? 'h-card--padded' : '', this.featured ? 'h-card--featured' : ''].filter(Boolean).join(' ');
  }
}
