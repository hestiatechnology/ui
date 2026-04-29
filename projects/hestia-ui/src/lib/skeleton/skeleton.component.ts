import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'h-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'h-skeleton',
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    '[style.border-radius]': 'rounded() ? "9999px" : radius()',
    'aria-hidden': 'true',
  },
  template: ``,
  styles: [`
    :host {
      display: block;
      background: linear-gradient(
        90deg,
        var(--h-muted) 0%,
        color-mix(in oklch, var(--h-muted) 60%, white) 50%,
        var(--h-muted) 100%
      );
      background-size: 600px 100%;
      animation: h-shimmer 1.4s linear infinite;
    }

    @keyframes h-shimmer {
      0%   { background-position: -600px 0; }
      100% { background-position: 600px 0; }
    }
  `],
})
export class HSkeletonComponent {
  readonly width = input<string>('100%');
  readonly height = input<string>('16px');
  readonly radius = input<string>('var(--h-radius-sm)');
  readonly rounded = input<boolean>(false);
}

@Component({
  selector: 'h-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-empty-state-host' },
  template: `
    <div class="h-empty-state">
      <div class="h-empty-state-icon" [attr.data-tone]="tone()">
        <ng-content select="[hEmptyIcon]" />
      </div>
      <div class="h-empty-state-title">{{ title() }}</div>
      @if (description()) {
        <p class="h-empty-state-desc">{{ description() }}</p>
      }
      <div class="h-empty-state-actions">
        <ng-content />
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .h-empty-state {
      display: flex; flex-direction: column; align-items: center;
      text-align: center; padding: 24px 0; font-family: var(--h-font-sans);
    }

    .h-empty-state-icon {
      width: 56px; height: 56px; border-radius: 14px;
      display: grid; place-items: center; margin: 0 auto 14px;
      background: var(--h-thread-cotton, #F5EFE2); color: #7B5A1F;
    }
    .h-empty-state-icon[data-tone="primary"]  { background: rgba(0,61,165,0.10); color: var(--h-primary); }
    .h-empty-state-icon[data-tone="running"]  { background: var(--h-status-running-bg); color: var(--h-status-running); }
    .h-empty-state-icon[data-tone="idle"]     { background: var(--h-status-idle-bg);    color: var(--h-status-idle); }
    .h-empty-state-icon[data-tone="error"]    { background: var(--h-status-error-bg);   color: var(--h-status-error); }

    .h-empty-state-title {
      font-size: 16px; font-weight: 600; color: var(--h-foreground);
    }

    .h-empty-state-desc {
      font-size: 13.5px; color: var(--h-muted-foreground); margin: 6px 0 0;
      line-height: 1.55; max-width: 340px;
    }

    .h-empty-state-actions {
      display: inline-flex; gap: 8px; margin-top: 16px; flex-wrap: wrap; justify-content: center;
    }
    .h-empty-state-actions:empty { display: none; }
  `],
})
export class HEmptyStateComponent {
  readonly title = input('');
  readonly description = input('');
  readonly tone = input<'cotton' | 'primary' | 'running' | 'idle' | 'error'>('cotton');
}
