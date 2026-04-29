import type { Meta, StoryObj } from '@storybook/angular';
import { HUserChipComponent } from './user-chip.component';

const meta: Meta<HUserChipComponent> = {
  title: 'Display/UserChip',
  component: HUserChipComponent,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    role: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<HUserChipComponent>;

export const Default: Story = {
  args: { name: 'Marta Silva', role: 'Operations Lead' },
};

export const NoRole: Story = {
  args: { name: 'João Pinto' },
};

export const Multiple: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:16px;">
        <h-user-chip name="Marta Silva" role="Operations Lead"></h-user-chip>
        <h-user-chip name="João Pinto" role="QC"></h-user-chip>
        <h-user-chip name="Ana Costa" role="Technician"></h-user-chip>
        <h-user-chip name="Pedro Sá"></h-user-chip>
      </div>
    `,
    moduleMetadata: { imports: [HUserChipComponent] },
  }),
};

export const InDrawerContext: Story = {
  render: () => ({
    template: `
      <div style="padding:16px;width:320px;">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground);margin-bottom:8px;">Assigned operator</div>
        <h-user-chip name="Marta Silva" role="Operations Lead"></h-user-chip>
      </div>
    `,
    moduleMetadata: { imports: [HUserChipComponent] },
  }),
};
