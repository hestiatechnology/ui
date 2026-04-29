import type { Meta, StoryObj } from '@storybook/angular';
import {
  LucideLayoutGrid, LucidePackage, LucideFactory, LucideCalendar,
  LucideShieldCheck, LucideFileText, LucideBox, LucideTruck,
  LucideGauge, LucideSettings, LucideSearch, LucideUser,
  LucideBell, LucideLock, LucideGlobe, LucideKeyRound,
  LucideMonitor, LucideSmartphone, LucideLogOut, LucideCheck,
  LucideCircleAlert, LucidePlug, LucideLink, LucidePencil, LucideTrash2,
  LucideMail, LucideRefreshCw,
} from '@lucide/angular';

import { HSidebarComponent, HSidebarGroupComponent, HSidebarItemComponent, HSidebarBrandDirective } from '../sidebar/sidebar.component';
import { HTopbarComponent } from '../topbar/topbar.component';
import { HBreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { HInputComponent } from '../input/input.component';
import { HButtonComponent } from '../button/button.component';
import { HIconButtonComponent } from '../icon-button/icon-button.component';
import { HAlertComponent } from '../alert/alert.component';
import { HCardComponent } from '../card/card.component';
import { HFieldComponent } from '../field/field.component';
import { HSelectComponent } from '../select/select.component';
import { HSwitchComponent } from '../switch/switch.component';
import { HCheckboxComponent } from '../checkbox/checkbox.component';
import { HBadgeComponent } from '../badge/badge.component';
import { HAvatarComponent } from '../avatar/avatar.component';
import { HTabsComponent, HTabLabelDirective, HTabPanelDirective } from '../tabs/tabs.component';
import { HDefListComponent, HDefRowComponent } from '../def-list/def-list.component';
import { HTableComponent, HThDirective, HTdDirective } from '../table/table.component';
import { HStatusPillComponent } from '../status-pill/status-pill.component';
import { HAccordionComponent, HAccordionItemDirective } from '../accordion/accordion.component';

const meta: Meta = {
  title: 'Overview/Settings',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { story: 'Settings page covering profile, notifications, security, and integrations.' } },
  },
};
export default meta;
type Story = StoryObj;

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
];

const TIMEZONES = [
  { value: 'utc',    label: 'UTC+00:00 · London' },
  { value: 'lisbon', label: 'UTC+01:00 · Lisbon (summer)' },
  { value: 'paris',  label: 'UTC+02:00 · Paris (summer)' },
  { value: 'ny',     label: 'UTC−05:00 · New York' },
];

const ROLES = [
  { value: 'ops',     label: 'Operations Lead' },
  { value: 'qc',      label: 'Quality Inspector' },
  { value: 'admin',   label: 'Plant Admin' },
  { value: 'viewer',  label: 'Viewer' },
];

const allImports = [
  HSidebarComponent, HSidebarGroupComponent, HSidebarItemComponent, HSidebarBrandDirective,
  HTopbarComponent, HBreadcrumbsComponent, HInputComponent, HButtonComponent, HIconButtonComponent,
  HAlertComponent, HCardComponent, HFieldComponent, HSelectComponent, HSwitchComponent,
  HCheckboxComponent, HBadgeComponent, HAvatarComponent,
  HTabsComponent, HTabLabelDirective, HTabPanelDirective,
  HDefListComponent, HDefRowComponent,
  HTableComponent, HThDirective, HTdDirective,
  HStatusPillComponent, HAccordionComponent, HAccordionItemDirective,
  LucideLayoutGrid, LucidePackage, LucideFactory, LucideCalendar,
  LucideShieldCheck, LucideFileText, LucideBox, LucideTruck,
  LucideGauge, LucideSettings, LucideSearch, LucideUser,
  LucideBell, LucideLock, LucideGlobe, LucideKeyRound,
  LucideMonitor, LucideSmartphone, LucideLogOut, LucideCheck,
  LucideCircleAlert, LucidePlug, LucideLink, LucidePencil, LucideTrash2,
  LucideMail, LucideRefreshCw,
];

export const Default: Story = {
  render: () => ({
    props: { languages: LANGUAGES, timezones: TIMEZONES, roles: ROLES },
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
      <h-sidebar-item value="settings" label="Settings" [active]="true">
        <svg lucideSettings [size]="15"></svg>
      </h-sidebar-item>
    </h-sidebar-group>
  </h-sidebar>

  <!-- ═══════════════════ MAIN ═══════════════════ -->
  <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0">

    <!-- TOP BAR -->
    <h-topbar userName="Marta Silva" userRole="Operations Lead" [notificationCount]="3">
      <h-breadcrumbs hTopbarStart [items]="['Settings']" [mono]="[false]"></h-breadcrumbs>
      <h-input hTopbarSearch style="width:100%" placeholder="Search settings…">
        <svg slot="icon" lucideSearch [size]="14"></svg>
      </h-input>
    </h-topbar>

    <!-- SCROLLABLE CONTENT -->
    <div style="flex:1;overflow-y:auto;padding:24px">

      <!-- PAGE HEADER -->
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px">
        <div>
          <h1 style="font-size:20px;font-weight:700;letter-spacing:-0.02em;margin:0 0 4px">Settings</h1>
          <p style="font-size:13px;color:var(--h-muted-foreground);margin:0">Manage your account, preferences, and integrations.</p>
        </div>
        <h-button>
          <svg lucideCheck [size]="13"></svg>
          Save changes
        </h-button>
      </div>

      <!-- TABS -->
      <h-tabs>

        <!-- ── TAB LABELS ── -->
        <ng-template hTabLabel value="profile">
          <span style="display:inline-flex;align-items:center;gap:6px">
            <svg lucideUser [size]="13"></svg>Profile
          </span>
        </ng-template>
        <ng-template hTabLabel value="notifications">
          <span style="display:inline-flex;align-items:center;gap:6px">
            <svg lucideBell [size]="13"></svg>Notifications
          </span>
        </ng-template>
        <ng-template hTabLabel value="security">
          <span style="display:inline-flex;align-items:center;gap:6px">
            <svg lucideLock [size]="13"></svg>Security
          </span>
        </ng-template>
        <ng-template hTabLabel value="integrations">
          <span style="display:inline-flex;align-items:center;gap:6px">
            <svg lucidePlug [size]="13"></svg>Integrations
          </span>
        </ng-template>

        <!-- ══════════════════════════════════════
             PROFILE TAB
        ══════════════════════════════════════ -->
        <ng-template hTabPanel value="profile">
          <div style="display:flex;flex-direction:column;gap:20px;max-width:720px;padding-top:4px">

            <!-- Avatar + identity -->
            <h-card>
              <div style="font-size:13px;font-weight:600;margin-bottom:16px">Personal information</div>
              <div style="display:flex;align-items:flex-start;gap:20px">
                <div style="position:relative;flex-shrink:0">
                  <h-avatar name="Marta Silva" [size]="72" tone="primary"></h-avatar>
                  <button style="position:absolute;bottom:-4px;right:-4px;width:26px;height:26px;border-radius:9999px;background:var(--h-card);border:2px solid var(--h-border);display:grid;place-items:center;cursor:pointer">
                    <svg lucidePencil [size]="11" style="color:var(--h-foreground)"></svg>
                  </button>
                </div>
                <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:14px">
                  <h-field label="First name" [required]="true">
                    <h-input placeholder="First name" [value]="'Marta'"></h-input>
                  </h-field>
                  <h-field label="Last name" [required]="true">
                    <h-input placeholder="Last name" [value]="'Silva'"></h-input>
                  </h-field>
                  <h-field label="Email address" hint="Receives account notifications.">
                    <h-input type="email" placeholder="you@example.com" [value]="'marta.silva@hestia.pt'">
                      <svg slot="icon" lucideMail [size]="14"></svg>
                    </h-input>
                  </h-field>
                  <h-field label="Role">
                    <h-select [options]="roles" placeholder="Select role…" [value]="'ops'"></h-select>
                  </h-field>
                </div>
              </div>
            </h-card>

            <!-- Preferences -->
            <h-card>
              <div style="font-size:13px;font-weight:600;margin-bottom:16px">Preferences</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
                <h-field label="Language">
                  <h-select [options]="languages" placeholder="Select language…" [value]="'pt'">
                    <svg slot="icon" lucideGlobe [size]="14"></svg>
                  </h-select>
                </h-field>
                <h-field label="Timezone">
                  <h-select [options]="timezones" placeholder="Select timezone…" [value]="'lisbon'" [searchable]="true"></h-select>
                </h-field>
              </div>

              <div style="margin-top:16px;display:flex;flex-direction:column;gap:12px">
                <h-switch label="Compact sidebar" description="Reduce sidebar width to icon-only mode." [checked]="false"></h-switch>
                <h-switch label="24-hour clock" description="Use 24-hour time format throughout the app." [checked]="true"></h-switch>
                <h-switch label="Metric units" description="Display weight, length, and area in metric units." [checked]="true"></h-switch>
              </div>
            </h-card>

          </div>
        </ng-template>

        <!-- ══════════════════════════════════════
             NOTIFICATIONS TAB
        ══════════════════════════════════════ -->
        <ng-template hTabPanel value="notifications">
          <div style="display:flex;flex-direction:column;gap:20px;max-width:720px;padding-top:4px">

            <h-alert
              tone="primary"
              title="Email notifications are sent to marta.silva@hestia.pt"
              description="Update your email address in the Profile tab to change the notification destination."
            ></h-alert>

            <!-- Production events -->
            <h-card>
              <div style="font-size:13px;font-weight:600;margin-bottom:4px">Production events</div>
              <div style="font-size:12px;color:var(--h-muted-foreground);margin-bottom:16px">Alerts related to lot creation, stage transitions, and machine status.</div>
              <div style="display:flex;flex-direction:column;gap:14px">
                <h-switch label="Lot created" description="When a new production lot is added to the scheduler." [checked]="true"></h-switch>
                <h-switch label="Stage transition" description="When a lot moves from one production stage to the next." [checked]="true"></h-switch>
                <h-switch label="Lot completed" description="When all stages are finished and the lot is dispatched." [checked]="true"></h-switch>
                <h-switch label="Lot held" description="When a lot is placed on hold by a quality check or operator." [checked]="false"></h-switch>
              </div>
            </h-card>

            <!-- Machine alerts -->
            <h-card>
              <div style="font-size:13px;font-weight:600;margin-bottom:4px">Machine alerts</div>
              <div style="font-size:12px;color:var(--h-muted-foreground);margin-bottom:16px">Notifications when machines change status or require attention.</div>
              <div style="display:flex;flex-direction:column;gap:14px">
                <h-switch label="Machine error" description="Receive an alert as soon as an error is detected on any machine." [checked]="true"></h-switch>
                <h-switch label="Machine idle &gt; 30 min" description="Notify when a machine has been idle for longer than 30 minutes." [checked]="false"></h-switch>
                <h-switch label="Scheduled maintenance" description="24-hour reminder before a planned maintenance window." [checked]="true"></h-switch>
              </div>
            </h-card>

            <!-- Quality & DPP -->
            <h-card>
              <div style="font-size:13px;font-weight:600;margin-bottom:4px">Quality &amp; DPP</div>
              <div style="font-size:12px;color:var(--h-muted-foreground);margin-bottom:16px">Alerts from the QC workflow and Digital Product Passport generation.</div>
              <div style="display:flex;flex-direction:column;gap:14px">
                <h-switch label="QC inspection required" description="When a lot enters QC and needs operator sign-off." [checked]="true"></h-switch>
                <h-switch label="QC inspection failed" description="When a QC check is rejected and the lot is placed on hold." [checked]="true"></h-switch>
                <h-switch label="DPP generated" description="When a Digital Product Passport is ready for review." [checked]="false"></h-switch>
                <h-switch label="DPP expiring" description="30-day reminder before a certification in the DPP expires." [checked]="true"></h-switch>
              </div>
            </h-card>

            <!-- Delivery channels -->
            <h-card>
              <div style="font-size:13px;font-weight:600;margin-bottom:4px">Delivery channels</div>
              <div style="font-size:12px;color:var(--h-muted-foreground);margin-bottom:16px">Choose how you receive notifications.</div>
              <div style="display:flex;flex-direction:column;gap:14px">
                <h-switch label="Email" [checked]="true"></h-switch>
                <h-switch label="In-app notifications" [checked]="true"></h-switch>
                <h-switch label="SMS" description="Standard rates apply. Configure phone number below." [checked]="false"></h-switch>
              </div>
            </h-card>

          </div>
        </ng-template>

        <!-- ══════════════════════════════════════
             SECURITY TAB
        ══════════════════════════════════════ -->
        <ng-template hTabPanel value="security">
          <div style="display:flex;flex-direction:column;gap:20px;max-width:720px;padding-top:4px">

            <!-- Change password -->
            <h-card>
              <div style="font-size:13px;font-weight:600;margin-bottom:16px">Change password</div>
              <div style="display:flex;flex-direction:column;gap:14px;max-width:400px">
                <h-field label="Current password">
                  <h-input type="password" placeholder="Enter current password">
                    <svg slot="icon" lucideLock [size]="14"></svg>
                  </h-input>
                </h-field>
                <h-field label="New password" hint="Minimum 12 characters with at least one number and symbol.">
                  <h-input type="password" placeholder="Enter new password"></h-input>
                </h-field>
                <h-field label="Confirm new password">
                  <h-input type="password" placeholder="Repeat new password"></h-input>
                </h-field>
              </div>
              <div style="margin-top:16px">
                <h-button>Update password</h-button>
              </div>
            </h-card>

            <!-- Two-factor authentication -->
            <h-card>
              <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px">
                <div>
                  <div style="font-size:13px;font-weight:600">Two-factor authentication</div>
                  <div style="font-size:12px;color:var(--h-muted-foreground);margin-top:3px">Add an extra layer of security to your account.</div>
                </div>
                <h-badge tone="running" [dot]="true">Enabled</h-badge>
              </div>
              <div style="display:flex;flex-direction:column;gap:10px">
                <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border:1px solid var(--h-border);border-radius:8px">
                  <div style="display:flex;align-items:center;gap:10px">
                    <svg lucideSmartphone [size]="16" style="color:var(--h-primary)"></svg>
                    <div>
                      <div style="font-size:13px;font-weight:500">Authenticator app</div>
                      <div style="font-size:11px;color:var(--h-muted-foreground)">Google Authenticator · Configured Apr 3, 2025</div>
                    </div>
                  </div>
                  <h-badge tone="running">Active</h-badge>
                </div>
                <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border:1px solid var(--h-border);border-radius:8px">
                  <div style="display:flex;align-items:center;gap:10px">
                    <svg lucideMail [size]="16" style="color:var(--h-muted-foreground)"></svg>
                    <div>
                      <div style="font-size:13px;font-weight:500;color:var(--h-muted-foreground)">Email backup code</div>
                      <div style="font-size:11px;color:var(--h-muted-foreground)">Not configured</div>
                    </div>
                  </div>
                  <h-button variant="outline" size="sm">Configure</h-button>
                </div>
              </div>
            </h-card>

            <!-- Active sessions -->
            <h-card [padded]="false">
              <div style="padding:16px 16px 12px;border-bottom:1px solid var(--h-border)">
                <div style="font-size:13px;font-weight:600">Active sessions</div>
                <div style="font-size:12px;color:var(--h-muted-foreground);margin-top:3px">Devices currently signed in to your account.</div>
              </div>
              <h-table>
                <thead>
                  <tr>
                    <th hTh>Device</th>
                    <th hTh>Location</th>
                    <th hTh>Last active</th>
                    <th hTh>Status</th>
                    <th hTh></th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="background:rgba(0,61,165,0.03)">
                    <td hTd>
                      <div style="display:flex;align-items:center;gap:8px">
                        <svg lucideMonitor [size]="14" style="color:var(--h-primary)"></svg>
                        <div>
                          <div style="font-size:13px;font-weight:500">Chrome · macOS</div>
                          <div style="font-size:11px;color:var(--h-muted-foreground);font-family:var(--h-font-mono)">This device</div>
                        </div>
                      </div>
                    </td>
                    <td hTd style="color:var(--h-muted-foreground);font-size:12px">Braga, PT</td>
                    <td hTd style="color:var(--h-muted-foreground);font-size:12px">Now</td>
                    <td hTd><h-status-pill status="running">Current</h-status-pill></td>
                    <td hTd></td>
                  </tr>
                  <tr>
                    <td hTd>
                      <div style="display:flex;align-items:center;gap:8px">
                        <svg lucideSmartphone [size]="14" style="color:var(--h-muted-foreground)"></svg>
                        <div>
                          <div style="font-size:13px;font-weight:500">Safari · iPhone</div>
                          <div style="font-size:11px;color:var(--h-muted-foreground);font-family:var(--h-font-mono)">iOS 17.4</div>
                        </div>
                      </div>
                    </td>
                    <td hTd style="color:var(--h-muted-foreground);font-size:12px">Porto, PT</td>
                    <td hTd style="color:var(--h-muted-foreground);font-size:12px">3h ago</td>
                    <td hTd><h-status-pill status="idle">Active</h-status-pill></td>
                    <td hTd>
                      <h-icon-button variant="ghost" size="sm" aria-label="Revoke session">
                        <svg lucideLogOut [size]="14"></svg>
                      </h-icon-button>
                    </td>
                  </tr>
                  <tr>
                    <td hTd>
                      <div style="display:flex;align-items:center;gap:8px">
                        <svg lucideMonitor [size]="14" style="color:var(--h-muted-foreground)"></svg>
                        <div>
                          <div style="font-size:13px;font-weight:500">Firefox · Windows</div>
                          <div style="font-size:11px;color:var(--h-muted-foreground);font-family:var(--h-font-mono)">Windows 11</div>
                        </div>
                      </div>
                    </td>
                    <td hTd style="color:var(--h-muted-foreground);font-size:12px">Guimarães, PT</td>
                    <td hTd style="color:var(--h-muted-foreground);font-size:12px">2 days ago</td>
                    <td hTd><h-status-pill status="idle">Active</h-status-pill></td>
                    <td hTd>
                      <h-icon-button variant="ghost" size="sm" aria-label="Revoke session">
                        <svg lucideLogOut [size]="14"></svg>
                      </h-icon-button>
                    </td>
                  </tr>
                </tbody>
              </h-table>
              <div style="padding:12px 16px">
                <h-button variant="destructive" size="sm">
                  <svg lucideLogOut [size]="13"></svg>
                  Sign out all other sessions
                </h-button>
              </div>
            </h-card>

          </div>
        </ng-template>

        <!-- ══════════════════════════════════════
             INTEGRATIONS TAB
        ══════════════════════════════════════ -->
        <ng-template hTabPanel value="integrations">
          <div style="display:flex;flex-direction:column;gap:20px;max-width:720px;padding-top:4px">

            <h-alert
              tone="primary"
              title="API keys are plant-scoped"
              description="Keys generated here have access only to the Barcelos · HQ plant. Contact your admin to create organisation-level keys."
            ></h-alert>

            <!-- API Keys -->
            <h-card [padded]="false">
              <div style="padding:16px 16px 12px;border-bottom:1px solid var(--h-border);display:flex;align-items:center;justify-content:space-between">
                <div>
                  <div style="font-size:13px;font-weight:600">API keys</div>
                  <div style="font-size:12px;color:var(--h-muted-foreground);margin-top:3px">Use these tokens to authenticate calls to the Hestia REST API.</div>
                </div>
                <h-button size="sm">
                  <svg lucideKeyRound [size]="13"></svg>
                  New key
                </h-button>
              </div>
              <h-table>
                <thead>
                  <tr>
                    <th hTh>Name</th>
                    <th hTh>Key</th>
                    <th hTh>Created</th>
                    <th hTh>Last used</th>
                    <th hTh></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td hTd style="font-weight:500">Production read</td>
                    <td hTd><span style="font-family:var(--h-font-mono);font-size:12px;color:var(--h-muted-foreground)">hst_prod_••••••••••4f2a</span></td>
                    <td hTd style="color:var(--h-muted-foreground);font-size:12px">Mar 12, 2025</td>
                    <td hTd style="color:var(--h-muted-foreground);font-size:12px">2h ago</td>
                    <td hTd>
                      <h-icon-button variant="ghost" size="sm" aria-label="Delete key">
                        <svg lucideTrash2 [size]="14" style="color:var(--h-destructive)"></svg>
                      </h-icon-button>
                    </td>
                  </tr>
                  <tr>
                    <td hTd style="font-weight:500">ERP export</td>
                    <td hTd><span style="font-family:var(--h-font-mono);font-size:12px;color:var(--h-muted-foreground)">hst_prod_••••••••••9c1b</span></td>
                    <td hTd style="color:var(--h-muted-foreground);font-size:12px">Jan 5, 2025</td>
                    <td hTd style="color:var(--h-muted-foreground);font-size:12px">14 days ago</td>
                    <td hTd>
                      <h-icon-button variant="ghost" size="sm" aria-label="Delete key">
                        <svg lucideTrash2 [size]="14" style="color:var(--h-destructive)"></svg>
                      </h-icon-button>
                    </td>
                  </tr>
                </tbody>
              </h-table>
            </h-card>

            <!-- Webhooks -->
            <h-card>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
                <div>
                  <div style="font-size:13px;font-weight:600">Webhooks</div>
                  <div style="font-size:12px;color:var(--h-muted-foreground);margin-top:3px">Send event payloads to external endpoints.</div>
                </div>
                <h-button size="sm" variant="outline">
                  <svg lucideLink [size]="13"></svg>
                  Add endpoint
                </h-button>
              </div>
              <div style="display:flex;flex-direction:column;gap:10px">
                <div style="padding:12px 14px;border:1px solid var(--h-border);border-radius:8px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px">
                  <div style="min-width:0">
                    <div style="font-size:13px;font-weight:500;font-family:var(--h-font-mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">https://erp.inditex.com/webhooks/hestia</div>
                    <div style="font-size:11px;color:var(--h-muted-foreground);margin-top:3px">lot.created, lot.completed, dpp.generated · Added Feb 20</div>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
                    <h-badge tone="running" [dot]="true">Active</h-badge>
                    <h-icon-button variant="ghost" size="sm" aria-label="Delete webhook">
                      <svg lucideTrash2 [size]="14" style="color:var(--h-destructive)"></svg>
                    </h-icon-button>
                  </div>
                </div>
                <div style="padding:12px 14px;border:1px solid var(--h-border);border-radius:8px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px">
                  <div style="min-width:0">
                    <div style="font-size:13px;font-weight:500;font-family:var(--h-font-mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">https://hooks.slack.com/services/T04X/B06Y/abc…</div>
                    <div style="font-size:11px;color:var(--h-muted-foreground);margin-top:3px">machine.error, qc.failed · Added Jan 11</div>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
                    <h-badge tone="idle" [dot]="true">Paused</h-badge>
                    <h-icon-button variant="ghost" size="sm" aria-label="Delete webhook">
                      <svg lucideTrash2 [size]="14" style="color:var(--h-destructive)"></svg>
                    </h-icon-button>
                  </div>
                </div>
              </div>
            </h-card>

            <!-- Connected apps -->
            <h-card>
              <div style="font-size:13px;font-weight:600;margin-bottom:16px">Connected apps</div>
              <div style="display:flex;flex-direction:column;gap:10px">
                <div style="padding:12px 14px;border:1px solid var(--h-border);border-radius:8px;display:flex;align-items:center;justify-content:space-between;gap:12px">
                  <div style="display:flex;align-items:center;gap:12px">
                    <div style="width:36px;height:36px;border-radius:8px;background:#4A90D9;display:grid;place-items:center;color:#fff;font-weight:700;font-size:14px;flex-shrink:0">S</div>
                    <div>
                      <div style="font-size:13px;font-weight:500">SAP S/4HANA</div>
                      <div style="font-size:11px;color:var(--h-muted-foreground)">Syncing materials master data · Last sync 8 min ago</div>
                    </div>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px">
                    <h-badge tone="running" [dot]="true">Connected</h-badge>
                    <h-button variant="outline" size="sm">Disconnect</h-button>
                  </div>
                </div>
                <div style="padding:12px 14px;border:1px solid var(--h-border);border-radius:8px;display:flex;align-items:center;justify-content:space-between;gap:12px">
                  <div style="display:flex;align-items:center;gap:12px">
                    <div style="width:36px;height:36px;border-radius:8px;background:#2DA44E;display:grid;place-items:center;color:#fff;font-weight:700;font-size:14px;flex-shrink:0">G</div>
                    <div>
                      <div style="font-size:13px;font-weight:500">Google Workspace</div>
                      <div style="font-size:11px;color:var(--h-muted-foreground)">SSO + Calendar sync enabled</div>
                    </div>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px">
                    <h-badge tone="running" [dot]="true">Connected</h-badge>
                    <h-button variant="outline" size="sm">Disconnect</h-button>
                  </div>
                </div>
                <div style="padding:12px 14px;border:1px solid var(--h-border);border-radius:8px;display:flex;align-items:center;justify-content:space-between;gap:12px">
                  <div style="display:flex;align-items:center;gap:12px">
                    <div style="width:36px;height:36px;border-radius:8px;background:var(--h-muted);display:grid;place-items:center;color:var(--h-muted-foreground);font-size:14px;flex-shrink:0">
                      <svg lucidePlug [size]="16"></svg>
                    </div>
                    <div>
                      <div style="font-size:13px;font-weight:500;color:var(--h-muted-foreground)">Salesforce CRM</div>
                      <div style="font-size:11px;color:var(--h-muted-foreground)">Not connected</div>
                    </div>
                  </div>
                  <h-button size="sm">Connect</h-button>
                </div>
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
