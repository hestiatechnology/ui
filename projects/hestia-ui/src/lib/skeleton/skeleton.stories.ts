import type { Meta, StoryObj } from '@storybook/angular';
import { HSkeletonComponent, HEmptyStateComponent } from './skeleton.component';
import { HButtonComponent } from '../button/button.component';

const skeletonMeta: Meta<HSkeletonComponent> = {
  title: 'Data/Skeleton',
  component: HSkeletonComponent,
  tags: ['autodocs'],
  argTypes: {
    width:   { control: 'text' },
    height:  { control: 'text' },
    radius:  { control: 'text' },
    rounded: { control: 'boolean' },
  },
};

export default skeletonMeta;
type Story = StoryObj<HSkeletonComponent>;

export const Default: Story = {
  args: { width: '200px', height: '16px', rounded: false },
  render: (args) => ({
    props: args,
    template: `<h-skeleton [width]="width" [height]="height" [rounded]="rounded"></h-skeleton>`,
    moduleMetadata: { imports: [HSkeletonComponent] },
  }),
};

export const AvatarSkeleton: Story = {
  args: { width: '40px', height: '40px', rounded: true },
  render: (args) => ({
    props: args,
    template: `<h-skeleton [width]="width" [height]="height" [rounded]="rounded"></h-skeleton>`,
    moduleMetadata: { imports: [HSkeletonComponent] },
  }),
};

export const LotCardSkeleton: Story = {
  render: () => ({
    template: `
      <div style="width:360px;padding:20px;background:var(--h-card);border:1px solid var(--h-border);border-radius:12px;display:flex;flex-direction:column;gap:10px;">
        <h-skeleton width="40%" height="18px"></h-skeleton>
        <h-skeleton width="80%" height="12px"></h-skeleton>
        <h-skeleton width="65%" height="12px"></h-skeleton>
        <div style="display:flex;gap:12px;margin-top:8px;">
          <h-skeleton width="56px" height="56px" radius="14px"></h-skeleton>
          <div style="flex:1;display:flex;flex-direction:column;gap:8px;">
            <h-skeleton width="60%" height="14px"></h-skeleton>
            <h-skeleton width="40%" height="12px"></h-skeleton>
          </div>
        </div>
      </div>
    `,
    moduleMetadata: { imports: [HSkeletonComponent] },
  }),
};

export const TableRowSkeleton: Story = {
  render: () => ({
    template: `
      <div style="width:600px;display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;align-items:center;gap:16px;">
          <h-skeleton width="16px" height="16px"></h-skeleton>
          <h-skeleton width="100px" height="14px"></h-skeleton>
          <h-skeleton width="80px" height="14px"></h-skeleton>
          <h-skeleton width="120px" height="14px"></h-skeleton>
          <h-skeleton width="60px" height="22px" radius="9999px"></h-skeleton>
        </div>
        <div style="display:flex;align-items:center;gap:16px;">
          <h-skeleton width="16px" height="16px"></h-skeleton>
          <h-skeleton width="100px" height="14px"></h-skeleton>
          <h-skeleton width="80px" height="14px"></h-skeleton>
          <h-skeleton width="120px" height="14px"></h-skeleton>
          <h-skeleton width="60px" height="22px" radius="9999px"></h-skeleton>
        </div>
        <div style="display:flex;align-items:center;gap:16px;">
          <h-skeleton width="16px" height="16px"></h-skeleton>
          <h-skeleton width="100px" height="14px"></h-skeleton>
          <h-skeleton width="80px" height="14px"></h-skeleton>
          <h-skeleton width="120px" height="14px"></h-skeleton>
          <h-skeleton width="60px" height="22px" radius="9999px"></h-skeleton>
        </div>
      </div>
    `,
    moduleMetadata: { imports: [HSkeletonComponent] },
  }),
};

export const EmptyStateDefault: Story = {
  render: () => ({
    template: `
      <div style="width:460px;">
        <h-empty-state title="No lots in production" description="Once a planner schedules a lot it will appear here. You can also start one manually." tone="cotton">
          <svg lucideTruck hEmptyIcon [size]="26" aria-hidden="true"></svg>
          <h-button>Start a lot</h-button>
          <h-button variant="outline">Open scheduler</h-button>
        </h-empty-state>
      </div>
    `,
    moduleMetadata: { imports: [HSkeletonComponent, HEmptyStateComponent, HButtonComponent] },
  }),
};

export const EmptyStateError: Story = {
  render: () => ({
    template: `
      <div style="width:460px;">
        <h-empty-state title="Failed to load machines" description="We could not connect to the factory data stream. Check your network and try again." tone="error">
          <svg lucideAlertCircle hEmptyIcon [size]="26" aria-hidden="true"></svg>
          <h-button>Retry</h-button>
        </h-empty-state>
      </div>
    `,
    moduleMetadata: { imports: [HEmptyStateComponent, HButtonComponent] },
  }),
};
