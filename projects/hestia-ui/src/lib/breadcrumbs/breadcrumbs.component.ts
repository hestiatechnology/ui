import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface HBreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

@Component({
  selector: 'h-breadcrumbs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="h-breadcrumbs" [attr.aria-label]="ariaLabel()">
      <ol class="h-breadcrumbs-list">
        @for (item of items(); track item.label; let last = $last) {
          <li class="h-breadcrumbs-item">
            @if (!last) {
              @if (item.href) {
                <a [href]="item.href" class="h-breadcrumbs-link">
                  @if (item.icon) {
                    <span class="h-breadcrumbs-icon" [innerHTML]="item.icon"></span>
                  }
                  {{ item.label }}
                </a>
              } @else {
                <span class="h-breadcrumbs-link h-breadcrumbs-link--text">
                  @if (item.icon) {
                    <span class="h-breadcrumbs-icon" [innerHTML]="item.icon"></span>
                  }
                  {{ item.label }}
                </span>
              }
              <span class="h-breadcrumbs-sep" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </span>
            } @else {
              <span class="h-breadcrumbs-current" [attr.aria-current]="'page'">
                @if (item.icon) {
                  <span class="h-breadcrumbs-icon" [innerHTML]="item.icon"></span>
                }
                {{ item.label }}
              </span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [
    `
      .h-breadcrumbs {
        font-size: var(--h-text-sm);
        font-family: var(--h-font-sans);
      }

      .h-breadcrumbs-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 2px;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .h-breadcrumbs-item {
        display: flex;
        align-items: center;
        gap: 2px;
      }

      .h-breadcrumbs-link {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        color: var(--h-muted-foreground);
        text-decoration: none;
        border-radius: var(--h-radius-sm);
        padding: 2px 4px;
        transition: color var(--h-motion-product-instant) var(--h-motion-product-ease);
      }

      a.h-breadcrumbs-link:hover {
        color: var(--h-foreground);
        text-decoration: underline;
        text-decoration-color: var(--h-border-strong);
      }

      a.h-breadcrumbs-link:focus-visible {
        outline: 2px solid var(--h-ring);
        outline-offset: 2px;
      }

      .h-breadcrumbs-sep {
        display: flex;
        align-items: center;
        color: var(--h-border-strong);
      }

      .h-breadcrumbs-current {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        color: var(--h-foreground);
        font-weight: 500;
        padding: 2px 4px;
      }

      .h-breadcrumbs-icon {
        display: flex;
        align-items: center;
      }
    `,
  ],
})
export class HBreadcrumbsComponent {
  readonly items = input.required<HBreadcrumbItem[]>();
  readonly ariaLabel = input<string>('Breadcrumb');
}
