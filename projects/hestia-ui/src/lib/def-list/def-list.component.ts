import { ChangeDetectionStrategy, Component, Directive, input } from '@angular/core';

@Directive({
  selector: 'h-def-row',
  standalone: true,
  host: { class: 'h-def-row' },
})
export class HDefRowDirective {
  readonly term = input.required<string>();
}

@Component({
  selector: 'h-def-list',
  standalone: true,
  imports: [HDefRowDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dl class="h-def-list">
      <ng-content select="h-def-row" />
    </dl>
  `,
  styles: [`
    :host { display: block; }
    .h-def-list {
      display: grid;
      grid-template-columns: var(--h-def-list-key-width, 120px) 1fr;
      gap: 10px 14px;
      margin: 0;
      font-size: 13px;
      font-family: var(--h-font-sans);
    }
  `],
})
export class HDefListComponent {}

@Component({
  selector: 'h-def-row',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dt class="h-def-term">{{ term() }}</dt>
    <dd class="h-def-value"><ng-content /></dd>
  `,
  styles: [`
    :host { display: contents; }
    .h-def-term { color: var(--h-muted-foreground); margin: 0; }
    .h-def-value { margin: 0; color: var(--h-foreground); }
  `],
})
export class HDefRowComponent {
  readonly term = input.required<string>();
}
