import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type TimelineTone = 'running' | 'idle' | 'error' | 'hold' | 'primary' | 'neutral';

export interface TimelineEvent {
  actor: string;
  action: string;
  timestamp: string;
  tone?: TimelineTone;
  icon?: string;
}

@Component({
  selector: 'h-timeline',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-timeline-host' },
  template: `
    <div class="h-timeline">
      @for (event of events(); track event.timestamp + event.actor; let i = $index) {
        <div class="h-timeline-item" [class.h-timeline-item--last]="i === events().length - 1">
          <span class="h-timeline-dot" [attr.data-tone]="event.tone || 'neutral'">
            @if (event.icon) {
              <span [innerHTML]="event.icon" aria-hidden="true"></span>
            } @else {
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4"/>
              </svg>
            }
          </span>
          <div class="h-timeline-body">
            <div class="h-timeline-text">
              <strong class="h-timeline-actor">{{ event.actor }}</strong>
              <span class="h-timeline-action"> {{ event.action }}</span>
            </div>
          </div>
          <span class="h-timeline-time">{{ event.timestamp }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }

    .h-timeline { display: flex; flex-direction: column; }

    .h-timeline-item {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 10px 0;
      border-bottom: 1px solid var(--h-border);
    }
    .h-timeline-item--last { border-bottom: none; }

    .h-timeline-dot {
      width: 28px; height: 28px; border-radius: 9999px;
      display: grid; place-items: center; flex-shrink: 0;
      font-size: 14px;
    }
    .h-timeline-dot[data-tone="running"] { background: var(--h-status-running-bg); color: var(--h-status-running); }
    .h-timeline-dot[data-tone="idle"]    { background: var(--h-status-idle-bg);    color: var(--h-status-idle); }
    .h-timeline-dot[data-tone="error"]   { background: var(--h-status-error-bg);   color: var(--h-status-error); }
    .h-timeline-dot[data-tone="hold"]    { background: var(--h-status-hold-bg);    color: var(--h-status-hold); }
    .h-timeline-dot[data-tone="primary"] { background: rgba(0,61,165,0.10);        color: var(--h-primary); }
    .h-timeline-dot[data-tone="neutral"] { background: var(--h-muted);             color: var(--h-muted-foreground); }

    .h-timeline-body { flex: 1; }

    .h-timeline-text { font-size: 13.5px; font-family: var(--h-font-sans); line-height: 1.5; }
    .h-timeline-actor { font-weight: 600; color: var(--h-foreground); }
    .h-timeline-action { color: var(--h-muted-foreground); }

    .h-timeline-time {
      font-family: var(--h-font-mono); font-size: 11.5px;
      color: var(--h-muted-foreground); white-space: nowrap; padding-top: 4px;
    }
  `],
})
export class HTimelineComponent {
  readonly events = input<TimelineEvent[]>([]);
}
