import { ChangeDetectionStrategy, Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HIconTileComponent, IconTileTone } from '../icon-tile/icon-tile.component';

@Component({
  selector: 'h-page-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-page-header" [class.h-page-header--dark]="dark()">
      <!-- Row 1: Breadcrumbs & Actions -->
      <div class="h-ph-row h-ph-row--top">
        <div class="h-ph-breadcrumbs">
          <ng-content select="[hPageHeaderBreadcrumbs]" />
        </div>
        <div class="h-ph-actions">
          <ng-content select="[hPageHeaderActions]" />
        </div>
      </div>

      <!-- Row 2: Title & Status -->
      <div class="h-ph-row h-ph-row--main">
        <div class="h-ph-title-area">
          <ng-content select="[hPageHeaderIcon]" />
          <div class="h-ph-title-text">
            @if (eyebrow()) {
              <span class="h-ph-eyebrow" [attr.data-tone]="eyebrowTone()">{{ eyebrow() }}</span>
            }
            <div class="h-ph-heading-wrap">
              <h1 class="h-ph-title">{{ title() }}</h1>
              @if (subtitle()) {
                <span class="h-ph-subtitle">{{ subtitle() }}</span>
              }
            </div>
          </div>
        </div>
        <div class="h-ph-status-area">
          <ng-content select="[hPageHeaderStatus]" />
        </div>
      </div>

      <!-- Row 3: Metadata Strip -->
      <div class="h-ph-meta-strip">
        <ng-content select="[hPageHeaderMeta]" />
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .h-page-header {
      width: 100%;
      background: var(--h-card);
      border-top: 1px solid var(--h-border);
      border-bottom: 1px solid var(--h-border);
      display: flex;
      flex-direction: column;
    }
    
    .h-page-header--dark {
      --h-card: oklch(0.155 0.020 255);
      --h-foreground: oklch(0.97 0.005 255);
      --h-muted-foreground: oklch(0.65 0.012 255);
      --h-border: oklch(0.30 0.020 255);
      --h-border-strong: oklch(0.42 0.022 255);
      --h-muted: oklch(0.19 0.020 255);
      --h-primary: #5B7BD9;
      background: var(--h-card);
      color: var(--h-foreground);
    }

    .h-ph-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 10px 24px;
      min-width: 0;
    }
    .h-ph-row--top {
      border-bottom: 1px solid var(--h-border);
    }
    .h-ph-row--main {
      border-bottom: 1px solid var(--h-border);
    }

    .h-ph-breadcrumbs {
      flex: 1;
      min-width: 0;
    }
    .h-ph-actions {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .h-ph-title-area {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .h-ph-title-text {
      display: flex;
      flex-direction: column;
    }
    .h-ph-eyebrow {
      font-family: var(--h-font-heading);
      font-size: var(--h-eyebrow-size);
      font-weight: var(--h-eyebrow-weight);
      letter-spacing: var(--h-eyebrow-tracking);
      text-transform: uppercase;
      color: var(--h-eyebrow-color);
    }
    .h-ph-eyebrow[data-tone="muted"] { color: var(--h-muted-foreground); }
    .h-ph-eyebrow[data-tone="primary"] { color: var(--h-primary); }
    .h-ph-eyebrow[data-tone="white"] { color: rgba(255,255,255,0.40); }

    .h-ph-heading-wrap {
      display: flex;
      align-items: baseline;
      gap: 10px;
      margin-top: 5px;
      flex-wrap: wrap;
    }
    .h-ph-title {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.1;
      font-family: var(--h-font-sans);
      color: var(--h-foreground);
    }
    /* Let users override font-family with utility classes if they need mono */
    
    .h-ph-subtitle {
      font-size: 14px;
      color: var(--h-muted-foreground);
    }

    .h-ph-status-area {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .h-ph-meta-strip {
      display: flex;
      align-items: stretch;
    }
  `]
})
export class HPageHeaderComponent {
  readonly dark = input(false);
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly eyebrow = input<string>();
  readonly eyebrowTone = input<'primary' | 'muted' | 'white'>('primary');
}
