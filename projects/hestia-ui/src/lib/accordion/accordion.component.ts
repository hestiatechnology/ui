import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  TemplateRef,
  contentChildren,
  input,
  model,
  viewChildren,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  AccordionContent,
  AccordionGroup,
  AccordionPanel,
  AccordionTrigger,
} from '@angular/aria/accordion';

/**
 * Marker directive — apply to ng-template to define an accordion item.
 *
 * Usage:
 *   <ng-template hAccordionItem title="FAQ question">Answer text</ng-template>
 */
@Directive({
  selector: 'ng-template[hAccordionItem]',
  standalone: true,
})
export class HAccordionItemDirective {
  readonly title = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly expanded = model<boolean>(false);
  constructor(readonly templateRef: TemplateRef<void>) {}
}

@Component({
  selector: 'h-accordion',
  standalone: true,
  imports: [AccordionGroup, AccordionTrigger, AccordionPanel, AccordionContent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div ngAccordionGroup [multiExpandable]="multiExpandable()" class="h-accordion">
      @for (item of _items(); track item.title()) {
        <div class="h-accordion-item">
          <h3 class="h-accordion-heading">
            <button
              ngAccordionTrigger
              #trig="ngAccordionTrigger"
              [panel]="_panels()[_items().indexOf(item)]"
              [disabled]="item.disabled()"
              [(expanded)]="item.expanded"
              class="h-accordion-trigger"
              type="button"
            >
              <span class="h-accordion-title">{{ item.title() }}</span>
              <svg
                class="h-accordion-chevron"
                [class.h-accordion-chevron--open]="trig.expanded()"
                xmlns="http://www.w3.org/2000/svg"
                width="16" height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              ><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </h3>
          <div ngAccordionPanel #p="ngAccordionPanel" class="h-accordion-panel">
            <ng-template ngAccordionContent>
              <div class="h-accordion-body">
                <ng-container [ngTemplateOutlet]="item.templateRef" />
              </div>
            </ng-template>
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .h-accordion {
        border-top: 1px solid var(--h-border);
      }

      .h-accordion-item {
        border-bottom: 1px solid var(--h-border);
      }

      .h-accordion-heading {
        margin: 0;
      }

      .h-accordion-trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 14px 0;
        background: none;
        border: none;
        cursor: pointer;
        font-size: var(--h-text-sm);
        font-weight: 500;
        font-family: var(--h-font-sans);
        color: var(--h-foreground);
        text-align: left;
        min-height: var(--h-touch-default);
        gap: 8px;
        transition: color var(--h-motion-product-instant) var(--h-motion-product-ease);
      }

      .h-accordion-trigger:hover {
        color: var(--h-primary);
      }

      .h-accordion-trigger[aria-disabled='true'] {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .h-accordion-trigger:focus-visible {
        outline: 2px solid var(--h-ring);
        outline-offset: 2px;
        border-radius: var(--h-radius-sm);
      }

      .h-accordion-title {
        flex: 1;
      }

      .h-accordion-chevron {
        flex-shrink: 0;
        color: var(--h-muted-foreground);
        transition: transform var(--h-motion-product-base) var(--h-motion-product-ease);
      }

      .h-accordion-chevron--open {
        transform: rotate(180deg);
      }

      .h-accordion-panel[inert] {
        display: none;
      }

      .h-accordion-body {
        padding-bottom: 14px;
        font-size: var(--h-text-sm);
        font-family: var(--h-font-sans);
        color: var(--h-muted-foreground);
        line-height: 1.6;
      }
    `,
  ],
})
export class HAccordionComponent {
  readonly multiExpandable = input<boolean>(false);

  readonly _items = contentChildren(HAccordionItemDirective);
  readonly _panels = viewChildren<AccordionPanel>('p');
}
