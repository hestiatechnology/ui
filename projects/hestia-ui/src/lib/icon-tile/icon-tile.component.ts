import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconTileTone = 'primary' | 'running' | 'idle' | 'error' | 'hold' | 'maintenance' | 'cotton';

@Component({
  selector: 'h-icon-tile',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="tileClasses" [style]="tileStyle" aria-hidden="true">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host { display: inline-flex; flex-shrink: 0; }
    .h-icon-tile { display: grid; place-items: center; border-radius: 10px; flex-shrink: 0; }
  `]
})
export class HIconTileComponent {
  @Input() size = 36;
  @Input() tone: IconTileTone = 'primary';

  private readonly palettes: Record<IconTileTone, { bg: string; fg: string }> = {
    primary:     { bg: 'rgba(0,61,165,0.10)',              fg: 'var(--h-primary)' },
    running:     { bg: 'var(--h-status-running-bg)',       fg: 'var(--h-status-running)' },
    idle:        { bg: 'var(--h-status-idle-bg)',          fg: 'var(--h-status-idle)' },
    error:       { bg: 'var(--h-status-error-bg)',         fg: 'var(--h-status-error)' },
    hold:        { bg: 'var(--h-status-hold-bg)',          fg: 'var(--h-status-hold)' },
    maintenance: { bg: 'var(--h-status-maintenance-bg)',   fg: 'var(--h-status-maintenance)' },
    cotton:      { bg: 'var(--h-thread-cotton)',           fg: '#7B5A1F' },
  };

  get tileClasses() { return 'h-icon-tile'; }

  get tileStyle(): string {
    const p = this.palettes[this.tone];
    return `width:${this.size}px;height:${this.size}px;background:${p.bg};color:${p.fg}`;
  }
}
