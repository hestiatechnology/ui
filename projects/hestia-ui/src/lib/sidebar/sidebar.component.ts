import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  contentChildren,
  effect,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LucideChevronDown, LucideChevronRight } from '@lucide/angular';

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
      (click)="clicked.emit(value())"
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

@Directive({ selector: '[hSubGroupIcon]', standalone: true })
export class HSidebarSubGroupIconDirective {}

@Component({
  selector: 'h-sidebar-sub-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideChevronDown],
  template: `
    <div class="h-sidebar-sub-group">
      <button
        type="button"
        class="h-sidebar-sub-group-trigger"
        [class.h-sidebar-sub-group-trigger--open]="isOpen()"
        [attr.aria-expanded]="isOpen()"
        (click)="toggle()"
      >
        <span class="h-sidebar-sub-group-icon" aria-hidden="true">
          <ng-content select="[hSubGroupIcon]" />
        </span>
        <span class="h-sidebar-sub-group-label">{{ label() }}</span>
        <svg lucideChevronDown [size]="14" class="h-sidebar-sub-group-chevron"
             [class.h-sidebar-sub-group-chevron--open]="isOpen()" aria-hidden="true"></svg>
      </button>
      @if (isOpen()) {
        <div class="h-sidebar-sub-group-panel" role="group">
          <ng-content select="h-sidebar-item" />
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .h-sidebar-sub-group-trigger {
      display: flex; align-items: center; gap: 10px;
      padding: 7px 10px; border-radius: 8px;
      font-size: 13.5px; font-weight: 500; font-family: var(--h-font-sans);
      color: var(--h-foreground); background: transparent;
      border: none; cursor: pointer; width: 100%; text-align: left;
      transition: background 100ms;
    }
    .h-sidebar-sub-group-trigger:hover { background: var(--h-muted); }
    .h-sidebar-sub-group-trigger:focus-visible { outline: 2px solid var(--h-ring); outline-offset: -2px; }
    .h-sidebar-sub-group-trigger--open { font-weight: 600; }
    .h-sidebar-sub-group-icon { color: var(--h-muted-foreground); display: inline-flex; flex-shrink: 0; }
    .h-sidebar-sub-group-label { flex: 1; }
    .h-sidebar-sub-group-chevron { color: var(--h-muted-foreground); transition: transform 150ms; }
    .h-sidebar-sub-group-chevron--open { transform: rotate(180deg); }
    .h-sidebar-sub-group-panel {
      display: flex; flex-direction: column;
      padding-left: 20px;
      border-left: 2px solid var(--h-border);
      margin-left: 22px;
      margin-top: 2px;
    }
  `],
})
export class HSidebarSubGroupComponent implements OnInit {
  readonly label = input.required<string>();
  readonly defaultOpen = input(false);

  readonly isOpen = signal(false);

  ngOnInit(): void {
    this.isOpen.set(this.defaultOpen());
  }

  toggle(): void {
    this.isOpen.update(v => !v);
  }
}

@Component({
  selector: 'h-sidebar-sub-group-flyout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideChevronRight],
  template: `
    <div class="h-sidebar-sub-group-flyout"
         (mouseenter)="showPanel()"
         (mouseleave)="scheduleHide()">
      <button
        type="button"
        class="h-sidebar-sub-group-flyout-trigger"
        #triggerEl
        (focus)="showPanel()"
        (blur)="scheduleHide()"
      >
        <span class="h-sidebar-sub-group-flyout-icon" aria-hidden="true">
          <ng-content select="[hSubGroupIcon]" />
        </span>
        <span class="h-sidebar-sub-group-flyout-label">{{ label() }}</span>
        <svg lucideChevronRight [size]="14" class="h-sidebar-sub-group-flyout-arrow" aria-hidden="true"></svg>
      </button>
      @if (panelVisible()) {
        <div class="h-sidebar-sub-group-flyout-panel"
             [style.top.px]="panelTop()"
             [style.left.px]="panelLeft()"
             (mouseenter)="cancelHide()"
             (mouseleave)="scheduleHide()">
          <div class="h-sidebar-sub-group-flyout-header">{{ label() }}</div>
          <ng-content select="h-sidebar-item" />
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .h-sidebar-sub-group-flyout-trigger {
      display: flex; align-items: center; gap: 10px;
      padding: 7px 10px; border-radius: 8px;
      font-size: 13.5px; font-weight: 500; font-family: var(--h-font-sans);
      color: var(--h-foreground); background: transparent;
      border: none; cursor: pointer; width: 100%; text-align: left;
      transition: background 100ms;
    }
    .h-sidebar-sub-group-flyout-trigger:hover { background: var(--h-muted); }
    .h-sidebar-sub-group-flyout-trigger:focus-visible { outline: 2px solid var(--h-ring); outline-offset: -2px; }
    .h-sidebar-sub-group-flyout-icon { color: var(--h-muted-foreground); display: inline-flex; flex-shrink: 0; }
    .h-sidebar-sub-group-flyout-label { flex: 1; }
    .h-sidebar-sub-group-flyout-arrow { color: var(--h-muted-foreground); }
    .h-sidebar-sub-group-flyout-panel {
      position: fixed;
      z-index: 1000;
      background: var(--h-card);
      border: 1px solid var(--h-border);
      border-radius: 10px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);
      padding: 6px;
      min-width: 220px;
    }
    .h-sidebar-sub-group-flyout-header {
      font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--h-muted-foreground); padding: 4px 10px 6px;
      font-family: var(--h-font-sans);
    }
  `],
})
export class HSidebarSubGroupFlyoutComponent implements OnDestroy {
  readonly label = input.required<string>();

  private readonly triggerEl = viewChild.required<ElementRef>('triggerEl');

  readonly panelVisible = signal(false);
  readonly panelTop = signal(0);
  readonly panelLeft = signal(0);

  private _hideTimer?: ReturnType<typeof setTimeout>;

  showPanel(): void {
    clearTimeout(this._hideTimer);
    const rect = (this.triggerEl().nativeElement as HTMLElement).getBoundingClientRect();
    this.panelTop.set(Math.min(rect.top, window.innerHeight - 300));
    this.panelLeft.set(rect.right + 6);
    this.panelVisible.set(true);
  }

  scheduleHide(): void {
    this._hideTimer = setTimeout(() => this.panelVisible.set(false), 150);
  }

  cancelHide(): void {
    clearTimeout(this._hideTimer);
  }

  ngOnDestroy(): void {
    clearTimeout(this._hideTimer);
  }
}

@Component({
  selector: 'h-sidebar-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-sidebar-group">
      <div class="h-sidebar-group-label">{{ label() }}</div>
      <ng-content />
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
export class HSidebarComponent implements OnDestroy {
  readonly ariaLabel = input('Sidebar navigation');
  readonly navigate  = output<string>();

  private readonly _items = contentChildren(HSidebarItemComponent, { descendants: true });

  private readonly _subscriptions = new Subscription();
  private _itemSubscriptions = new Subscription();

  constructor() {
    effect(() => {
      const items = this._items();
      this._bindItemClickEvents();
    });
  }

  ngOnDestroy(): void {
    this._itemSubscriptions.unsubscribe();
    this._subscriptions.unsubscribe();
  }

  private _bindItemClickEvents(): void {
    this._itemSubscriptions.unsubscribe();
    this._itemSubscriptions = new Subscription();

    const items = this._items();
    if (!items || items.length === 0) return;

    for (const item of items) {
      this._itemSubscriptions.add(
        item.clicked.subscribe((value: string) => this.navigate.emit(value)),
      );
    }
  }
}
