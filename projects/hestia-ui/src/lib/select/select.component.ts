import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  Signal,
  computed,
  contentChildren,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { H_FORM_FIELD_CONTROL, HFormFieldControl } from '../field/field.component';
import { HOptionComponent, HSelectContext, H_SELECT_CONTEXT } from './option.component';

let _nextId = 0;

@Component({
  selector: 'h-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: H_SELECT_CONTEXT, useExisting: HSelectComponent },
    { provide: H_FORM_FIELD_CONTROL, useExisting: HSelectComponent },
  ],
  host: {
    class: 'h-select-host',
    '(document:click)': '_onDocumentClick($event)',
    '(keydown)': '_onKeydown($event)',
  },
  template: `
    <div class="h-select" [class.h-select--open]="open()" [class.h-select--disabled]="disabled()">
      <button
        #triggerRef
        type="button"
        class="h-select-trigger"
        [class.h-select-trigger--sm]="size() === 'sm'"
        [class.h-select-trigger--lg]="size() === 'lg'"
        [attr.disabled]="disabled() || null"
        [attr.aria-expanded]="open()"
        [attr.aria-haspopup]="'listbox'"
        [id]="nativeId()"
        (click)="toggle()"
      >
        <span class="h-select-value" [class.h-select-value--placeholder]="!_selectedLabel()">
          {{ _selectedLabel() || placeholder() }}
        </span>
        <svg class="h-select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      <!--
        Panel stays in the DOM (CSS show/hide, not @if) so contentChildren()
        is always populated and _selectedLabel() can resolve without opening.
      -->
      <div class="h-select-panel" [class.h-select-panel--open]="open()" role="listbox">
        @if (searchable()) {
          <div class="h-select-search">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              class="h-select-search-input"
              type="text"
              [placeholder]="searchPlaceholder()"
              [value]="searchQuery()"
              (input)="searchQuery.set($any($event.target).value)"
              (click)="$event.stopPropagation()"
            />
          </div>
        }
        <div class="h-select-options">
          <ng-content />
          @if (_noResults()) {
            <div class="h-select-empty">No options found</div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; position: relative; }

    .h-select { position: relative; }

    .h-select-trigger {
      display: inline-flex; align-items: center; justify-content: space-between;
      width: 100%; height: 36px; padding: 0 12px 0 14px;
      background: var(--h-card); border: 1px solid var(--h-border);
      border-radius: var(--h-radius-md); cursor: pointer;
      font-family: var(--h-font-sans); font-size: 13.5px;
      color: var(--h-foreground); gap: 8px;
      transition: border-color var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-select-trigger:hover:not(:disabled) { border-color: var(--h-border-strong); }
    .h-select-trigger:focus-visible {
      outline: none;
      border-color: var(--h-ring);
      box-shadow: 0 0 0 3px rgba(0, 61, 165, 0.20);
    }
    .h-select-trigger:disabled { opacity: 0.5; cursor: not-allowed; }
    .h-select-trigger--sm { height: 32px; font-size: 13px; }
    .h-select-trigger--lg { height: 44px; font-size: 14.5px; }

    .h-select-value { flex: 1; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .h-select-value--placeholder { color: var(--h-muted-foreground); }

    .h-select-chevron {
      color: var(--h-muted-foreground); flex-shrink: 0;
      transition: transform var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-select--open .h-select-chevron { transform: rotate(180deg); }

    .h-select-panel {
      display: none;
      position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 50;
      background: var(--h-popover); border: 1px solid var(--h-border);
      border-radius: var(--h-radius-md); box-shadow: var(--h-shadow-md);
      overflow: hidden; min-width: 200px;
    }
    .h-select-panel--open { display: block; }

    .h-select-search {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 10px; border-bottom: 1px solid var(--h-border);
      color: var(--h-muted-foreground);
    }
    .h-select-search-input {
      flex: 1; border: 0; outline: none; background: transparent;
      font-family: var(--h-font-sans); font-size: 13px; color: var(--h-foreground);
    }

    .h-select-options { padding: 4px; max-height: 220px; overflow: auto; }

    .h-select-empty { padding: 10px; text-align: center; font-size: 13px; color: var(--h-muted-foreground); }
  `],
})
export class HSelectComponent<T = unknown>
  implements HSelectContext<T>, FormValueControl<T | null>, HFormFieldControl, OnDestroy {

  private readonly _autoId = `h-select-${_nextId++}`;

  readonly nativeId = computed(() => this.selectId() ?? this._autoId);

  readonly value    = model<T | null>(null);
  readonly disabled = input(false);
  readonly invalid  = input(false);
  readonly errors   = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touched  = model<boolean>(false);
  readonly required = input(false);

  readonly compareWith     = input<(a: T, b: T) => boolean>((a, b) => a === b);
  readonly placeholder     = input('Choose…');
  readonly searchable      = input(false);
  readonly searchPlaceholder = input('Search…');
  readonly size            = input<'sm' | 'default' | 'lg'>('default');
  readonly selectId        = input<string | undefined>(undefined);

  readonly valueChange = output<T | null>();

  protected readonly open = signal(false);
  /** Exposed as Signal<string> to satisfy HSelectContext — options read this to filter themselves. */
  readonly searchQuery = signal('');

  private readonly _triggerRef = viewChild<ElementRef<HTMLButtonElement>>('triggerRef');
  private readonly _options    = contentChildren(HOptionComponent);

  protected readonly _selectedLabel = computed(() => {
    const v = this.value();
    if (v === null) return '';
    const cmp = this.compareWith();
    const match = this._options().find(o => cmp(o.value() as T, v));
    return match?.getLabel() ?? '';
  });

  protected readonly _noResults = computed(() =>
    this.searchQuery().length > 0 &&
    this._options().length > 0 &&
    this._options().every(o => o.hidden())
  );

  // --- HSelectContext implementation ---

  isSelected(value: T): boolean {
    const v = this.value();
    if (v === null) return false;
    return this.compareWith()(value, v);
  }

  select(value: T): void {
    this.value.set(value);
    this.valueChange.emit(value);
    this.touched.set(true);
    this.open.set(false);
    this.searchQuery.set('');
  }

  // --- Panel control ---

  toggle(): void {
    if (this.disabled()) return;
    this.open.update(v => !v);
    if (!this.open()) this.searchQuery.set('');
  }

  _onDocumentClick(event: MouseEvent): void {
    const trigger = this._triggerRef()?.nativeElement;
    if (trigger && !trigger.closest('h-select')?.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  _onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.open.set(false);
      this._triggerRef()?.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    this.open.set(false);
  }
}
