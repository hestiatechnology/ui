import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HAvatarComponent } from './avatar.component';

@Component({
  selector: 'h-avatar-stack',
  standalone: true,
  imports: [HAvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-avatar-stack">
      @for (name of visible(); track name; let i = $index) {
        <div class="h-avatar-stack-item" [style.z-index]="visible().length - i">
          <h-avatar [name]="name" [size]="size()" />
        </div>
      }
      @if (overflow() > 0) {
        <div
          class="h-avatar-stack-overflow"
          [style.width.px]="size()"
          [style.height.px]="size()"
          [style.font-size.px]="size() * 0.38"
          [attr.aria-label]="overflow() + ' more'"
        >+{{ overflow() }}</div>
      }
    </div>
  `,
  styles: [`
    :host { display: inline-flex; }
    .h-avatar-stack { display: inline-flex; align-items: center; }
    .h-avatar-stack-item {
      margin-left: -8px; position: relative;
    }
    .h-avatar-stack-item:first-child { margin-left: 0; }
    .h-avatar-stack-item ::ng-deep .h-avatar {
      border: 2px solid var(--h-card);
    }
    .h-avatar-stack-overflow {
      margin-left: -8px; border-radius: 9999px; position: relative; z-index: 0;
      background: var(--h-muted); color: var(--h-muted-foreground);
      font-weight: 600; display: grid; place-items: center;
      font-family: var(--h-font-sans); border: 2px solid var(--h-card);
      flex-shrink: 0;
    }
  `],
})
export class HAvatarStackComponent {
  readonly names = input<string[]>([]);
  readonly max   = input(3);
  readonly size  = input(28);

  readonly visible  = computed(() => this.names().slice(0, this.max()));
  readonly overflow = computed(() => Math.max(0, this.names().length - this.max()));
}
