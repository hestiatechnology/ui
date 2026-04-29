import type { Meta, StoryObj } from '@storybook/angular';
import {
  LucideLayoutGrid, LucidePackage, LucideFactory, LucideCalendar,
  LucideShieldCheck, LucideFileText, LucideBox, LucideTruck,
  LucideGauge, LucideSettings, LucideSearch, LucideFilter,
  LucideRefreshCw, LucideDownload, LucideActivity, LucideZap,
  LucideCpu, LucideWifi, LucideWifiOff, LucideCircleAlert,
  LucideMoreHorizontal, LucideClock, LucideCheck,
} from '@lucide/angular';

import { HSidebarComponent, HSidebarGroupComponent, HSidebarItemComponent, HSidebarBrandDirective } from '../sidebar/sidebar.component';
import { HTopbarComponent } from '../topbar/topbar.component';
import { HBreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { HInputComponent } from '../input/input.component';
import { HButtonComponent } from '../button/button.component';
import { HIconButtonComponent } from '../icon-button/icon-button.component';
import { HAlertComponent } from '../alert/alert.component';
import { HCardComponent } from '../card/card.component';
import { HKpiComponent } from '../kpi/kpi.component';
import { HBarMiniComponent } from '../charts/bar-mini.component';
import { HDonutComponent, HChartLegendComponent } from '../charts/donut.component';
import { HRingProgressComponent } from '../ring-progress/ring-progress.component';
import { HFilterBarComponent, HFilterChipComponent } from '../filter-bar/filter-bar.component';
import { HTableComponent, HThDirective, HTdDirective } from '../table/table.component';
import { HStatusPillComponent } from '../status-pill/status-pill.component';
import { HBadgeComponent } from '../badge/badge.component';
import { HProgressComponent } from '../progress/progress.component';
import { HPaginationComponent } from '../pagination/pagination.component';
import { HMachineTileComponent } from '../machine-tile/machine-tile.component';
import { HDefListComponent, HDefRowComponent } from '../def-list/def-list.component';
import { HSkeletonComponent } from '../skeleton/skeleton.component';

const meta: Meta = {
  title: 'Overview/Machines',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { story: 'Machine fleet overview — live status grid, connectivity, and per-machine detail.' } },
  },
};
export default meta;
type Story = StoryObj;

const oeeSpark  = [72, 74, 78, 80, 82, 86, 94];
const upSpark   = [98, 97, 99, 98, 99, 100, 98];

const statusSegments = [
  { value: 62, color: 'var(--h-status-running)',     label: 'Running' },
  { value: 18, color: 'var(--h-status-idle)',        label: 'Idle'    },
  { value:  9, color: 'var(--h-status-maintenance)', label: 'Maint.'  },
  { value: 11, color: 'var(--h-status-error)',       label: 'Error'   },
];

const loomMetrics  = [{ label: 'm/h', value: '1,140', unit: 'm/h', mono: true }, { label: 'OEE', value: '94', unit: '%' }, { label: 'ETA', value: '02:14', unit: 'h' }];
const dyeMetrics   = [{ label: 'Temp',  value: '92', unit: '°C', mono: true }, { label: 'Time', value: '1h', unit: 'left' }];
const cutMetrics   = [{ label: 'm/h', value: '540', unit: 'm/h', mono: true }, { label: 'OEE', value: '88', unit: '%' }];
const finishMetrics = [{ label: 'm/h', value: '210', unit: 'm/h', mono: true }, { label: 'OEE', value: '76', unit: '%' }];
const idleMetrics  = [{ label: 'm/h', value: '0', unit: 'm/h', mono: true }, { label: 'OEE', value: '—' }];
const errMetrics   = [{ label: 'm/h', value: '0', unit: 'm/h', mono: true }, { label: 'OEE', value: '—' }];

const allImports = [
  HSidebarComponent, HSidebarGroupComponent, HSidebarItemComponent, HSidebarBrandDirective,
  HTopbarComponent, HBreadcrumbsComponent, HInputComponent, HButtonComponent, HIconButtonComponent,
  HAlertComponent, HCardComponent, HKpiComponent, HBarMiniComponent, HDonutComponent,
  HChartLegendComponent, HRingProgressComponent,
  HFilterBarComponent, HFilterChipComponent,
  HTableComponent, HThDirective, HTdDirective,
  HStatusPillComponent, HBadgeComponent, HProgressComponent, HPaginationComponent,
  HMachineTileComponent, HDefListComponent, HDefRowComponent,
  HSkeletonComponent,
  LucideLayoutGrid, LucidePackage, LucideFactory, LucideCalendar,
  LucideShieldCheck, LucideFileText, LucideBox, LucideTruck,
  LucideGauge, LucideSettings, LucideSearch, LucideFilter,
  LucideRefreshCw, LucideDownload, LucideActivity, LucideZap,
  LucideCpu, LucideWifi, LucideWifiOff, LucideCircleAlert,
  LucideMoreHorizontal, LucideClock, LucideCheck,
];

export const Default: Story = {
  render: () => ({
    props: {
      oeeSpark, upSpark, statusSegments,
      loomMetrics, dyeMetrics, cutMetrics, finishMetrics, idleMetrics, errMetrics,
    },
    template: `
<div style="display:flex;height:100vh;overflow:hidden;background:var(--h-background);font-family:var(--h-font-sans)">

  <!-- ═══════════════════ SIDEBAR ═══════════════════ -->
  <h-sidebar style="height:100vh;overflow-y:auto;flex-shrink:0">
    <div hSidebarBrand style="display:flex;align-items:center;gap:10px">
      <div style="width:28px;height:28px;border-radius:8px;background:var(--h-primary);color:#fff;display:grid;place-items:center;font-weight:700;font-size:14px;flex-shrink:0">H</div>
      <span style="font-size:14px;font-weight:600;letter-spacing:-0.01em">Hestia ERP</span>
    </div>

    <h-sidebar-group label="Production">
      <h-sidebar-item value="dashboard" label="Dashboard">
        <svg lucideLayoutGrid [size]="15"></svg>
      </h-sidebar-item>
      <h-sidebar-item value="lots" label="Lots" badge="31">
        <svg lucidePackage [size]="15"></svg>
      </h-sidebar-item>
      <h-sidebar-item value="machines" label="Machines" badge="84" [active]="true">
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
      <h-sidebar-item value="dpp" label="DPP Passports">
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

  <!-- ═══════════════════ MAIN ═══════════════════ -->
  <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0">

    <!-- TOP BAR -->
    <h-topbar userName="Marta Silva" userRole="Operations Lead" [notificationCount]="2">
      <h-breadcrumbs hTopbarStart [items]="['Production', 'Machines']" [mono]="[false, false]"></h-breadcrumbs>
      <h-input hTopbarSearch style="width:100%" placeholder="Search machines, IDs, lots… ⌘K">
        <svg slot="icon" lucideSearch [size]="14"></svg>
      </h-input>
    </h-topbar>

    <!-- SCROLLABLE CONTENT -->
    <div style="flex:1;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:20px">

      <!-- PAGE HEADER -->
      <div style="display:flex;align-items:flex-start;justify-content:space-between">
        <div>
          <h1 style="font-size:20px;font-weight:700;letter-spacing:-0.02em;margin:0 0 4px">Machine Fleet</h1>
          <p style="font-size:13px;color:var(--h-muted-foreground);margin:0">Barcelos · HQ plant · 84 machines total</p>
        </div>
        <div style="display:inline-flex;gap:8px;align-items:center">
          <h-icon-button variant="outline" aria-label="Refresh">
            <svg lucideRefreshCw [size]="14"></svg>
          </h-icon-button>
          <h-button variant="outline">
            <svg lucideDownload [size]="13"></svg>
            Export
          </h-button>
          <h-button>
            <svg lucideCpu [size]="13"></svg>
            Add machine
          </h-button>
        </div>
      </div>

      <!-- ERROR ALERT -->
      <h-alert
        tone="error"
        title="2 machines require immediate attention"
        description="L4-KNIT-01 reported a warp break at 14:02. CUT-09 stopped unexpectedly — maintenance has been notified."
        [dismissible]="true"
      ></h-alert>

      <!-- KPI ROW -->
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:16px">
        <h-kpi label="Total machines"   value="84"    delta=""       trend="up"></h-kpi>
        <h-kpi label="Running"          value="52"    delta="+3"     trend="up"></h-kpi>
        <h-kpi label="Idle"             value="15"    delta="-2"     trend="up"></h-kpi>
        <h-kpi label="Maintenance"      value="8"     delta=""       trend="up"></h-kpi>
        <h-kpi label="Fleet OEE"        value="78.4%" delta="+2.1pp" trend="up" [sparkValues]="oeeSpark"></h-kpi>
      </div>

      <!-- CHARTS + SYNC ROW -->
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">

        <!-- STATUS DONUT -->
        <h-card>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground)">Status mix</div>
          <div style="display:flex;align-items:center;gap:16px;margin-top:12px">
            <h-donut [segments]="statusSegments" [size]="80" [strokeWidth]="12"></h-donut>
            <div style="display:flex;flex-direction:column;gap:6px">
              <h-chart-legend color="var(--h-status-running)"     label="Running"  value="52"></h-chart-legend>
              <h-chart-legend color="var(--h-status-idle)"        label="Idle"     value="15"></h-chart-legend>
              <h-chart-legend color="var(--h-status-maintenance)" label="Maint."   value="8"></h-chart-legend>
              <h-chart-legend color="var(--h-status-error)"       label="Error"    value="9"></h-chart-legend>
            </div>
          </div>
        </h-card>

        <!-- OEE TREND -->
        <h-card>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground)">Fleet OEE · 7-day</div>
          <h-bar-mini [values]="oeeSpark" [height]="70"></h-bar-mini>
          <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:11px;color:var(--h-muted-foreground)">
            <span>Mon</span><span>Sun</span>
          </div>
        </h-card>

        <!-- IOT SYNC -->
        <h-card>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground)">IoT stream</div>
          <div style="display:flex;align-items:center;gap:14px;margin-top:14px">
            <h-ring-progress [value]="94" [size]="56" [strokeWidth]="4"></h-ring-progress>
            <div>
              <div style="font-size:22px;font-weight:600;font-family:var(--h-font-mono)">79</div>
              <div style="font-size:12px;color:var(--h-muted-foreground)">of 84 reporting</div>
            </div>
          </div>
          <div style="margin-top:12px;display:flex;align-items:center;gap:6px;font-size:12px;color:var(--h-muted-foreground)">
            <svg lucideWifi [size]="12" style="color:var(--h-status-running)"></svg>
            Last heartbeat 3 s ago · 5 offline for maint.
          </div>
        </h-card>

      </div>

      <!-- FILTER BAR -->
      <h-filter-bar>
        <div hFilterSearch style="flex:1 1 260px;max-width:340px">
          <h-input placeholder="Search machine ID, name, lot…">
            <svg slot="icon" lucideSearch [size]="14"></svg>
          </h-input>
        </div>
        <div hFilterActions style="display:inline-flex;gap:8px;align-items:center;flex-wrap:wrap">
          <h-button variant="outline">
            <svg lucideFilter [size]="13"></svg>
            Status: <strong style="margin-left:4px">Running</strong>
          </h-button>
          <h-button variant="outline">
            <svg lucideActivity [size]="13"></svg>
            OEE &lt; 80%
          </h-button>
        </div>
        <div hFilterChips style="display:flex;align-items:center;gap:6px">
          <span style="font-size:11px;color:var(--h-muted-foreground);font-weight:700;letter-spacing:0.18em;text-transform:uppercase;margin-right:4px">Active:</span>
          <h-filter-chip>Status: Running</h-filter-chip>
          <h-filter-chip>OEE &lt; 80%</h-filter-chip>
        </div>
      </h-filter-bar>

      <!-- MACHINE TILES — 3-column grid -->
      <div>
        <div style="font-size:13px;font-weight:600;margin-bottom:12px;color:var(--h-muted-foreground)">Running · 6 shown</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
          <h-machine-tile
            machineId="L7-KNIT-03"
            machineName="Loom 7 · Tear A"
            status="running"
            [oee]="94"
            [metrics]="loomMetrics"
          ></h-machine-tile>
          <h-machine-tile
            machineId="L3-KNIT-08"
            machineName="Loom 3 · Tear B"
            status="running"
            [oee]="88"
            [metrics]="loomMetrics"
          ></h-machine-tile>
          <h-machine-tile
            machineId="CUT-11"
            machineName="Cutter 11"
            status="running"
            [oee]="88"
            [metrics]="cutMetrics"
          ></h-machine-tile>
          <h-machine-tile
            machineId="FIN-04"
            machineName="Finishing 4"
            status="running"
            [oee]="76"
            [metrics]="finishMetrics"
          ></h-machine-tile>
          <h-machine-tile
            machineId="DB-02"
            machineName="Dye Bath 02"
            status="idle"
            [oee]="0"
            [metrics]="dyeMetrics"
          ></h-machine-tile>
          <h-machine-tile
            machineId="L4-KNIT-01"
            machineName="Loom 4 · Tear B"
            status="error"
            [oee]="0"
            alertMessage="Warp break detected at 14:02. Maintenance notified."
            [metrics]="errMetrics"
          ></h-machine-tile>
        </div>
      </div>

      <!-- ALL MACHINES TABLE (compact view) -->
      <h-card [padded]="false">
        <div style="padding:14px 16px 10px;border-bottom:1px solid var(--h-border);display:flex;align-items:center;justify-content:space-between">
          <div style="font-size:13px;font-weight:600">All machines</div>
          <div style="font-size:12px;color:var(--h-muted-foreground)">Showing 1–10 of 84</div>
        </div>
        <h-table>
          <thead>
            <tr>
              <th hTh>Machine ID</th>
              <th hTh>Name</th>
              <th hTh>Type</th>
              <th hTh>Status</th>
              <th hTh align="right">OEE</th>
              <th hTh>Active lot</th>
              <th hTh>IoT</th>
              <th hTh>Last seen</th>
              <th hTh></th>
            </tr>
          </thead>
          <tbody>
            <tr style="background:rgba(0,61,165,0.03)">
              <td hTd><span style="font-family:var(--h-font-mono);font-weight:500">L7-KNIT-03</span></td>
              <td hTd>Loom 7 · Tear A</td>
              <td hTd style="color:var(--h-muted-foreground);font-size:12px">Circular knit</td>
              <td hTd><h-status-pill status="running">Running</h-status-pill></td>
              <td hTd align="right"><span style="font-family:var(--h-font-mono)">94%</span></td>
              <td hTd><h-badge tone="primary" [dot]="true">LOT-2A-0094</h-badge></td>
              <td hTd><svg lucideWifi [size]="13" style="color:var(--h-status-running)"></svg></td>
              <td hTd style="font-size:12px;color:var(--h-muted-foreground)">2 s ago</td>
              <td hTd>
                <h-icon-button variant="ghost" size="sm" aria-label="More">
                  <svg lucideMoreHorizontal [size]="14"></svg>
                </h-icon-button>
              </td>
            </tr>
            <tr>
              <td hTd><span style="font-family:var(--h-font-mono);font-weight:500">L3-KNIT-08</span></td>
              <td hTd>Loom 3 · Tear B</td>
              <td hTd style="color:var(--h-muted-foreground);font-size:12px">Circular knit</td>
              <td hTd><h-status-pill status="running">Running</h-status-pill></td>
              <td hTd align="right"><span style="font-family:var(--h-font-mono)">88%</span></td>
              <td hTd><h-badge tone="primary" [dot]="true">LOT-2A-0091</h-badge></td>
              <td hTd><svg lucideWifi [size]="13" style="color:var(--h-status-running)"></svg></td>
              <td hTd style="font-size:12px;color:var(--h-muted-foreground)">4 s ago</td>
              <td hTd>
                <h-icon-button variant="ghost" size="sm" aria-label="More">
                  <svg lucideMoreHorizontal [size]="14"></svg>
                </h-icon-button>
              </td>
            </tr>
            <tr>
              <td hTd><span style="font-family:var(--h-font-mono);font-weight:500">DB-02</span></td>
              <td hTd>Dye Bath 02</td>
              <td hTd style="color:var(--h-muted-foreground);font-size:12px">Dye</td>
              <td hTd><h-status-pill status="idle">Idle</h-status-pill></td>
              <td hTd align="right"><span style="font-family:var(--h-font-mono);color:var(--h-muted-foreground)">—</span></td>
              <td hTd style="color:var(--h-muted-foreground);font-size:12px">—</td>
              <td hTd><svg lucideWifi [size]="13" style="color:var(--h-status-running)"></svg></td>
              <td hTd style="font-size:12px;color:var(--h-muted-foreground)">12 s ago</td>
              <td hTd>
                <h-icon-button variant="ghost" size="sm" aria-label="More">
                  <svg lucideMoreHorizontal [size]="14"></svg>
                </h-icon-button>
              </td>
            </tr>
            <tr>
              <td hTd><span style="font-family:var(--h-font-mono);font-weight:500">CUT-11</span></td>
              <td hTd>Cutter 11</td>
              <td hTd style="color:var(--h-muted-foreground);font-size:12px">Cutting</td>
              <td hTd><h-status-pill status="running">Running</h-status-pill></td>
              <td hTd align="right"><span style="font-family:var(--h-font-mono)">88%</span></td>
              <td hTd><h-badge tone="primary" [dot]="true">LOT-2A-0092</h-badge></td>
              <td hTd><svg lucideWifi [size]="13" style="color:var(--h-status-running)"></svg></td>
              <td hTd style="font-size:12px;color:var(--h-muted-foreground)">1 s ago</td>
              <td hTd>
                <h-icon-button variant="ghost" size="sm" aria-label="More">
                  <svg lucideMoreHorizontal [size]="14"></svg>
                </h-icon-button>
              </td>
            </tr>
            <tr style="background:rgba(220,38,38,0.04)">
              <td hTd><span style="font-family:var(--h-font-mono);font-weight:500">L4-KNIT-01</span></td>
              <td hTd>Loom 4 · Tear B</td>
              <td hTd style="color:var(--h-muted-foreground);font-size:12px">Circular knit</td>
              <td hTd><h-status-pill status="error">Error</h-status-pill></td>
              <td hTd align="right"><span style="font-family:var(--h-font-mono);color:var(--h-muted-foreground)">—</span></td>
              <td hTd style="color:var(--h-muted-foreground);font-size:12px">—</td>
              <td hTd><svg lucideWifi [size]="13" style="color:var(--h-status-running)"></svg></td>
              <td hTd style="font-size:12px;color:var(--h-muted-foreground)">14:03</td>
              <td hTd>
                <h-icon-button variant="ghost" size="sm" aria-label="More">
                  <svg lucideMoreHorizontal [size]="14"></svg>
                </h-icon-button>
              </td>
            </tr>
            <tr>
              <td hTd><span style="font-family:var(--h-font-mono);font-weight:500">FIN-04</span></td>
              <td hTd>Finishing 4</td>
              <td hTd style="color:var(--h-muted-foreground);font-size:12px">Finishing</td>
              <td hTd><h-status-pill status="running">Running</h-status-pill></td>
              <td hTd align="right"><span style="font-family:var(--h-font-mono)">76%</span></td>
              <td hTd><h-badge tone="primary" [dot]="true">LOT-2A-0093</h-badge></td>
              <td hTd><svg lucideWifi [size]="13" style="color:var(--h-status-running)"></svg></td>
              <td hTd style="font-size:12px;color:var(--h-muted-foreground)">7 s ago</td>
              <td hTd>
                <h-icon-button variant="ghost" size="sm" aria-label="More">
                  <svg lucideMoreHorizontal [size]="14"></svg>
                </h-icon-button>
              </td>
            </tr>
            <tr>
              <td hTd><span style="font-family:var(--h-font-mono);font-weight:500">MNT-02</span></td>
              <td hTd>Maintenance bay 2</td>
              <td hTd style="color:var(--h-muted-foreground);font-size:12px">Utility</td>
              <td hTd><h-status-pill status="maintenance">Maintenance</h-status-pill></td>
              <td hTd align="right"><span style="font-family:var(--h-font-mono);color:var(--h-muted-foreground)">—</span></td>
              <td hTd style="color:var(--h-muted-foreground);font-size:12px">—</td>
              <td hTd><svg lucideWifiOff [size]="13" style="color:var(--h-muted-foreground)"></svg></td>
              <td hTd style="font-size:12px;color:var(--h-muted-foreground)">2h ago</td>
              <td hTd>
                <h-icon-button variant="ghost" size="sm" aria-label="More">
                  <svg lucideMoreHorizontal [size]="14"></svg>
                </h-icon-button>
              </td>
            </tr>
          </tbody>
        </h-table>
        <div style="padding:12px 16px;border-top:1px solid var(--h-border);display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:13px;color:var(--h-muted-foreground)">Showing <strong style="color:var(--h-foreground);font-family:var(--h-font-mono)">1–7</strong> of <strong style="color:var(--h-foreground);font-family:var(--h-font-mono)">84</strong> machines</span>
          <h-pagination [totalPages]="12" [currentPage]="1" [siblingCount]="1"></h-pagination>
        </div>
      </h-card>

    </div><!-- /content -->
  </div><!-- /main -->
</div><!-- /shell -->
    `,
    moduleMetadata: { imports: allImports },
  }),
};
