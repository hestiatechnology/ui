import type { Meta, StoryObj } from '@storybook/angular';
import { HStatusDropdownComponent } from './status-dropdown.component';

const statusItems = [
  { value: 'active', label: 'Ativo' },
  { value: 'draft', label: 'Rascunho' },
  { value: 'archived', label: 'Arquivado' },
];

const meta: Meta<HStatusDropdownComponent> = {
  title: 'Display/StatusDropdown',
  component: HStatusDropdownComponent,
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['success', 'warning', 'primary', 'muted', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<HStatusDropdownComponent>;

export const Success: Story = {
  render: () => ({
    props: { items: statusItems },
    template: `
      <div style="height:160px;padding:16px;">
        <h-status-dropdown label="Ativo" tone="success" [items]="items" />
      </div>
    `,
    moduleMetadata: { imports: [HStatusDropdownComponent] },
  }),
};

export const Warning: Story = {
  render: () => ({
    props: { items: statusItems },
    template: `
      <div style="height:160px;padding:16px;">
        <h-status-dropdown label="Rascunho" tone="warning" [items]="items" />
      </div>
    `,
    moduleMetadata: { imports: [HStatusDropdownComponent] },
  }),
};

export const Muted: Story = {
  render: () => ({
    props: { items: statusItems },
    template: `
      <div style="height:160px;padding:16px;">
        <h-status-dropdown label="Arquivado" tone="muted" [items]="items" />
      </div>
    `,
    moduleMetadata: { imports: [HStatusDropdownComponent] },
  }),
};

export const AllTones: Story = {
  render: () => ({
    props: { items: statusItems },
    template: `
      <div style="display:flex;align-items:center;gap:12px;padding:16px;height:160px;">
        <h-status-dropdown label="Ativo"     tone="success" [items]="items" />
        <h-status-dropdown label="Rascunho"  tone="warning" [items]="items" />
        <h-status-dropdown label="Principal" tone="primary" [items]="items" />
        <h-status-dropdown label="Erro"      tone="error"   [items]="items" />
        <h-status-dropdown label="Inativo"   tone="muted"   [items]="items" />
      </div>
    `,
    moduleMetadata: { imports: [HStatusDropdownComponent] },
  }),
};
