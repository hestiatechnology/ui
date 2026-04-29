import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  TemplateRef,
  contentChildren,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';

export interface HMenuItemData<T = string> {
  value: T;
  label: string;
  icon?: string;
  disabled?: boolean;
  separator?: boolean;
}

@Directive({
  selector: 'ng-template[hMenuItem]',
  standalone: true,
})
export class HMenuItemTemplateDirective<T = string> {
  readonly value = input.required<T>();
  readonly label = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly separator = input<boolean>(false);
  constructor(readonly templateRef: TemplateRef<void>) {}
}

@Component({
  selector: 'h-dropdown',
  standalone: true,
  imports: [Menu, MenuTrigger, MenuItem, MenuContent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-dropdown-root">
      <button
        ngMenuTrigger
        #trigger="ngMenuTrigger"
        [menu]="menuRef"
        type="button"
        class="h-dropdown-trigger"
      >
        <ng-content select="[hTrigger]" />
      </button>

      <div
        ngMenu
        #menuRef="ngMenu"
        class="h-dropdown-panel"
        [class.h-dropdown-panel--open]="trigger.expanded()"
        (itemSelected)="itemSelected.emit($event)"
      >
        <ng-template ngMenuContent>
          @for (item of items(); track item.value) {
            @if (item.separator) {
              <div class="h-menu-separator" role="separator"></div>
            } @else {
              <div
                ngMenuItem
                #mi="ngMenuItem"
                [value]="item.value"
                [disabled]="item.disabled ?? false"
                class="h-menu-item"
                [class.h-menu-item--active]="mi.active()"
              >
                @if (item.icon) {
                  <span class="h-menu-item-icon" [innerHTML]="item.icon"></span>
                }
                {{ item.label }}
              </div>
            }
          }
          <ng-content />
        </ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      .h-dropdown-root {
        position: relative;
        display: inline-flex;
      }

      .h-dropdown-trigger {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 0 12px;
        height: var(--h-touch-default);
        border-radius: var(--h-radius-sm);
        border: 1px solid var(--h-border);
        background: var(--h-card);
        color: var(--h-foreground);
        font-size: var(--h-text-sm);
        font-weight: 500;
        font-family: var(--h-font-sans);
        cursor: pointer;
        transition: background var(--h-motion-product-instant) var(--h-motion-product-ease);
      }

      .h-dropdown-trigger:hover {
        background: var(--h-secondary);
      }

      .h-dropdown-trigger:focus-visible {
        outline: 2px solid var(--h-ring);
        outline-offset: 2px;
      }

      .h-dropdown-panel {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        min-width: 180px;
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

      .h-dropdown-panel--open {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0) scale(1);
      }

      .h-menu-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 7px 10px;
        border-radius: var(--h-radius-sm);
        font-size: var(--h-text-sm);
        font-family: var(--h-font-sans);
        color: var(--h-foreground);
        cursor: pointer;
        transition: background var(--h-motion-product-instant) var(--h-motion-product-ease);
        user-select: none;
        outline: none;
      }

      .h-menu-item--active,
      .h-menu-item[data-active='true'] {
        background: var(--h-secondary);
      }

      .h-menu-item[aria-disabled='true'] {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }

      .h-menu-item-icon {
        display: flex;
        align-items: center;
        color: var(--h-muted-foreground);
        flex-shrink: 0;
      }

      .h-menu-separator {
        height: 1px;
        background: var(--h-border);
        margin: 4px 0;
      }
    `,
  ],
})
export class HDropdownComponent<T = string> {
  readonly items = input<HMenuItemData<T>[]>([]);
  readonly itemSelected = output<T>();
}
