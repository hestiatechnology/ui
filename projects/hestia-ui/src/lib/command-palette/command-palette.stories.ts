import type { Meta, StoryObj } from '@storybook/angular';
import { LucideSearch, LucidePackage, LucidePlus, LucideDownload } from '@lucide/angular';
import { HCommandPaletteComponent } from './command-palette.component';
import { HButtonComponent } from '../button/button.component';

const meta: Meta<HCommandPaletteComponent> = {
  title: 'Navigation/CommandPalette',
  component: HCommandPaletteComponent,
  tags: ['autodocs'],
  argTypes: {
    open:        { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<HCommandPaletteComponent>;

const defaultGroups = [
  {
    label: 'Lots',
    items: [
      { label: 'LOT‑2A‑0094 · 4,200 m linen', value: 'lot-0094', kbd: '↵', active: true },
      { label: 'LOT‑2A‑0093 · 1,800 m cotton', value: 'lot-0093' },
      { label: 'LOT‑2A‑0092 · 2,400 m linen',  value: 'lot-0092' },
    ],
  },
  {
    label: 'Actions',
    items: [
      { label: 'New lot…',                 value: 'new-lot' },
      { label: 'Export DPP for 2A‑0094',   value: 'export-dpp' },
    ],
  },
];

export const Default: Story = {
  args: { open: true, groups: defaultGroups },
};

export const WithTrigger: Story = {
  render: () => ({
    props: { open: false, groups: defaultGroups },
    template: `
      <div style="padding:24px;">
        <h-button variant="outline" (click)="open = true">
          <svg lucideSearch [size]="14"></svg>
          Search
          <kbd style="font-family:var(--h-font-mono);font-size:11px;border:1px solid var(--h-border);padding:1px 5px;border-radius:4px;margin-left:8px;">⌘K</kbd>
        </h-button>
        <h-command-palette [(open)]="open" [groups]="groups"></h-command-palette>
      </div>
    `,
    moduleMetadata: { imports: [HCommandPaletteComponent, HButtonComponent, LucideSearch, LucidePackage, LucidePlus, LucideDownload] },
  }),
};

export const EmptyState: Story = {
  args: {
    open: true,
    groups: [],
    placeholder: 'Type a command or search…',
  },
  render: (args) => ({
    props: args,
    template: `
      <h-command-palette [open]="open" [groups]="groups" [placeholder]="placeholder">
        <div style="padding:32px;text-align:center;color:var(--h-muted-foreground);font-size:13px;font-family:var(--h-font-sans);">
          No results found.
        </div>
      </h-command-palette>
    `,
    moduleMetadata: { imports: [HCommandPaletteComponent] },
  }),
};
