import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface HDonutSegment {
  value: number;
  color: string;
  label: string;
}

@Component({
  selector: 'h-donut',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.viewBox]="'0 0 ' + size() + ' ' + size()"
      style="transform: rotate(-90deg)"
      role="img"
      [attr.aria-label]="ariaLabel()"
    >
      @for (seg of computed_segments(); track seg.label) {
        <circle
          [attr.cx]="center()"
          [attr.cy]="center()"
          [attr.r]="radius()"
          fill="none"
          [attr.stroke]="seg.color"
          [attr.stroke-width]="strokeWidth()"
          [attr.stroke-dasharray]="seg.dashArray"
          [attr.stroke-dashoffset]="seg.dashOffset"
        />
      }
    </svg>
  `,
  styles: [`:host { display: inline-flex; }`],
})
export class HDonutComponent {
  readonly segments    = input<HDonutSegment[]>([]);
  readonly size        = input(80);
  readonly strokeWidth = input(12);
  readonly ariaLabel   = input('Donut chart');

  readonly center = computed(() => this.size() / 2);
  readonly radius = computed(() => (this.size() - this.strokeWidth() * 2) / 2);
  readonly circumference = computed(() => 2 * Math.PI * this.radius());

  readonly computed_segments = computed(() => {
    const c = this.circumference();
    const total = this.segments().reduce((s, seg) => s + seg.value, 0) || 100;
    let offset = 0;
    return this.segments().map(seg => {
      const len = (seg.value / total) * c;
      const dashOffset = -offset;
      offset += len;
      return { ...seg, dashArray: `${len} ${c - len}`, dashOffset };
    });
  });
}

@Component({
  selector: 'h-chart-legend',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-chart-legend">
      <span class="h-chart-legend-dot" [style.background]="color()"></span>
      <span class="h-chart-legend-label">{{ label() }}</span>
      @if (value()) {
        <span class="h-chart-legend-value">{{ value() }}</span>
      }
    </div>
  `,
  styles: [`
    :host { display: flex; }
    .h-chart-legend {
      display: flex; align-items: center; gap: 6px;
      font-size: 12px; font-family: var(--h-font-sans);
    }
    .h-chart-legend-dot { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }
    .h-chart-legend-label { flex: 1; color: var(--h-foreground); }
    .h-chart-legend-value { font-family: var(--h-font-mono); font-weight: 600; color: var(--h-foreground); }
  `],
})
export class HChartLegendComponent {
  readonly color = input.required<string>();
  readonly label = input.required<string>();
  readonly value = input('');
}
