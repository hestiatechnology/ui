import { ChangeDetectionStrategy, Component, booleanAttribute, input, output } from '@angular/core';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { LucideChevronDown } from '@lucide/angular';
import { HMenuItemData } from '../menu/menu.component';

export type StatusDropdownTone = 'success' | 'warning' | 'primary' | 'muted' | 'error';

@Component({
  selector: 'h-status-dropdown',
  standalone: true,
  imports: [Menu, MenuTrigger, MenuItem, MenuContent, LucideChevronDown],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-status-dropdown-root">
      <button
        ngMenuTrigger
        #trigger="ngMenuTrigger"
        [menu]="menuRef"
        type="button"
        [disabled]="disabled()"
        [class]="triggerClasses">
        <span class="h-sd-dot"></span>
        <span class="h-sd-label">{{ label() }}</span>
        <svg lucideChevronDown [size]="14" class="h-sd-chevron" aria-hidden="true"></svg>
      </button>

      <div
        ngMenu
        #menuRef="ngMenu"
        class="h-sd-panel"
        [class.h-sd-panel--open]="trigger.expanded()"
        (itemSelected)="itemSelected.emit($event)">
        <ng-template ngMenuContent>
          @for (item of items(); track item.value) {
            <div
              ngMenuItem
              #mi="ngMenuItem"
              [value]="item.value"
              [disabled]="item.disabled ?? false"
              class="h-sd-item"
              [class.h-sd-item--active]="mi.active()">
              {{ item.label }}
            </div>
          }
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    :host { display: inline-flex; }

    .h-status-dropdown-root {
      position: relative;
      display: inline-flex;
    }

    .h-sd-trigger {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 0 10px 0 8px;
      height: 28px;
      border-radius: 100px;
      border: 1px solid;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      font-family: var(--h-font-sans);
      white-space: nowrap;
      transition: opacity var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-sd-trigger:focus-visible { outline: 2px solid var(--h-ring); outline-offset: 2px; }
    .h-sd-trigger:disabled { opacity: 0.5; cursor: not-allowed; }

    .h-sd-trigger--success {
      color: #1a7f37;
      border-color: #1a7f37;
      background: color-mix(in oklch, #1a7f37 8%, transparent);
    }
    .h-sd-trigger--success .h-sd-dot { background: #1a7f37; }

    .h-sd-trigger--warning {
      color: #977f2e;
      border-color: #977f2e;
      background: color-mix(in oklch, #977f2e 8%, transparent);
    }
    .h-sd-trigger--warning .h-sd-dot { background: #977f2e; }

    .h-sd-trigger--primary {
      color: var(--h-primary);
      border-color: var(--h-primary);
      background: color-mix(in oklch, var(--h-primary) 8%, transparent);
    }
    .h-sd-trigger--primary .h-sd-dot { background: var(--h-primary); }

    .h-sd-trigger--error {
      color: var(--h-destructive);
      border-color: var(--h-destructive);
      background: color-mix(in oklch, var(--h-destructive) 8%, transparent);
    }
    .h-sd-trigger--error .h-sd-dot { background: var(--h-destructive); }

    .h-sd-trigger--muted {
      color: var(--h-muted-foreground);
      border-color: var(--h-border);
      background: transparent;
    }
    .h-sd-trigger--muted .h-sd-dot { background: var(--h-muted-foreground); }

    .h-sd-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .h-sd-chevron {
      flex-shrink: 0;
      opacity: 0.7;
    }

    .h-sd-panel {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      min-width: 160px;
      background: var(--h-popover);
      border: 1px solid var(--h-border);
      border-radius: var(--h-radius);
      box-shadow: var(--h-shadow-md);
      padding: 4px;
      z-index: 50;
      opacity: 0;
      pointer-events: none;
      transform: translateY(-4px) scale(0.98);
      transition:
        opacity var(--h-motion-product-quick) var(--h-motion-product-ease),
        transform var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-sd-panel--open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0) scale(1);
    }

    .h-sd-item {
      display: flex;
      align-items: center;
      padding: 7px 10px;
      border-radius: var(--h-radius-sm);
      font-size: 13px;
      font-family: var(--h-font-sans);
      color: var(--h-foreground);
      cursor: pointer;
      user-select: none;
      outline: none;
      transition: background var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    .h-sd-item--active { background: var(--h-secondary); }
    .h-sd-item[aria-disabled='true'] { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
  `],
})
export class HStatusDropdownComponent {
  readonly label = input.required<string>();
  readonly tone = input<StatusDropdownTone>('muted');
  readonly items = input<HMenuItemData<string>[]>([]);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly itemSelected = output<string>();

  get triggerClasses(): string {
    return `h-sd-trigger h-sd-trigger--${this.tone()}`;
  }
}
