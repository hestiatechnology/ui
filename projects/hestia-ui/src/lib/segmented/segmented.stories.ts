import type { Meta, StoryObj } from '@storybook/angular';
import { HSegmentedComponent } from './segmented.component';

const meta: Meta<HSegmentedComponent> = {
  title: 'Form/Segmented',
  component: HSegmentedComponent,
  tags: ['autodocs'],
  argTypes: {
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<HSegmentedComponent>;

export const Default: Story = {
  args: {
    options: [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' },
    ],
    selectedValues: ['day'],
    ariaLabel: 'Time range',
  },
};

export const ThreeOptions: Story = {
  render: () => ({
    props: {
      options: [
        { value: 'list', label: 'List' },
        { value: 'grid', label: 'Grid' },
        { value: 'map', label: 'Map' },
      ],
      selected: ['list'],
    },
    template: `
      <h-segmented [options]="options" [(selectedValues)]="selected" ariaLabel="View mode"></h-segmented>
    `,
    moduleMetadata: { imports: [HSegmentedComponent] },
  }),
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'running', label: 'Running' },
      { value: 'idle', label: 'Idle' },
      { value: 'maintenance', label: 'Maintenance', disabled: true },
    ],
    selectedValues: ['running'],
    ariaLabel: 'Machine status filter',
  },
};

export const FiveOptions: Story = {
  args: {
    options: [
      { value: '1d', label: '1D' },
      { value: '7d', label: '7D' },
      { value: '30d', label: '30D' },
      { value: '90d', label: '90D' },
      { value: '1y', label: '1Y' },
    ],
    selectedValues: ['7d'],
    ariaLabel: 'Date range',
  },
};
