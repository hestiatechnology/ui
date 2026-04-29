import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type TextileIconName =
  | 'lot'
  | 'machine'
  | 'yarn'
  | 'fabric'
  | 'dye'
  | 'knit'
  | 'weave'
  | 'cut'
  | 'sew'
  | 'finish'
  | 'pack'
  | 'ship'
  | 'qc'
  | 'dpp'
  | 'plant'
  | 'thread';

@Component({
  selector: 'h-textile-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="h-textile-icon"
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.aria-label]="label() || name()"
      [attr.aria-hidden]="label() ? null : 'true'"
      role="img"
    >
      <use [attr.href]="'#ti-' + name()" />
    </svg>
  `,
  styles: [
    `
      .h-textile-icon {
        display: inline-block;
        vertical-align: middle;
        flex-shrink: 0;
      }
    `,
  ],
})
export class HTextileIconComponent {
  readonly name = input.required<TextileIconName>();
  readonly size = input<number>(20);
  readonly label = input<string>('');
}
