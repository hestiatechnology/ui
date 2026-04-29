import type { Meta, StoryObj } from '@storybook/angular';
import { LucideMoreHorizontal } from '@lucide/angular';
import {
  HTableComponent,
  HTableDirective,
  HTableWrapperDirective,
  HThDirective,
  HTdDirective,
} from './table.component';
import { HStatusPillComponent } from '../status-pill/status-pill.component';
import { HBadgeComponent } from '../badge/badge.component';
import { HProgressComponent } from '../progress/progress.component';
import { HIconButtonComponent } from '../icon-button/icon-button.component';

const meta: Meta<HTableComponent> = {
  title: 'Data/Table',
  component: HTableComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<HTableComponent>;

export const LotsTable: Story = {
  render: () => ({
    template: `
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
            <td hTd><div style="width:100px"><h-progress [value]="62"></h-progress></div></td>
            <td hTd><h-badge tone="running" [dot]="true">DPP ready</h-badge></td>
            <td hTd style="color:var(--h-muted-foreground)">Apr 28</td>
            <td hTd>
              <h-icon-button variant="ghost" size="sm" aria-label="Row actions">
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
            <td hTd><div style="width:100px"><h-progress [value]="88"></h-progress></div></td>
            <td hTd><h-badge tone="idle" [dot]="true">DPP draft</h-badge></td>
            <td hTd style="color:var(--h-muted-foreground)">Apr 27</td>
            <td hTd>
              <h-icon-button variant="ghost" size="sm" aria-label="Row actions">
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
            <td hTd><div style="width:100px"><h-progress [value]="4"></h-progress></div></td>
            <td hTd><h-badge tone="idle" [dot]="true">DPP draft</h-badge></td>
            <td hTd style="color:var(--h-muted-foreground)">Apr 30</td>
            <td hTd>
              <h-icon-button variant="ghost" size="sm" aria-label="Row actions">
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
            <td hTd><div style="width:100px"><h-progress [value]="41"></h-progress></div></td>
            <td hTd><h-badge tone="running" [dot]="true">DPP ready</h-badge></td>
            <td hTd style="color:var(--h-muted-foreground)">Apr 29</td>
            <td hTd>
              <h-icon-button variant="ghost" size="sm" aria-label="Row actions">
                <svg lucideMoreHorizontal [size]="14"></svg>
              </h-icon-button>
            </td>
          </tr>
        </tbody>
      </h-table>
    `,
    moduleMetadata: { imports: [HTableComponent, HThDirective, HTdDirective, HStatusPillComponent, HBadgeComponent, HProgressComponent, HIconButtonComponent, LucideMoreHorizontal] },
  }),
};

export const MachinesTable: Story = {
  render: () => ({
    template: `
      <h-table>
        <thead>
          <tr>
            <th hTh>Machine</th>
            <th hTh>Type</th>
            <th hTh>Lot</th>
            <th hTh>Status</th>
            <th hTh align="right">OEE</th>
            <th hTh align="right">Cycle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td hTd><span style="font-family:var(--h-font-mono)">L7-KNIT-03</span></td>
            <td hTd>Loom</td>
            <td hTd><span style="font-family:var(--h-font-mono);color:var(--h-primary)">LOT-2A-0094</span></td>
            <td hTd><h-status-pill status="running">Running</h-status-pill></td>
            <td hTd align="right"><span style="font-family:var(--h-font-mono)">94%</span></td>
            <td hTd align="right"><span style="font-family:var(--h-font-mono)">12.4s</span></td>
          </tr>
          <tr>
            <td hTd><span style="font-family:var(--h-font-mono)">DB-02</span></td>
            <td hTd>Dye bath</td>
            <td hTd><span style="font-family:var(--h-font-mono);color:var(--h-muted-foreground)">—</span></td>
            <td hTd><h-status-pill status="idle">Idle</h-status-pill></td>
            <td hTd align="right"><span style="font-family:var(--h-font-mono)">61%</span></td>
            <td hTd align="right"><span style="font-family:var(--h-font-mono)">—</span></td>
          </tr>
          <tr>
            <td hTd><span style="font-family:var(--h-font-mono)">CUT-11</span></td>
            <td hTd>Cut</td>
            <td hTd><span style="font-family:var(--h-font-mono);color:var(--h-muted-foreground)">—</span></td>
            <td hTd><h-status-pill status="maintenance">Maint.</h-status-pill></td>
            <td hTd align="right"><span style="font-family:var(--h-font-mono)">—</span></td>
            <td hTd align="right"><span style="font-family:var(--h-font-mono)">—</span></td>
          </tr>
        </tbody>
      </h-table>
    `,
    moduleMetadata: { imports: [HTableComponent, HThDirective, HTdDirective, HStatusPillComponent] },
  }),
};
