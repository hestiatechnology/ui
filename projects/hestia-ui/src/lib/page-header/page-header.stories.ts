import type { Meta, StoryObj } from '@storybook/angular';
import { HPageHeaderComponent } from './page-header.component';
import { HPageHeaderMetaCellComponent } from './ph-meta-cell.component';
import { HPageHeaderStatusPillComponent } from './ph-status-pill.component';
import { HPageHeaderToggleChipComponent } from './ph-toggle-chip.component';

import { LucideFileText, LucideClock, LucideMoreVertical, LucideX, LucideZap, LucideTag, LucidePauseCircle, LucideShieldCheck } from '@lucide/angular';
import { HIconTileComponent } from '../icon-tile/icon-tile.component';
import { HIconButtonComponent } from '../icon-button/icon-button.component';
import { HButtonComponent } from '../button/button.component';
import { HBreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

const meta: Meta<HPageHeaderComponent> = {
  title: 'Layout/Page Header',
  component: HPageHeaderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};
export default meta;
type Story = StoryObj<HPageHeaderComponent>;

export const Default: Story = {
  render: () => ({
    props: {
      LucideClock, LucideMoreVertical, LucideX, LucideZap, LucideTag, LucideFileText
    },
    template: `
      <h-page-header
        title="Nova Fatura"
        subtitle="· Rascunho · não emitida"
        eyebrow="Faturação · Documentos de Venda"
        eyebrowTone="primary"
      >
        <!-- Row 1: Breadcrumbs -->
        <h-breadcrumbs hPageHeaderBreadcrumbs [items]="['Início', 'Faturação', 'Documentos de Venda', 'Faturas', 'Nova Fatura']"></h-breadcrumbs>

        <!-- Row 1: Actions -->
        <ng-container hPageHeaderActions>
          <h-icon-button variant="outline" size="sm" aria-label="Histórico">
            <svg lucideClock [size]="15"></svg>
          </h-icon-button>
          <h-icon-button variant="outline" size="sm" aria-label="Mais opções">
            <svg lucideMoreVertical [size]="15"></svg>
          </h-icon-button>
          <div style="width: 1px; height: 22px; background: var(--h-border); margin: 0 2px;"></div>
          <h-button variant="outline" size="sm">
            <svg lucideX [size]="13"></svg>
            Cancelar
          </h-button>
          <h-button size="sm">
            <svg lucideZap [size]="13"></svg>
            Emitir Fatura
          </h-button>
        </ng-container>

        <!-- Row 2: Icon -->
        <h-icon-tile hPageHeaderIcon tone="primary" [size]="40">
           <svg lucideTag [size]="18"></svg>
        </h-icon-tile>

        <!-- Row 2: Status -->
        <ng-container hPageHeaderStatus>
          <h-ph-status-pill label="Rascunho" status="idle"></h-ph-status-pill>
          <h-ph-toggle-chip label="Paperless" value="ON" [active]="true">
            <svg hToggleIcon lucideFileText [size]="14"></svg>
          </h-ph-toggle-chip>
        </ng-container>

        <!-- Row 3: Meta Strip -->
        <ng-container hPageHeaderMeta>
          <h-ph-meta-cell label="Série" value="FT 2026" [clickable]="true" [mono]="true"></h-ph-meta-cell>
          <h-ph-meta-cell label="Data de Emissão" value="04/05/2026" [mono]="true"></h-ph-meta-cell>
          <h-ph-meta-cell label="Código do Documento"></h-ph-meta-cell>
          <h-ph-meta-cell label="Cliente" value="Cortefiel Group · ES"></h-ph-meta-cell>
          <h-ph-meta-cell label="Condições de Pagamento" value="30 dias" [clickable]="true"></h-ph-meta-cell>
        </ng-container>

      </h-page-header>
    `,
    moduleMetadata: {
      imports: [
        HPageHeaderComponent, HPageHeaderMetaCellComponent, HPageHeaderStatusPillComponent, HPageHeaderToggleChipComponent,
        HBreadcrumbsComponent, HIconTileComponent, HIconButtonComponent, HButtonComponent,
        LucideClock, LucideMoreVertical, LucideX, LucideZap, LucideTag, LucideFileText
      ]
    }
  })
};

export const DarkSurface: Story = {
  render: () => ({
    props: {
      LucideClock, LucideMoreVertical, LucideX, LucideZap, LucideTag, LucideFileText
    },
    template: `
      <div style="padding: 2rem; background: var(--h-background)">
        <h-page-header
          [dark]="true"
          title="Nova Fatura"
          subtitle="· Rascunho · não emitida"
          eyebrow="Faturação · Documentos de Venda"
          eyebrowTone="primary"
        >
          <!-- Row 1: Breadcrumbs -->
          <h-breadcrumbs hPageHeaderBreadcrumbs [items]="['Início', 'Faturação', 'Documentos de Venda', 'Faturas', 'Nova Fatura']"></h-breadcrumbs>

          <!-- Row 1: Actions -->
          <ng-container hPageHeaderActions>
            <h-icon-button variant="outline" size="sm" aria-label="Histórico">
              <svg lucideClock [size]="15"></svg>
            </h-icon-button>
            <h-icon-button variant="outline" size="sm" aria-label="Mais opções">
              <svg lucideMoreVertical [size]="15"></svg>
            </h-icon-button>
            <div style="width: 1px; height: 22px; background: var(--h-border); margin: 0 2px;"></div>
            <h-button variant="outline" size="sm">
              <svg lucideX [size]="13"></svg>
              Cancelar
            </h-button>
            <h-button size="sm">
              <svg lucideZap [size]="13"></svg>
              Emitir Fatura
            </h-button>
          </ng-container>

          <!-- Row 2: Icon -->
          <h-icon-tile hPageHeaderIcon tone="primary" [size]="40">
             <svg lucideTag [size]="18"></svg>
          </h-icon-tile>

          <!-- Row 2: Status -->
          <ng-container hPageHeaderStatus>
            <h-ph-status-pill label="Rascunho" status="idle"></h-ph-status-pill>
            <h-ph-toggle-chip label="Paperless" value="ON" [active]="true">
              <svg hToggleIcon lucideFileText [size]="14"></svg>
            </h-ph-toggle-chip>
          </ng-container>

          <!-- Row 3: Meta Strip -->
          <ng-container hPageHeaderMeta>
            <h-ph-meta-cell label="Série" value="FT 2026" [clickable]="true" [mono]="true"></h-ph-meta-cell>
            <h-ph-meta-cell label="Data de Emissão" value="04/05/2026" [mono]="true"></h-ph-meta-cell>
            <h-ph-meta-cell label="Código do Documento"></h-ph-meta-cell>
            <h-ph-meta-cell label="Cliente" value="Cortefiel Group · ES"></h-ph-meta-cell>
            <h-ph-meta-cell label="Condições de Pagamento" value="30 dias" [clickable]="true"></h-ph-meta-cell>
          </ng-container>
        </h-page-header>
      </div>
    `,
    moduleMetadata: {
      imports: [
        HPageHeaderComponent, HPageHeaderMetaCellComponent, HPageHeaderStatusPillComponent, HPageHeaderToggleChipComponent,
        HBreadcrumbsComponent, HIconTileComponent, HIconButtonComponent, HButtonComponent,
        LucideClock, LucideMoreVertical, LucideX, LucideZap, LucideTag, LucideFileText
      ]
    }
  })
};

export const ERPLotDetail: Story = {
  render: () => ({
    props: {
      LucideClock, LucideMoreVertical, LucidePauseCircle, LucideShieldCheck, LucideFileText
    },
    template: `
      <h-page-header
        title="LOT-2A-0094"
        subtitle="· Linen warp · 4,200 m"
        eyebrow="Production · Lots"
        eyebrowTone="primary"
      >
        <!-- Row 1: Breadcrumbs -->
        <h-breadcrumbs hPageHeaderBreadcrumbs [items]="['Production', 'Lots', 'LOT-2A-0094']"></h-breadcrumbs>

        <!-- Row 1: Actions -->
        <ng-container hPageHeaderActions>
          <h-icon-button variant="outline" size="sm" aria-label="History">
            <svg lucideClock [size]="15"></svg>
          </h-icon-button>
          <h-icon-button variant="outline" size="sm" aria-label="More">
            <svg lucideMoreVertical [size]="15"></svg>
          </h-icon-button>
          <div style="width: 1px; height: 22px; background: var(--h-border); margin: 0 2px;"></div>
          <h-button variant="outline" size="sm">
            <svg lucidePauseCircle [size]="13"></svg>
            Pause lot
          </h-button>
          <h-button size="sm">
            <svg lucideShieldCheck [size]="13"></svg>
            Finalize DPP
          </h-button>
        </ng-container>

        <!-- Row 2: Icon -->
        <h-icon-tile hPageHeaderIcon tone="primary" [size]="40">
           <svg lucideServer [size]="20"></svg>
        </h-icon-tile>

        <!-- Row 2: Status -->
        <ng-container hPageHeaderStatus>
          <h-ph-status-pill label="Running" status="running"></h-ph-status-pill>
          <h-ph-toggle-chip label="DPP" value="DRAFT" [active]="false">
            <svg hToggleIcon lucideFileText [size]="14"></svg>
          </h-ph-toggle-chip>
        </ng-container>

        <!-- Row 3: Meta Strip -->
        <ng-container hPageHeaderMeta>
          <h-ph-meta-cell label="SKU" value="LIN-180-NAT" [mono]="true"></h-ph-meta-cell>
          <h-ph-meta-cell label="Customer" value="Inditex · ES"></h-ph-meta-cell>
          <h-ph-meta-cell label="Machine" value="Loom 7 · L7-KNIT-03" [clickable]="true" [mono]="true"></h-ph-meta-cell>
          <h-ph-meta-cell label="Started" value="Apr 27 · 06:14" [mono]="true"></h-ph-meta-cell>
          <div style="flex: 1; padding: 12px 20px; min-width: 0; font-family: var(--h-font-sans);">
            <div style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--h-muted-foreground); margin-bottom: 5px; font-family: var(--h-font-sans);">Progress</div>
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; font-family: var(--h-font-mono); margin-bottom: 5px;">
                <span style="font-weight: 600;">62%</span>
                <span style="color: var(--h-muted-foreground);">ETA Apr 28</span>
              </div>
              <div style="height: 4px; border-radius: 4px; background: var(--h-muted); overflow: hidden;">
                <div style="width: 62%; height: 100%; background: var(--h-primary);"></div>
              </div>
            </div>
          </div>
        </ng-container>
      </h-page-header>
    `,
    moduleMetadata: {
      imports: [
        HPageHeaderComponent, HPageHeaderMetaCellComponent, HPageHeaderStatusPillComponent, HPageHeaderToggleChipComponent,
        HBreadcrumbsComponent, HIconTileComponent, HIconButtonComponent, HButtonComponent,
        LucideClock, LucideMoreVertical, LucidePauseCircle, LucideShieldCheck, LucideFileText
      ]
    }
  })
};
