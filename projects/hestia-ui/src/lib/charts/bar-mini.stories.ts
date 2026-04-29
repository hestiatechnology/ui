import type { Meta, StoryObj } from '@storybook/angular';
import { HBarMiniComponent } from './bar-mini.component';
import { HCardComponent } from '../card/card.component';

const meta: Meta<HBarMiniComponent> = {
  title: 'Charts/BarMini',
  component: HBarMiniComponent,
  tags: ['autodocs'],
  argTypes: {
    values:      { control: 'object' },
    height:      { control: { type: 'range', min: 40, max: 120, step: 4 } },
    activeIndex: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<HBarMiniComponent>;

export const Default: Story = {
  args: { values: [820, 940, 1020, 980, 1180, 1240, 1140], height: 70 },
};

export const InCard: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;max-width:480px;">
        <h-card>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground);font-family:var(--h-font-sans);">Throughput · m/h</div>
          <h-bar-mini [values]="throughput" [height]="70"></h-bar-mini>
          <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:11px;color:var(--h-muted-foreground);font-family:var(--h-font-sans);">
            <span>Mon</span><span>Sun</span>
          </div>
        </h-card>
        <h-card>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground);font-family:var(--h-font-sans);">Energy · kWh</div>
          <h-bar-mini [values]="energy" [height]="70" color="var(--h-status-idle)"></h-bar-mini>
          <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:11px;color:var(--h-muted-foreground);font-family:var(--h-font-sans);">
            <span>Mon</span><span>Sun</span>
          </div>
        </h-card>
      </div>
    `,
    props: {
      throughput: [820, 940, 1020, 980, 1180, 1240, 1140],
      energy:     [310, 298, 342, 328, 315, 302, 287],
    },
    moduleMetadata: { imports: [HBarMiniComponent, HCardComponent] },
  }),
};
