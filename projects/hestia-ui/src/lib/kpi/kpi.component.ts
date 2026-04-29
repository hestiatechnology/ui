import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'h-kpi',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-kpi-host' },
  template: `
    <div class="h-kpi">
      <div class="h-kpi-label">{{ label() }}</div>
      <div class="h-kpi-row">
        <span class="h-kpi-value">{{ value() }}</span>
        @if (delta()) {
          <span class="h-kpi-delta" [attr.data-positive]="isPositive()">
            <svg class="h-kpi-delta-arrow" width="11" height="11" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 aria-hidden="true">
              @if (trend() === 'up') {
                <path d="M12 19V5M5 12l7-7 7 7"/>
              } @else {
                <path d="M12 5v14M5 12l7 7 7-7"/>
              }
            </svg>
            {{ delta() }}
          </span>
        }
      </div>
      @if (sparkValues().length > 0) {
        <svg class="h-kpi-spark" viewBox="0 0 200 28" preserveAspectRatio="none"
             aria-hidden="true">
          <polyline [attr.points]="sparkPoints()" fill="none" stroke="var(--h-primary)"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          @if (sparkValues().length > 0) {
            <circle [attr.cx]="200" [attr.cy]="lastSparkY()" r="2.5" fill="var(--h-primary)"/>
          }
        </svg>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }

    .h-kpi {
      background: var(--h-card); border: 1px solid var(--h-border);
      border-radius: var(--h-radius-lg); box-shadow: var(--h-shadow-sm);
      padding: 20px; font-family: var(--h-font-sans);
    }

    .h-kpi-label {
      font-size: 12px; font-weight: 500; color: var(--h-muted-foreground);
    }

    .h-kpi-row {
      display: flex; align-items: baseline; gap: 10px; margin-top: 8px;
    }

    .h-kpi-value {
      font-size: 26px; font-weight: 600; letter-spacing: -0.02em;
      font-family: var(--h-font-mono); color: var(--h-foreground);
    }

    .h-kpi-delta {
      display: inline-flex; align-items: center; gap: 2px;
      font-size: 12px; font-weight: 600;
    }
    .h-kpi-delta[data-positive="true"]  { color: var(--h-status-running); }
    .h-kpi-delta[data-positive="false"] { color: var(--h-status-error); }

    .h-kpi-delta-arrow { flex-shrink: 0; }

    .h-kpi-spark {
      width: 100%; height: 28px; margin-top: 8px; display: block;
    }
  `],
})
export class HKpiComponent {
  readonly label = input('');
  readonly value = input('');
  readonly delta = input('');
  readonly trend = input<'up' | 'down'>('up');
  readonly invertTrend = input(false);
  readonly sparkValues = input<number[]>([]);

  protected readonly isPositive = computed(() => {
    return this.invertTrend() ? this.trend() === 'down' : this.trend() === 'up';
  });

  protected readonly sparkPoints = computed(() => {
    const vals = this.sparkValues();
    if (!vals.length) return '';
    const max = Math.max(...vals);
    const min = Math.min(...vals);
    const range = max - min || 1;
    const W = 200, H = 28;
    return vals
      .map((v, i) => `${(i / (vals.length - 1)) * W},${H - ((v - min) / range) * (H - 4) - 2}`)
      .join(' ');
  });

  protected readonly lastSparkY = computed(() => {
    const vals = this.sparkValues();
    if (!vals.length) return 14;
    const max = Math.max(...vals);
    const min = Math.min(...vals);
    const range = max - min || 1;
    const last = vals[vals.length - 1];
    return 28 - ((last - min) / range) * (28 - 4) - 2;
  });
}
