import type { Meta, StoryObj } from '@storybook/angular';
import { HConfirmDialogComponent } from './confirm-dialog.component';
import { HButtonComponent } from '../button/button.component';

const meta: Meta<HConfirmDialogComponent> = {
  title: 'Overlays/ConfirmDialog',
  component: HConfirmDialogComponent,
  tags: ['autodocs'],
  argTypes: {
    tone:         { control: 'select', options: ['error', 'idle', 'primary'] },
    title:        { control: 'text' },
    description:  { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelLabel:  { control: 'text' },
    open:         { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<HConfirmDialogComponent>;

export const Destructive: Story = {
  args: {
    open: true,
    tone: 'error',
    title: 'Archive lot 2A‑0094?',
    description: 'This will stop all machines tied to the lot and remove it from the active queue. The DPP draft will be retained.',
    confirmLabel: 'Archive lot',
    cancelLabel: 'Cancel',
  },
};

export const Warning: Story = {
  args: {
    open: true,
    tone: 'idle',
    title: 'Put lot on hold?',
    description: 'Machines assigned to this lot will be paused. Operators will be notified.',
    confirmLabel: 'Put on hold',
    cancelLabel: 'Cancel',
  },
};

export const Informational: Story = {
  args: {
    open: true,
    tone: 'primary',
    title: 'Send DPP to registry?',
    description: 'The Digital Product Passport for LOT-2A-0094 will be submitted to the EU registry. This cannot be undone.',
    confirmLabel: 'Submit',
    cancelLabel: 'Cancel',
  },
};

export const WithTrigger: Story = {
  render: () => ({
    props: { open: false },
    template: `
      <div style="padding:24px;">
        <h-button variant="destructive" (click)="open = true">Archive lot</h-button>
        <h-confirm-dialog
          [(open)]="open"
          tone="error"
          title="Archive lot 2A‑0094?"
          description="This will stop all machines tied to the lot and remove it from the active queue."
          confirmLabel="Archive lot"
        ></h-confirm-dialog>
      </div>
    `,
    moduleMetadata: { imports: [HConfirmDialogComponent, HButtonComponent] },
  }),
};
