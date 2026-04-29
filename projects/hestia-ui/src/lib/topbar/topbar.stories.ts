import type { Meta, StoryObj } from '@storybook/angular';
import { LucideSearch } from '@lucide/angular';
import { HTopbarComponent } from './topbar.component';
import { HInputComponent } from '../input/input.component';
import { HBreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

const meta: Meta<HTopbarComponent> = {
  title: 'Navigation/TopBar',
  component: HTopbarComponent,
  tags: ['autodocs'],
  argTypes: {
    userName:          { control: 'text' },
    userRole:          { control: 'text' },
    notificationCount: { control: { type: 'range', min: 0, max: 20, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<HTopbarComponent>;

export const Default: Story = {
  args: { userName: 'Marta Silva', userRole: 'Operations Lead', notificationCount: 3 },
  render: (args) => ({
    props: args,
    template: `
      <h-topbar [userName]="userName" [userRole]="userRole" [notificationCount]="notificationCount">
        <h-breadcrumbs hTopbarStart [items]="['Lots', 'LOT-2A-0094']" [mono]="[false, true]"></h-breadcrumbs>
        <h-input hTopbarSearch style="width:100%"
          placeholder="Search lots, machines, SKUs… ⌘K">
          <svg lucideSearch [size]="14"></svg>
        </h-input>
      </h-topbar>
    `,
    moduleMetadata: { imports: [HTopbarComponent, HInputComponent, HBreadcrumbsComponent, LucideSearch] },
  }),
};

export const NoNotifications: Story = {
  args: { userName: 'João Pinto', userRole: 'QC Manager', notificationCount: 0 },
  render: (args) => ({
    props: args,
    template: `
      <h-topbar [userName]="userName" [userRole]="userRole" [notificationCount]="notificationCount">
        <h-breadcrumbs hTopbarStart [items]="['Machines']" [mono]="[false]"></h-breadcrumbs>
        <h-input hTopbarSearch style="width:100%" placeholder="Search…">
          <svg lucideSearch [size]="14"></svg>
        </h-input>
      </h-topbar>
    `,
    moduleMetadata: { imports: [HTopbarComponent, HInputComponent, HBreadcrumbsComponent, LucideSearch] },
  }),
};

export const WithAppLayout: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;height:300px;border:1px solid var(--h-border);border-radius:12px;overflow:hidden;">
        <h-topbar userName="Marta Silva" userRole="Operations Lead" [notificationCount]="3">
          <h-breadcrumbs hTopbarStart [items]="['Production', 'Lots']" [mono]="[false,false]"></h-breadcrumbs>
          <h-input hTopbarSearch style="width:100%" placeholder="Search…">
            <svg lucideSearch [size]="14"></svg>
          </h-input>
        </h-topbar>
        <div style="flex:1;padding:24px;background:var(--h-background);color:var(--h-muted-foreground);font-size:13px;">
          Page content area
        </div>
      </div>
    `,
    moduleMetadata: { imports: [HTopbarComponent, HInputComponent, HBreadcrumbsComponent, LucideSearch] },
  }),
};
