import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  TemplateRef,
  contentChildren,
  input,
  model,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Tab, TabContent, TabList, TabPanel, Tabs } from '@angular/aria/tabs';

@Directive({
  selector: 'ng-template[hTabLabel]',
  standalone: true,
})
export class HTabLabelDirective {
  readonly value = input.required<string>();
  readonly disabled = input<boolean>(false);
  constructor(readonly templateRef: TemplateRef<void>) {}
}

@Directive({
  selector: 'ng-template[hTabPanel]',
  standalone: true,
})
export class HTabPanelDirective {
  readonly value = input.required<string>();
  constructor(readonly templateRef: TemplateRef<void>) {}
}

@Component({
  selector: 'h-tabs',
  standalone: true,
  imports: [Tabs, TabList, Tab, TabPanel, TabContent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div ngTabs class="h-tabs-root">
      <ul ngTabList [(selectedTab)]="selectedTab" class="h-tab-list" role="tablist">
        @for (label of _labels(); track label.value()) {
          <li ngTab [value]="label.value()" [disabled]="label.disabled()" class="h-tab">
            <ng-container [ngTemplateOutlet]="label.templateRef" />
          </li>
        }
      </ul>
      @for (panel of _panels(); track panel.value()) {
        <div ngTabPanel [value]="panel.value()" class="h-tab-panel">
          <ng-template ngTabContent>
            <ng-container [ngTemplateOutlet]="panel.templateRef" />
          </ng-template>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .h-tab-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        border-bottom: 1px solid var(--h-border);
      }

      .h-tab {
        position: relative;
        padding: 0 4px 12px;
        margin-right: 20px;
        font-size: var(--h-text-sm);
        font-weight: 500;
        color: var(--h-muted-foreground);
        cursor: pointer;
        border: none;
        background: none;
        outline: none;
        transition: color var(--h-motion-product-quick) var(--h-motion-product-ease);
        white-space: nowrap;
        user-select: none;
        min-height: var(--h-touch-min);
        display: flex;
        align-items: center;
        font-family: var(--h-font-sans);
      }

      .h-tab::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        border-radius: 2px 2px 0 0;
        background: transparent;
        transition: background var(--h-motion-product-quick) var(--h-motion-product-ease);
      }

      .h-tab[aria-selected='true'] {
        color: var(--h-foreground);
      }

      .h-tab[aria-selected='true']::after {
        background: var(--h-primary);
      }

      .h-tab[aria-disabled='true'] {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }

      .h-tab:focus-visible {
        outline: 2px solid var(--h-ring);
        outline-offset: -2px;
        border-radius: var(--h-radius-sm);
      }

      .h-tab-panel {
        padding-top: 16px;
      }

      .h-tab-panel[inert] {
        display: none;
      }
    `,
  ],
})
export class HTabsComponent {
  readonly selectedTab = model<string | undefined>(undefined);
  readonly _labels = contentChildren(HTabLabelDirective);
  readonly _panels = contentChildren(HTabPanelDirective);
}
