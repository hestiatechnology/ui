import type { Meta, StoryObj } from '@storybook/angular';
import { HAvatarComponent } from './avatar.component';

const meta: Meta<HAvatarComponent> = {
  title: 'Display/Avatar',
  component: HAvatarComponent,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    src: { control: 'text' },
    size: { control: { type: 'range', min: 24, max: 96, step: 4 } },
    tone: { control: 'select', options: ['primary', 'cotton'] },
  },
};

export default meta;
type Story = StoryObj<HAvatarComponent>;

export const Default: Story = {
  args: { name: 'Daniel Pereira', size: 32, tone: 'primary' },
};

export const CottonTone: Story = {
  args: { name: 'Ana Silva', size: 32, tone: 'cotton' },
};

export const Large: Story = {
  args: { name: 'João Costa', size: 56, tone: 'primary' },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:12px;">
        <h-avatar name="Daniel Pereira" [size]="24"></h-avatar>
        <h-avatar name="Daniel Pereira" [size]="32"></h-avatar>
        <h-avatar name="Daniel Pereira" [size]="40"></h-avatar>
        <h-avatar name="Daniel Pereira" [size]="48"></h-avatar>
        <h-avatar name="Daniel Pereira" [size]="64"></h-avatar>
      </div>
    `,
    moduleMetadata: { imports: [HAvatarComponent] },
  }),
};

export const BothTones: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center;">
        <h-avatar name="Daniel Pereira" [size]="40" tone="primary"></h-avatar>
        <h-avatar name="Ana Silva" [size]="40" tone="cotton"></h-avatar>
      </div>
    `,
    moduleMetadata: { imports: [HAvatarComponent] },
  }),
};

export const MultipleInitials: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <h-avatar name="Daniel Pereira" [size]="36"></h-avatar>
        <h-avatar name="Ana Silva" [size]="36"></h-avatar>
        <h-avatar name="João Costa" [size]="36"></h-avatar>
        <h-avatar name="Maria Santos" [size]="36"></h-avatar>
        <h-avatar name="Pedro Alves" [size]="36"></h-avatar>
      </div>
    `,
    moduleMetadata: { imports: [HAvatarComponent] },
  }),
};
