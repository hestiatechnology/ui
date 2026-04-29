import type { Meta, StoryObj } from '@storybook/angular';
import { HDppLockupComponent } from './dpp-lockup.component';

const meta: Meta<HDppLockupComponent> = {
  title: 'Domain/DppLockup',
  component: HDppLockupComponent,
  tags: ['autodocs'],
  argTypes: {
    tier: { control: 'select', options: ['bronze', 'silver', 'gold', 'platinum'] },
    lotCode: { control: 'text' },
    compact: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<HDppLockupComponent>;

export const Gold: Story = {
  args: { tier: 'gold', lotCode: 'LOT-2024-0042', compact: false },
};

export const Platinum: Story = {
  args: { tier: 'platinum', lotCode: 'LOT-2024-0100', compact: false },
};

export const Silver: Story = {
  args: { tier: 'silver', lotCode: 'LOT-2024-0038', compact: false },
};

export const Bronze: Story = {
  args: { tier: 'bronze', compact: false },
};

export const Compact: Story = {
  args: { tier: 'gold', compact: true },
};

export const AllTiers: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <h-dpp-lockup tier="platinum" lotCode="LOT-2024-0100"></h-dpp-lockup>
        <h-dpp-lockup tier="gold" lotCode="LOT-2024-0042"></h-dpp-lockup>
        <h-dpp-lockup tier="silver" lotCode="LOT-2024-0038"></h-dpp-lockup>
        <h-dpp-lockup tier="bronze" lotCode="LOT-2024-0015"></h-dpp-lockup>
      </div>
    `,
    moduleMetadata: { imports: [HDppLockupComponent] },
  }),
};

export const CompactRow: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center;">
        <h-dpp-lockup tier="platinum" [compact]="true"></h-dpp-lockup>
        <h-dpp-lockup tier="gold" [compact]="true"></h-dpp-lockup>
        <h-dpp-lockup tier="silver" [compact]="true"></h-dpp-lockup>
        <h-dpp-lockup tier="bronze" [compact]="true"></h-dpp-lockup>
      </div>
    `,
    moduleMetadata: { imports: [HDppLockupComponent] },
  }),
};
