import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  InjectionToken,
  Signal,
  computed,
  inject,
  input,
} from '@angular/core';

export interface HSelectContext<T = unknown> {
  readonly searchQuery: Signal<string>;
  readonly disabled: Signal<boolean>;
  isSelected(value: T): boolean;
  select(value: T): void;
}

export const H_SELECT_CONTEXT = new InjectionToken<HSelectContext>('H_SELECT_CONTEXT');

@Component({
  selector: 'h-option',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'option',
    '[attr.aria-selected]': '_selected()',
    '[attr.aria-disabled]': 'disabled()',
    '[class.h-option--active]': '_selected()',
    '[class.h-option--disabled]': 'disabled()',
    '[style.display]': 'hidden() ? "none" : null',
    '(click)': '_onClick()',
  },
  template: `<ng-content />`,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: var(--h-radius-sm);
      font-size: 13.5px;
      cursor: pointer;
      color: var(--h-foreground);
      transition: background var(--h-motion-product-instant) var(--h-motion-product-ease);
    }
    :host:hover:not(.h-option--disabled) { background: var(--h-muted); }
    :host.h-option--active { background: rgba(0, 61, 165, 0.06); color: var(--h-primary); }
    :host.h-option--disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
  `],
})
export class HOptionComponent<T = unknown> {
  readonly value = input.required<T>();
  /** Override the label used in the trigger and search. Required when option content contains non-text nodes (avatars, icons, etc.). */
  readonly label = input<string | undefined>(undefined);
  readonly disabled = input(false);

  private readonly _ctx = inject<HSelectContext<T>>(H_SELECT_CONTEXT as InjectionToken<HSelectContext<T>>);
  private readonly _el = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly _selected = computed(() => this._ctx.isSelected(this.value()));

  readonly hidden = computed(() => {
    const q = this._ctx.searchQuery().toLowerCase();
    if (!q) return false;
    return !this.getLabel().toLowerCase().includes(q);
  });

  getLabel(): string {
    return this.label() ?? this._el.nativeElement.textContent?.trim() ?? '';
  }

  protected _onClick(): void {
    if (this.disabled() || this._ctx.disabled()) return;
    this._ctx.select(this.value());
  }
}
