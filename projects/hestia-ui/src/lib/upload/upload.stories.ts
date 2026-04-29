import type { Meta, StoryObj } from '@storybook/angular';
import { HDropzoneComponent } from './upload.component';

const meta: Meta<HDropzoneComponent> = {
  title: 'Domain/Upload',
  component: HDropzoneComponent,
  tags: ['autodocs'],
  argTypes: {
    multiple:  { control: 'boolean' },
    maxSizeMb: { control: 'number' },
    hint:      { control: 'text' },
    accept:    { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<HDropzoneComponent>;

export const Default: Story = {
  args: {
    multiple: true,
    maxSizeMb: 25,
    hint: 'PDF, CSV, XLSX up to 25 MB · DPP attachments accepted',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:480px;">
        <h-dropzone [multiple]="multiple" [maxSizeMb]="maxSizeMb" [hint]="hint"></h-dropzone>
      </div>
    `,
    moduleMetadata: { imports: [HDropzoneComponent] },
  }),
};

export const WithFiles: Story = {
  render: () => ({
    props: {
      files: [
        { name: 'dpp_lot_2a-0094.pdf',      size: 1468006, progress: 100, file: new File([], 'dpp_lot_2a-0094.pdf') },
        { name: 'qc_inspection_apr27.csv',  size: 86016,   progress: 42,  file: new File([], 'qc_inspection_apr27.csv') },
      ],
    },
    template: `
      <div style="width:480px;">
        <h-dropzone [(files)]="files"></h-dropzone>
      </div>
    `,
    moduleMetadata: { imports: [HDropzoneComponent] },
  }),
};

export const WithError: Story = {
  render: () => ({
    props: {
      files: [
        { name: 'huge_export.zip', size: 30 * 1024 * 1024, progress: 0, file: new File([], 'huge_export.zip'), error: 'File exceeds 25 MB limit' },
        { name: 'dpp_ready.pdf',   size: 820000,            progress: 100, file: new File([], 'dpp_ready.pdf') },
      ],
    },
    template: `
      <div style="width:480px;">
        <h-dropzone [(files)]="files"></h-dropzone>
      </div>
    `,
    moduleMetadata: { imports: [HDropzoneComponent] },
  }),
};

export const SingleFileOnly: Story = {
  args: { multiple: false, hint: 'Single PDF only, up to 10 MB', accept: '.pdf', maxSizeMb: 10 },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:480px;">
        <h-dropzone [multiple]="multiple" [hint]="hint" [accept]="accept" [maxSizeMb]="maxSizeMb"></h-dropzone>
      </div>
    `,
    moduleMetadata: { imports: [HDropzoneComponent] },
  }),
};
