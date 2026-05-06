import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { LucideAlertCircle, LucideCheckCircle, LucideX } from '@lucide/angular';
import { ToastService, Toast } from './toast.service';

@Component({
  selector: 'h-toast-outlet',
  standalone: true,
  imports: [AsyncPipe, LucideAlertCircle, LucideCheckCircle, LucideX],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-toast-stack" aria-live="polite" aria-label="Notifications">
      @for (toast of toastService.toasts$ | async; track toast.id) {
        <div [class]="toastClasses(toast)" role="status">
          <span class="h-toast-accent" [style]="accentStyle(toast)" aria-hidden="true"></span>
          <span class="h-toast-icon" [style]="iconColor(toast)" aria-hidden="true">
            @if (toast.tone === 'error') {
              <svg lucideAlertCircle [size]="15"></svg>
            } @else if (toast.tone === 'running') {
              <svg lucideCheckCircle [size]="15"></svg>
            } @else {
              <svg lucideAlertCircle [size]="15"></svg>
            }
          </span>
          <div class="h-toast-body">
            <div class="h-toast-title">{{ toast.title }}</div>
            @if (toast.description) { <div class="h-toast-desc">{{ toast.description }}</div> }
          </div>
          @if (toast.action) {
            <button type="button" class="h-toast-action" (click)="toastService.dismiss(toast.id)">{{ toast.action }}</button>
          }
          <button type="button" class="h-toast-close" (click)="toastService.dismiss(toast.id)" aria-label="Close notification">
            <svg lucideX [size]="13" aria-hidden="true"></svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .h-toast-stack {
      position: fixed; bottom: 24px; right: 24px;
      display: flex; flex-direction: column; gap: 10px;
      width: 360px; z-index: 9999;
      pointer-events: none;
    }
    .h-toast {
      background: var(--h-card); border: 1px solid var(--h-border);
      border-radius: 12px; box-shadow: var(--h-shadow-md);
      padding: 12px 14px; display: flex; align-items: flex-start; gap: 10px;
      position: relative; overflow: hidden; pointer-events: all;
      font-family: var(--h-font-sans);
    }
    .h-toast-accent { position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
    .h-toast-icon { margin-top: 1px; flex-shrink: 0; }
    .h-toast-body { flex: 1; }
    .h-toast-title { font-size: 13px; font-weight: 600; color: var(--h-foreground); }
    .h-toast-desc  { font-size: 12px; color: var(--h-muted-foreground); margin-top: 2px; }
    .h-toast-action {
      border: 0; background: transparent; color: var(--h-primary);
      font-size: 12px; font-weight: 500; cursor: pointer; white-space: nowrap;
      font-family: var(--h-font-sans);
    }
    .h-toast-close {
      border: 0; background: transparent; cursor: pointer; padding: 2px;
      color: var(--h-muted-foreground); border-radius: 4px; flex-shrink: 0;
    }
    .h-toast-close:focus-visible { outline: 2px solid var(--h-ring); }
  `]
})
export class HToastOutletComponent {
  toastService = inject(ToastService);

  toastClasses(t: Toast) { return 'h-toast'; }

  accentStyle(t: Toast): string {
    const colors: Record<string, string> = {
      primary: 'var(--h-primary)',
      running: 'var(--h-status-running)',
      error:   'var(--h-status-error)',
      idle:    'var(--h-status-idle)',
    };
    return `background:${colors[t.tone] || colors['primary']}`;
  }

  iconColor(t: Toast): string {
    const colors: Record<string, string> = {
      primary: 'var(--h-primary)',
      running: 'var(--h-status-running)',
      error:   'var(--h-status-error)',
      idle:    'var(--h-status-idle)',
    };
    return `color:${colors[t.tone] || colors['primary']}`;
  }
}
