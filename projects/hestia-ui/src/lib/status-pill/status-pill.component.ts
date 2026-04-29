import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type StatusPillStatus = 'running' | 'idle' | 'error' | 'maintenance' | 'hold';

@Component({
  selector: 'h-status-pill',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="pillClasses" [attr.aria-label]="ariaLabel || null">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    :host { display: inline-flex; }
  `]
})
export class HStatusPillComponent {
  @Input() status: StatusPillStatus = 'running';
  @Input('aria-label') ariaLabel?: string;

  get pillClasses() {
    return `h-status-pill h-status-pill--${this.status}`;
  }
}
