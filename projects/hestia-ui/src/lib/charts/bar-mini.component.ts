import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface HBarMiniBar {
  value: number;
  active?: boolean;
}

@Component({
  selector: 'h-bar-mini',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-bar-mini" [style.height.px]="height()" aria-hidden="true">
      @for (bar of normalised(); track $index) {
        <div
          class="h-bar-mini-bar"
          [class.h-bar-mini-bar--active]="bar.active"
          [style.height]="(bar.value * 100) + '%'"
        ></div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .h-bar-mini {
      display: flex; align-items: flex-end; gap: 6px;
      margin-top: 12px;
    }
    .h-bar-mini-bar {
      flex: 1; border-radius: 3px;
      background: rgba(0,61,165,0.30);
      transition: height var(--h-motion-product-base, 200ms) ease;
    }
    .h-bar-mini-bar--active { background: var(--h-primary); }
  `],
})
export class HBarMiniComponent {
  readonly values       = input<number[]>([]);
  readonly height       = input(70);
  readonly activeIndex  = input<number | null>(null);

  readonly normalised = computed(() => {
    const v = this.values();
    if (!v.length) return [];
    const max = Math.max(...v) || 1;
    const active = this.activeIndex();
    const useLastAsActive = active === null;
    return v.map((val, i) => ({
      value: val / max,
      active: useLastAsActive ? i === v.length - 1 : i === active,
    }));
  });
}
