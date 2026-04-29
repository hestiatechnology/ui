import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Directive,
  QueryList,
  TemplateRef,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { HAutocompleteComponent } from '../autocomplete/autocomplete.component';

// ── Column definition ─────────────────────────────────────────────────────────

export type ColumnAlign = 'left' | 'center' | 'right';
export type EditType    = 'text' | 'number' | 'select' | 'boolean' | 'autocomplete';

export interface ColumnDef<T = unknown> {
  key:         keyof T & string;
  header:      string;
  align?:      ColumnAlign;
  width?:      string;
  sortable?:   boolean;
  editable?:   boolean;
  editType?:   EditType;
  editOptions?: string[];
  mono?:       boolean;
  cell?:       (row: T) => string;
}

// ── Custom-cell template context ──────────────────────────────────────────────

export interface HDtCellData<T = unknown> {
  /** Formatted cell value (result of col.cell() or raw field). */
  value: unknown;
  /** Full row object. */
  row: T;
  /** True while this row is in edit mode. */
  editing: boolean;
  /** Live draft object — reflect edits back via patch(). */
  draft: Partial<T>;
  /** Update a field in the draft. */
  patch: (key: keyof T & string, value: unknown) => void;
}

/** Template context: use `let-ctx` to get the full HDtCellData object. */
export interface HDtCellContext<T = unknown> {
  $implicit: HDtCellData<T>;
}

// ── Custom-cell template directive ────────────────────────────────────────────

@Directive({ selector: 'ng-template[hDtCell]', standalone: true })
export class HDtCellDirective {
  readonly hDtCell = input.required<string>();
  constructor(readonly tpl: TemplateRef<HDtCellContext>) {}
}

// ── Sort state ────────────────────────────────────────────────────────────────

export interface SortState {
  key:       string;
  direction: 'asc' | 'desc';
}

// ── Component ─────────────────────────────────────────────────────────────────

@Component({
  selector: 'h-data-table',
  standalone: true,
  imports: [HDtCellDirective, NgTemplateOutlet, HAutocompleteComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-dt-host' },
  template: `
    <div class="h-dt-wrapper">
      <table class="h-dt" [class.h-dt--loading]="loading()">
        <thead>
          <tr>
            @if (selectable()) {
              <th class="h-dt-th h-dt-th--check">
                <input type="checkbox" class="h-dt-checkbox"
                  [checked]="_allSelected()"
                  [indeterminate]="_someSelected()"
                  (change)="_toggleAll($any($event.target).checked)"
                  aria-label="Select all rows"
                />
              </th>
            }
            @for (col of columns(); track col.key) {
              <th
                class="h-dt-th"
                [class.h-dt-th--sortable]="col.sortable"
                [class.h-dt-th--center]="col.align === 'center'"
                [class.h-dt-th--right]="col.align === 'right'"
                [style.width]="col.width ?? null"
                (click)="col.sortable ? _sort(col.key) : null"
              >
                <span class="h-dt-th-inner">
                  {{ col.header }}
                  @if (col.sortable) {
                    <span class="h-dt-sort-icon" [class.h-dt-sort-icon--asc]="_sortKey() === col.key && _sortDir() === 'asc'" [class.h-dt-sort-icon--desc]="_sortKey() === col.key && _sortDir() === 'desc'">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>
                      </svg>
                    </span>
                  }
                </span>
              </th>
            }
            @if (_hasEditable()) {
              <th class="h-dt-th h-dt-th--actions"></th>
            }
          </tr>
        </thead>
        <tbody>
          @if (loading()) {
            @for (sk of _skeletonRows(); track $index) {
              <tr class="h-dt-row h-dt-row--skeleton">
                @if (selectable()) {
                  <td class="h-dt-td h-dt-td--check"><span class="h-dt-skel"></span></td>
                }
                @for (col of columns(); track col.key) {
                  <td class="h-dt-td"><span class="h-dt-skel" [style.width]="col.align === 'right' ? '60%' : '80%'"></span></td>
                }
                @if (_hasEditable()) {
                  <td class="h-dt-td h-dt-td--actions"></td>
                }
              </tr>
            }
          } @else if (_sortedRows().length === 0) {
            <tr>
              <td [attr.colspan]="_colSpan()" class="h-dt-empty">
                <ng-container *ngTemplateOutlet="emptyTpl() ?? _defaultEmptyTpl"></ng-container>
              </td>
            </tr>
          } @else {
            @for (row of _sortedRows(); track _trackBy(row, $index)) {
              @let idx = $index;
              <tr
                class="h-dt-row"
                [class.h-dt-row--editing]="_editingIdx() === idx"
                [class.h-dt-row--selected]="_isSelected(idx)"
                (click)="rowClick.emit(row)"
              >
                @if (selectable()) {
                  <td class="h-dt-td h-dt-td--check" (click)="$event.stopPropagation()">
                    <input type="checkbox" class="h-dt-checkbox"
                      [checked]="_isSelected(idx)"
                      (change)="_toggleRow(idx, $any($event.target).checked)"
                      aria-label="Select row"
                    />
                  </td>
                }
                @for (col of columns(); track col.key) {
                  <td
                    class="h-dt-td"
                    [class.h-dt-td--mono]="col.mono"
                    [class.h-dt-td--center]="col.align === 'center'"
                    [class.h-dt-td--right]="col.align === 'right'"
                  >
                    @let customTpl = _cellTpl(col.key);
                    @if (customTpl) {
                      <ng-container *ngTemplateOutlet="customTpl; context: _cellCtx(row, col, idx)"></ng-container>
                    } @else if (_editingIdx() === idx && col.editable) {
                      @if (col.editType === 'boolean') {
                        <input type="checkbox" class="h-dt-checkbox"
                          [checked]="!!_draft()[col.key]"
                          (change)="_patchDraft(col.key, $any($event.target).checked)"
                          (click)="$event.stopPropagation()"
                        />
                      } @else if (col.editType === 'select' && col.editOptions) {
                        <select class="h-dt-edit-select"
                          [value]="_draft()[col.key]"
                          (change)="_patchDraft(col.key, $any($event.target).value)"
                          (click)="$event.stopPropagation()"
                        >
                          @for (opt of col.editOptions; track opt) {
                            <option [value]="opt">{{ opt }}</option>
                          }
                        </select>
                      } @else if (col.editType === 'autocomplete' && col.editOptions) {
                        <h-autocomplete
                          [value]="$any(_draft()[col.key]) ?? null"
                          [options]="col.editOptions"
                          [displayWith]="_strIdentity"
                          (valueChange)="_patchDraft(col.key, $event)"
                          (click)="$event.stopPropagation()"
                        ></h-autocomplete>
                      } @else {
                        <input
                          class="h-dt-edit-input"
                          [type]="col.editType === 'number' ? 'number' : 'text'"
                          [value]="_draft()[col.key]"
                          (input)="_patchDraft(col.key, col.editType === 'number' ? +$any($event.target).value : $any($event.target).value)"
                          (click)="$event.stopPropagation()"
                          (keydown.enter)="$event.preventDefault(); _commitEdit(idx)"
                          (keydown.escape)="$event.preventDefault(); _cancelEdit()"
                        />
                      }
                    } @else {
                      {{ _cellValue(row, col) }}
                    }
                  </td>
                }
                @if (_hasEditable()) {
                  <td class="h-dt-td h-dt-td--actions" (click)="$event.stopPropagation()">
                    @if (_editingIdx() === idx) {
                      <button type="button" class="h-dt-action h-dt-action--save" (click)="_commitEdit(idx)" aria-label="Save">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                      </button>
                      <button type="button" class="h-dt-action h-dt-action--cancel" (click)="_cancelEdit()" aria-label="Cancel">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
                      </button>
                    } @else {
                      <button type="button" class="h-dt-action h-dt-action--edit" (click)="_startEdit(idx, row)" aria-label="Edit row">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>
                      </button>
                      @if (deletable()) {
                        <button type="button" class="h-dt-action h-dt-action--delete" (click)="rowDelete.emit(row)" aria-label="Delete row">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                        </button>
                      }
                    }
                  </td>
                }
              </tr>
            }
          }
        </tbody>
      </table>
    </div>

    <ng-template #_defaultEmptyTpl>
      <span>{{ emptyMessage() }}</span>
    </ng-template>
  `,
  styles: [`
    :host { display: block; width: 100%; }

    .h-dt-wrapper {
      width: 100%; overflow-x: auto;
      border: 1px solid var(--h-border); border-radius: var(--h-radius-lg);
    }

    .h-dt {
      width: 100%; border-collapse: collapse;
      font-family: var(--h-font-sans); font-size: 13.5px; color: var(--h-foreground);
    }

    /* ── Header ─────────────────────────────────────── */
    .h-dt-th {
      padding: 10px 14px; text-align: left; white-space: nowrap;
      font-size: 12px; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.05em; color: var(--h-muted-foreground);
      background: var(--h-muted); border-bottom: 1px solid var(--h-border);
      user-select: none;
    }
    .h-dt-th:first-child { border-radius: var(--h-radius-lg) 0 0 0; }
    .h-dt-th:last-child  { border-radius: 0 var(--h-radius-lg) 0 0; }
    .h-dt-th--center { text-align: center; }
    .h-dt-th--right  { text-align: right; }
    .h-dt-th--check  { width: 40px; padding: 10px 12px; }
    .h-dt-th--actions { width: 80px; }

    .h-dt-th--sortable { cursor: pointer; }
    .h-dt-th--sortable:hover { color: var(--h-foreground); }

    .h-dt-th-inner {
      display: inline-flex; align-items: center; gap: 4px;
    }

    .h-dt-sort-icon { color: var(--h-border-strong); transition: color 0.15s; }
    .h-dt-th--sortable:hover .h-dt-sort-icon { color: var(--h-muted-foreground); }
    .h-dt-sort-icon--asc svg  { opacity: 1; color: var(--h-primary); }
    .h-dt-sort-icon--desc svg { opacity: 1; color: var(--h-primary); transform: scaleY(-1); }

    /* ── Body ───────────────────────────────────────── */
    .h-dt-row {
      border-bottom: 1px solid var(--h-border);
      transition: background var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    .h-dt-row:last-child { border-bottom: 0; }
    .h-dt-row:hover { background: var(--h-muted); }
    .h-dt-row--editing { background: rgba(0, 61, 165, 0.04); }
    .h-dt-row--selected { background: rgba(0, 61, 165, 0.06); }

    .h-dt-td {
      padding: 10px 14px; vertical-align: middle;
    }
    .h-dt-td--mono { font-family: var(--h-font-mono); font-size: 12.5px; }
    .h-dt-td--center { text-align: center; }
    .h-dt-td--right  { text-align: right; }
    .h-dt-td--check  { width: 40px; padding: 10px 12px; }
    .h-dt-td--actions {
      white-space: nowrap; text-align: right; padding: 6px 10px;
    }

    /* ── Edit inputs ────────────────────────────────── */
    .h-dt-edit-input,
    .h-dt-edit-select {
      width: 100%; padding: 4px 8px;
      border: 1px solid var(--h-ring); border-radius: var(--h-radius-sm);
      background: var(--h-card); color: var(--h-foreground);
      font-family: var(--h-font-sans); font-size: 13px;
      outline: none; box-shadow: 0 0 0 3px rgba(0,61,165,0.12);
    }

    /* ── Action buttons ─────────────────────────────── */
    .h-dt-action {
      display: inline-flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border: none; background: none;
      cursor: pointer; border-radius: var(--h-radius-sm);
      color: var(--h-muted-foreground);
      transition: background var(--h-motion-product-instant) var(--h-motion-product-ease),
                  color     var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    .h-dt-action:hover { background: var(--h-muted); color: var(--h-foreground); }
    .h-dt-action--save:hover   { color: var(--h-primary); }
    .h-dt-action--delete:hover { color: var(--h-destructive); }

    /* ── Checkbox ───────────────────────────────────── */
    .h-dt-checkbox { cursor: pointer; width: 15px; height: 15px; accent-color: var(--h-primary); }

    /* ── Skeleton loader ────────────────────────────── */
    .h-dt--loading .h-dt-row--skeleton td { padding: 13px 14px; }
    .h-dt-skel {
      display: block; height: 12px; border-radius: 6px;
      background: linear-gradient(90deg, var(--h-muted) 25%, var(--h-border) 50%, var(--h-muted) 75%);
      background-size: 200% 100%;
      animation: h-dt-shimmer 1.4s ease-in-out infinite;
    }
    @keyframes h-dt-shimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* ── Empty state ────────────────────────────────── */
    .h-dt-empty {
      padding: 48px 14px; text-align: center;
      color: var(--h-muted-foreground); font-size: 13.5px;
    }
  `],
})
export class HDataTableComponent<T extends Record<string, unknown> = Record<string, unknown>> {
  readonly columns      = input<ColumnDef<T>[]>([]);
  readonly rows         = input<T[]>([]);
  readonly loading      = input(false);
  readonly selectable   = input(false);
  readonly deletable    = input(false);
  readonly trackByKey   = input<keyof T & string | undefined>(undefined);
  readonly emptyMessage = input('No data available');
  readonly skeletonRows = input(5);

  readonly selectedIndices = model<number[]>([]);
  readonly sort            = model<SortState | null>(null);

  readonly rowClick        = output<T>();
  readonly rowSave         = output<{ index: number; row: T; draft: T }>();
  readonly rowDelete       = output<T>();
  readonly selectionChange = output<T[]>();
  readonly sortChange      = output<SortState | null>();

  @ContentChildren(HDtCellDirective) private _cellDirs!: QueryList<HDtCellDirective>;

  readonly emptyTpl = input<TemplateRef<unknown> | null>(null);

  protected readonly _sortKey = computed(() => this.sort()?.key ?? null);
  protected readonly _sortDir = computed(() => this.sort()?.direction ?? 'asc');

  protected readonly _sortedRows = computed(() => {
    const rows = [...this.rows()];
    const key  = this._sortKey();
    if (!key) return rows;
    const dir = this._sortDir() === 'asc' ? 1 : -1;
    return rows.sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av === bv) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  });

  protected readonly _skeletonRows = computed(() => Array(this.skeletonRows()).fill(0));

  protected readonly _hasEditable = computed(() => this.columns().some(c => c.editable) || this.deletable());

  protected readonly _colSpan = computed(() =>
    this.columns().length + (this.selectable() ? 1 : 0) + (this._hasEditable() ? 1 : 0)
  );

  protected readonly _allSelected = computed(() => {
    const rows = this._sortedRows();
    if (!rows.length) return false;
    return rows.every((_, i) => this.selectedIndices().includes(i));
  });

  protected readonly _someSelected = computed(() => {
    const sel = this.selectedIndices();
    return sel.length > 0 && !this._allSelected();
  });

  protected readonly _editingIdx = signal<number | null>(null);
  protected readonly _draft      = signal<Record<string, unknown>>({});

  _trackBy(row: T, index: number): unknown {
    const key = this.trackByKey();
    return key ? row[key] : index;
  }

  protected readonly _strIdentity = (v: string) => v;

  protected _cellValue(row: T, col: ColumnDef<T>): string {
    if (col.cell) return col.cell(row);
    const v = row[col.key];
    return v == null ? '' : String(v);
  }

  protected _cellTpl(key: string): TemplateRef<HDtCellContext<T>> | null {
    if (!this._cellDirs) return null;
    const dir = this._cellDirs.find(d => d.hDtCell() === key);
    return dir ? (dir.tpl as TemplateRef<HDtCellContext<T>>) : null;
  }

  protected _cellCtx(row: T, col: ColumnDef<T>, idx: number): HDtCellContext<T> {
    return {
      $implicit: {
        value: this._cellValue(row, col),
        row,
        editing: this._editingIdx() === idx,
        draft: this._draft() as Partial<T>,
        patch: (key, v) => this._patchDraft(key, v),
      },
    };
  }

  protected _sort(key: string): void {
    const cur = this.sort();
    let next: SortState | null;
    if (cur?.key === key) {
      next = cur.direction === 'asc' ? { key, direction: 'desc' } : null;
    } else {
      next = { key, direction: 'asc' };
    }
    this.sort.set(next);
    this.sortChange.emit(next);
  }

  protected _isSelected(idx: number): boolean {
    return this.selectedIndices().includes(idx);
  }

  protected _toggleRow(idx: number, checked: boolean): void {
    const sel = this.selectedIndices();
    const next = checked ? [...sel, idx] : sel.filter(i => i !== idx);
    this.selectedIndices.set(next);
    this.selectionChange.emit(next.map(i => this._sortedRows()[i]));
  }

  protected _toggleAll(checked: boolean): void {
    const next = checked ? this._sortedRows().map((_, i) => i) : [];
    this.selectedIndices.set(next);
    this.selectionChange.emit(checked ? [...this._sortedRows()] : []);
  }

  protected _startEdit(idx: number, row: T): void {
    this._editingIdx.set(idx);
    this._draft.set({ ...row } as Record<string, unknown>);
  }

  protected _patchDraft(key: string, value: unknown): void {
    this._draft.update(d => ({ ...d, [key]: value }));
  }

  protected _commitEdit(idx: number): void {
    const draft = { ...this._draft() } as T;
    this.rowSave.emit({ index: idx, row: this._sortedRows()[idx], draft });
    this._editingIdx.set(null);
    this._draft.set({});
  }

  protected _cancelEdit(): void {
    this._editingIdx.set(null);
    this._draft.set({});
  }
}
