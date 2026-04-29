import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { H_FORM_FIELD_CONTROL, HFormFieldControl } from '../field/field.component';

let _nextId = 0;

/**
 * Generic select for object-valued options.
 * Use `displayWith` to derive the display label and `compareWith` to test equality.
 */
@Component({
  selector: 'h-object-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: H_FORM_FIELD_CONTROL, useExisting: HObjectSelectComponent }],
  host: {
    class: 'h-oselect-host',
    '(document:click)': '_onDocumentClick($event)',
    '(keydown)': '_onHostKeydown($event)',
  },
  template: `
    <div class="h-oselect" [class.h-oselect--open]="open()" [class.h-oselect--disabled]="disabled()">
      <button
        #triggerRef
        type="button"
        class="h-oselect-trigger"
        [class.h-oselect-trigger--sm]="size() === 'sm'"
        [class.h-oselect-trigger--lg]="size() === 'lg'"
        [attr.disabled]="disabled() || null"
        [attr.aria-expanded]="open()"
        [attr.aria-haspopup]="'listbox'"
        [attr.aria-label]="ariaLabel() || null"
        [id]="nativeId()"
        (click)="toggle()"
      >
        <span class="h-oselect-value" [class.h-oselect-value--placeholder]="!_selectedLabel()">
          {{ _selectedLabel() || placeholder() }}
        </span>
        <svg class="h-oselect-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      @if (open()) {
        <div class="h-oselect-panel" role="listbox" [attr.aria-label]="ariaLabel() || placeholder()">
          @if (searchable()) {
            <div class="h-oselect-search">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
              </svg>
              <input
                #searchRef
                class="h-oselect-search-input"
                type="text"
                [placeholder]="searchPlaceholder()"
                [value]="_searchQuery()"
                (input)="_searchQuery.set($any($event.target).value)"
                (click)="$event.stopPropagation()"
              />
            </div>
          }
          <div class="h-oselect-options">
            @for (opt of _filteredOptions(); track $index) {
              <div
                class="h-oselect-option"
                [class.h-oselect-option--active]="_isSelected(opt)"
                [class.h-oselect-option--disabled]="_isDisabled(opt)"
                role="option"
                [attr.aria-selected]="_isSelected(opt)"
                (click)="_select(opt)"
              >
                {{ displayWith()(opt) }}
                <span class="h-oselect-option-check">
                  @if (_isSelected(opt)) {
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  }
                </span>
              </div>
            } @empty {
              <div class="h-oselect-empty">No options found</div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; position: relative; }

    .h-oselect { position: relative; }

    .h-oselect-trigger {
      display: inline-flex; align-items: center; justify-content: space-between;
      width: 100%; height: 36px; padding: 0 12px 0 14px;
      background: var(--h-card); border: 1px solid var(--h-border);
      border-radius: var(--h-radius-md); cursor: pointer;
      font-family: var(--h-font-sans); font-size: 13.5px;
      color: var(--h-foreground); gap: 8px;
      transition: border-color var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-oselect-trigger:hover:not(:disabled) { border-color: var(--h-border-strong); }
    .h-oselect-trigger:focus-visible {
      outline: none;
      border-color: var(--h-ring);
      box-shadow: 0 0 0 3px rgba(0, 61, 165, 0.20);
    }
    .h-oselect-trigger:disabled { opacity: 0.5; cursor: not-allowed; }
    .h-oselect-trigger--sm { height: 32px; font-size: 13px; }
    .h-oselect-trigger--lg { height: 44px; font-size: 14.5px; }

    .h-oselect-value { flex: 1; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .h-oselect-value--placeholder { color: var(--h-muted-foreground); }

    .h-oselect-chevron {
      color: var(--h-muted-foreground); flex-shrink: 0;
      transition: transform var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-oselect--open .h-oselect-chevron { transform: rotate(180deg); }

    .h-oselect-panel {
      position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 50;
      background: var(--h-popover); border: 1px solid var(--h-border);
      border-radius: var(--h-radius-md); box-shadow: var(--h-shadow-md);
      overflow: hidden; min-width: 200px;
    }

    .h-oselect-search {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 10px; border-bottom: 1px solid var(--h-border);
      color: var(--h-muted-foreground);
    }
    .h-oselect-search-input {
      flex: 1; border: 0; outline: none; background: transparent;
      font-family: var(--h-font-sans); font-size: 13px; color: var(--h-foreground);
    }

    .h-oselect-options { padding: 4px; max-height: 220px; overflow: auto; }

    .h-oselect-option {
      display: flex; align-items: center; gap: 10px;
      padding: 8px 10px; border-radius: var(--h-radius-sm);
      font-size: 13.5px; cursor: pointer; color: var(--h-foreground);
      transition: background var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    .h-oselect-option:hover:not(.h-oselect-option--disabled) { background: var(--h-muted); }
    .h-oselect-option--active { background: rgba(0, 61, 165, 0.06); color: var(--h-primary); }
    .h-oselect-option--disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
    .h-oselect-option-check { width: 14px; display: flex; flex-shrink: 0; color: var(--h-primary); margin-left: auto; }

    .h-oselect-empty { padding: 10px; text-align: center; font-size: 13px; color: var(--h-muted-foreground); }
  `],
})
export class HObjectSelectComponent<T = unknown> implements FormValueControl<T | null>, HFormFieldControl, OnDestroy {
  private readonly _autoId = `h-oselect-${_nextId++}`;

  readonly nativeId = computed(() => this.selectId() ?? this._autoId);

  readonly value    = model<T | null>(null);
  readonly disabled = input(false);
  readonly invalid  = input(false);
  readonly errors   = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touched  = model<boolean>(false);
  readonly required = input(false);

  readonly options         = input<T[]>([]);
  readonly displayWith     = input<(v: T) => string>((v) => String(v));
  readonly compareWith     = input<(a: T, b: T) => boolean>((a, b) => a === b);
  readonly placeholder     = input('Choose…');
  readonly searchable      = input(false);
  readonly searchPlaceholder = input('Search…');
  readonly size            = input<'sm' | 'default' | 'lg'>('default');
  readonly ariaLabel       = input('');
  readonly selectId        = input<string | undefined>(undefined);

  readonly valueChange = output<T | null>();

  protected readonly open         = signal(false);
  protected readonly _searchQuery = signal('');

  private readonly _triggerRef = viewChild<ElementRef<HTMLButtonElement>>('triggerRef');

  protected readonly _selectedLabel = computed(() => {
    const v = this.value();
    if (v === null) return '';
    return this.displayWith()(v);
  });

  protected readonly _filteredOptions = computed(() => {
    const q = this._searchQuery().toLowerCase();
    const opts = this.options();
    if (!q) return opts;
    return opts.filter(o => this.displayWith()(o).toLowerCase().includes(q));
  });

  protected _isSelected(opt: T): boolean {
    const v = this.value();
    if (v === null) return false;
    return this.compareWith()(opt, v);
  }

  protected _isDisabled(opt: T): boolean {
    return !!((opt as Record<string, unknown>)?.['disabled']);
  }

  toggle(): void {
    if (this.disabled()) return;
    this.open.update(v => !v);
    if (this.open()) this._searchQuery.set('');
  }

  protected _select(opt: T): void {
    if (this._isDisabled(opt)) return;
    this.value.set(opt);
    this.valueChange.emit(opt);
    this.touched.set(true);
    this.open.set(false);
  }

  _onDocumentClick(event: MouseEvent): void {
    const host = this._triggerRef()?.nativeElement;
    if (host && !host.closest('h-object-select')?.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  _onHostKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.open.set(false);
      this._triggerRef()?.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    this.open.set(false);
  }
}
