import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';

@Component({
  selector: 'h-pagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="h-pagination" [attr.aria-label]="ariaLabel()">
      <button
        type="button"
        class="h-pagination-btn"
        [disabled]="currentPage() <= 1"
        [attr.aria-label]="'Previous page'"
        (click)="goTo(currentPage() - 1)"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        @if (showLabels()) {
          <span>Previous</span>
        }
      </button>

      <div class="h-pagination-pages" role="list">
        @for (page of _pages(); track page) {
          @if (page === -1) {
            <span class="h-pagination-ellipsis" aria-hidden="true">&hellip;</span>
          } @else {
            <button
              type="button"
              role="listitem"
              class="h-pagination-page"
              [class.h-pagination-page--active]="page === currentPage()"
              [attr.aria-current]="page === currentPage() ? 'page' : null"
              [attr.aria-label]="'Page ' + page"
              (click)="goTo(page)"
            >{{ page }}</button>
          }
        }
      </div>

      <button
        type="button"
        class="h-pagination-btn"
        [disabled]="currentPage() >= totalPages()"
        [attr.aria-label]="'Next page'"
        (click)="goTo(currentPage() + 1)"
      >
        @if (showLabels()) {
          <span>Next</span>
        }
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
    </nav>
  `,
  styles: [
    `
      .h-pagination {
        display: flex;
        align-items: center;
        gap: 4px;
        font-family: var(--h-font-sans);
        font-size: var(--h-text-sm);
      }

      .h-pagination-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 0 10px;
        height: 32px;
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

      .h-pagination-btn:hover:not(:disabled) {
        background: var(--h-secondary);
      }

      .h-pagination-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .h-pagination-btn:focus-visible {
        outline: 2px solid var(--h-ring);
        outline-offset: 2px;
      }

      .h-pagination-pages {
        display: flex;
        align-items: center;
        gap: 2px;
      }

      .h-pagination-page {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: var(--h-radius-sm);
        border: 1px solid transparent;
        background: transparent;
        color: var(--h-muted-foreground);
        font-size: var(--h-text-sm);
        font-weight: 500;
        font-family: var(--h-font-sans);
        cursor: pointer;
        transition:
          background var(--h-motion-product-instant) var(--h-motion-product-ease),
          color var(--h-motion-product-instant) var(--h-motion-product-ease);
      }

      .h-pagination-page:hover:not(.h-pagination-page--active) {
        background: var(--h-secondary);
        color: var(--h-foreground);
      }

      .h-pagination-page--active {
        background: var(--h-primary);
        color: var(--h-primary-foreground);
        border-color: var(--h-primary);
      }

      .h-pagination-page:focus-visible {
        outline: 2px solid var(--h-ring);
        outline-offset: 2px;
      }

      .h-pagination-ellipsis {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        color: var(--h-muted-foreground);
        font-size: var(--h-text-sm);
        user-select: none;
      }
    `,
  ],
})
export class HPaginationComponent {
  readonly currentPage = model<number>(1);
  readonly totalPages = input.required<number>();
  readonly siblingCount = input<number>(1);
  readonly showLabels = input<boolean>(false);
  readonly ariaLabel = input<string>('Pagination');
  readonly pageChange = output<number>();

  readonly _pages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const siblings = this.siblingCount();
    const delta = siblings + 2;

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const left = Math.max(2, current - siblings);
    const right = Math.min(total - 1, current + siblings);
    const pages: number[] = [1];

    if (left > 2) pages.push(-1);
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < total - 1) pages.push(-1);
    pages.push(total);

    return pages;
  });

  goTo(page: number) {
    const clamped = Math.max(1, Math.min(page, this.totalPages()));
    if (clamped !== this.currentPage()) {
      this.currentPage.set(clamped);
      this.pageChange.emit(clamped);
    }
  }
}
