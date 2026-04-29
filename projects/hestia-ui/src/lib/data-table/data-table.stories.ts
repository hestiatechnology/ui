import type { Meta, StoryObj } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { HDataTableComponent, HDtCellDirective, ColumnDef, HDtCellContext } from './data-table.component';
import { HAutocompleteComponent } from '../autocomplete/autocomplete.component';
import { HBadgeComponent, BadgeTone } from '../badge/badge.component';

// ── Shared sample data ────────────────────────────────────────────────────────

interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  salary: number;
  active: boolean;
}

const EMPLOYEES: Employee[] = [
  { id: 1, name: 'Ana Costa',      department: 'Engineering', role: 'Senior',  salary: 72000, active: true  },
  { id: 2, name: 'Bruno Ferreira', department: 'Design',      role: 'Lead',    salary: 68000, active: true  },
  { id: 3, name: 'Catarina Lopes', department: 'Engineering', role: 'Junior',  salary: 48000, active: false },
  { id: 4, name: 'David Sousa',    department: 'Product',     role: 'Manager', salary: 85000, active: true  },
  { id: 5, name: 'Elisa Martins',  department: 'Engineering', role: 'Senior',  salary: 74000, active: true  },
];

const COLUMNS: ColumnDef<Employee>[] = [
  { key: 'id',         header: 'ID',         width: '60px',  align: 'right', mono: true, sortable: true },
  { key: 'name',       header: 'Name',       sortable: true },
  { key: 'department', header: 'Department', sortable: true },
  { key: 'role',       header: 'Role' },
  { key: 'salary',     header: 'Salary',     align: 'right', mono: true, sortable: true,
    cell: (r) => `€${r.salary.toLocaleString('pt-PT')}` },
  { key: 'active',     header: 'Active',     align: 'center',
    cell: (r) => r.active ? '✓' : '—' },
];

const EDITABLE_COLUMNS: ColumnDef<Employee>[] = [
  { key: 'id',         header: 'ID',         width: '60px', align: 'right', mono: true },
  { key: 'name',       header: 'Name',       editable: true, editType: 'text',   sortable: true },
  { key: 'department', header: 'Department', editable: true, editType: 'select',
    editOptions: ['Engineering', 'Design', 'Product', 'Marketing'], sortable: true },
  { key: 'role',       header: 'Role',       editable: true, editType: 'text' },
  { key: 'salary',     header: 'Salary',     editable: true, editType: 'number', align: 'right', mono: true,
    cell: (r) => `€${r.salary.toLocaleString('pt-PT')}` },
  { key: 'active',     header: 'Active',     editable: true, editType: 'boolean', align: 'center',
    cell: (r) => r.active ? '✓' : '—' },
];

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<HDataTableComponent> = {
  title: 'Data/DataTable',
  component: HDataTableComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<HDataTableComponent>;

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => ({
    props: { columns: COLUMNS, rows: EMPLOYEES },
    template: `<h-data-table [columns]="columns" [rows]="rows"></h-data-table>`,
    moduleMetadata: { imports: [HDataTableComponent] },
  }),
};

export const Sortable: Story = {
  render: () => ({
    props: { columns: COLUMNS, rows: EMPLOYEES },
    template: `<h-data-table [columns]="columns" [rows]="rows"></h-data-table>`,
    moduleMetadata: { imports: [HDataTableComponent] },
  }),
};

export const Selectable: Story = {
  render: () => ({
    props: { columns: COLUMNS, rows: EMPLOYEES },
    template: `
      <h-data-table
        [columns]="columns"
        [rows]="rows"
        [selectable]="true"
        (selectionChange)="selection = $event"
      ></h-data-table>
      <p style="font-size:12px;margin-top:8px;color:var(--h-muted-foreground)">
        Selected: {{ selection?.length ?? 0 }} rows
      </p>
    `,
    moduleMetadata: { imports: [HDataTableComponent] },
  }),
};

export const RowEditable: Story = {
  render: () => ({
    props: {
      columns: EDITABLE_COLUMNS,
      rows: [...EMPLOYEES],
      onSave(e: { index: number; row: Employee; draft: Employee }) {
        console.log('row saved', e.draft);
      },
    },
    template: `
      <h-data-table
        [columns]="columns"
        [rows]="rows"
        (rowSave)="onSave($event)"
      ></h-data-table>
    `,
    moduleMetadata: { imports: [HDataTableComponent] },
  }),
};

export const EditableWithDelete: Story = {
  render: () => ({
    props: {
      columns: EDITABLE_COLUMNS,
      rows: signal<Employee[]>([...EMPLOYEES]),
      onSave(rows: ReturnType<typeof signal<Employee[]>>, e: { index: number; draft: Employee }) {
        rows.update(r => r.map((row, i) => i === e.index ? e.draft : row));
      },
      onDelete(rows: ReturnType<typeof signal<Employee[]>>, row: Employee) {
        rows.update(r => r.filter(x => x.id !== row.id));
      },
    },
    template: `
      <h-data-table
        [columns]="columns"
        [rows]="rows()"
        [deletable]="true"
        (rowSave)="onSave(rows, $event)"
        (rowDelete)="onDelete(rows, $event)"
      ></h-data-table>
    `,
    moduleMetadata: { imports: [HDataTableComponent] },
  }),
};

export const Loading: Story = {
  render: () => ({
    props: { columns: COLUMNS, rows: [] as Employee[], loading: true },
    template: `<h-data-table [columns]="columns" [rows]="rows" [loading]="loading"></h-data-table>`,
    moduleMetadata: { imports: [HDataTableComponent] },
  }),
};

export const Empty: Story = {
  render: () => ({
    props: { columns: COLUMNS, rows: [] as Employee[] },
    template: `<h-data-table [columns]="columns" [rows]="rows" emptyMessage="No employees found"></h-data-table>`,
    moduleMetadata: { imports: [HDataTableComponent] },
  }),
};

// ── Custom cells: badge view + autocomplete edit ───────────────────────────────
//
// Demonstrates the unified hDtCell template context:
//   ctx.$implicit  — formatted cell value
//   ctx.row        — full row object
//   ctx.editing    — true while this row is being edited
//   ctx.draft      — live draft; read values from here in edit mode
//   ctx.patch(key, value) — update a field in the draft

const ROLE_TONE: Record<string, BadgeTone> = {
  Senior:  'running',
  Lead:    'primary',
  Manager: 'primary',
  Junior:  'idle',
};

const DEPARTMENTS = ['Engineering', 'Design', 'Product', 'Marketing', 'Operations'];

@Component({
  selector: 'story-custom-cells',
  standalone: true,
  imports: [HDataTableComponent, HDtCellDirective, HAutocompleteComponent, HBadgeComponent],
  template: `
    <h-data-table
      [columns]="columns"
      [rows]="rows()"
      [deletable]="true"
      (rowSave)="onSave($event)"
      (rowDelete)="onDelete($event)"
    >
      <!--
        Department column:
          - view  → plain text
          - edit  → h-autocomplete with searchable department list
      -->
      <ng-template hDtCell="department" let-ctx>
        @if (ctx.editing) {
          <h-autocomplete
            [value]="$any(ctx.draft['department'])"
            [options]="departments"
            (valueChange)="ctx.patch('department', $event)"
            (click)="$event.stopPropagation()"
          ></h-autocomplete>
        } @else {
          {{ ctx.value }}
        }
      </ng-template>

      <!--
        Role column:
          - view  → h-badge coloured by seniority
          - edit  → h-autocomplete with role options
      -->
      <ng-template hDtCell="role" let-ctx>
        @if (ctx.editing) {
          <h-autocomplete
            [value]="$any(ctx.draft['role'])"
            [options]="roles"
            (valueChange)="ctx.patch('role', $event)"
            (click)="$event.stopPropagation()"
          ></h-autocomplete>
        } @else {
          <h-badge [tone]="roleTone($any(ctx.row).role)">
            {{ ctx.value }}
          </h-badge>
        }
      </ng-template>

      <!--
        Active column:
          - view  → h-badge running/idle with dot
          - edit  → inline checkbox toggle
      -->
      <ng-template hDtCell="active" let-ctx>
        @if (ctx.editing) {
          <label style="display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-size:13px">
            <input
              type="checkbox"
              style="width:15px;height:15px;accent-color:var(--h-primary);cursor:pointer"
              [checked]="$any(ctx.draft['active'])"
              (change)="ctx.patch('active', $any($event.target).checked)"
              (click)="$event.stopPropagation()"
            />
            Active
          </label>
        } @else {
          <h-badge [tone]="$any(ctx.row).active ? 'running' : 'idle'" [dot]="true">
            {{ $any(ctx.row).active ? 'Active' : 'Inactive' }}
          </h-badge>
        }
      </ng-template>
    </h-data-table>
  `,
})
class CustomCellsStory {
  readonly departments = DEPARTMENTS;
  readonly roles       = ['Junior', 'Mid', 'Senior', 'Lead', 'Manager', 'Director'];

  readonly columns: ColumnDef<Employee>[] = [
    { key: 'id',         header: 'ID',         width: '60px', align: 'right', mono: true, sortable: true },
    { key: 'name',       header: 'Name',       editable: true, editType: 'text', sortable: true },
    { key: 'department', header: 'Department', editable: true, sortable: true },
    { key: 'role',       header: 'Role',       editable: true },
    { key: 'salary',     header: 'Salary',     editable: true, editType: 'number', align: 'right', mono: true,
      cell: (r) => `€${r.salary.toLocaleString('pt-PT')}` },
    { key: 'active',     header: 'Status',     editable: true, align: 'center' },
  ];

  rows = signal<Employee[]>([...EMPLOYEES]);

  roleTone(role: string): BadgeTone {
    return ROLE_TONE[role] ?? 'neutral';
  }

  onSave(e: { index: number; row: Employee; draft: Employee }): void {
    this.rows.update(r => r.map((row, i) => i === e.index ? e.draft : row));
  }

  onDelete(row: Employee): void {
    this.rows.update(r => r.filter(x => x.id !== row.id));
  }
}

export const CustomCells: Story = {
  name: 'Custom Cells (badge + autocomplete)',
  render: () => ({
    template: `<story-custom-cells></story-custom-cells>`,
    moduleMetadata: { imports: [CustomCellsStory] },
  }),
};
