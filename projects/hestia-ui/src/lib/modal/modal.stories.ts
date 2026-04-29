import type { Meta, StoryObj } from '@storybook/angular';
import { HModalComponent } from './modal.component';
import { HButtonComponent } from '../button/button.component';

const meta: Meta<HModalComponent> = {
  title: 'Overlays/Modal',
  component: HModalComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    size: { control: 'select', options: ['sm', 'default', 'lg', 'xl'] },
    closeable: { control: 'boolean' },
    open: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<HModalComponent>;

export const Default: Story = {
  args: { open: true, title: 'Confirm action', size: 'default', closeable: true },
  render: (args) => ({
    props: args,
    template: `
      <h-modal [open]="open" [title]="title" [size]="size" [closeable]="closeable">
        <p>Are you sure you want to archive lot LOT-2024-0042? This action cannot be undone.</p>
        <div hModalFooter style="display:flex;gap:8px;">
          <h-button variant="outline">Cancel</h-button>
          <h-button variant="destructive">Archive lot</h-button>
        </div>
      </h-modal>
    `,
    moduleMetadata: { imports: [HModalComponent, HButtonComponent] },
  }),
};

export const Small: Story = {
  args: { open: true, title: 'Delete machine?', size: 'sm', closeable: true },
  render: (args) => ({
    props: args,
    template: `
      <h-modal [open]="open" [title]="title" [size]="size" [closeable]="closeable">
        <p>Machine CK-01 will be permanently removed from this plant.</p>
        <div hModalFooter style="display:flex;gap:8px;">
          <h-button variant="outline">Cancel</h-button>
          <h-button variant="destructive">Delete</h-button>
        </div>
      </h-modal>
    `,
    moduleMetadata: { imports: [HModalComponent, HButtonComponent] },
  }),
};

export const Large: Story = {
  args: { open: true, title: 'Lot details', size: 'lg', closeable: true },
  render: (args) => ({
    props: args,
    template: `
      <h-modal [open]="open" [title]="title" [size]="size" [closeable]="closeable">
        <p>Detailed information about lot LOT-2024-0042, including production records, certifications, and traceability data.</p>
        <p style="margin-top:12px;">This modal uses the large size variant to accommodate more content.</p>
        <div hModalFooter style="display:flex;gap:8px;">
          <h-button variant="outline">Close</h-button>
          <h-button>Export DPP</h-button>
        </div>
      </h-modal>
    `,
    moduleMetadata: { imports: [HModalComponent, HButtonComponent] },
  }),
};

export const NoTitle: Story = {
  args: { open: true, title: '', size: 'default', closeable: true },
  render: (args) => ({
    props: args,
    template: `
      <h-modal [open]="open" [title]="title" [size]="size" [closeable]="closeable">
        <p>A modal without a title header — useful for custom content layouts.</p>
        <div hModalFooter style="display:flex;gap:8px;">
          <h-button variant="outline">Dismiss</h-button>
          <h-button>Confirm</h-button>
        </div>
      </h-modal>
    `,
    moduleMetadata: { imports: [HModalComponent, HButtonComponent] },
  }),
};
