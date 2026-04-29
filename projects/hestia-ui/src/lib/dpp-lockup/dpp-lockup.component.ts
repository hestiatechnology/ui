import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type DppTier = 'bronze' | 'silver' | 'gold' | 'platinum';

const TIER_COLOR: Record<DppTier, string> = {
  bronze: '#CD7F32',
  silver: '#9BA3AE',
  gold: '#C9A84C',
  platinum: '#5B7BD9',
};

const TIER_LABEL: Record<DppTier, string> = {
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  platinum: 'Platinum',
};

@Component({
  selector: 'h-dpp-lockup',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="h-dpp-lockup"
      [class.h-dpp-lockup--compact]="compact()"
      [attr.aria-label]="'Digital Product Passport - ' + _tierLabel + ' tier'"
    >
      <svg
        class="h-dpp-seal"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        [attr.width]="compact() ? 32 : 48"
        [attr.height]="compact() ? 32 : 48"
      >
        <!-- Hexagonal seal shape -->
        <polygon
          points="24,2 44,13 44,35 24,46 4,35 4,13"
          [attr.fill]="_tierColor + '18'"
          [attr.stroke]="_tierColor"
          stroke-width="1.5"
        />
        <!-- Inner check / thread icon -->
        <path
          d="M17 24l5 5 9-10"
          [attr.stroke]="_tierColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      @if (!compact()) {
        <div class="h-dpp-lockup-text">
          <div class="h-dpp-lockup-label">Digital Product Passport</div>
          <div class="h-dpp-lockup-tier" [style.color]="_tierColor">
            {{ _tierLabel }} Verified
          </div>
          @if (lotCode()) {
            <div class="h-dpp-lockup-lot h-lot-code">{{ lotCode() }}</div>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      .h-dpp-lockup {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-family: var(--h-font-sans);
      }

      .h-dpp-seal {
        flex-shrink: 0;
      }

      .h-dpp-lockup-text {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }

      .h-dpp-lockup-label {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: var(--h-eyebrow-tracking);
        color: var(--h-muted-foreground);
      }

      .h-dpp-lockup-tier {
        font-size: var(--h-text-sm);
        font-weight: 600;
        color: var(--h-foreground);
      }

      .h-dpp-lockup-lot {
        font-family: var(--h-font-mono);
        font-size: 11px;
        color: var(--h-muted-foreground);
        letter-spacing: 0;
      }

      .h-dpp-lockup--compact .h-dpp-seal {
        cursor: help;
      }
    `,
  ],
})
export class HDppLockupComponent {
  readonly tier = input<DppTier>('gold');
  readonly lotCode = input<string>('');
  readonly compact = input<boolean>(false);

  get _tierColor(): string {
    return TIER_COLOR[this.tier()];
  }

  get _tierLabel(): string {
    return TIER_LABEL[this.tier()];
  }
}
