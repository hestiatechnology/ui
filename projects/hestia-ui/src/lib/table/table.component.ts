import { ChangeDetectionStrategy, Component, Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: 'table[hTable]',
  standalone: true,
  host: { class: 'h-table' },
})
export class HTableDirective {}

@Directive({
  selector: '[hTableWrapper]',
  standalone: true,
  host: { class: 'h-table-wrapper' },
})
export class HTableWrapperDirective {}

@Directive({
  selector: 'th[hTh]',
  standalone: true,
  host: { class: 'h-th' },
})
export class HThDirective {
  readonly align = input<'left' | 'right' | 'center'>('left');

  @HostBinding('style.textAlign')
  get textAlign() { return this.align(); }
}

@Directive({
  selector: 'td[hTd]',
  standalone: true,
  host: { class: 'h-td' },
})
export class HTdDirective {
  readonly align = input<'left' | 'right' | 'center'>('left');

  @HostBinding('style.textAlign')
  get textAlign() { return this.align(); }
}

@Component({
  selector: 'h-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-table-wrapper">
      <table class="h-table">
        <ng-content />
      </table>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .h-table-wrapper { width: 100%; overflow-x: auto; }
    .h-table {
      width: 100%; border-collapse: collapse;
      font-family: var(--h-font-sans); font-size: 13px;
    }
    :host ::ng-deep .h-table thead tr,
    .h-table :global(thead tr) {
      background: var(--h-muted); border-bottom: 1px solid var(--h-border);
    }
    :host ::ng-deep .h-table tr { border-bottom: 1px solid var(--h-border); }
    :host ::ng-deep .h-table tbody tr { background: var(--h-card); }
    :host ::ng-deep .h-table tbody tr:hover { background: var(--h-muted); }
    :host ::ng-deep .h-th, :host ::ng-deep th.h-th {
      text-align: left; padding: 10px 12px;
      font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--h-muted-foreground); white-space: nowrap;
    }
    :host ::ng-deep .h-td, :host ::ng-deep td.h-td {
      padding: 12px; vertical-align: middle; white-space: nowrap;
      color: var(--h-foreground);
    }
  `],
})
export class HTableComponent {}
