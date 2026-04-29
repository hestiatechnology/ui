import type { Meta, StoryObj } from '@storybook/angular';
import {
  LucideLayoutGrid, LucidePackage, LucideFactory, LucideCalendar,
  LucideShieldCheck, LucideFileText, LucideBox, LucideTruck,
  LucideGauge, LucideSettings, LucideSearch, LucideFilter,
  LucidePlus, LucideDownload, LucideBuilding, LucideMoreHorizontal,
  LucideChevronDown,
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
import { HUserChipComponent } from '../avatar/user-chip.component';
import { HAvatarStackComponent } from '../avatar/avatar-stack.component';
import { HIconTileComponent } from '../icon-tile/icon-tile.component';
import { HTimelineComponent } from '../timeline/timeline.component';
import { HDppLockupComponent } from '../dpp-lockup/dpp-lockup.component';
import { HSkeletonComponent } from '../skeleton/skeleton.component';

const meta: Meta = {
  title: 'Overview/Dashboard',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { story: 'Full ERP dashboard showing all components in a realistic production context.' } },
  },
};
export default meta;
type Story = StoryObj;

const oeeSpark        = [62, 64, 60, 66, 70, 74, 78];
const throughputSpark = [820, 940, 1020, 980, 1180, 1240, 1140];
const rejectSpark     = [2.9, 2.2, 2.0, 2.1, 1.8, 1.9, 1.8];

const statusSegments = [
  { value: 62, color: 'var(--h-status-running)',     label: 'Running' },
  { value: 22, color: 'var(--h-status-idle)',        label: 'Idle'    },
  { value:  9, color: 'var(--h-status-hold)',        label: 'Hold'    },
  { value:  7, color: 'var(--h-status-maintenance)', label: 'Maint.'  },
];

const timelineEvents = [
  { actor: 'Marta Silva', action: 'started lot on Loom 7',                    timestamp: '06:14', tone: 'running'  },
  { actor: 'System',      action: 'DPP draft generated automatically',         timestamp: '06:18', tone: 'primary'  },
  { actor: 'João Pinto',  action: 'flagged GSM out of tolerance · 184 g/m²',  timestamp: '09:42', tone: 'idle'     },
  { actor: 'João Pinto',  action: 'released hold after recalibration',         timestamp: '10:11', tone: 'running'  },
  { actor: 'Marta Silva', action: "added note: 'switch to dye bath 2 at 13:00'", timestamp: '11:30', tone: 'neutral' },
];

const allImports = [
  HSidebarComponent, HSidebarGroupComponent, HSidebarItemComponent, HSidebarBrandDirective,
  HTopbarComponent, HBreadcrumbsComponent, HInputComponent, HButtonComponent, HIconButtonComponent,
  HAlertComponent, HCardComponent, HKpiComponent,
  HBarMiniComponent, HDonutComponent, HChartLegendComponent, HRingProgressComponent,
  HFilterBarComponent, HFilterChipComponent,
  HTableComponent, HThDirective, HTdDirective,
  HStatusPillComponent, HBadgeComponent, HProgressComponent, HPaginationComponent,
  HMachineTileComponent,
  HDefListComponent, HDefRowComponent, HUserChipComponent, HAvatarStackComponent,
  HIconTileComponent, HTimelineComponent, HDppLockupComponent, HSkeletonComponent,
  LucideLayoutGrid, LucidePackage, LucideFactory, LucideCalendar,
  LucideShieldCheck, LucideFileText, LucideBox, LucideTruck,
  LucideGauge, LucideSettings, LucideSearch, LucideFilter,
  LucidePlus, LucideDownload, LucideBuilding, LucideMoreHorizontal, LucideChevronDown,
];

export const Default: Story = {
  render: () => ({
    props: {
      oeeSpark, throughputSpark, rejectSpark, statusSegments, timelineEvents,
      teamNames: ['Marta Silva', 'João Pinto', 'Ana Costa', 'Pedro Sá'],
      machineLoom: [
        { label: 'm/h', value: '312', unit: 'm/h', mono: true },
        { label: 'OEE',  value: '94',  unit: '%'  },
        { label: 'ETA',  value: '02:14', unit: 'h' },
      ],
      machineDye: [
        { label: 'Temp',  value: '92',  unit: '°C', mono: true },
        { label: 'Time',  value: '1h',  unit: 'left' },
      ],
      machineErr: [
        { label: 'm/h', value: '0',  unit: 'm/h', mono: true },
        { label: 'OEE', value: '—' },
      ],
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

  <!-- ═══════════════════ MAIN ═══════════════════ -->
  <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0">

    <!-- TOP BAR -->
    <h-topbar userName="Marta Silva" userRole="Operations Lead" [notificationCount]="3">
      <h-breadcrumbs hTopbarStart [items]="['Production', 'Dashboard']" [mono]="[false,false]"></h-breadcrumbs>
      <h-input hTopbarSearch style="width:100%" placeholder="Search lots, machines, SKUs… ⌘K">
        <svg slot="icon" lucideSearch [size]="14"></svg>
      </h-input>
    </h-topbar>

    <!-- SCROLLABLE CONTENT -->
    <div style="flex:1;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:20px">

      <!-- MAINTENANCE ALERT -->
      <h-alert
        tone="idle"
        title="Scheduled maintenance · Sun Apr 28, 02:00–04:00 UTC"
        description="Real‑time machine stream may be paused for ~10 minutes. Offline data will sync automatically on resume."
        [dismissible]="true"
      ></h-alert>

      <!-- KPI ROW -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
        <h-kpi label="Active lots"       value="31"    delta="+4"     trend="up"></h-kpi>
        <h-kpi label="OEE · today"       value="78.4%" delta="+2.1pp" trend="up"   [sparkValues]="oeeSpark"></h-kpi>
        <h-kpi label="Reject rate"       value="1.8%"  delta="-0.4pp" trend="down" [invertTrend]="true" [sparkValues]="rejectSpark"></h-kpi>
        <h-kpi label="On‑time delivery"  value="94.2%" delta="-1.1pp" trend="down" [invertTrend]="true"></h-kpi>
      </div>

      <!-- CHARTS ROW -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">

        <!-- BAR CHART -->
        <h-card>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground)">Throughput · m/h</div>
          <h-bar-mini [values]="throughputSpark" [height]="70"></h-bar-mini>
          <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:11px;color:var(--h-muted-foreground)">
            <span>Mon</span><span>Sun</span>
          </div>
        </h-card>

        <!-- DONUT CHART -->
        <h-card>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground)">Machine status mix</div>
          <div style="display:flex;align-items:center;gap:16px;margin-top:12px">
            <h-donut [segments]="statusSegments" [size]="80" [strokeWidth]="12"></h-donut>
            <div style="display:flex;flex-direction:column;gap:6px">
              <h-chart-legend color="var(--h-status-running)"     label="Running" value="62%"></h-chart-legend>
              <h-chart-legend color="var(--h-status-idle)"        label="Idle"    value="22%"></h-chart-legend>
              <h-chart-legend color="var(--h-status-hold)"        label="Hold"    value="9%"></h-chart-legend>
              <h-chart-legend color="var(--h-status-maintenance)" label="Maint."  value="7%"></h-chart-legend>
            </div>
          </div>
        </h-card>

        <!-- SYNC STATUS -->
        <h-card>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground)">IoT sync status</div>
          <div style="display:flex;align-items:center;gap:14px;margin-top:14px">
            <h-ring-progress [value]="94" [size]="56" [strokeWidth]="4"></h-ring-progress>
            <div>
              <div style="font-size:22px;font-weight:600;font-family:var(--h-font-mono)">84</div>
              <div style="font-size:12px;color:var(--h-muted-foreground)">of 89 machines reporting</div>
            </div>
          </div>
          <div style="margin-top:14px">
            <h-alert tone="running" title="Stream nominal" description="Last heartbeat 2s ago. 5 machines offline for maintenance."></h-alert>
          </div>
        </h-card>
      </div>

      <!-- FILTER BAR + LOTS TABLE -->
      <h-card [padded]="false">

        <h-filter-bar>
          <div hFilterSearch style="flex:1 1 260px;max-width:340px">
            <h-input placeholder="Search lots, SKU, customer…">
              <svg slot="icon" lucideSearch [size]="14"></svg>
            </h-input>
          </div>
          <div hFilterActions style="display:inline-flex;gap:8px;align-items:center;flex-wrap:wrap">
            <h-button variant="outline">
              <svg lucideFilter [size]="13"></svg>
              Status: <strong style="margin-left:4px">2</strong>
            </h-button>
            <h-button variant="outline">
              <svg lucideCalendar [size]="13"></svg>
              Apr 1 – Apr 27
            </h-button>
            <div style="flex:1;min-width:4px"></div>
            <h-button variant="outline">
              <svg lucideDownload [size]="13"></svg>
              Export
            </h-button>
            <h-button>
              <svg lucidePlus [size]="13"></svg>
              New Lot
            </h-button>
          </div>
          <div hFilterChips style="display:flex;align-items:center;gap:6px">
            <span style="font-size:11px;color:var(--h-muted-foreground);font-weight:700;letter-spacing:0.18em;text-transform:uppercase;margin-right:4px">Active:</span>
            <h-filter-chip>Status: Running</h-filter-chip>
            <h-filter-chip>Customer: Inditex</h-filter-chip>
          </div>
        </h-filter-bar>

        <h-table>
          <thead>
            <tr>
              <th hTh>Lot</th>
              <th hTh>SKU</th>
              <th hTh>Customer</th>
              <th hTh align="right">Qty</th>
              <th hTh>Status</th>
              <th hTh>Progress</th>
              <th hTh>DPP</th>
              <th hTh>ETA</th>
              <th hTh></th>
            </tr>
          </thead>
          <tbody>
            <tr style="background:rgba(0,61,165,0.04)">
              <td hTd><span style="font-family:var(--h-font-mono);font-weight:500">LOT-2A-0094</span></td>
              <td hTd><span style="font-family:var(--h-font-mono);color:var(--h-muted-foreground)">LIN-180-NAT</span></td>
              <td hTd>Inditex</td>
              <td hTd align="right"><span style="font-family:var(--h-font-mono)">4,200 m</span></td>
              <td hTd><h-status-pill status="running">Running</h-status-pill></td>
              <td hTd><div style="width:96px"><h-progress [value]="62"></h-progress></div></td>
              <td hTd><h-badge tone="running" [dot]="true">DPP ready</h-badge></td>
              <td hTd style="color:var(--h-muted-foreground)">Apr 28</td>
              <td hTd>
                <h-icon-button variant="ghost" size="sm" aria-label="Actions">
                  <svg lucideMoreHorizontal [size]="14"></svg>
                </h-icon-button>
              </td>
            </tr>
            <tr>
              <td hTd><span style="font-family:var(--h-font-mono);font-weight:500">LOT-2A-0093</span></td>
              <td hTd><span style="font-family:var(--h-font-mono);color:var(--h-muted-foreground)">COT-220-OFF</span></td>
              <td hTd>Decathlon</td>
              <td hTd align="right"><span style="font-family:var(--h-font-mono)">1,800 m</span></td>
              <td hTd><h-status-pill status="hold">On hold</h-status-pill></td>
              <td hTd><div style="width:96px"><h-progress [value]="88"></h-progress></div></td>
              <td hTd><h-badge tone="idle" [dot]="true">DPP draft</h-badge></td>
              <td hTd style="color:var(--h-muted-foreground)">Apr 27</td>
              <td hTd>
                <h-icon-button variant="ghost" size="sm" aria-label="Actions">
                  <svg lucideMoreHorizontal [size]="14"></svg>
                </h-icon-button>
              </td>
            </tr>
            <tr>
              <td hTd><span style="font-family:var(--h-font-mono);font-weight:500">LOT-2A-0092</span></td>
              <td hTd><span style="font-family:var(--h-font-mono);color:var(--h-muted-foreground)">LIN-160-IND</span></td>
              <td hTd>Marques Almeida</td>
              <td hTd align="right"><span style="font-family:var(--h-font-mono)">2,400 m</span></td>
              <td hTd><h-status-pill status="idle">Idle</h-status-pill></td>
              <td hTd><div style="width:96px"><h-progress [value]="4"></h-progress></div></td>
              <td hTd><h-badge tone="idle" [dot]="true">DPP draft</h-badge></td>
              <td hTd style="color:var(--h-muted-foreground)">Apr 30</td>
              <td hTd>
                <h-icon-button variant="ghost" size="sm" aria-label="Actions">
                  <svg lucideMoreHorizontal [size]="14"></svg>
                </h-icon-button>
              </td>
            </tr>
            <tr>
              <td hTd><span style="font-family:var(--h-font-mono);font-weight:500">LOT-2A-0091</span></td>
              <td hTd><span style="font-family:var(--h-font-mono);color:var(--h-muted-foreground)">WOL-340-CHA</span></td>
              <td hTd>Salsa Jeans</td>
              <td hTd align="right"><span style="font-family:var(--h-font-mono)">780 m</span></td>
              <td hTd><h-status-pill status="running">Running</h-status-pill></td>
              <td hTd><div style="width:96px"><h-progress [value]="41"></h-progress></div></td>
              <td hTd><h-badge tone="running" [dot]="true">DPP ready</h-badge></td>
              <td hTd style="color:var(--h-muted-foreground)">Apr 29</td>
              <td hTd>
                <h-icon-button variant="ghost" size="sm" aria-label="Actions">
                  <svg lucideMoreHorizontal [size]="14"></svg>
                </h-icon-button>
              </td>
            </tr>
          </tbody>
        </h-table>

        <div style="padding:12px 16px;border-top:1px solid var(--h-border);display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:13px;color:var(--h-muted-foreground)">Showing <strong style="color:var(--h-foreground);font-family:var(--h-font-mono)">1–4</strong> of <strong style="color:var(--h-foreground);font-family:var(--h-font-mono)">31</strong> active lots</span>
          <h-pagination [totalPages]="8" [currentPage]="1" [siblingCount]="1"></h-pagination>
        </div>

      </h-card>

      <!-- MACHINE TILES -->
      <div>
        <div style="font-size:15px;font-weight:600;margin-bottom:12px">Active machines</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
          <h-machine-tile
            machineId="L7-KNIT-03"
            machineName="Loom 7 · Tear A"
            status="running"
            [oee]="94"
            [metrics]="machineLoom"
          ></h-machine-tile>
          <h-machine-tile
            machineId="DB-02"
            machineName="Dye Bath 02"
            status="idle"
            [oee]="0"
            [metrics]="machineDye"
          ></h-machine-tile>
          <h-machine-tile
            machineId="L4-KNIT-01"
            machineName="Loom 4 · Tear B"
            status="error"
            [oee]="0"
            alertMessage="Warp break detected at 14:02. Maintenance notified."
            [metrics]="machineErr"
          ></h-machine-tile>
        </div>
      </div>

      <!-- DETAIL + TIMELINE -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">

        <!-- LOT DETAIL CARD -->
        <h-card>
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px">
            <div>
              <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-primary);margin-bottom:4px">Active lot</div>
              <div style="font-size:20px;font-weight:600;font-family:var(--h-font-mono)">LOT-2A-0094</div>
            </div>
            <div style="display:flex;gap:6px;align-items:center">
              <h-status-pill status="running">Running</h-status-pill>
              <h-badge tone="primary" [dot]="true">DPP draft</h-badge>
            </div>
          </div>

          <h-def-list>
            <h-def-row term="SKU"><span style="font-family:var(--h-font-mono)">LIN-180-NAT</span></h-def-row>
            <h-def-row term="Customer">Inditex · Order #443120</h-def-row>
            <h-def-row term="Quantity"><span style="font-family:var(--h-font-mono)">4,200 m</span></h-def-row>
            <h-def-row term="Stage">Knit · Loom 7</h-def-row>
            <h-def-row term="ETA">Apr 28 · 14:00</h-def-row>
            <h-def-row term="Assigned">
              <h-user-chip name="Marta Silva" role="Ops"></h-user-chip>
            </h-def-row>
            <h-def-row term="Team">
              <h-avatar-stack [names]="teamNames" [max]="4" [size]="26"></h-avatar-stack>
            </h-def-row>
          </h-def-list>

          <div style="margin-top:16px">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground);margin-bottom:8px">Progress</div>
            <h-progress [value]="62" [showValue]="true"></h-progress>
          </div>

          <div style="margin-top:16px;display:flex;gap:8px">
            <h-button variant="outline" size="sm">Edit</h-button>
            <h-button size="sm">Open detail</h-button>
          </div>
        </h-card>

        <!-- TIMELINE CARD -->
        <h-card>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground);margin-bottom:14px">Lot activity · LOT-2A-0094</div>
          <h-timeline [events]="timelineEvents"></h-timeline>
        </h-card>

      </div>

      <!-- DPP + SKELETON ROW -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">

        <!-- DPP LOCKUP -->
        <h-card>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
            <h-icon-tile tone="primary" [size]="36">
              <svg lucideShieldCheck [size]="18"></svg>
            </h-icon-tile>
            <div>
              <div style="font-size:15px;font-weight:600">Digital Product Passport</div>
              <div style="font-size:12px;color:var(--h-muted-foreground)">EU DPP · Textile Regulation 2025</div>
            </div>
          </div>
          <h-dpp-lockup tier="gold" lotCode="LOT-2A-0094" [compact]="false"></h-dpp-lockup>
        </h-card>

        <!-- SKELETON LOADING CARD -->
        <h-card>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground);margin-bottom:14px">Supplier reports · loading</div>
          <div style="display:flex;flex-direction:column;gap:10px">
            <h-skeleton [width]="'45%'" [height]="16" [radius]="4"></h-skeleton>
            <h-skeleton [width]="'80%'" [height]="12" [radius]="4"></h-skeleton>
            <h-skeleton [width]="'65%'" [height]="12" [radius]="4"></h-skeleton>
            <div style="display:flex;gap:12px;margin-top:8px">
              <h-skeleton [width]="56" [height]="56" [radius]="12"></h-skeleton>
              <div style="flex:1;display:flex;flex-direction:column;gap:8px">
                <h-skeleton [width]="'60%'" [height]="14" [radius]="4"></h-skeleton>
                <h-skeleton [width]="'40%'" [height]="12" [radius]="4"></h-skeleton>
                <h-skeleton [width]="'75%'" [height]="12" [radius]="4"></h-skeleton>
              </div>
            </div>
          </div>
        </h-card>

      </div>

    </div><!-- /content -->
  </div><!-- /main -->
</div><!-- /shell -->
    `,
    moduleMetadata: { imports: allImports },
  }),
};
