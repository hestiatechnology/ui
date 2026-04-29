import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface StepperStep {
  label: string;
  description?: string;
}

export type StepState = 'done' | 'active' | 'todo';

@Component({
  selector: 'h-stepper',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'h-stepper-host' },
  template: `
    @if (orientation() === 'horizontal') {
      <div class="h-stepper h-stepper--horizontal">
        @for (step of steps(); track step.label; let i = $index) {
          <div class="h-stepper-item" [class.h-stepper-item--active]="getState(i) === 'active'" [class.h-stepper-item--done]="getState(i) === 'done'">
            <div class="h-stepper-indicator">
              <span class="h-stepper-dot">
                @if (getState(i) === 'done') {
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                } @else {
                  {{ i + 1 }}
                }
              </span>
              <span class="h-stepper-label">{{ step.label }}</span>
            </div>
            @if (i < steps().length - 1) {
              <div class="h-stepper-connector" [class.h-stepper-connector--done]="getState(i) === 'done'"></div>
            }
          </div>
        }
      </div>
    } @else {
      <div class="h-stepper h-stepper--vertical">
        @for (step of steps(); track step.label; let i = $index) {
          <div class="h-stepper-vitem" [class.h-stepper-vitem--active]="getState(i) === 'active'" [class.h-stepper-vitem--done]="getState(i) === 'done'">
            <div class="h-stepper-vcol">
              <span class="h-stepper-dot">
                @if (getState(i) === 'done') {
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                } @else if (getState(i) === 'active') {
                  <span class="h-stepper-dot-inner"></span>
                }
              </span>
              @if (i < steps().length - 1) {
                <span class="h-stepper-vline" [class.h-stepper-vline--done]="getState(i) === 'done'"></span>
              }
            </div>
            <div class="h-stepper-vcontent" [class.h-stepper-vcontent--last]="i === steps().length - 1">
              <div class="h-stepper-vlabel">{{ step.label }}</div>
              @if (step.description) {
                <div class="h-stepper-vdesc">{{ step.description }}</div>
              }
            </div>
          </div>
        }
      </div>
    }
  `,
  styles: [`
    :host { display: block; }

    /* ---- Horizontal ---- */
    .h-stepper--horizontal {
      display: flex; align-items: center; width: 100%;
    }

    .h-stepper-item { display: flex; align-items: center; flex: 1; }
    .h-stepper-item:last-child { flex: 0 0 auto; }

    .h-stepper-indicator { display: flex; align-items: center; gap: 10px; }

    .h-stepper-dot {
      width: 26px; height: 26px; border-radius: 9999px;
      border: 1px solid var(--h-border); background: var(--h-card);
      color: var(--h-muted-foreground);
      display: grid; place-items: center; flex-shrink: 0;
      font-size: 12px; font-weight: 600; font-family: var(--h-font-mono);
      transition: background var(--h-motion-product-quick) var(--h-motion-product-ease),
                  border-color var(--h-motion-product-quick) var(--h-motion-product-ease),
                  color var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-stepper-item--active .h-stepper-dot,
    .h-stepper-item--done .h-stepper-dot {
      background: var(--h-primary); border-color: var(--h-primary); color: #fff;
    }

    .h-stepper-label {
      font-size: 13px; font-weight: 500; color: var(--h-muted-foreground); white-space: nowrap;
    }
    .h-stepper-item--active .h-stepper-label { color: var(--h-foreground); font-weight: 600; }
    .h-stepper-item--done .h-stepper-label { color: var(--h-muted-foreground); }

    .h-stepper-connector {
      flex: 1; height: 1px; background: var(--h-border); margin: 0 16px;
      transition: background var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-stepper-connector--done { background: var(--h-primary); }

    /* ---- Vertical ---- */
    .h-stepper--vertical { display: flex; flex-direction: column; padding-left: 6px; }

    .h-stepper-vitem { display: flex; gap: 14px; }

    .h-stepper-vcol { display: flex; flex-direction: column; align-items: center; }

    .h-stepper-vitem .h-stepper-dot {
      width: 20px; height: 20px; font-size: 10px;
    }

    .h-stepper-dot-inner {
      width: 6px; height: 6px; border-radius: 9999px; background: var(--h-primary);
    }

    .h-stepper-vline {
      flex: 1; width: 2px; background: var(--h-border); min-height: 24px;
      transition: background var(--h-motion-product-quick) var(--h-motion-product-ease);
    }
    .h-stepper-vline--done { background: var(--h-primary); }

    .h-stepper-vcontent { padding-bottom: 18px; }
    .h-stepper-vcontent--last { padding-bottom: 0; }

    .h-stepper-vlabel {
      font-size: 13.5px; font-weight: 500; color: var(--h-foreground);
      padding-top: 1px;
    }
    .h-stepper-vitem--active .h-stepper-vlabel { font-weight: 600; }
    .h-stepper-vitem--done .h-stepper-vlabel { color: var(--h-muted-foreground); }

    .h-stepper-vdesc {
      font-size: 12px; color: var(--h-muted-foreground); margin-top: 2px;
      font-family: var(--h-font-mono);
    }
  `],
})
export class HStepperComponent {
  readonly steps = input<StepperStep[]>([]);
  readonly activeIndex = input(0);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  getState(index: number): StepState {
    const active = this.activeIndex();
    if (index < active) return 'done';
    if (index === active) return 'active';
    return 'todo';
  }
}
