import type { Meta, StoryObj } from '@storybook/angular';
import { HSelectComponent } from './select.component';

const meta: Meta<HSelectComponent> = {
  title: 'Form/Select',
  component: HSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    searchable:  { control: 'boolean' },
    disabled:    { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<HSelectComponent>;

const FACILITIES = [
  { value: 'barcelos',   label: 'Barcelos · HQ' },
  { value: 'guimaraes',  label: 'Guimarães · Plant 2' },
  { value: 'famalicao',  label: 'Famalicão · Dye House' },
  { value: 'vizela',     label: 'Vizela · Knit' },
];

const MACHINES = [
  { value: 'l7',  label: 'L7-KNIT-03 · Loom 7' },
  { value: 'db2', label: 'DB-02 · Dye bath 2' },
  { value: 'c11', label: 'CUT-11 · Cut 11' },
  { value: 'l3',  label: 'L3-KNIT-08 · Loom 3', disabled: true },
];

export const Default: Story = {
  args: { placeholder: 'Choose facility…', searchable: false, disabled: false, size: 'default' },
  render: (args) => ({
    props: { ...args, options: FACILITIES },
    template: `<div style="width:260px;"><h-select [options]="options" [placeholder]="placeholder" [searchable]="searchable" [disabled]="disabled" [size]="size"></h-select></div>`,
    moduleMetadata: { imports: [HSelectComponent] },
  }),
};

export const Searchable: Story = {
  args: { placeholder: 'Search facilities…', searchable: true, disabled: false, size: 'default' },
  render: (args) => ({
    props: { ...args, options: FACILITIES },
    template: `<div style="width:280px;"><h-select [options]="options" [placeholder]="placeholder" [searchable]="searchable"></h-select></div>`,
    moduleMetadata: { imports: [HSelectComponent] },
  }),
};

export const WithDisabledOption: Story = {
  render: () => ({
    props: { options: MACHINES },
    template: `<div style="width:260px;"><h-select [options]="options" placeholder="Choose machine…" [searchable]="true"></h-select></div>`,
    moduleMetadata: { imports: [HSelectComponent] },
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: { options: FACILITIES },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:260px;">
        <h-select [options]="options" placeholder="Small (32px)" size="sm"></h-select>
        <h-select [options]="options" placeholder="Default (36px)" size="default"></h-select>
        <h-select [options]="options" placeholder="Large (44px) · Operations" size="lg"></h-select>
      </div>
    `,
    moduleMetadata: { imports: [HSelectComponent] },
  }),
};

export const Disabled: Story = {
  args: { placeholder: 'All facilities', disabled: true, size: 'default' },
  render: (args) => ({
    props: { ...args, options: FACILITIES },
    template: `<div style="width:260px;"><h-select [options]="options" [placeholder]="placeholder" [disabled]="disabled"></h-select></div>`,
    moduleMetadata: { imports: [HSelectComponent] },
  }),
};
