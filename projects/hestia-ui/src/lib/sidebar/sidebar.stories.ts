import type { Meta, StoryObj } from '@storybook/angular';
import {
  LucideLayoutGrid, LucidePackage, LucideFactory, LucideCalendar,
  LucideShieldCheck, LucideFileText, LucideBox, LucideTruck,
  LucideGauge, LucideSettings, LucideChevronDown, LucideBuilding,
  LucideTag, LucideBriefcase, LucideReceipt,
} from '@lucide/angular';
import {
  HSidebarComponent,
  HSidebarGroupComponent,
  HSidebarItemComponent,
  HSidebarBrandDirective,
  HSidebarSubGroupComponent,
  HSidebarSubGroupFlyoutComponent,
  HSidebarSubGroupIconDirective,
} from './sidebar.component';
import { HButtonComponent } from '../button/button.component';

const imports = [
  HSidebarComponent, HSidebarGroupComponent, HSidebarItemComponent, HSidebarBrandDirective,
  HSidebarSubGroupComponent, HSidebarSubGroupFlyoutComponent, HSidebarSubGroupIconDirective,
  LucideLayoutGrid, LucidePackage, LucideFactory, LucideCalendar,
  LucideShieldCheck, LucideFileText, LucideBox, LucideTruck,
  LucideGauge, LucideSettings, LucideChevronDown, LucideBuilding,
  LucideTag, LucideBriefcase, LucideReceipt,
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

export const WithAccordionSubGroup: Story = {
  name: 'Sub-group (accordion)',
  render: () => ({
    template: `
      <h-sidebar>
        <div hSidebarBrand style="display:flex;align-items:center;gap:10px;">
          <div style="width:28px;height:28px;border-radius:8px;background:var(--h-primary);color:#fff;display:grid;place-items:center;font-weight:700;font-size:14px;flex-shrink:0;">H</div>
          <span style="font-size:14px;font-weight:600;font-family:var(--h-font-sans);">Hestia ERP</span>
        </div>

        <h-sidebar-group label="Faturação">
          <h-sidebar-item value="dashboard" label="Dashboard" [active]="true">
            <svg lucideLayoutGrid [size]="15"></svg>
          </h-sidebar-item>

          <h-sidebar-sub-group label="Documentos de Venda">
            <svg lucideTag [size]="15" hSubGroupIcon></svg>
            <h-sidebar-item value="/invoicing/sales/invoices" label="Documentos Comerciais">
              <svg lucideReceipt [size]="15"></svg>
            </h-sidebar-item>
            <h-sidebar-item value="/invoicing/sales/work-documents" label="Documentos de Trabalho">
              <svg lucideBriefcase [size]="15"></svg>
            </h-sidebar-item>
            <h-sidebar-item value="/invoicing/sales/transport-documents" label="Documentos de Transporte">
              <svg lucideTruck [size]="15"></svg>
            </h-sidebar-item>
          </h-sidebar-sub-group>

          <h-sidebar-sub-group label="Documentos de Compra" [defaultOpen]="true">
            <svg lucideBox [size]="15" hSubGroupIcon></svg>
            <h-sidebar-item value="/invoicing/purchase/invoices" label="Faturas de Fornecedor">
              <svg lucideReceipt [size]="15"></svg>
            </h-sidebar-item>
            <h-sidebar-item value="/invoicing/purchase/receipts" label="Recibos">
              <svg lucideFileText [size]="15"></svg>
            </h-sidebar-item>
          </h-sidebar-sub-group>

          <h-sidebar-item value="settings" label="Configurações">
            <svg lucideSettings [size]="15"></svg>
          </h-sidebar-item>
        </h-sidebar-group>
      </h-sidebar>
    `,
    moduleMetadata: { imports },
  }),
};

export const WithFlyoutSubGroup: Story = {
  name: 'Sub-group (flyout)',
  render: () => ({
    template: `
      <div style="display:flex;height:500px;">
        <h-sidebar>
          <div hSidebarBrand style="display:flex;align-items:center;gap:10px;">
            <div style="width:28px;height:28px;border-radius:8px;background:var(--h-primary);color:#fff;display:grid;place-items:center;font-weight:700;font-size:14px;flex-shrink:0;">H</div>
            <span style="font-size:14px;font-weight:600;font-family:var(--h-font-sans);">Hestia ERP</span>
          </div>

          <h-sidebar-group label="Faturação">
            <h-sidebar-item value="dashboard" label="Dashboard" [active]="true">
              <svg lucideLayoutGrid [size]="15"></svg>
            </h-sidebar-item>

            <h-sidebar-sub-group-flyout label="Documentos de Venda">
              <svg lucideTag [size]="15" hSubGroupIcon></svg>
              <h-sidebar-item value="/invoicing/sales/invoices" label="Documentos Comerciais">
                <svg lucideReceipt [size]="15"></svg>
              </h-sidebar-item>
              <h-sidebar-item value="/invoicing/sales/work-documents" label="Documentos de Trabalho">
                <svg lucideBriefcase [size]="15"></svg>
              </h-sidebar-item>
              <h-sidebar-item value="/invoicing/sales/transport-documents" label="Documentos de Transporte">
                <svg lucideTruck [size]="15"></svg>
              </h-sidebar-item>
            </h-sidebar-sub-group-flyout>

            <h-sidebar-sub-group-flyout label="Documentos de Compra">
              <svg lucideBox [size]="15" hSubGroupIcon></svg>
              <h-sidebar-item value="/invoicing/purchase/invoices" label="Faturas de Fornecedor">
                <svg lucideReceipt [size]="15"></svg>
              </h-sidebar-item>
              <h-sidebar-item value="/invoicing/purchase/receipts" label="Recibos">
                <svg lucideFileText [size]="15"></svg>
              </h-sidebar-item>
            </h-sidebar-sub-group-flyout>

            <h-sidebar-item value="settings" label="Configurações">
              <svg lucideSettings [size]="15"></svg>
            </h-sidebar-item>
          </h-sidebar-group>
        </h-sidebar>
        <div style="padding:24px;color:var(--h-muted-foreground);font-family:var(--h-font-sans);font-size:13px;">
          Hover over the sub-group items to see the flyout panel →
        </div>
      </div>
    `,
    moduleMetadata: { imports },
  }),
};
