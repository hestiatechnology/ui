import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { LucideChevronDown } from '@lucide/angular';

import { StatusPillStatus } from '../status-pill/status-pill.component';

@Component({
  selector: 'h-ph-status-pill',
  standalone: true,
  imports: [LucideChevronDown],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="h-ph-status-btn" [class]="pillClasses" (click)="click.emit()">
      <span class="h-ph-status-dot"></span>
      {{ label() }}
      <svg lucideChevronDown class="h-ph-status-chevron" [size]="12" aria-hidden="true"></svg>
    </button>
  `,
  styles: [`
    :host { display: inline-flex; }
    .h-ph-status-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 10px;
      border-radius: 9999px;
      font-size: 12.5px;
      font-weight: 600;
      border: 1px solid transparent;
      cursor: pointer;
      font-family: var(--h-font-sans);
      outline: none;
      transition: filter 120ms;
    }
    .h-ph-status-btn:hover { filter: brightness(0.95); }
    .h-ph-status-btn:focus-visible { box-shadow: 0 0 0 2px var(--h-card), 0 0 0 4px var(--h-ring); }

    .h-ph-status-dot {
      width: 6px;
      height: 6px;
      border-radius: 9999px;
      background: currentColor;
    }

    .h-status-idle    { background: var(--h-status-idle-bg);    border-color: var(--h-status-idle-border);    color: var(--h-status-idle); }
    .h-status-running { background: var(--h-status-running-bg); border-color: var(--h-status-running-border); color: var(--h-status-running); }
    .h-status-error   { background: var(--h-status-error-bg);   border-color: var(--h-status-error-border);   color: var(--h-status-error); }
    .h-status-hold    { background: var(--h-status-hold-bg);    border-color: var(--h-status-hold-border);    color: var(--h-status-hold); }
    .h-status-maintenance { background: var(--h-status-maintenance-bg); border-color: var(--h-status-maintenance-border); color: var(--h-status-maintenance); }

  `]
})
export class HPageHeaderStatusPillComponent {
  readonly label = input.required<string>();
  readonly status = input<StatusPillStatus>('idle');
  readonly click = output<void>();

  get pillClasses() {
    return `h-status-${this.status()}`;
  }
}
