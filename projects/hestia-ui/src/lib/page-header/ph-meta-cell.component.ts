import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { LucideChevronDown } from '@lucide/angular';

@Component({
  selector: 'h-ph-meta-cell',
  standalone: true,
  imports: [LucideChevronDown],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-meta-cell"
         [class.h-meta-cell--clickable]="clickable()"
         (click)="cellClick.emit()"
         tabindex="0"
         role="button"
         [attr.aria-disabled]="!clickable() ? true : null">
      <div class="h-meta-label">{{ label() }}</div>
      <div class="h-meta-val-wrap">
        <span class="h-meta-val" [class.h-id]="mono()" [class.h-meta-val--empty]="value() === '—'">
          {{ value() }}
        </span>
        @if (clickable()) {
          <svg lucideChevronDown class="h-meta-chevron" [size]="13" aria-hidden="true"></svg>
        }
      </div>
      <ng-content />
    </div>
  `,
  styles: [`
    :host { display: block; flex: 1; min-width: 0; border-right: 1px solid var(--h-border); }
    :host(:last-child) { border-right: none; }

    .h-meta-cell {
      padding: 12px 20px;
      height: 100%;
      transition: background var(--h-motion-product-instant) var(--h-motion-product-ease);
      outline: none;
    }
    .h-meta-cell--clickable {
      cursor: pointer;
    }
    .h-meta-cell--clickable:hover, .h-meta-cell--clickable:focus-visible {
      background: var(--h-muted);
    }
    .h-meta-cell--clickable:focus-visible {
       box-shadow: inset 0 0 0 2px var(--h-ring);
    }

    .h-meta-label {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--h-muted-foreground);
      margin-bottom: 5px;
      font-family: var(--h-font-sans);
      white-space: nowrap;
    }

    .h-meta-val-wrap {
      display: flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
      overflow: hidden;
    }

    .h-meta-val {
      font-size: 14px;
      font-weight: 500;
      color: var(--h-foreground);
      font-family: var(--h-font-sans);
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .h-meta-val--empty {
      color: var(--h-muted-foreground);
    }
    .h-meta-chevron {
      color: var(--h-muted-foreground);
      flex-shrink: 0;
    }
  `]
})
export class HPageHeaderMetaCellComponent {
  readonly label = input.required<string>();
  readonly value = input<string>('—');
  readonly clickable = input(false);
  readonly mono = input(false);

  readonly cellClick = output<void>();
}
