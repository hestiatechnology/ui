import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'h-sparkline',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.viewBox]="'0 0 200 ' + height()"
      preserveAspectRatio="none"
      class="h-sparkline"
      [style.height.px]="height()"
      aria-hidden="true"
    >
      <polyline
        [attr.points]="points()"
        fill="none"
        [attr.stroke]="color()"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        [attr.cx]="200"
        [attr.cy]="lastY()"
        r="2.5"
        [attr.fill]="color()"
      />
    </svg>
  `,
  styles: [`
    :host { display: block; }
    .h-sparkline { width: 100%; display: block; margin-top: 8px; }
  `],
})
export class HSparklineComponent {
  readonly values = input<number[]>([]);
  readonly mini   = input(false);
  readonly color  = input('var(--h-primary)');

  readonly height = computed(() => this.mini() ? 28 : 44);

  private readonly range = computed(() => {
    const v = this.values();
    if (!v.length) return { min: 0, max: 1 };
    return { min: Math.min(...v), max: Math.max(...v) };
  });

  readonly points = computed(() => {
    const v = this.values();
    if (!v.length) return '';
    const { min, max } = this.range();
    const h = this.height();
    const spread = max - min || 1;
    return v
      .map((val, i) => {
        const x = (i / (v.length - 1)) * 200;
        const y = h - ((val - min) / spread) * (h - 4) - 2;
        return `${x},${y}`;
      })
      .join(' ');
  });

  readonly lastY = computed(() => {
    const v = this.values();
    if (!v.length) return 0;
    const { min, max } = this.range();
    const h = this.height();
    const spread = max - min || 1;
    return h - ((v[v.length - 1] - min) / spread) * (h - 4) - 2;
  });
}
