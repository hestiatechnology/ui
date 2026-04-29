import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type MachineTileStatus = 'running' | 'idle' | 'error' | 'maintenance' | 'hold';

export interface MachineTileMetric {
  label: string;
  value: string;
  unit?: string;
  mono?: boolean;
}

const STATUS_LABEL: Record<MachineTileStatus, string> = {
  running: 'Running',
  idle: 'Idle',
  error: 'Error',
  maintenance: 'Maintenance',
  hold: 'On Hold',
};

@Component({
  selector: 'h-machine-tile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      class="h-machine-tile"
      [class]="'h-machine-tile--' + status()"
      [attr.aria-label]="machineId() + ' - ' + _statusLabel"
    >
      <div class="h-machine-tile-header">
        <div class="h-machine-tile-id">{{ machineId() }}</div>
        <span class="h-status-pill" [class]="'h-status-pill--' + status()">
          {{ _statusLabel }}
        </span>
      </div>

      @if (machineName()) {
        <div class="h-machine-tile-name">{{ machineName() }}</div>
      }

      @if (metrics().length > 0) {
        <dl class="h-machine-tile-metrics">
          @for (metric of metrics(); track metric.label) {
            <div class="h-machine-tile-metric">
              <dt class="h-machine-tile-metric-label">{{ metric.label }}</dt>
              <dd
                class="h-machine-tile-metric-value"
                [class.h-machine-tile-metric-value--mono]="metric.mono"
              >{{ metric.value }}@if (metric.unit) {<span class="h-machine-tile-metric-unit"> {{ metric.unit }}</span>}</dd>
            </div>
          }
        </dl>
      }

      @if (oee() != null) {
        <div class="h-machine-tile-oee">
          <div class="h-machine-tile-oee-label">OEE</div>
          <div class="h-machine-tile-oee-bar">
            <div
              class="h-machine-tile-oee-fill"
              [style.width.%]="oee()"
              [attr.aria-valuenow]="oee()"
              aria-valuemin="0"
              aria-valuemax="100"
              role="progressbar"
            ></div>
          </div>
          <div class="h-machine-tile-oee-value">{{ oee() }}%</div>
        </div>
      }

      @if (alertMessage()) {
        <div class="h-machine-tile-alert" role="alert">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          {{ alertMessage() }}
        </div>
      }

      <ng-content />
    </article>
  `,
  styles: [
    `
      .h-machine-tile {
        background: var(--h-card);
        border: 1px solid var(--h-border);
        border-radius: var(--h-radius-lg);
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-family: var(--h-font-sans);
        transition: box-shadow var(--h-motion-product-quick) var(--h-motion-product-ease);
        cursor: default;
      }

      .h-machine-tile:hover {
        box-shadow: var(--h-shadow-sm);
      }

      .h-machine-tile--error {
        border-color: var(--h-status-error-border);
      }

      .h-machine-tile-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .h-machine-tile-id {
        font-family: var(--h-font-mono);
        font-size: var(--h-text-sm);
        font-weight: 600;
        color: var(--h-foreground);
        letter-spacing: 0;
      }

      .h-machine-tile-name {
        font-size: var(--h-text-xs);
        color: var(--h-muted-foreground);
        margin-top: -6px;
      }

      .h-machine-tile-metrics {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        gap: 10px 8px;
        margin: 0;
        padding: 10px 0 0;
        border-top: 1px solid var(--h-border);
      }

      .h-machine-tile-metric {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .h-machine-tile-metric-label {
        font-size: 11px;
        color: var(--h-muted-foreground);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-weight: 500;
      }

      .h-machine-tile-metric-value {
        font-size: var(--h-text-base);
        font-weight: 600;
        color: var(--h-foreground);
        margin: 0;
      }

      .h-machine-tile-metric-value--mono {
        font-family: var(--h-font-mono);
        font-size: var(--h-text-sm);
      }

      .h-machine-tile-metric-unit {
        font-size: 11px;
        font-weight: 400;
        color: var(--h-muted-foreground);
      }

      .h-machine-tile-oee {
        display: flex;
        align-items: center;
        gap: 8px;
        padding-top: 10px;
        border-top: 1px solid var(--h-border);
      }

      .h-machine-tile-oee-label {
        font-size: 11px;
        color: var(--h-muted-foreground);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        width: 28px;
        flex-shrink: 0;
      }

      .h-machine-tile-oee-bar {
        flex: 1;
        height: 6px;
        background: var(--h-border);
        border-radius: 3px;
        overflow: hidden;
      }

      .h-machine-tile-oee-fill {
        height: 100%;
        background: var(--h-status-running);
        border-radius: 3px;
        transition: width var(--h-motion-product-base) var(--h-motion-product-ease);
      }

      .h-machine-tile--error .h-machine-tile-oee-fill { background: var(--h-status-error); }
      .h-machine-tile--idle .h-machine-tile-oee-fill { background: var(--h-status-idle); }
      .h-machine-tile--maintenance .h-machine-tile-oee-fill { background: var(--h-status-maintenance); }
      .h-machine-tile--hold .h-machine-tile-oee-fill { background: var(--h-status-hold); }

      .h-machine-tile-oee-value {
        font-family: var(--h-font-mono);
        font-size: var(--h-text-xs);
        font-weight: 600;
        color: var(--h-foreground);
        width: 32px;
        text-align: right;
        flex-shrink: 0;
      }

      .h-machine-tile-alert {
        display: flex;
        align-items: flex-start;
        gap: 6px;
        font-size: var(--h-text-xs);
        color: var(--h-status-error);
        background: var(--h-status-error-bg);
        border: 1px solid var(--h-status-error-border);
        border-radius: var(--h-radius-sm);
        padding: 7px 10px;
        line-height: 1.4;
      }

      .h-machine-tile-alert svg {
        flex-shrink: 0;
        margin-top: 1px;
      }
    `,
  ],
})
export class HMachineTileComponent {
  readonly machineId = input.required<string>();
  readonly machineName = input<string>('');
  readonly status = input<MachineTileStatus>('idle');
  readonly metrics = input<MachineTileMetric[]>([]);
  readonly oee = input<number | null>(null);
  readonly alertMessage = input<string>('');

  get _statusLabel(): string {
    return STATUS_LABEL[this.status()];
  }
}
