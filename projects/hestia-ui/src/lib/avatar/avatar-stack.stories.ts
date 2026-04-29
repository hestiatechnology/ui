import type { Meta, StoryObj } from '@storybook/angular';
import { HAvatarStackComponent } from './avatar-stack.component';

const meta: Meta<HAvatarStackComponent> = {
  title: 'Display/AvatarStack',
  component: HAvatarStackComponent,
  tags: ['autodocs'],
  argTypes: {
    names: { control: 'object' },
    max:   { control: { type: 'range', min: 1, max: 10, step: 1 } },
    size:  { control: { type: 'range', min: 20, max: 56, step: 2 } },
  },
};

export default meta;
type Story = StoryObj<HAvatarStackComponent>;

export const Default: Story = {
  args: {
    names: ['Marta Silva', 'João Pinto', 'Ana Costa', 'Pedro Sá', 'Rita Lopes'],
    max: 3,
    size: 28,
  },
};

export const NoOverflow: Story = {
  args: {
    names: ['Marta Silva', 'João Pinto'],
    max: 5,
    size: 32,
  },
};

export const LargeSize: Story = {
  args: {
    names: ['Marta Silva', 'João Pinto', 'Ana Costa', 'Pedro Sá'],
    max: 3,
    size: 40,
  },
};

export const InContext: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:16px;max-width:400px;">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:13px;">
          <span style="color:var(--h-muted-foreground)">Assigned operators</span>
          <h-avatar-stack [names]="names" [max]="3" [size]="28"></h-avatar-stack>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:13px;">
          <span style="color:var(--h-muted-foreground)">QC reviewers</span>
          <h-avatar-stack [names]="reviewers" [max]="4" [size]="28"></h-avatar-stack>
        </div>
      </div>
    `,
    props: {
      names: ['Marta Silva', 'João Pinto', 'Ana Costa', 'Pedro Sá', 'Rita Lopes'],
      reviewers: ['Ana Costa', 'Pedro Sá'],
    },
    moduleMetadata: { imports: [HAvatarStackComponent] },
  }),
};
