import { Component, Input, ChangeDetectionStrategy, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconButtonVariant = 'outline' | 'ghost' | 'primary' | 'danger';
export type IconButtonSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

@Component({
  selector: 'h-icon-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'h-icon-button-host' },
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [attr.aria-label]="ariaLabel"
      [class]="btnClasses">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    :host { display: inline-flex; }
    .h-icon-btn {
      display: inline-grid; place-items: center;
      border: 1px solid transparent; cursor: pointer;
      border-radius: 10px; flex-shrink: 0;
      transition: all var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-icon-btn:focus-visible { outline: 2px solid var(--h-ring); outline-offset: 2px; }
    .h-icon-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .h-icon-btn--xs      { width: 28px; height: 28px; }
    .h-icon-btn--sm      { width: 32px; height: 32px; }
    .h-icon-btn--default { width: 36px; height: 36px; }
    .h-icon-btn--lg      { width: 40px; height: 40px; }
    .h-icon-btn--xl      { width: 44px; height: 44px; }
    .h-icon-btn--outline { background: var(--h-card); border-color: var(--h-border); color: var(--h-foreground); }
    .h-icon-btn--outline:hover:not(:disabled) { background: var(--h-muted); }
    .h-icon-btn--ghost   { background: transparent; color: var(--h-foreground); }
    .h-icon-btn--ghost:hover:not(:disabled) { background: var(--h-muted); }
    .h-icon-btn--primary { background: var(--h-primary); color: var(--h-primary-foreground); }
    .h-icon-btn--primary:hover:not(:disabled) { background: color-mix(in oklch, var(--h-primary) 90%, black); }
    .h-icon-btn--danger  { background: transparent; border-color: var(--h-border); color: var(--h-destructive); }
    .h-icon-btn--danger:hover:not(:disabled) { background: var(--h-status-error-bg); }
  `]
})
export class HIconButtonComponent {
  @Input() variant: IconButtonVariant = 'outline';
  @Input() size: IconButtonSize = 'default';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input('aria-label') ariaLabel!: string;

  get btnClasses(): string {
    return `h-icon-btn h-icon-btn--${this.size} h-icon-btn--${this.variant}`;
  }
}
