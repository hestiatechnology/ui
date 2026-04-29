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
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'h-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        [attr.aria-label]="ariaLabel() || null"
        (click)="toggle()"
      >
        <span class="h-select-value" [class.h-select-value--placeholder]="!selectedLabel()">
          {{ selectedLabel() || placeholder() }}
        </span>
        <svg class="h-select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      @if (open()) {
        <div class="h-select-panel" role="listbox" [attr.aria-label]="ariaLabel() || placeholder()">
          @if (searchable()) {
            <div class="h-select-search">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
              </svg>
              <input
                #searchRef
                class="h-select-search-input"
                type="text"
                [placeholder]="searchPlaceholder()"
                [ngModel]="searchQuery()"
                (ngModelChange)="searchQuery.set($event)"
                (click)="$event.stopPropagation()"
              />
            </div>
          }
          <div class="h-select-options">
            @for (opt of filteredOptions(); track opt.value) {
              <div
                class="h-select-option"
                [class.h-select-option--active]="opt.value === value()"
                [class.h-select-option--disabled]="opt.disabled"
                role="option"
                [attr.aria-selected]="opt.value === value()"
                (click)="select(opt)"
              >
                <span class="h-select-option-check">
                  @if (opt.value === value()) {
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  }
                </span>
                {{ opt.label }}
              </div>
            } @empty {
              <div class="h-select-empty">No options found</div>
            }
          </div>
        </div>
      }
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
      position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 50;
      background: var(--h-popover); border: 1px solid var(--h-border);
      border-radius: var(--h-radius-md); box-shadow: var(--h-shadow-md);
      overflow: hidden; min-width: 200px;
    }

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

    .h-select-option {
      display: flex; align-items: center; gap: 10px;
      padding: 8px 10px; border-radius: var(--h-radius-sm);
      font-size: 13.5px; cursor: pointer;
      color: var(--h-foreground);
      transition: background var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    .h-select-option:hover:not(.h-select-option--disabled) { background: var(--h-muted); }
    .h-select-option--active {
      background: rgba(0, 61, 165, 0.06); color: var(--h-primary);
    }
    .h-select-option--disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }

    .h-select-option-check { width: 14px; display: flex; flex-shrink: 0; color: var(--h-primary); }

    .h-select-empty { padding: 10px; text-align: center; font-size: 13px; color: var(--h-muted-foreground); }
  `],
})
export class HSelectComponent implements OnDestroy {
  readonly options = input<SelectOption[]>([]);
  readonly value = model<string>('');
  readonly placeholder = input('Choose…');
  readonly searchable = input(false);
  readonly searchPlaceholder = input('Search…');
  readonly disabled = input(false);
  readonly size = input<'sm' | 'default' | 'lg'>('default');
  readonly ariaLabel = input('');
  readonly valueChange = output<string>();

  protected readonly open = signal(false);
  protected readonly searchQuery = signal('');

  private readonly _triggerRef = viewChild<ElementRef<HTMLButtonElement>>('triggerRef');

  protected readonly selectedLabel = computed(() => {
    const opt = this.options().find(o => o.value === this.value());
    return opt?.label ?? '';
  });

  protected readonly filteredOptions = computed(() => {
    const q = this.searchQuery().toLowerCase();
    if (!q) return this.options();
    return this.options().filter(o => o.label.toLowerCase().includes(q));
  });

  toggle() {
    if (this.disabled()) return;
    this.open.update(v => !v);
    if (this.open()) this.searchQuery.set('');
  }

  select(opt: SelectOption) {
    if (opt.disabled) return;
    this.value.set(opt.value);
    this.valueChange.emit(opt.value);
    this.open.set(false);
  }

  _onDocumentClick(event: MouseEvent) {
    const host = this._triggerRef()?.nativeElement;
    if (host && !host.closest('h-select')?.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  _onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.open.set(false);
      this._triggerRef()?.nativeElement.focus();
    }
  }

  ngOnDestroy() {
    this.open.set(false);
  }
}
