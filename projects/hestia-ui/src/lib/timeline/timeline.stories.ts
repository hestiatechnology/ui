import type { Meta, StoryObj } from '@storybook/angular';
import { HTimelineComponent } from './timeline.component';

const meta: Meta<HTimelineComponent> = {
  title: 'Domain/Timeline',
  component: HTimelineComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<HTimelineComponent>;

const LOT_EVENTS = [
  { actor: 'Marta Silva',  action: 'started lot on Loom 7',                   timestamp: '06:14', tone: 'running' as const },
  { actor: 'System',       action: 'DPP draft generated automatically',        timestamp: '06:18', tone: 'primary' as const },
  { actor: 'João Pinto',   action: 'flagged GSM out of tolerance · 184 g/m²', timestamp: '09:42', tone: 'idle' as const },
  { actor: 'João Pinto',   action: 'released hold after recalibration',        timestamp: '10:11', tone: 'running' as const },
  { actor: 'Marta Silva',  action: "added note: 'switch to dye bath 2 at 13:00'", timestamp: '11:30', tone: 'neutral' as const },
];

export const LotTimeline: Story = {
  render: () => ({
    props: { events: LOT_EVENTS },
    template: `<div style="width:520px;padding:20px;background:var(--h-card);border:1px solid var(--h-border);border-radius:12px;"><h-timeline [events]="events"></h-timeline></div>`,
    moduleMetadata: { imports: [HTimelineComponent] },
  }),
};

export const SingleEvent: Story = {
  render: () => ({
    props: {
      events: [
        { actor: 'System', action: 'machine L7-KNIT-03 stopped · warp break detected', timestamp: '14:02', tone: 'error' as const },
      ],
    },
    template: `<div style="width:480px;"><h-timeline [events]="events"></h-timeline></div>`,
    moduleMetadata: { imports: [HTimelineComponent] },
  }),
};

export const WithHold: Story = {
  render: () => ({
    props: {
      events: [
        { actor: 'QC team',     action: 'placed lot on quality hold',       timestamp: '10:00', tone: 'hold' as const },
        { actor: 'Marta Silva', action: 'requested expedited QC review',    timestamp: '10:15', tone: 'primary' as const },
        { actor: 'QC team',     action: 'cleared hold — all tests passed',  timestamp: '11:45', tone: 'running' as const },
      ],
    },
    template: `<div style="width:480px;padding:20px;background:var(--h-card);border:1px solid var(--h-border);border-radius:12px;"><h-timeline [events]="events"></h-timeline></div>`,
    moduleMetadata: { imports: [HTimelineComponent] },
  }),
};
