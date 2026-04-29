import type { Meta, StoryObj } from '@storybook/angular';
import { LucideSearch, LucideFilter, LucideCalendar, LucideBuilding, LucideX, LucidePlus, LucideDownload } from '@lucide/angular';
import { HFilterBarComponent, HFilterChipComponent } from './filter-bar.component';
import { HButtonComponent } from '../button/button.component';
import { HInputComponent } from '../input/input.component';

const meta: Meta<HFilterBarComponent> = {
  title: 'Navigation/FilterBar',
  component: HFilterBarComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<HFilterBarComponent>;

const sharedImports = [
  HFilterBarComponent, HFilterChipComponent, HButtonComponent, HInputComponent,
  LucideSearch, LucideFilter, LucideCalendar, LucideBuilding, LucideX, LucidePlus, LucideDownload,
];

export const Default: Story = {
  render: () => ({
    template: `
      <h-filter-bar>
        <div hFilterSearch style="flex:1 1 280px;max-width:360px;">
          <h-input placeholder="Search by lot, SKU, customer…">
            <svg lucideSearch [size]="14"></svg>
          </h-input>
        </div>
        <div hFilterActions style="display:inline-flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <h-button variant="outline">
            <svg lucideFilter [size]="13"></svg>
            Status: <strong style="margin-left:4px;">2</strong>
          </h-button>
          <h-button variant="outline">
            <svg lucideCalendar [size]="13"></svg>
            Apr 1 – Apr 27
          </h-button>
          <h-button variant="outline">
            <svg lucideBuilding [size]="13"></svg>
            All facilities
          </h-button>
          <h-button variant="ghost">
            <svg lucideX [size]="13"></svg>
            Clear
          </h-button>
          <div style="flex:1;min-width:8px"></div>
          <h-button variant="outline">
            <svg lucideDownload [size]="13"></svg>
            Export
          </h-button>
          <h-button>
            <svg lucidePlus [size]="13"></svg>
            New Lot
          </h-button>
        </div>
        <div hFilterChips style="display:flex;align-items:center;gap:6px;">
          <span style="font-size:11px;color:var(--h-muted-foreground);font-weight:700;letter-spacing:0.18em;text-transform:uppercase;margin-right:4px;font-family:var(--h-font-sans);">Active:</span>
          <h-filter-chip>Status: Running</h-filter-chip>
          <h-filter-chip>Status: On hold</h-filter-chip>
          <h-filter-chip>Customer: Inditex</h-filter-chip>
        </div>
      </h-filter-bar>
    `,
    moduleMetadata: { imports: sharedImports },
  }),
};

export const ChipOnly: Story = {
  render: () => ({
    template: `
      <div style="padding:16px;display:flex;gap:8px;flex-wrap:wrap;">
        <h-filter-chip>Status: Running</h-filter-chip>
        <h-filter-chip>Status: On hold</h-filter-chip>
        <h-filter-chip>Customer: Inditex</h-filter-chip>
        <h-filter-chip>Apr 1 – Apr 27</h-filter-chip>
      </div>
    `,
    moduleMetadata: { imports: [HFilterChipComponent] },
  }),
};

export const NoActiveFilters: Story = {
  render: () => ({
    template: `
      <h-filter-bar>
        <div hFilterSearch style="flex:1 1 280px;max-width:360px;">
          <h-input placeholder="Search by lot, SKU, customer…">
            <svg lucideSearch [size]="14"></svg>
          </h-input>
        </div>
        <div hFilterActions style="display:inline-flex;gap:8px;align-items:center;">
          <h-button variant="outline">
            <svg lucideFilter [size]="13"></svg>
            Status
          </h-button>
          <h-button variant="outline">
            <svg lucideCalendar [size]="13"></svg>
            Date range
          </h-button>
          <div style="flex:1;min-width:8px"></div>
          <h-button>
            <svg lucidePlus [size]="13"></svg>
            New Lot
          </h-button>
        </div>
      </h-filter-bar>
    `,
    moduleMetadata: { imports: sharedImports },
  }),
};
