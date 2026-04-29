import type { Meta, StoryObj } from '@storybook/angular';
import {
  LucideLayoutGrid, LucidePackage, LucideFactory, LucideCalendar,
  LucideShieldCheck, LucideFileText, LucideBox, LucideTruck,
  LucideGauge, LucideSettings, LucideSearch, LucideArrowLeft,
  LucidePencil, LucideShare, LucideDownload, LucideMoreHorizontal,
  LucideActivity, LucideCheck, LucideCircleAlert, LucideFlaskConical,
  LucideExternalLink, LucideClipboard, LucideClock, LucideZap,
} from '@lucide/angular';

import { HSidebarComponent, HSidebarGroupComponent, HSidebarItemComponent, HSidebarBrandDirective } from '../sidebar/sidebar.component';
import { HTopbarComponent } from '../topbar/topbar.component';
import { HBreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { HInputComponent } from '../input/input.component';
import { HButtonComponent } from '../button/button.component';
import { HIconButtonComponent } from '../icon-button/icon-button.component';
import { HAlertComponent } from '../alert/alert.component';
import { HCardComponent } from '../card/card.component';
import { HBadgeComponent } from '../badge/badge.component';
import { HStatusPillComponent } from '../status-pill/status-pill.component';
import { HProgressComponent } from '../progress/progress.component';
import { HKpiComponent } from '../kpi/kpi.component';
import { HTabsComponent, HTabLabelDirective, HTabPanelDirective } from '../tabs/tabs.component';
import { HDefListComponent, HDefRowComponent } from '../def-list/def-list.component';
import { HTableComponent, HThDirective, HTdDirective } from '../table/table.component';
import { HTimelineComponent } from '../timeline/timeline.component';
import { HStepperComponent } from '../stepper/stepper.component';
import { HDppLockupComponent } from '../dpp-lockup/dpp-lockup.component';
import { HUserChipComponent } from '../avatar/user-chip.component';
import { HAvatarStackComponent } from '../avatar/avatar-stack.component';
import { HIconTileComponent } from '../icon-tile/icon-tile.component';
import { HMachineTileComponent } from '../machine-tile/machine-tile.component';
import { HBarMiniComponent } from '../charts/bar-mini.component';
import { HSkeletonComponent } from '../skeleton/skeleton.component';

const meta: Meta = {
  title: 'Overview/Lot Detail',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { story: 'Lot detail (blueprint) view — full production record with stages, quality, and DPP.' } },
  },
};
export default meta;
type Story = StoryObj;

const stages = [
  { label: 'Order received',   description: 'Apr 26 · 14:30' },
  { label: 'Lot scheduled',    description: 'Apr 27 · 05:50' },
  { label: 'Knit · Loom 7',   description: 'Apr 27 · 06:14 → ongoing' },
  { label: 'Dye bath',         description: 'scheduled Apr 28' },
  { label: 'QC + DPP',         description: 'scheduled Apr 29' },
  { label: 'Dispatch',         description: 'ETA Apr 30' },
];

const throughputSpark = [820, 940, 1020, 980, 1180, 1240, 1140];
const oeeSpark        = [62, 64, 60, 66, 70, 74, 78];
const gsmSpark        = [178, 180, 182, 183, 180, 181, 182];

const timelineEvents = [
  { actor: 'System',       action: 'Lot created automatically from order #443120',     timestamp: 'Apr 27 · 05:50', tone: 'primary' },
  { actor: 'Marta Silva',  action: 'started knit on Loom 7',                            timestamp: 'Apr 27 · 06:14', tone: 'running' },
  { actor: 'System',       action: 'DPP draft generated — 18 fields pre-filled',        timestamp: 'Apr 27 · 06:18', tone: 'primary' },
  { actor: 'João Pinto',   action: 'flagged GSM out of tolerance · 184 g/m²',           timestamp: 'Apr 27 · 09:42', tone: 'idle'    },
  { actor: 'João Pinto',   action: 'released hold after recalibration',                  timestamp: 'Apr 27 · 10:11', tone: 'running' },
  { actor: 'Marta Silva',  action: "note: 'switch to dye bath 2 at 13:00 tomorrow'",    timestamp: 'Apr 27 · 11:30', tone: 'neutral' },
];

const qcChecks = [
  { id: 'QC-001', check: 'GSM weight',          spec: '180 g/m²',  result: '182 g/m²',  status: 'pass',    inspector: 'João Pinto',  date: 'Apr 27 · 08:15' },
  { id: 'QC-002', check: 'Width tolerance',      spec: '150 ± 2 cm', result: '151.2 cm', status: 'pass',    inspector: 'João Pinto',  date: 'Apr 27 · 08:30' },
  { id: 'QC-003', check: 'GSM re-check',         spec: '180 g/m²',  result: '184 g/m²',  status: 'fail',    inspector: 'João Pinto',  date: 'Apr 27 · 09:42' },
  { id: 'QC-004', check: 'GSM post-calibration', spec: '180 g/m²',  result: '181 g/m²',  status: 'pass',    inspector: 'João Pinto',  date: 'Apr 27 · 10:05' },
  { id: 'QC-005', check: 'Colour match',         spec: 'RAL 9001',  result: 'RAL 9001',   status: 'pending', inspector: '—',           date: 'scheduled'      },
];

const machineLoom = [
  { label: 'm/h',  value: '312', unit: 'm/h', mono: true },
  { label: 'OEE',  value: '94',  unit: '%' },
  { label: 'ETA',  value: '02:14', unit: 'h' },
];

const allImports = [
  HSidebarComponent, HSidebarGroupComponent, HSidebarItemComponent, HSidebarBrandDirective,
  HTopbarComponent, HBreadcrumbsComponent, HInputComponent, HButtonComponent, HIconButtonComponent,
  HAlertComponent, HCardComponent, HBadgeComponent, HStatusPillComponent,
  HProgressComponent, HKpiComponent, HBarMiniComponent,
  HTabsComponent, HTabLabelDirective, HTabPanelDirective,
  HDefListComponent, HDefRowComponent,
  HTableComponent, HThDirective, HTdDirective,
  HTimelineComponent, HStepperComponent, HDppLockupComponent,
  HUserChipComponent, HAvatarStackComponent, HIconTileComponent,
  HMachineTileComponent, HSkeletonComponent,
  LucideLayoutGrid, LucidePackage, LucideFactory, LucideCalendar,
  LucideShieldCheck, LucideFileText, LucideBox, LucideTruck,
  LucideGauge, LucideSettings, LucideSearch, LucideArrowLeft,
  LucidePencil, LucideShare, LucideDownload, LucideMoreHorizontal,
  LucideActivity, LucideCheck, LucideCircleAlert, LucideFlaskConical,
  LucideExternalLink, LucideClipboard, LucideClock, LucideZap,
];

export const Default: Story = {
  render: () => ({
    props: {
      stages,
      throughputSpark, oeeSpark, gsmSpark,
      timelineEvents,
      qcChecks,
      machineLoom,
      teamNames: ['Marta Silva', 'João Pinto', 'Ana Costa'],
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
      <h-sidebar-item value="lots" label="Lots" badge="31" [active]="true">
        <svg lucidePackage [size]="15"></svg>
      </h-sidebar-item>
      <h-sidebar-item value="machines" label="Machines">
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
    <h-topbar userName="Marta Silva" userRole="Operations Lead" [notificationCount]="1">
      <h-breadcrumbs hTopbarStart [items]="['Production', 'Lots', 'LOT-2A-0094']" [mono]="[false, false, true]"></h-breadcrumbs>
      <h-input hTopbarSearch style="width:100%" placeholder="Search lots, machines, SKUs… ⌘K">
        <svg slot="icon" lucideSearch [size]="14"></svg>
      </h-input>
    </h-topbar>

    <!-- SCROLLABLE CONTENT -->
    <div style="flex:1;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:20px">

      <!-- PAGE HEADER -->
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px">
        <div style="display:flex;align-items:flex-start;gap:12px">
          <h-button variant="ghost" size="sm" style="margin-top:2px">
            <svg lucideArrowLeft [size]="14"></svg>
          </h-button>
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <h1 style="font-size:22px;font-weight:700;letter-spacing:-0.02em;margin:0;font-family:var(--h-font-mono)">LOT-2A-0094</h1>
              <h-status-pill status="running">Running</h-status-pill>
              <h-badge tone="primary" [dot]="true">DPP draft</h-badge>
            </div>
            <div style="font-size:13px;color:var(--h-muted-foreground);margin-top:4px">
              Inditex · Order #443120 · LIN-180-NAT · 4,200 m
            </div>
          </div>
        </div>
        <div style="display:inline-flex;gap:8px;flex-shrink:0">
          <h-button variant="outline" size="sm">
            <svg lucideShare [size]="13"></svg>
            Share
          </h-button>
          <h-button variant="outline" size="sm">
            <svg lucideDownload [size]="13"></svg>
            Export
          </h-button>
          <h-button size="sm">
            <svg lucidePencil [size]="13"></svg>
            Edit lot
          </h-button>
        </div>
      </div>

      <!-- STEPPER — production stages -->
      <h-card>
        <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground);margin-bottom:16px">Production stages</div>
        <h-stepper [steps]="stages" [activeIndex]="2" orientation="horizontal"></h-stepper>
      </h-card>

      <!-- KPI ROW -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">
        <h-kpi label="Progress"          value="62%"    delta="+8pp"  trend="up"></h-kpi>
        <h-kpi label="Throughput"        value="1,140 m/h" delta="+6%" trend="up" [sparkValues]="throughputSpark"></h-kpi>
        <h-kpi label="OEE · Loom 7"      value="94%"    delta="+2pp"  trend="up" [sparkValues]="oeeSpark"></h-kpi>
        <h-kpi label="Est. completion"   value="02:14 h" delta="on schedule" trend="up"></h-kpi>
      </div>

      <!-- TABS: Overview / Production / Quality / DPP -->
      <h-tabs>

        <!-- TAB LABELS -->
        <ng-template hTabLabel value="overview">Overview</ng-template>
        <ng-template hTabLabel value="production">
          <span style="display:inline-flex;align-items:center;gap:5px">
            <svg lucideActivity [size]="12"></svg>Production
          </span>
        </ng-template>
        <ng-template hTabLabel value="quality">
          <span style="display:inline-flex;align-items:center;gap:5px">
            <svg lucideFlaskConical [size]="12"></svg>Quality (5)
          </span>
        </ng-template>
        <ng-template hTabLabel value="dpp">
          <span style="display:inline-flex;align-items:center;gap:5px">
            <svg lucideShieldCheck [size]="12"></svg>DPP
          </span>
        </ng-template>

        <!-- ══════════ OVERVIEW ══════════ -->
        <ng-template hTabPanel value="overview">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">

            <!-- Lot details def-list -->
            <h-card>
              <div style="font-size:13px;font-weight:600;margin-bottom:14px">Lot information</div>
              <h-def-list>
                <h-def-row term="Lot code"><span style="font-family:var(--h-font-mono)">LOT-2A-0094</span></h-def-row>
                <h-def-row term="SKU"><span style="font-family:var(--h-font-mono)">LIN-180-NAT</span></h-def-row>
                <h-def-row term="Description">Natural linen · 180 g/m² · plain weave</h-def-row>
                <h-def-row term="Customer">Inditex · Order #443120</h-def-row>
                <h-def-row term="Quantity"><span style="font-family:var(--h-font-mono)">4,200 m</span></h-def-row>
                <h-def-row term="Current stage">Knit · Loom 7 · Tear A</h-def-row>
                <h-def-row term="ETA">Apr 28 · 14:00</h-def-row>
                <h-def-row term="Plant">Barcelos · HQ</h-def-row>
                <h-def-row term="Operations lead">
                  <h-user-chip name="Marta Silva" role="Ops"></h-user-chip>
                </h-def-row>
                <h-def-row term="Team">
                  <h-avatar-stack [names]="teamNames" [max]="3" [size]="26"></h-avatar-stack>
                </h-def-row>
              </h-def-list>

              <div style="margin-top:16px">
                <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground);margin-bottom:8px">Overall progress</div>
                <h-progress [value]="62" [showValue]="true"></h-progress>
              </div>
            </h-card>

            <!-- Timeline -->
            <h-card>
              <div style="font-size:13px;font-weight:600;margin-bottom:14px">Activity log</div>
              <h-timeline [events]="timelineEvents"></h-timeline>
            </h-card>

          </div>
        </ng-template>

        <!-- ══════════ PRODUCTION ══════════ -->
        <ng-template hTabPanel value="production">
          <div style="display:flex;flex-direction:column;gap:16px">

            <h-alert tone="running" title="Knit stage in progress" description="Loom 7 is running at 1,140 m/h · OEE 94% · estimated completion in 02:14 h."></h-alert>

            <!-- Current machine -->
            <div style="display:grid;grid-template-columns:1fr 2fr;gap:16px">
              <div>
                <div style="font-size:13px;font-weight:600;margin-bottom:12px">Active machine</div>
                <h-machine-tile
                  machineId="L7-KNIT-03"
                  machineName="Loom 7 · Tear A"
                  status="running"
                  [oee]="94"
                  [metrics]="machineLoom"
                ></h-machine-tile>
              </div>

              <!-- Throughput chart -->
              <h-card>
                <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground)">Throughput this lot · m/h</div>
                <h-bar-mini [values]="throughputSpark" [height]="80"></h-bar-mini>
                <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:11px;color:var(--h-muted-foreground)">
                  <span>Start</span><span>Now</span>
                </div>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px">
                  <div>
                    <div style="font-size:11px;color:var(--h-muted-foreground)">Peak m/h</div>
                    <div style="font-size:18px;font-weight:600;font-family:var(--h-font-mono)">1,240</div>
                  </div>
                  <div>
                    <div style="font-size:11px;color:var(--h-muted-foreground)">Avg m/h</div>
                    <div style="font-size:18px;font-weight:600;font-family:var(--h-font-mono)">1,046</div>
                  </div>
                  <div>
                    <div style="font-size:11px;color:var(--h-muted-foreground)">Produced</div>
                    <div style="font-size:18px;font-weight:600;font-family:var(--h-font-mono)">2,604 m</div>
                  </div>
                </div>
              </h-card>
            </div>

            <!-- Stage history table -->
            <h-card [padded]="false">
              <div style="padding:14px 16px 10px;border-bottom:1px solid var(--h-border)">
                <div style="font-size:13px;font-weight:600">Stage history</div>
              </div>
              <h-table>
                <thead>
                  <tr>
                    <th hTh>Stage</th>
                    <th hTh>Machine</th>
                    <th hTh>Operator</th>
                    <th hTh>Started</th>
                    <th hTh>Duration</th>
                    <th hTh>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td hTd style="font-weight:500">Order received</td>
                    <td hTd style="color:var(--h-muted-foreground)">—</td>
                    <td hTd style="color:var(--h-muted-foreground)">System</td>
                    <td hTd style="font-size:12px;color:var(--h-muted-foreground);font-family:var(--h-font-mono)">Apr 26 · 14:30</td>
                    <td hTd style="font-family:var(--h-font-mono);font-size:12px">—</td>
                    <td hTd><h-badge tone="running" [dot]="true">Done</h-badge></td>
                  </tr>
                  <tr>
                    <td hTd style="font-weight:500">Lot scheduled</td>
                    <td hTd style="color:var(--h-muted-foreground)">—</td>
                    <td hTd style="color:var(--h-muted-foreground)">System</td>
                    <td hTd style="font-size:12px;color:var(--h-muted-foreground);font-family:var(--h-font-mono)">Apr 27 · 05:50</td>
                    <td hTd style="font-family:var(--h-font-mono);font-size:12px">00:20</td>
                    <td hTd><h-badge tone="running" [dot]="true">Done</h-badge></td>
                  </tr>
                  <tr style="background:rgba(0,61,165,0.04)">
                    <td hTd style="font-weight:500">Knit · Loom 7</td>
                    <td hTd style="font-family:var(--h-font-mono);font-size:12px">L7-KNIT-03</td>
                    <td hTd>
                      <h-user-chip name="Marta Silva" role="Ops"></h-user-chip>
                    </td>
                    <td hTd style="font-size:12px;color:var(--h-muted-foreground);font-family:var(--h-font-mono)">Apr 27 · 06:14</td>
                    <td hTd style="font-family:var(--h-font-mono);font-size:12px">~02:14 rem.</td>
                    <td hTd><h-status-pill status="running">Running</h-status-pill></td>
                  </tr>
                  <tr>
                    <td hTd style="font-weight:500;color:var(--h-muted-foreground)">Dye bath</td>
                    <td hTd style="color:var(--h-muted-foreground)">DB-02</td>
                    <td hTd style="color:var(--h-muted-foreground)">—</td>
                    <td hTd style="font-size:12px;color:var(--h-muted-foreground)">scheduled</td>
                    <td hTd style="color:var(--h-muted-foreground)">—</td>
                    <td hTd><h-status-pill status="idle">Scheduled</h-status-pill></td>
                  </tr>
                  <tr>
                    <td hTd style="font-weight:500;color:var(--h-muted-foreground)">QC + DPP</td>
                    <td hTd style="color:var(--h-muted-foreground)">—</td>
                    <td hTd style="color:var(--h-muted-foreground)">—</td>
                    <td hTd style="font-size:12px;color:var(--h-muted-foreground)">scheduled</td>
                    <td hTd style="color:var(--h-muted-foreground)">—</td>
                    <td hTd><h-status-pill status="idle">Scheduled</h-status-pill></td>
                  </tr>
                </tbody>
              </h-table>
            </h-card>

          </div>
        </ng-template>

        <!-- ══════════ QUALITY ══════════ -->
        <ng-template hTabPanel value="quality">
          <div style="display:flex;flex-direction:column;gap:16px">

            <h-alert tone="idle" title="1 check failed and was resolved" description="GSM re-check at 09:42 failed (184 g/m²). Recalibration performed and lot released at 10:11."></h-alert>

            <h-card [padded]="false">
              <div style="padding:14px 16px 10px;border-bottom:1px solid var(--h-border);display:flex;align-items:center;justify-content:space-between">
                <div style="font-size:13px;font-weight:600">QC inspections</div>
                <h-button size="sm">
                  <svg lucideFlaskConical [size]="13"></svg>
                  Add check
                </h-button>
              </div>
              <h-table>
                <thead>
                  <tr>
                    <th hTh>ID</th>
                    <th hTh>Check</th>
                    <th hTh>Spec</th>
                    <th hTh>Result</th>
                    <th hTh>Inspector</th>
                    <th hTh>Date</th>
                    <th hTh>Status</th>
                  </tr>
                </thead>
                <tbody>
                  @for (check of qcChecks; track check.id) {
                    <tr [style.background]="check.status === 'fail' ? 'rgba(220,38,38,0.04)' : ''">
                      <td hTd><span style="font-family:var(--h-font-mono);font-size:12px;color:var(--h-muted-foreground)">{{check.id}}</span></td>
                      <td hTd style="font-weight:500">{{check.check}}</td>
                      <td hTd style="font-family:var(--h-font-mono);font-size:12px;color:var(--h-muted-foreground)">{{check.spec}}</td>
                      <td hTd style="font-family:var(--h-font-mono);font-size:12px">{{check.result}}</td>
                      <td hTd style="font-size:12px;color:var(--h-muted-foreground)">{{check.inspector}}</td>
                      <td hTd style="font-size:12px;color:var(--h-muted-foreground)">{{check.date}}</td>
                      <td hTd>
                        @if (check.status === 'pass') {
                          <h-badge tone="running" [dot]="true">Pass</h-badge>
                        }
                        @if (check.status === 'fail') {
                          <h-badge tone="maintenance" [dot]="true">Fail</h-badge>
                        }
                        @if (check.status === 'pending') {
                          <h-badge tone="idle" [dot]="true">Pending</h-badge>
                        }
                      </td>
                    </tr>
                  }
                </tbody>
              </h-table>
            </h-card>

          </div>
        </ng-template>

        <!-- ══════════ DPP ══════════ -->
        <ng-template hTabPanel value="dpp">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">

            <!-- DPP card -->
            <h-card>
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
                <h-icon-tile tone="primary" [size]="40">
                  <svg lucideShieldCheck [size]="20"></svg>
                </h-icon-tile>
                <div>
                  <div style="font-size:15px;font-weight:600">Digital Product Passport</div>
                  <div style="font-size:12px;color:var(--h-muted-foreground)">EU DPP · Textile Regulation 2025</div>
                </div>
              </div>
              <h-dpp-lockup tier="gold" lotCode="LOT-2A-0094" [compact]="false"></h-dpp-lockup>
              <div style="margin-top:16px;display:flex;gap:8px">
                <h-button size="sm">
                  <svg lucideExternalLink [size]="13"></svg>
                  View full DPP
                </h-button>
                <h-button variant="outline" size="sm">
                  <svg lucideDownload [size]="13"></svg>
                  Download PDF
                </h-button>
              </div>
            </h-card>

            <!-- DPP fields checklist -->
            <h-card>
              <div style="font-size:13px;font-weight:600;margin-bottom:14px">DPP completeness</div>
              <div style="display:flex;flex-direction:column;gap:8px">
                <div style="display:flex;align-items:center;justify-content:space-between">
                  <div style="font-size:12px;font-weight:500">Fields completed</div>
                  <div style="font-size:12px;font-family:var(--h-font-mono);color:var(--h-muted-foreground)">18 / 24</div>
                </div>
                <h-progress [value]="75" [showValue]="true"></h-progress>
              </div>

              <div style="margin-top:16px;display:flex;flex-direction:column;gap:7px">
                <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--h-muted-foreground);margin-bottom:8px">Field status</div>

                @for (item of [
                  {label:'Lot code', done: true},
                  {label:'Material composition', done: true},
                  {label:'Origin · fibre', done: true},
                  {label:'Origin · manufacturing', done: true},
                  {label:'Certifications (GOTS)', done: true},
                  {label:'Water usage', done: true},
                  {label:'Carbon footprint', done: false},
                  {label:'Chemical inventory', done: false},
                  {label:'Repair instructions', done: false},
                  {label:'End-of-life guidance', done: false}
                ]; track item.label) {
                  <div style="display:flex;align-items:center;gap:8px;font-size:12px" [style.color]="item.done ? 'var(--h-foreground)' : 'var(--h-muted-foreground)'">
                    <div [style.width]="'16px'" [style.height]="'16px'" [style.border-radius]="'9999px'"
                         [style.display]="'grid'" [style.place-items]="'center'" [style.flex-shrink]="'0'"
                         [style.background]="item.done ? 'var(--h-status-running)' : 'var(--h-muted)'"
                         [style.color]="item.done ? '#fff' : 'var(--h-muted-foreground)'">
                      @if (item.done) {
                        <svg lucideCheck [size]="10"></svg>
                      }
                    </div>
                    {{item.label}}
                  </div>
                }
              </div>
            </h-card>

          </div>
        </ng-template>

      </h-tabs>

    </div><!-- /content -->
  </div><!-- /main -->
</div><!-- /shell -->
    `,
    moduleMetadata: { imports: allImports },
  }),
};
