import type { Meta, StoryObj } from '@storybook/angular';
import {
  LucideLayoutGrid, LucidePackage, LucideFactory, LucideCalendar,
  LucideShieldCheck, LucideFileText, LucideBox, LucideTruck,
  LucideGauge, LucideSettings, LucideChevronDown, LucideBuilding,
} from '@lucide/angular';
import {
  HSidebarComponent,
  HSidebarGroupComponent,
  HSidebarItemComponent,
  HSidebarBrandDirective,
} from './sidebar.component';
import { HButtonComponent } from '../button/button.component';

const imports = [
  HSidebarComponent, HSidebarGroupComponent, HSidebarItemComponent, HSidebarBrandDirective,
  LucideLayoutGrid, LucidePackage, LucideFactory, LucideCalendar,
  LucideShieldCheck, LucideFileText, LucideBox, LucideTruck,
  LucideGauge, LucideSettings, LucideChevronDown, LucideBuilding,
  HButtonComponent,
];

const meta: Meta<HSidebarComponent> = {
  title: 'Navigation/Sidebar',
  component: HSidebarComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<HSidebarComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <h-sidebar>
        <div hSidebarBrand style="display:flex;align-items:center;gap:10px;">
          <div style="width:28px;height:28px;border-radius:8px;background:var(--h-primary);color:#fff;display:grid;place-items:center;font-weight:700;font-size:14px;flex-shrink:0;">H</div>
          <span style="font-size:14px;font-weight:600;letter-spacing:-0.01em;font-family:var(--h-font-sans);">Hestia ERP</span>
        </div>

        <h-sidebar-group label="Production">
          <h-sidebar-item value="dashboard" label="Dashboard" [active]="true">
            <svg lucideLayoutGrid [size]="15"></svg>
          </h-sidebar-item>
          <h-sidebar-item value="lots" label="Lots" badge="31">
            <svg lucidePackage [size]="15"></svg>
          </h-sidebar-item>
          <h-sidebar-item value="machines" label="Machines" badge="84">
            <svg lucideFactory [size]="15"></svg>
          </h-sidebar-item>
          <h-sidebar-item value="schedule" label="Schedule">
            <svg lucideCalendar [size]="15"></svg>
          </h-sidebar-item>
        </h-sidebar-group>

        <h-sidebar-group label="Quality">
          <h-sidebar-item value="qc" label="QC Inspections">
            <svg lucideShieldCheck [size]="15"></svg>
          </h-sidebar-item>
          <h-sidebar-item value="dpp" label="DPP Passports" badge="12">
            <svg lucideFileText [size]="15"></svg>
          </h-sidebar-item>
        </h-sidebar-group>

        <h-sidebar-group label="Operations">
          <h-sidebar-item value="inventory" label="Inventory">
            <svg lucideBox [size]="15"></svg>
          </h-sidebar-item>
          <h-sidebar-item value="suppliers" label="Suppliers">
            <svg lucideTruck [size]="15"></svg>
          </h-sidebar-item>
          <h-sidebar-item value="reports" label="Reports">
            <svg lucideGauge [size]="15"></svg>
          </h-sidebar-item>
          <h-sidebar-item value="settings" label="Settings">
            <svg lucideSettings [size]="15"></svg>
          </h-sidebar-item>
        </h-sidebar-group>
      </h-sidebar>
    `,
    moduleMetadata: { imports },
  }),
};

export const WithFacilitySelector: Story = {
  render: () => ({
    template: `
      <h-sidebar>
        <div hSidebarBrand style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:28px;height:28px;border-radius:8px;background:var(--h-primary);color:#fff;display:grid;place-items:center;font-weight:700;font-size:14px;flex-shrink:0;">H</div>
            <span style="font-size:14px;font-weight:600;font-family:var(--h-font-sans);">Hestia ERP</span>
          </div>
          <h-button variant="outline" size="sm" style="width:100%;justify-content:space-between;">
            <svg lucideBuilding [size]="14" style="color:var(--h-muted-foreground);margin-right:4px;"></svg>
            Barcelos · HQ
            <svg lucideChevronDown [size]="13" style="color:var(--h-muted-foreground);margin-left:auto;"></svg>
          </h-button>
        </div>

        <h-sidebar-group label="Production">
          <h-sidebar-item value="dashboard" label="Dashboard" [active]="true">
            <svg lucideLayoutGrid [size]="15"></svg>
          </h-sidebar-item>
          <h-sidebar-item value="lots" label="Lots" badge="31">
            <svg lucidePackage [size]="15"></svg>
          </h-sidebar-item>
          <h-sidebar-item value="machines" label="Machines" badge="84">
            <svg lucideFactory [size]="15"></svg>
          </h-sidebar-item>
        </h-sidebar-group>

        <h-sidebar-group label="Quality">
          <h-sidebar-item value="qc" label="QC Inspections">
            <svg lucideShieldCheck [size]="15"></svg>
          </h-sidebar-item>
          <h-sidebar-item value="dpp" label="DPP Passports" badge="12">
            <svg lucideFileText [size]="15"></svg>
          </h-sidebar-item>
        </h-sidebar-group>
      </h-sidebar>
    `,
    moduleMetadata: { imports },
  }),
};

export const WithImageBrand: Story = {
  name: 'With image brand',
  render: () => ({
    template: `
      <h-sidebar>
        <div hSidebarBrand>
          <img src="https://placehold.co/120x32/003DA5/ffffff?text=Hestia" alt="Hestia" style="height:32px;" />
        </div>

        <h-sidebar-group label="Production">
          <h-sidebar-item value="dashboard" label="Dashboard" [active]="true">
            <svg lucideLayoutGrid [size]="15"></svg>
          </h-sidebar-item>
          <h-sidebar-item value="lots" label="Lots" badge="31">
            <svg lucidePackage [size]="15"></svg>
          </h-sidebar-item>
        </h-sidebar-group>
      </h-sidebar>
    `,
    moduleMetadata: { imports },
  }),
};

export const NoBrand: Story = {
  name: 'No brand (brand slot empty)',
  render: () => ({
    template: `
      <h-sidebar>
        <h-sidebar-group label="Production">
          <h-sidebar-item value="dashboard" label="Dashboard" [active]="true">
            <svg lucideLayoutGrid [size]="15"></svg>
          </h-sidebar-item>
          <h-sidebar-item value="lots" label="Lots" badge="31">
            <svg lucidePackage [size]="15"></svg>
          </h-sidebar-item>
          <h-sidebar-item value="machines" label="Machines">
            <svg lucideFactory [size]="15"></svg>
          </h-sidebar-item>
        </h-sidebar-group>

        <h-sidebar-group label="Settings">
          <h-sidebar-item value="settings" label="Settings">
            <svg lucideSettings [size]="15"></svg>
          </h-sidebar-item>
        </h-sidebar-group>
      </h-sidebar>
    `,
    moduleMetadata: { imports },
  }),
};
