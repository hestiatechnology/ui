import type { Meta, StoryObj } from '@storybook/angular';
import { HObjectSelectComponent } from './object-select.component';
import { HFieldComponent } from '../field/field.component';

interface Facility {
  id: string;
  name: string;
  city: string;
  active: boolean;
}

interface Machine {
  code: string;
  label: string;
  type: string;
  offline?: boolean;
}

const FACILITIES: Facility[] = [
  { id: 'bcl', name: 'Barcelos HQ',        city: 'Barcelos',    active: true  },
  { id: 'gmr', name: 'Guimarães Plant 2',   city: 'Guimarães',   active: true  },
  { id: 'fml', name: 'Famalicão Dye House', city: 'Famalicão',   active: true  },
  { id: 'vzl', name: 'Vizela Knit',         city: 'Vizela',      active: false },
];

const MACHINES: Machine[] = [
  { code: 'L7',  label: 'L7-KNIT-03', type: 'Loom'      },
  { code: 'DB2', label: 'DB-02',      type: 'Dye bath'  },
  { code: 'C11', label: 'CUT-11',     type: 'Cutting'   },
  { code: 'L3',  label: 'L3-KNIT-08', type: 'Loom', offline: true },
];

const meta: Meta<HObjectSelectComponent> = {
  title: 'Form/ObjectSelect',
  component: HObjectSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    searchable:  { control: 'boolean' },
    disabled:    { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<HObjectSelectComponent>;

export const Default: Story = {
  render: () => ({
    props: {
      facilities: FACILITIES,
      displayFacility: (f: Facility) => `${f.name} · ${f.city}`,
      compareFacility: (a: Facility, b: Facility) => a.id === b.id,
    },
    template: `
      <div style="width:280px;">
        <h-object-select
          [options]="facilities"
          [displayWith]="displayFacility"
          [compareWith]="compareFacility"
          placeholder="Choose facility…">
        </h-object-select>
      </div>
    `,
    moduleMetadata: { imports: [HObjectSelectComponent] },
  }),
};

export const WithSearch: Story = {
  render: () => ({
    props: {
      facilities: FACILITIES,
      displayFacility: (f: Facility) => `${f.name} · ${f.city}`,
      compareFacility: (a: Facility, b: Facility) => a.id === b.id,
    },
    template: `
      <div style="width:300px;">
        <h-object-select
          [options]="facilities"
          [displayWith]="displayFacility"
          [compareWith]="compareFacility"
          placeholder="Search facilities…"
          [searchable]="true">
        </h-object-select>
      </div>
    `,
    moduleMetadata: { imports: [HObjectSelectComponent] },
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: {
      facilities: FACILITIES,
      displayFacility: (f: Facility) => `${f.name} · ${f.city}`,
      compareFacility: (a: Facility, b: Facility) => a.id === b.id,
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:280px;">
        <h-object-select [options]="facilities" [displayWith]="displayFacility" [compareWith]="compareFacility" placeholder="Small" size="sm"></h-object-select>
        <h-object-select [options]="facilities" [displayWith]="displayFacility" [compareWith]="compareFacility" placeholder="Default"></h-object-select>
        <h-object-select [options]="facilities" [displayWith]="displayFacility" [compareWith]="compareFacility" placeholder="Large · Operations" size="lg"></h-object-select>
      </div>
    `,
    moduleMetadata: { imports: [HObjectSelectComponent] },
  }),
};

export const WithField: Story = {
  render: () => ({
    props: {
      machines: MACHINES,
      displayMachine: (m: Machine) => `${m.label} · ${m.type}`,
      compareMachine: (a: Machine, b: Machine) => a.code === b.code,
    },
    template: `
      <div style="width:300px;">
        <h-field label="Machine" hint="Select the machine to assign this work order to">
          <h-object-select
            [options]="machines"
            [displayWith]="displayMachine"
            [compareWith]="compareMachine"
            placeholder="Choose machine…"
            [searchable]="true">
          </h-object-select>
        </h-field>
      </div>
    `,
    moduleMetadata: { imports: [HObjectSelectComponent, HFieldComponent] },
  }),
};
