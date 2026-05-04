import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideCheckCircle2, LucideAlertTriangle, LucideAlertCircle, LucidePauseCircle, LucideInfo, LucideX } from '@lucide/angular';

export type AlertTone = 'primary' | 'running' | 'idle' | 'error' | 'hold';

@Component({
  selector: 'h-alert',
  standalone: true,
  imports: [CommonModule, LucideCheckCircle2, LucideAlertTriangle, LucideAlertCircle, LucidePauseCircle, LucideInfo, LucideX],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="alertClasses"
      [style]="alertStyle"
      role="alert"
      [attr.aria-live]="tone === 'error' ? 'assertive' : 'polite'"
      [attr.aria-label]="title">
      <span class="h-alert-icon" [style]="iconStyle" aria-hidden="true">
        @switch (tone) {
          @case ('running') { <svg lucideCheckCircle2 [size]="16"></svg> }
          @case ('idle')    { <svg lucideAlertTriangle [size]="16"></svg> }
          @case ('error')   { <svg lucideAlertCircle [size]="16"></svg> }
          @case ('hold')    { <svg lucidePauseCircle [size]="16"></svg> }
          @default          { <svg lucideInfo [size]="16"></svg> }
        }
      </span>
      <div class="h-alert-body">
        @if (title) { <div class="h-alert-title">{{ title }}</div> }
        @if (description) { <div class="h-alert-desc">{{ description }}</div> }
        <ng-content></ng-content>
      </div>
      @if (dismissible) {
        <button type="button" class="h-alert-dismiss" (click)="dismiss.emit()" aria-label="Dismiss alert">
          <svg lucideX [size]="14"></svg>
        </button>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .h-alert {
      display: flex; align-items: flex-start; gap: 12px;
      padding: 12px 14px; border-radius: 10px; border: 1px solid transparent;
    }
    .h-alert-icon { margin-top: 1px; flex-shrink: 0; }
    .h-alert-body { flex: 1; }
    .h-alert-title { font-size: 13.5px; font-weight: 600; color: var(--h-foreground); font-family: var(--h-font-sans); }
    .h-alert-desc  { font-size: 12.5px; color: var(--h-muted-foreground); margin-top: 3px; line-height: 1.55; font-family: var(--h-font-sans); }
    .h-alert-dismiss {
      border: 0; background: transparent; cursor: pointer; padding: 2px;
      color: var(--h-muted-foreground); border-radius: 4px; flex-shrink: 0;
    }
    .h-alert-dismiss:focus-visible { outline: 2px solid var(--h-ring); }
  `]
})
export class HAlertComponent {
  @Input() tone: AlertTone = 'primary';
  @Input() title?: string;
  @Input() description?: string;
  @Input() dismissible = false;
  @Output() dismiss = new EventEmitter<void>();

  private readonly palettes: Record<AlertTone, { fg: string; bg: string; border: string }> = {
    primary: { fg: 'var(--h-primary)',        bg: 'rgba(0,61,165,0.06)',      border: 'rgba(0,61,165,0.20)' },
    running: { fg: 'var(--h-status-running)', bg: 'var(--h-status-running-bg)', border: 'var(--h-status-running-border)' },
    idle:    { fg: 'var(--h-status-idle)',    bg: 'var(--h-status-idle-bg)',    border: 'var(--h-status-idle-border)' },
    error:   { fg: 'var(--h-status-error)',   bg: 'var(--h-status-error-bg)',   border: 'var(--h-status-error-border)' },
    hold:    { fg: 'var(--h-status-hold)',    bg: 'var(--h-status-hold-bg)',    border: 'var(--h-status-hold-border)' },
  };

  get alertClasses() { return 'h-alert'; }

  get alertStyle(): string {
    const p = this.palettes[this.tone];
    return `background:${p.bg};border-color:${p.border}`;
  }

  get iconStyle(): string {
    return `color:${this.palettes[this.tone].fg}`;
  }
}
