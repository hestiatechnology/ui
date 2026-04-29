import type { Meta, StoryObj } from '@storybook/angular';
import { HAutocompleteComponent } from './autocomplete.component';
import { HFieldComponent } from '../field/field.component';

interface Client {
  id: number;
  name: string;
  country: string;
}

interface Supplier {
  code: string;
  name: string;
  category: string;
}

const CLIENTS: Client[] = [
  { id: 1,  name: 'Zara Portugal',    country: 'PT' },
  { id: 2,  name: 'H&M Group',        country: 'SE' },
  { id: 3,  name: 'Mango',            country: 'ES' },
  { id: 4,  name: 'C&A Europe',       country: 'DE' },
  { id: 5,  name: 'Primark',          country: 'IE' },
  { id: 6,  name: 'Marks & Spencer',  country: 'GB' },
  { id: 7,  name: 'Next PLC',         country: 'GB' },
  { id: 8,  name: 'Inditex',          country: 'ES' },
];

const SUPPLIERS: Supplier[] = [
  { code: 'SP-001', name: 'Fibrotex',     category: 'Yarns'    },
  { code: 'SP-002', name: 'ColorTex',     category: 'Dyes'     },
  { code: 'SP-003', name: 'Maquinvest',   category: 'Machinery'},
  { code: 'SP-004', name: 'AcetoChem',    category: 'Chemicals'},
  { code: 'SP-005', name: 'TelaFina',     category: 'Yarns'    },
];

const meta: Meta<HAutocompleteComponent> = {
  title: 'Form/Autocomplete',
  component: HAutocompleteComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled:    { control: 'boolean' },
    invalid:     { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<HAutocompleteComponent>;

export const Default: Story = {
  render: () => ({
    props: {
      clients: CLIENTS,
      displayClient: (c: Client) => `${c.name} · ${c.country}`,
      compareClient: (a: Client, b: Client) => a.id === b.id,
    },
    template: `
      <div style="width:300px;">
        <h-autocomplete
          [options]="clients"
          [displayWith]="displayClient"
          [compareWith]="compareClient"
          placeholder="Search client…">
        </h-autocomplete>
      </div>
    `,
    moduleMetadata: { imports: [HAutocompleteComponent] },
  }),
};

export const WithField: Story = {
  render: () => ({
    props: {
      suppliers: SUPPLIERS,
      displaySupplier: (s: Supplier) => `${s.name} · ${s.category}`,
      compareSupplier: (a: Supplier, b: Supplier) => a.code === b.code,
    },
    template: `
      <div style="width:320px;">
        <h-field label="Supplier" hint="Start typing to filter">
          <h-autocomplete
            [options]="suppliers"
            [displayWith]="displaySupplier"
            [compareWith]="compareSupplier"
            placeholder="Search supplier…">
          </h-autocomplete>
        </h-field>
      </div>
    `,
    moduleMetadata: { imports: [HAutocompleteComponent, HFieldComponent] },
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: {
      clients: CLIENTS,
      displayClient: (c: Client) => `${c.name} · ${c.country}`,
      compareClient: (a: Client, b: Client) => a.id === b.id,
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:300px;">
        <h-autocomplete [options]="clients" [displayWith]="displayClient" [compareWith]="compareClient" size="sm"      placeholder="Small"></h-autocomplete>
        <h-autocomplete [options]="clients" [displayWith]="displayClient" [compareWith]="compareClient" size="default" placeholder="Default"></h-autocomplete>
        <h-autocomplete [options]="clients" [displayWith]="displayClient" [compareWith]="compareClient" size="lg"      placeholder="Large · Operations"></h-autocomplete>
      </div>
    `,
    moduleMetadata: { imports: [HAutocompleteComponent] },
  }),
};

export const Invalid: Story = {
  render: () => ({
    props: {
      clients: CLIENTS,
      displayClient: (c: Client) => c.name,
      compareClient: (a: Client, b: Client) => a.id === b.id,
    },
    template: `
      <div style="width:300px;">
        <h-field label="Client" error="Client is required">
          <h-autocomplete
            [options]="clients"
            [displayWith]="displayClient"
            [compareWith]="compareClient"
            [invalid]="true"
            placeholder="Search client…">
          </h-autocomplete>
        </h-field>
      </div>
    `,
    moduleMetadata: { imports: [HAutocompleteComponent, HFieldComponent] },
  }),
};

export const Disabled: Story = {
  render: () => ({
    props: {
      clients: CLIENTS,
      displayClient: (c: Client) => c.name,
      compareClient: (a: Client, b: Client) => a.id === b.id,
      selected: CLIENTS[0],
    },
    template: `
      <div style="width:300px;">
        <h-autocomplete
          [options]="clients"
          [displayWith]="displayClient"
          [compareWith]="compareClient"
          [value]="selected"
          [disabled]="true">
        </h-autocomplete>
      </div>
    `,
    moduleMetadata: { imports: [HAutocompleteComponent] },
  }),
};
