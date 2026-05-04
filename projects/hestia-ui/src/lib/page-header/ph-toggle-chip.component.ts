import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'h-ph-toggle-chip',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="h-toggle-chip" (click)="toggle.emit()">
      <span class="h-toggle-icon"><ng-content select="[hToggleIcon]"/></span>
      {{ label() }}
      @if (value()) {
        <span class="h-toggle-val" [class.h-toggle-val--active]="active()">{{ value() }}</span>
      }
    </button>
  `,
  styles: [`
    :host { display: inline-flex; }
    .h-toggle-chip {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 5px 10px;
      border-radius: 9999px;
      font-size: 12.5px;
      font-weight: 600;
      border: 1px solid var(--h-border);
      background: var(--h-card);
      color: var(--h-foreground);
      cursor: pointer;
      font-family: var(--h-font-sans);
      outline: none;
      transition: background 120ms;
    }
    .h-toggle-chip:hover { background: var(--h-muted); }
    .h-toggle-chip:focus-visible { box-shadow: 0 0 0 2px var(--h-card), 0 0 0 4px var(--h-ring); }
    
    .h-toggle-icon {
      color: var(--h-muted-foreground);
      display: flex;
    }
    
    .h-toggle-val {
      padding: 1px 5px;
      border-radius: 4px;
      background: var(--h-muted);
      color: var(--h-muted-foreground);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.02em;
    }
    .h-toggle-val--active {
      background: var(--h-primary);
      color: var(--h-primary-foreground);
    }
  `]
})
export class HPageHeaderToggleChipComponent {
  readonly label = input.required<string>();
  readonly value = input<string>();
  readonly active = input(true);
  readonly toggle = output<void>();
}
