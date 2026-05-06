import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export type AvatarTone = 'primary' | 'cotton';

@Component({
  selector: 'h-avatar',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="avatarClasses" [style]="avatarStyle" [attr.aria-label]="name || 'Avatar'">
        @if (src()) {
          <img [src]="src()" [alt]="name() || ''" class="h-avatar-img">
      } @else {
        <span aria-hidden="true">{{ initials }}</span>
      }
    </div>
  `,
  styles: [`
    :host { display: inline-flex; flex-shrink: 0; }
    .h-avatar {
      border-radius: 9999px; overflow: hidden;
      display: inline-flex; align-items: center; justify-content: center;
      font-weight: 600; flex-shrink: 0; font-family: var(--h-font-sans);
    }
    .h-avatar-img { width: 100%; height: 100%; object-fit: cover; }
  `]
})
export class HAvatarComponent {
  readonly name = input<string | undefined>(undefined);
  readonly src = input<string | undefined>(undefined);
  readonly size = input(32);
  readonly tone = input<AvatarTone>('primary');

  get initials(): string {
    const n = this.name();
    if (!n) return '?';
    return n.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  }

  private readonly palettes: Record<AvatarTone, { bg: string; fg: string }> = {
    primary: { bg: 'rgba(0,61,165,0.10)', fg: 'var(--h-primary)' },
    cotton:  { bg: 'var(--h-thread-cotton)', fg: '#7B5A1F' },
  };

  get avatarClasses() { return 'h-avatar'; }

  get avatarStyle(): string {
    const p = this.palettes[this.tone()];
    const sz = this.size();
    const fontSize = Math.round(sz * 0.38);
    return `width:${sz}px;height:${sz}px;font-size:${fontSize}px;background:${p.bg};color:${p.fg}`;
  }
}
