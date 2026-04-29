import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  effect,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';

export interface HCommandItem {
  label: string;
  value: string;
  kbd?: string;
  active?: boolean;
}

export interface HCommandGroup {
  label: string;
  items: HCommandItem[];
}

@Component({
  selector: 'h-command-palette',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog
      #dialogRef
      class="h-command-palette"
      (close)="onClose()"
      (click)="onBackdropClick($event)"
    >
      <div class="h-command-content" (click)="$event.stopPropagation()">
        <div class="h-command-search-row">
          <svg class="h-command-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            #searchInput
            class="h-command-input"
            [placeholder]="placeholder()"
            [value]="query()"
            (input)="onInput($event)"
            (keydown)="onKeydown($event)"
            autocomplete="off"
            spellcheck="false"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
          />
          <kbd class="h-command-esc">Esc</kbd>
        </div>
        <div class="h-command-results" role="listbox">
          @for (group of groups(); track group.label) {
            @if (group.items.length > 0) {
              <div class="h-command-group-label">{{ group.label }}</div>
              @for (item of group.items; track item.value) {
                <div
                  class="h-command-item"
                  [class.h-command-item--active]="item.active"
                  role="option"
                  [attr.aria-selected]="item.active"
                  (click)="select(item)"
                >
                  <span class="h-command-item-label">{{ item.label }}</span>
                  @if (item.kbd) {
                    <span class="h-command-item-kbd">{{ item.kbd }}</span>
                  }
                </div>
              }
            }
          }
          <ng-content />
        </div>
      </div>
    </dialog>
  `,
  styles: [`
    :host { display: contents; }
    .h-command-palette {
      margin: 10vh auto auto; padding: 0; border: none;
      border-radius: 12px; width: 540px; max-width: calc(100vw - 32px);
      background: var(--h-popover); border: 1px solid var(--h-border);
      box-shadow: var(--h-shadow-xl); overflow: hidden;
    }
    .h-command-palette::backdrop { background: rgba(0,0,0,0.4); backdrop-filter: blur(2px); }
    .h-command-search-row {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px; border-bottom: 1px solid var(--h-border);
    }
    .h-command-search-icon { color: var(--h-muted-foreground); flex-shrink: 0; }
    .h-command-input {
      flex: 1; border: none; outline: none; background: transparent;
      font-family: var(--h-font-sans); font-size: 14px; color: var(--h-foreground);
    }
    .h-command-input::placeholder { color: var(--h-muted-foreground); }
    .h-command-esc {
      font-family: var(--h-font-mono); font-size: 11px; color: var(--h-muted-foreground);
      border: 1px solid var(--h-border); padding: 1px 5px; border-radius: 4px; flex-shrink: 0;
    }
    .h-command-results { padding: 6px; max-height: 400px; overflow-y: auto; }
    .h-command-group-label {
      font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--h-muted-foreground); padding: 8px 10px 4px; font-family: var(--h-font-sans);
    }
    .h-command-item {
      display: flex; align-items: center; gap: 10px; padding: 8px 10px;
      border-radius: 8px; font-size: 13.5px; cursor: pointer;
      color: var(--h-foreground); font-family: var(--h-font-sans);
    }
    .h-command-item:hover { background: var(--h-muted); }
    .h-command-item--active {
      background: rgba(0,61,165,0.06); color: var(--h-primary);
    }
    .h-command-item-label { flex: 1; }
    .h-command-item-kbd {
      font-family: var(--h-font-mono); font-size: 11px; color: var(--h-muted-foreground);
    }
  `],
})
export class HCommandPaletteComponent implements OnDestroy {
  readonly open        = model(false);
  readonly groups      = input<HCommandGroup[]>([]);
  readonly placeholder = input('Type a command or search…');
  readonly query       = model('');

  readonly selected  = output<HCommandItem>();
  readonly queryChange = output<string>();

  private readonly dialogRef   = viewChild.required<ElementRef<HTMLDialogElement>>('dialogRef');
  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  constructor() {
    effect(() => {
      const el = this.dialogRef().nativeElement;
      if (this.open()) {
        if (!el.open) { el.showModal(); setTimeout(() => this.searchInput()?.nativeElement.focus(), 0); }
      } else {
        if (el.open) el.close();
      }
    });
  }

  onInput(e: Event): void {
    const val = (e.target as HTMLInputElement).value;
    this.query.set(val);
    this.queryChange.emit(val);
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') { this.open.set(false); }
  }

  select(item: HCommandItem): void {
    this.selected.emit(item);
    this.open.set(false);
  }

  onClose(): void { this.open.set(false); }

  onBackdropClick(e: MouseEvent): void {
    const rect = this.dialogRef().nativeElement.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
      this.open.set(false);
    }
  }

  ngOnDestroy(): void {
    const el = this.dialogRef().nativeElement;
    if (el.open) el.close();
  }
}
