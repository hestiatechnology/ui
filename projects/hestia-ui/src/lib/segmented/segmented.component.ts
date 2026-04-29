import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  input,
  model,
  signal,
} from '@angular/core';

export interface HSegmentedOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'h-segmented',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="h-segmented"
      role="group"
      [attr.aria-label]="ariaLabel()"
      (keydown)="onKeydown($event)"
    >
      @for (opt of options(); track opt.value; let i = $index) {
        <button
          #item
          type="button"
          role="radio"
          class="h-segmented-item"
          [class.h-segmented-item--selected]="isSelected(opt.value)"
          [attr.aria-checked]="isSelected(opt.value)"
          [attr.aria-disabled]="opt.disabled || null"
          [disabled]="opt.disabled || false"
          [tabindex]="isSelected(opt.value) ? 0 : -1"
          (click)="select(opt.value)"
        >{{ opt.label }}</button>
      }
    </div>
  `,
  styles: [`
    .h-segmented {
      display: inline-flex;
      padding: 3px;
      background: var(--h-muted);
      border-radius: 9px;
      border: 1px solid var(--h-border);
      gap: 2px;
    }

    .h-segmented-item {
      padding: 5px 12px;
      border-radius: 7px;
      border: none;
      cursor: pointer;
      font-size: 12.5px;
      font-weight: 500;
      font-family: var(--h-font-sans);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: transparent;
      color: var(--h-muted-foreground);
      box-shadow: none;
      transition:
        background var(--h-motion-product-quick) var(--h-motion-product-ease),
        color var(--h-motion-product-quick) var(--h-motion-product-ease),
        box-shadow var(--h-motion-product-quick) var(--h-motion-product-ease);
      white-space: nowrap;
      min-height: var(--h-touch-min);
    }

    .h-segmented-item--selected {
      background: var(--h-card);
      color: var(--h-foreground);
      box-shadow: var(--h-shadow-xs);
    }

    .h-segmented-item[aria-disabled='true'] {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .h-segmented-item:focus-visible {
      outline: 2px solid var(--h-ring);
      outline-offset: -2px;
    }
  `],
})
export class HSegmentedComponent<T = string> {
  readonly options = input.required<HSegmentedOption<T>[]>();
  readonly selectedValues = model<T[]>([]);
  readonly ariaLabel = input<string>('Options');

  @ViewChildren('item') private _items!: QueryList<ElementRef<HTMLButtonElement>>;

  isSelected(value: T): boolean {
    return this.selectedValues().includes(value);
  }

  select(value: T): void {
    const opt = this.options().find(o => o.value === value);
    if (opt?.disabled) return;
    this.selectedValues.set([value]);
  }

  onKeydown(event: KeyboardEvent): void {
    const opts = this.options().filter(o => !o.disabled);
    if (!opts.length) return;

    const current = opts.findIndex(o => this.isSelected(o.value));
    let next = current;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = (current + 1) % opts.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = (current - 1 + opts.length) % opts.length;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = opts.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    this.select(opts[next].value);

    const allOpts = this.options();
    const globalIdx = allOpts.findIndex(o => o.value === opts[next].value);
    this._items.get(globalIdx)?.nativeElement.focus();
  }
}
