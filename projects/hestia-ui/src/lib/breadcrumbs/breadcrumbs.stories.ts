import type { Meta, StoryObj } from '@storybook/angular';
import { HBreadcrumbsComponent } from './breadcrumbs.component';

const meta: Meta<HBreadcrumbsComponent> = {
  title: 'Navigation/Breadcrumbs',
  component: HBreadcrumbsComponent,
  tags: ['autodocs'],
  argTypes: {
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<HBreadcrumbsComponent>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Production', href: '#' },
      { label: 'Lots', href: '#' },
      { label: 'LOT-2024-0042' },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Machines', href: '#' },
      { label: 'CK-01' },
    ],
  },
};

export const DeepNesting: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Plants', href: '#' },
      { label: 'Maia Factory', href: '#' },
      { label: 'Line A', href: '#' },
      { label: 'Machine CK-12' },
    ],
  },
};

export const WithoutLinks: Story = {
  args: {
    items: [
      { label: 'Production' },
      { label: 'Quality control' },
      { label: 'Inspection #1204' },
    ],
  },
};
