import { ChangeDetectionStrategy, Component, computed, effect, input, model, output } from '@angular/core';
import { HSelectComponent } from '../select/select.component';
import { HOptionComponent } from '../select/option.component';
import { LucideChevronsLeft, LucideArrowLeft, LucideArrowRight, LucideChevronsRight } from '@lucide/angular';

@Component({
  selector: 'h-pagination',
  standalone: true,
  imports: [HSelectComponent, HOptionComponent, LucideChevronsLeft, LucideArrowLeft, LucideArrowRight, LucideChevronsRight],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="h-pagination" [attr.aria-label]="ariaLabel()">
      <div class="h-pagination-info">
        @if (_itemRange(); as range) {
          <span class="h-pagination-range">
            Showing
            <span class="h-pagination-range-num">{{ range.start }}&ndash;{{ range.end }}</span>
            of
            <span class="h-pagination-range-num">{{ range.total }}</span>
          </span>
        }
      </div>

      <div class="h-pagination-actions">
        @if (_showPageSize()) {
          <div class="h-pagination-page-size">
            <label class="h-pagination-page-size-label" [for]="pageSizeSelectId()">{{ pageSizeLabel() }}</label>
            <h-select
              class="h-pagination-page-size-select"
              size="sm"
              [selectId]="pageSizeSelectId()"
              [value]="pageSize()"
              (valueChange)="setPageSize($event)"
            >
              @for (option of pageSizeOptions(); track option) {
                <h-option [value]="option">{{ option }}</h-option>
              }
            </h-select>
          </div>
        }

        <div class="h-pagination-controls">
        @if (showFirstLast()) {
          <button
            type="button"
            class="h-pagination-icon-btn"
            [disabled]="currentPage() <= 1 || totalPageCount() <= 1"
            [attr.aria-label]="'First page'"
            (click)="goTo(1)"
          >
            <svg lucideChevronsLeft [size]="14" aria-hidden="true"></svg>
          </button>
        }

        <button
          type="button"
          class="h-pagination-icon-btn"
          [disabled]="currentPage() <= 1 || totalPageCount() <= 1"
          [attr.aria-label]="'Previous page'"
          (click)="goTo(currentPage() - 1)"
        >
          <svg lucideArrowLeft [size]="14" aria-hidden="true"></svg>
          @if (showLabels()) {
            <span>Previous</span>
          }
        </button>

        @for (page of _pages(); track $index) {
          @if (page === -1) {
            <span class="h-pagination-ellipsis" aria-hidden="true">&hellip;</span>
          } @else {
            <button
              type="button"
              class="h-pagination-page"
              [class.h-pagination-page--active]="page === currentPage()"
              [attr.aria-current]="page === currentPage() ? 'page' : null"
              [attr.aria-label]="'Page ' + page"
              (click)="goTo(page)"
            >{{ page }}</button>
          }
        }

        <button
          type="button"
          class="h-pagination-icon-btn"
          [disabled]="currentPage() >= totalPageCount() || totalPageCount() <= 1"
          [attr.aria-label]="'Next page'"
          (click)="goTo(currentPage() + 1)"
        >
          @if (showLabels()) {
            <span>Next</span>
          }
          <svg lucideArrowRight [size]="14" aria-hidden="true"></svg>
        </button>

        @if (showFirstLast()) {
          <button
            type="button"
            class="h-pagination-icon-btn"
            [disabled]="currentPage() >= totalPageCount() || totalPageCount() <= 1"
            [attr.aria-label]="'Last page'"
            (click)="goTo(totalPageCount())"
          >
            <svg lucideChevronsRight [size]="14" aria-hidden="true"></svg>
          </button>
        }
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .h-pagination {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
        width: 100%;
        font-family: var(--h-font-sans);
        font-size: var(--h-text-sm);
      }

      .h-pagination-info {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
        color: var(--h-muted-foreground);
        font-size: 13px;
      }

      .h-pagination-range {
        color: var(--h-muted-foreground);
        font-size: 13px;
        white-space: nowrap;
      }

      .h-pagination-range-num {
        color: var(--h-foreground);
        font-weight: 600;
        font-family: var(--h-font-mono);
        font-variant-numeric: tabular-nums;
      }

      .h-pagination-page-size {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--h-muted-foreground);
      }

      .h-pagination-page-size-label {
        color: var(--h-muted-foreground);
      }

      .h-pagination-page-size-select {
        min-width: 84px;
      }

      .h-pagination-actions {
        display: inline-flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
      }

      .h-pagination-controls {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }

      .h-pagination-icon-btn,
      .h-pagination-page {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        min-width: 32px;
        height: 32px;
        padding: 0 8px;
        border-radius: 8px;
        border: 1px solid var(--h-border);
        background: var(--h-card);
        color: var(--h-foreground);
        font-family: var(--h-font-mono);
        font-size: 13px;
        font-variant-numeric: tabular-nums;
        cursor: pointer;
        transition:
          background var(--h-motion-product-instant) var(--h-motion-product-ease),
          color var(--h-motion-product-instant) var(--h-motion-product-ease),
          border-color var(--h-motion-product-instant) var(--h-motion-product-ease);
      }

      .h-pagination-icon-btn {
        font-family: var(--h-font-sans);
      }

      .h-pagination-icon-btn:hover:not(:disabled),
      .h-pagination-page:hover:not(.h-pagination-page--active) {
        background: var(--h-secondary);
      }

      .h-pagination-icon-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .h-pagination-icon-btn:focus-visible,
      .h-pagination-page:focus-visible {
        outline: 2px solid var(--h-ring);
        outline-offset: 2px;
      }

      .h-pagination-page--active {
        background: var(--h-primary);
        color: var(--h-primary-foreground);
        border-color: var(--h-primary);
      }

      .h-pagination-ellipsis {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 32px;
        height: 32px;
        color: var(--h-muted-foreground);
        font-family: var(--h-font-mono);
        font-size: 13px;
        user-select: none;
      }
    `,
  ],
})
export class HPaginationComponent {
  readonly currentPage = model<number>(1);
  readonly totalPages = input<number | undefined>(undefined);
  readonly totalItems = input<number | undefined>(undefined);
  readonly pageSize = model<number>(25);
  readonly pageSizeOptions = input<readonly number[]>([]);
  readonly showPageSize = input<boolean>(false);
  readonly pageSizeLabel = input<string>('Items per page:');
  readonly siblingCount = input<number>(1);
  readonly showLabels = input<boolean>(false);
  readonly showFirstLast = input<boolean>(true);
  readonly ariaLabel = input<string>('Pagination');
  readonly pageChange = output<number>();
  readonly pageSizeSelectId = input<string>('h-pagination-page-size');

  readonly totalPageCount = computed(() => {
    const explicitTotalPages = this.totalPages();
    if (explicitTotalPages !== undefined) {
      return Math.max(0, explicitTotalPages);
    }

    const totalItems = this.totalItems();
    if (totalItems === undefined) {
      return 0;
    }

    return Math.max(0, Math.ceil(totalItems / Math.max(1, this.pageSize())));
  });

  readonly _showPageSize = computed(() => this.showPageSize() && this.pageSizeOptions().length > 0);

  readonly _itemRange = computed(() => {
    const totalItems = this.totalItems();
    if (totalItems === undefined || totalItems <= 0) {
      return null;
    }

    const pageSize = Math.max(1, this.pageSize());
    const totalPages = this.totalPageCount();
    const currentPage = Math.max(1, Math.min(this.currentPage(), Math.max(1, totalPages)));
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(totalItems, currentPage * pageSize);

    return {
      start: start.toLocaleString(),
      end: end.toLocaleString(),
      total: totalItems.toLocaleString(),
    };
  });

  readonly _pages = computed(() => {
    const total = this.totalPageCount();
    const current = this.currentPage();
    const siblings = this.siblingCount();

    if (total <= 0) {
      return [];
    }

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

  constructor() {
    effect(() => {
      const total = this.totalPageCount();
      const current = this.currentPage();

      if (total === 0 && current !== 1) {
        this.currentPage.set(1);
        return;
      }

      if (total > 0 && current > total) {
        this.currentPage.set(total);
      }
    });
  }

  goTo(page: number) {
    const total = this.totalPageCount();
    if (total <= 0) {
      return;
    }

    const clamped = Math.max(1, Math.min(page, total));
    if (clamped !== this.currentPage()) {
      this.currentPage.set(clamped);
      this.pageChange.emit(clamped);
    }
  }

  setPageSize(value: unknown) {
    const nextPageSize = Number(value);

    if (!Number.isFinite(nextPageSize) || nextPageSize <= 0) {
      return;
    }

    this.pageSize.set(nextPageSize);
  }
}
