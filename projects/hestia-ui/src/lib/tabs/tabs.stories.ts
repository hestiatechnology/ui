import type { Meta, StoryObj } from '@storybook/angular';
import { HTabsComponent, HTabLabelDirective, HTabPanelDirective } from './tabs.component';

const meta: Meta<HTabsComponent> = {
  title: 'Navigation/Tabs',
  component: HTabsComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<HTabsComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div style="width:480px;">
        <h-tabs>
          <ng-template hTabLabel value="overview">Overview</ng-template>
          <ng-template hTabLabel value="production">Production</ng-template>
          <ng-template hTabLabel value="quality">Quality</ng-template>

          <ng-template hTabPanel value="overview">
            <p style="color:var(--h-muted-foreground);font-size:13.5px;margin:0;">
              Overview content — summary metrics and KPIs for this lot.
            </p>
          </ng-template>
          <ng-template hTabPanel value="production">
            <p style="color:var(--h-muted-foreground);font-size:13.5px;margin:0;">
              Production records and machine usage data.
            </p>
          </ng-template>
          <ng-template hTabPanel value="quality">
            <p style="color:var(--h-muted-foreground);font-size:13.5px;margin:0;">
              Quality checks and inspection results.
            </p>
          </ng-template>
        </h-tabs>
      </div>
    `,
    moduleMetadata: { imports: [HTabsComponent, HTabLabelDirective, HTabPanelDirective] },
  }),
};

export const WithDisabledTab: Story = {
  render: () => ({
    template: `
      <div style="width:480px;">
        <h-tabs>
          <ng-template hTabLabel value="details">Details</ng-template>
          <ng-template hTabLabel value="history">History</ng-template>
          <ng-template hTabLabel value="reports" [disabled]="true">Reports</ng-template>

          <ng-template hTabPanel value="details">
            <p style="color:var(--h-muted-foreground);font-size:13.5px;margin:0;">Details content.</p>
          </ng-template>
          <ng-template hTabPanel value="history">
            <p style="color:var(--h-muted-foreground);font-size:13.5px;margin:0;">History content.</p>
          </ng-template>
          <ng-template hTabPanel value="reports">
            <p style="color:var(--h-muted-foreground);font-size:13.5px;margin:0;">Reports content.</p>
          </ng-template>
        </h-tabs>
      </div>
    `,
    moduleMetadata: { imports: [HTabsComponent, HTabLabelDirective, HTabPanelDirective] },
  }),
};

export const ManyTabs: Story = {
  render: () => ({
    template: `
      <div style="width:600px;">
        <h-tabs>
          <ng-template hTabLabel value="all">All</ng-template>
          <ng-template hTabLabel value="running">Running</ng-template>
          <ng-template hTabLabel value="idle">Idle</ng-template>
          <ng-template hTabLabel value="maintenance">Maintenance</ng-template>
          <ng-template hTabLabel value="error">Error</ng-template>

          <ng-template hTabPanel value="all"><p style="color:var(--h-muted-foreground);font-size:13.5px;margin:0;">All machines (24)</p></ng-template>
          <ng-template hTabPanel value="running"><p style="color:var(--h-muted-foreground);font-size:13.5px;margin:0;">Running machines (18)</p></ng-template>
          <ng-template hTabPanel value="idle"><p style="color:var(--h-muted-foreground);font-size:13.5px;margin:0;">Idle machines (3)</p></ng-template>
          <ng-template hTabPanel value="maintenance"><p style="color:var(--h-muted-foreground);font-size:13.5px;margin:0;">In maintenance (2)</p></ng-template>
          <ng-template hTabPanel value="error"><p style="color:var(--h-muted-foreground);font-size:13.5px;margin:0;">Errors (1)</p></ng-template>
        </h-tabs>
      </div>
    `,
    moduleMetadata: { imports: [HTabsComponent, HTabLabelDirective, HTabPanelDirective] },
  }),
};
