import { Component, Input, ChangeDetectionStrategy, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeTone = 'neutral' | 'primary' | 'running' | 'idle' | 'error' | 'hold' | 'maintenance';

@Component({
  selector: 'h-badge',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="badgeClasses" [style]="badgeStyle">
      @if (dot) { <span class="h-badge-dot" aria-hidden="true"></span> }
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    :host { display: inline-flex; }
    .h-badge {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 2px 8px; border-radius: 6px;
      font-size: 11.5px; font-weight: 600; line-height: 1.4;
      font-family: var(--h-font-sans); border: 1px solid transparent;
    }
    .h-badge-dot { width: 5px; height: 5px; border-radius: 9999px; background: currentColor; }
  `]
})
export class HBadgeComponent {
  @Input() tone: BadgeTone = 'neutral';
  @Input({ transform: booleanAttribute }) dot = false;
  @Input({ transform: booleanAttribute }) solid = false;

  private readonly palettes: Record<BadgeTone, { fg: string; bg: string; border: string }> = {
    neutral:     { fg: 'var(--h-foreground)',        bg: 'var(--h-muted)',              border: 'var(--h-border)' },
    primary:     { fg: 'var(--h-primary)',           bg: 'rgba(0,61,165,0.08)',         border: 'rgba(0,61,165,0.20)' },
    running:     { fg: 'var(--h-status-running)',    bg: 'var(--h-status-running-bg)',  border: 'var(--h-status-running-border)' },
    idle:        { fg: 'var(--h-status-idle)',       bg: 'var(--h-status-idle-bg)',     border: 'var(--h-status-idle-border)' },
    error:       { fg: 'var(--h-status-error)',      bg: 'var(--h-status-error-bg)',    border: 'var(--h-status-error-border)' },
    hold:        { fg: 'var(--h-status-hold)',       bg: 'var(--h-status-hold-bg)',     border: 'var(--h-status-hold-border)' },
    maintenance: { fg: 'var(--h-status-maintenance)',bg: 'var(--h-status-maintenance-bg)', border: 'var(--h-status-maintenance-border)' },
  };

  get badgeClasses() { return 'h-badge'; }

  get badgeStyle(): string {
    const p = this.palettes[this.tone];
    if (this.solid) return `background:${p.fg};color:#fff;border-color:transparent`;
    return `background:${p.bg};color:${p.fg};border-color:${p.border}`;
  }
}
