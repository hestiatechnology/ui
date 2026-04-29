import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'h-ring-progress',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.viewBox]="'0 0 ' + size() + ' ' + size()"
      style="transform: rotate(-90deg)"
      role="progressbar"
      [attr.aria-valuenow]="value()"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="100"
      [attr.aria-label]="ariaLabel() || (value() + '%')"
    >
      <circle
        [attr.cx]="center()"
        [attr.cy]="center()"
        [attr.r]="radius()"
        fill="none"
        stroke="var(--h-muted)"
        [attr.stroke-width]="strokeWidth()"
      />
      <circle
        [attr.cx]="center()"
        [attr.cy]="center()"
        [attr.r]="radius()"
        fill="none"
        [attr.stroke]="color()"
        [attr.stroke-width]="strokeWidth()"
        stroke-linecap="round"
        [attr.stroke-dasharray]="dashArray()"
      />
    </svg>
  `,
  styles: [`:host { display: inline-flex; }`],
})
export class HRingProgressComponent {
  readonly value       = input(0);
  readonly size        = input(40);
  readonly strokeWidth = input(3);
  readonly color       = input('var(--h-primary)');
  readonly ariaLabel   = input('');

  readonly center = computed(() => this.size() / 2);
  readonly radius = computed(() => (this.size() - this.strokeWidth() * 2) / 2);
  readonly circumference = computed(() => 2 * Math.PI * this.radius());
  readonly dashArray = computed(() => {
    const filled = (this.value() / 100) * this.circumference();
    return `${filled} ${this.circumference()}`;
  });
}
