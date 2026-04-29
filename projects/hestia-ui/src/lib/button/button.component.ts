import { Component, Input, ChangeDetectionStrategy, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'primary-outline' | 'ghost' | 'destructive' | 'invert' | 'dark-out' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

@Component({
  selector: 'h-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'h-button-host',
    '[attr.aria-disabled]': 'disabled || null',
  },
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [attr.aria-busy]="loading || null"
      [attr.aria-label]="ariaLabel || null"
      [class]="buttonClasses"
      [style]="buttonStyle">
      @if (loading) {
        <svg class="h-btn-spinner" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
      } @else if (iconLeft) {
        <span class="h-btn-icon" aria-hidden="true">
          <ng-container *ngTemplateOutlet="iconLeft"></ng-container>
        </span>
      }
      <ng-content></ng-content>
      @if (iconRight && !loading) {
        <span class="h-btn-icon" aria-hidden="true">
          <ng-container *ngTemplateOutlet="iconRight"></ng-container>
        </span>
      }
    </button>
  `,
  styles: [`
    :host { display: inline-flex; }
    .h-btn {
      display: inline-flex; align-items: center; justify-content: center;
      font-family: var(--h-font-sans); font-weight: 500; white-space: nowrap;
      border: 1px solid transparent; cursor: pointer; text-decoration: none;
      transition: background var(--h-motion-product-quick) var(--h-motion-product-ease),
                  border-color var(--h-motion-product-quick) var(--h-motion-product-ease),
                  color var(--h-motion-product-quick) var(--h-motion-product-ease);
      outline-offset: 2px;
    }
    .h-btn:focus-visible { outline: 2px solid var(--h-ring); }
    .h-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    /* Sizes */
    .h-btn--xs      { height: 28px; padding: 0 10px; font-size: 12px;   border-radius: 8px;  gap: 6px; }
    .h-btn--sm      { height: 32px; padding: 0 12px; font-size: 13px;   border-radius: 8px;  gap: 6px; }
    .h-btn--default { height: 36px; padding: 0 14px; font-size: 13.5px; border-radius: 10px; gap: 8px; }
    .h-btn--lg      { height: 40px; padding: 0 16px; font-size: 14px;   border-radius: 10px; gap: 8px; }
    .h-btn--xl      { height: 44px; padding: 0 22px; font-size: 14.5px; border-radius: 12px; gap: 8px; }
    /* Variants */
    .h-btn--variant-default     { background: var(--h-primary); color: var(--h-primary-foreground); }
    .h-btn--variant-default:hover:not(:disabled) { background: color-mix(in oklch, var(--h-primary) 90%, black); }
    .h-btn--variant-secondary   { background: var(--h-secondary); color: var(--h-secondary-foreground); }
    .h-btn--variant-outline     { background: var(--h-card); border-color: var(--h-border); color: var(--h-foreground); }
    .h-btn--variant-outline:hover:not(:disabled) { background: var(--h-muted); }
    .h-btn--variant-primary-outline { background: transparent; border-color: var(--h-primary); color: var(--h-primary); }
    .h-btn--variant-primary-outline:hover:not(:disabled) { background: rgba(0,61,165,0.06); }
    .h-btn--variant-ghost       { background: transparent; color: var(--h-foreground); }
    .h-btn--variant-ghost:hover:not(:disabled) { background: var(--h-muted); }
    .h-btn--variant-destructive { background: var(--h-destructive); color: var(--h-destructive-foreground); }
    .h-btn--variant-destructive:hover:not(:disabled) { background: color-mix(in oklch, var(--h-destructive) 90%, black); }
    .h-btn--variant-invert      { background: #fff; color: #060E24; }
    .h-btn--variant-dark-out    { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.20); color: #fff; }
    .h-btn--variant-link        { background: transparent; color: var(--h-primary); border-color: transparent; text-decoration: underline; text-underline-offset: 4px; padding: 0; height: auto; }
    /* Icon */
    .h-btn-icon { display: flex; flex-shrink: 0; }
    /* Spinner */
    .h-btn-spinner { animation: h-spin 0.9s linear infinite; }
    @keyframes h-spin { to { transform: rotate(360deg); } }
  `]
})
export class HButtonComponent {
  @Input() variant: ButtonVariant = 'default';
  @Input() size: ButtonSize = 'default';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input('aria-label') ariaLabel?: string;
  @Input() iconLeft?: any;
  @Input() iconRight?: any;

  get buttonClasses(): string {
    return [
      'h-btn',
      `h-btn--${this.size}`,
      `h-btn--variant-${this.variant}`,
    ].join(' ');
  }

  get buttonStyle(): string {
    return '';
  }
}
