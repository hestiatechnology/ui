import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideX } from '@lucide/angular';

@Component({
  selector: 'h-filter-chip',
  standalone: true,
  imports: [LucideX],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="h-filter-chip">
      <ng-content />
      <button
        type="button"
        class="h-filter-chip-remove"
        [attr.aria-label]="'Remove filter'"
        (click)="removed.emit()"
      >
        <svg lucideX [size]="11" aria-hidden="true"></svg>
      </button>
    </span>
  `,
  styles: [`
    :host { display: inline-flex; }
    .h-filter-chip {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 3px 4px 3px 10px; border-radius: 9999px;
      background: rgba(0,61,165,0.06); border: 1px solid rgba(0,61,165,0.18);
      color: var(--h-primary); font-size: 12px; font-weight: 500;
      font-family: var(--h-font-sans);
    }
    .h-filter-chip-remove {
      width: 18px; height: 18px; border-radius: 9999px; border: none;
      background: transparent; color: var(--h-primary);
      display: grid; place-items: center; cursor: pointer; padding: 0;
      flex-shrink: 0;
    }
    .h-filter-chip-remove:hover { background: rgba(0,61,165,0.10); }
    .h-filter-chip-remove:focus-visible { outline: 2px solid var(--h-ring); }
  `],
})
export class HFilterChipComponent {
  readonly removed = output<void>();
}

@Component({
  selector: 'h-filter-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-filter-bar">
      <div class="h-filter-bar-row">
        <ng-content select="[hFilterSearch]" />
        <ng-content select="[hFilterActions]" />
      </div>
      <div class="h-filter-bar-chips" #chipsSlot>
        <ng-content select="[hFilterChips]" />
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .h-filter-bar {
      width: 100%; padding: 16px;
      background: var(--h-card); border-bottom: 1px solid var(--h-border);
      display: flex; flex-direction: column; gap: 12px;
    }
    .h-filter-bar-row {
      display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
    }
    .h-filter-bar-chips {
      display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
    }
    .h-filter-bar-chips:empty { display: none; }
  `],
})
export class HFilterBarComponent {}
