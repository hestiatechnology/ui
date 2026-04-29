import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AvatarTone = 'primary' | 'cotton';

@Component({
  selector: 'h-avatar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="avatarClasses" [style]="avatarStyle" [attr.aria-label]="name || 'Avatar'">
      @if (src) {
        <img [src]="src" [alt]="name || ''" class="h-avatar-img">
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
  @Input() name?: string;
  @Input() src?: string;
  @Input() size = 32;
  @Input() tone: AvatarTone = 'primary';

  get initials(): string {
    if (!this.name) return '?';
    return this.name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  }

  private readonly palettes: Record<AvatarTone, { bg: string; fg: string }> = {
    primary: { bg: 'rgba(0,61,165,0.10)', fg: 'var(--h-primary)' },
    cotton:  { bg: 'var(--h-thread-cotton)', fg: '#7B5A1F' },
  };

  get avatarClasses() { return 'h-avatar'; }

  get avatarStyle(): string {
    const p = this.palettes[this.tone];
    const fontSize = Math.round(this.size * 0.38);
    return `width:${this.size}px;height:${this.size}px;font-size:${fontSize}px;background:${p.bg};color:${p.fg}`;
  }
}
