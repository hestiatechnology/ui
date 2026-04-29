import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HAvatarComponent } from './avatar.component';

@Component({
  selector: 'h-user-chip',
  standalone: true,
  imports: [HAvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-user-chip">
      <h-avatar [name]="name()" [size]="22" />
      <span class="h-user-chip-name">{{ name() }}</span>
      @if (role()) {
        <span class="h-user-chip-role">· {{ role() }}</span>
      }
    </div>
  `,
  styles: [`
    :host { display: inline-flex; }
    .h-user-chip {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 4px 10px 4px 4px; border: 1px solid var(--h-border);
      border-radius: 9999px; background: var(--h-card);
    }
    .h-user-chip-name {
      font-size: 12.5px; font-weight: 500; color: var(--h-foreground);
      font-family: var(--h-font-sans);
    }
    .h-user-chip-role {
      font-size: 11px; color: var(--h-muted-foreground);
      font-family: var(--h-font-sans);
    }
  `],
})
export class HUserChipComponent {
  readonly name = input.required<string>();
  readonly role = input('');
}
