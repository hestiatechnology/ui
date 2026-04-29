import type { Meta, StoryObj } from '@storybook/angular';
import { HMachineTileComponent } from './machine-tile.component';

const meta: Meta<HMachineTileComponent> = {
  title: 'Domain/MachineTile',
  component: HMachineTileComponent,
  tags: ['autodocs'],
  argTypes: {
    machineId: { control: 'text' },
    machineName: { control: 'text' },
    status: { control: 'select', options: ['running', 'idle', 'error', 'maintenance', 'hold'] },
    oee: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    alertMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<HMachineTileComponent>;

export const Running: Story = {
  args: {
    machineId: 'CK-01',
    machineName: 'Circular Knitting Machine 1',
    status: 'running',
    metrics: [
      { label: 'Speed', value: '24', unit: 'RPM' },
      { label: 'Output', value: '142', unit: 'kg/h' },
      { label: 'Efficiency', value: '94', unit: '%' },
    ],
    oee: 87,
  },
};

export const Idle: Story = {
  args: {
    machineId: 'WV-03',
    machineName: 'Flat Weaving Loom 3',
    status: 'idle',
    metrics: [
      { label: 'Last run', value: '2h', unit: 'ago' },
      { label: 'Output', value: '0', unit: 'kg/h' },
    ],
    oee: 0,
  },
};

export const Error: Story = {
  args: {
    machineId: 'DY-07',
    machineName: 'Dye Batch Unit 7',
    status: 'error',
    metrics: [
      { label: 'Temp', value: '104', unit: '°C', mono: true },
      { label: 'Pressure', value: '2.8', unit: 'bar', mono: true },
    ],
    oee: 12,
    alertMessage: 'Temperature exceeded safe threshold. Emergency stop triggered.',
  },
};

export const Maintenance: Story = {
  args: {
    machineId: 'FN-02',
    machineName: 'Finishing Calender 2 — returns at 14:00',
    status: 'maintenance',
  },
};

export const OnHold: Story = {
  args: {
    machineId: 'CK-04',
    machineName: 'Circular Knitting Machine 4',
    status: 'hold',
    metrics: [
      { label: 'Reason', value: 'Stock' },
    ],
  },
};

export const MinimalCard: Story = {
  args: {
    machineId: 'WV-11',
    status: 'running',
  },
};

export const Grid: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,260px);gap:12px;">
        <h-machine-tile
          machineId="CK-01"
          machineName="Circular Knitting 1"
          status="running"
          [metrics]="[{label:'Speed',value:'24',unit:'RPM'},{label:'Output',value:'142',unit:'kg/h'}]"
          [oee]="87">
        </h-machine-tile>
        <h-machine-tile
          machineId="WV-03"
          machineName="Flat Weaving Loom 3"
          status="idle"
          [metrics]="[{label:'Output',value:'0',unit:'kg/h'}]"
          [oee]="0">
        </h-machine-tile>
        <h-machine-tile
          machineId="DY-07"
          machineName="Dye Batch Unit 7"
          status="error"
          [metrics]="[{label:'Temp',value:'104',unit:'°C',mono:true}]"
          [oee]="12"
          alertMessage="Temperature exceeded safe threshold.">
        </h-machine-tile>
      </div>
    `,
    moduleMetadata: { imports: [HMachineTileComponent] },
  }),
};
