import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { HAvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'h-topbar',
  standalone: true,
  imports: [HAvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="h-topbar">
      <div class="h-topbar-start">
        <ng-content select="[hTopbarStart]" />
      </div>

      <div class="h-topbar-center">
        <ng-content select="[hTopbarSearch]" />
      </div>

      <div class="h-topbar-end">
        <ng-content select="[hTopbarEnd]" />

        <button type="button" class="h-topbar-icon-btn" aria-label="Help" (click)="helpClick.emit()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
        </button>

        <button type="button" class="h-topbar-icon-btn h-topbar-notif-btn" aria-label="Notifications" (click)="notificationsClick.emit()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          @if (notificationCount() > 0) {
            <span class="h-topbar-notif-badge" [attr.aria-label]="notificationCount() + ' notifications'"></span>
          }
        </button>

        <div class="h-topbar-divider" aria-hidden="true"></div>

        <button type="button" class="h-topbar-user" (click)="userClick.emit()" [attr.aria-label]="'User menu for ' + userName()">
          <h-avatar [name]="userName()" [size]="32" />
          <div class="h-topbar-user-text">
            <span class="h-topbar-user-name">{{ userName() }}</span>
            @if (userRole()) {
              <span class="h-topbar-user-role">{{ userRole() }}</span>
            }
          </div>
          <svg class="h-topbar-user-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>
    </header>
  `,
  styles: [`
    :host { display: block; }
    .h-topbar {
      width: 100%; height: 64px;
      background: var(--h-card); border-bottom: 1px solid var(--h-border);
      display: flex; align-items: center; padding: 0 24px; gap: 16px;
      position: sticky; top: 0; z-index: 40;
    }
    .h-topbar-start { flex: 0 1 auto; min-width: 0; overflow: hidden; }
    .h-topbar-center { flex: 1 1 auto; min-width: 0; max-width: 480px; margin-left: auto; }
    .h-topbar-end {
      display: inline-flex; gap: 4px; align-items: center; flex-shrink: 0;
      margin-left: auto;
    }
    .h-topbar-icon-btn {
      width: 36px; height: 36px; border-radius: 8px; border: none;
      background: transparent; color: var(--h-foreground);
      display: grid; place-items: center; cursor: pointer; position: relative;
    }
    .h-topbar-icon-btn:hover { background: var(--h-muted); }
    .h-topbar-icon-btn:focus-visible { outline: 2px solid var(--h-ring); }
    .h-topbar-notif-btn { position: relative; }
    .h-topbar-notif-badge {
      position: absolute; top: 6px; right: 6px;
      width: 7px; height: 7px; border-radius: 9999px;
      background: var(--h-status-error); border: 2px solid var(--h-card);
    }
    .h-topbar-divider {
      width: 1px; height: 24px; background: var(--h-border); margin: 0 4px;
    }
    .h-topbar-user {
      display: flex; align-items: center; gap: 10px;
      padding: 4px 8px; border-radius: 8px; border: none;
      background: transparent; cursor: pointer;
    }
    .h-topbar-user:hover { background: var(--h-muted); }
    .h-topbar-user:focus-visible { outline: 2px solid var(--h-ring); }
    .h-topbar-user-text {
      display: flex; flex-direction: column; line-height: 1.2; text-align: left;
    }
    .h-topbar-user-name {
      font-size: 13px; font-weight: 500; color: var(--h-foreground);
      font-family: var(--h-font-sans);
    }
    .h-topbar-user-role {
      font-size: 11px; color: var(--h-muted-foreground); font-family: var(--h-font-sans);
    }
    .h-topbar-user-chevron { color: var(--h-muted-foreground); }
    @media (max-width: 640px) {
      .h-topbar-user-text { display: none; }
      .h-topbar-user-chevron { display: none; }
    }
  `],
})
export class HTopbarComponent {
  readonly userName          = input('');
  readonly userRole          = input('');
  readonly notificationCount = input(0);

  readonly helpClick          = output<void>();
  readonly notificationsClick = output<void>();
  readonly userClick          = output<void>();
}
