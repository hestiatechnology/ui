import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export type StatusPillStatus = 'running' | 'idle' | 'error' | 'maintenance' | 'hold';

@Component({
  selector: 'h-status-pill',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="pillClasses" [attr.aria-label]="ariaLabel() || null">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    :host { display: inline-flex; }
  `]
})
export class HStatusPillComponent {
  readonly status = input<StatusPillStatus>('running');
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  get pillClasses() {
    return `h-status-pill h-status-pill--${this.status()}`;
  }
}
