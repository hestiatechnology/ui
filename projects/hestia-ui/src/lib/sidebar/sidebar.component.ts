import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  input,
  output,
  computed,
  AfterContentInit,
  Directive,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Directive({ selector: '[hSidebarBrand]', standalone: true })
export class HSidebarBrandDirective {}

@Component({
  selector: 'h-sidebar-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="h-sidebar-item"
      [class.h-sidebar-item--active]="active()"
      [attr.aria-current]="active() ? 'page' : null"
    >
      @if (active()) {
        <span class="h-sidebar-item-rail" aria-hidden="true"></span>
      }
      <span class="h-sidebar-item-icon" [class.h-sidebar-item-icon--active]="active()" aria-hidden="true">
        <ng-content />
      </span>
      <span class="h-sidebar-item-label">{{ label() }}</span>
      @if (badge()) {
        <span class="h-sidebar-item-badge">{{ badge() }}</span>
      }
    </button>
  `,
  styles: [`
    :host { display: block; }
    .h-sidebar-item {
      display: flex; align-items: center; gap: 10px;
      padding: 7px 10px; border-radius: 8px;
      font-size: 13.5px; font-weight: 500; font-family: var(--h-font-sans);
      color: var(--h-foreground); background: transparent;
      border: none; cursor: pointer; width: 100%; text-align: left;
      position: relative; transition: background 100ms;
    }
    .h-sidebar-item:hover { background: var(--h-muted); }
    .h-sidebar-item:focus-visible { outline: 2px solid var(--h-ring); outline-offset: -2px; }
    .h-sidebar-item--active {
      font-weight: 600; color: var(--h-primary);
      background: rgba(0,61,165,0.08);
    }
    .h-sidebar-item--active:hover { background: rgba(0,61,165,0.12); }
    .h-sidebar-item-rail {
      position: absolute; left: -12px; top: 6px; bottom: 6px;
      width: 3px; border-radius: 2px; background: var(--h-primary);
    }
    .h-sidebar-item-icon {
      color: var(--h-muted-foreground); display: inline-flex; flex-shrink: 0;
    }
    .h-sidebar-item-icon--active { color: var(--h-primary); }
    .h-sidebar-item-label { flex: 1; }
    .h-sidebar-item-badge {
      font-family: var(--h-font-mono); font-size: 11px; color: var(--h-muted-foreground);
    }
  `],
})
export class HSidebarItemComponent {
  readonly label  = input.required<string>();
  readonly value  = input.required<string>();
  readonly active = input(false);
  readonly badge  = input<string | number>('');

  readonly clicked = output<string>();
}

@Component({
  selector: 'h-sidebar-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-sidebar-group">
      <div class="h-sidebar-group-label">{{ label() }}</div>
      <ng-content select="h-sidebar-item" />
    </div>
  `,
  styles: [`
    :host { display: block; }
    .h-sidebar-group { display: flex; flex-direction: column; }
    .h-sidebar-group-label {
      font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--h-muted-foreground); padding: 0 10px 6px;
      font-family: var(--h-font-sans);
    }
  `],
})
export class HSidebarGroupComponent {
  readonly label = input.required<string>();
}

@Component({
  selector: 'h-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="h-sidebar" role="navigation" [attr.aria-label]="ariaLabel()">
      <div class="h-sidebar-brand">
        <ng-content select="[hSidebarBrand]" />
      </div>
      <ng-content select="[hSidebarSlot]" />
      <ng-content select="h-sidebar-group" />
      <ng-content />
    </nav>
  `,
  styles: [`
    :host { display: block; }
    .h-sidebar {
      width: 260px; min-height: 100%;
      background: var(--h-card); border-right: 1px solid var(--h-border);
      padding: 16px 12px; display: flex; flex-direction: column; gap: 18px;
      overflow-y: auto;
    }
    .h-sidebar-brand { padding: 0 8px 0; }
    .h-sidebar-brand:empty { display: none; }
  `],
})
export class HSidebarComponent {
  readonly ariaLabel = input('Sidebar navigation');
  readonly navigate  = output<string>();
}
