import { Component, signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { HSelectComponent } from './select.component';
import { HOptionComponent } from './option.component';

const meta: Meta = {
  title: 'Form/Select',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const FACILITIES = [
  { value: 'barcelos',  label: 'Barcelos · HQ' },
  { value: 'guimaraes', label: 'Guimarães · Plant 2' },
  { value: 'famalicao', label: 'Famalicão · Dye House' },
  { value: 'vizela',    label: 'Vizela · Knit' },
];

const MACHINES = [
  { value: 'l7',  label: 'L7-KNIT-03 · Loom 7' },
  { value: 'db2', label: 'DB-02 · Dye bath 2' },
  { value: 'c11', label: 'CUT-11 · Cut 11' },
  { value: 'l3',  label: 'L3-KNIT-08 · Loom 3', disabled: true },
];

export const Default: Story = {
  render: () => ({
    template: `
      <div style="width:260px;">
        <h-select placeholder="Choose facility…">
          <h-option value="barcelos">Barcelos · HQ</h-option>
          <h-option value="guimaraes">Guimarães · Plant 2</h-option>
          <h-option value="famalicao">Famalicão · Dye House</h-option>
          <h-option value="vizela">Vizela · Knit</h-option>
        </h-select>
      </div>
    `,
    moduleMetadata: { imports: [HSelectComponent, HOptionComponent] },
  }),
};

export const Searchable: Story = {
  render: () => ({
    template: `
      <div style="width:280px;">
        <h-select placeholder="Search facilities…" [searchable]="true">
          @for (f of facilities; track f.value) {
            <h-option [value]="f.value">{{ f.label }}</h-option>
          }
        </h-select>
      </div>
    `,
    props: { facilities: FACILITIES },
    moduleMetadata: { imports: [HSelectComponent, HOptionComponent] },
  }),
};

export const WithDisabledOption: Story = {
  render: () => ({
    template: `
      <div style="width:260px;">
        <h-select placeholder="Choose machine…" [searchable]="true">
          @for (m of machines; track m.value) {
            <h-option [value]="m.value" [disabled]="m.disabled ?? false">{{ m.label }}</h-option>
          }
        </h-select>
      </div>
    `,
    props: { machines: MACHINES },
    moduleMetadata: { imports: [HSelectComponent, HOptionComponent] },
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:260px;">
        <h-select placeholder="Small (32px)" size="sm">
          <h-option value="a">Option A</h-option>
          <h-option value="b">Option B</h-option>
        </h-select>
        <h-select placeholder="Default (36px)" size="default">
          <h-option value="a">Option A</h-option>
          <h-option value="b">Option B</h-option>
        </h-select>
        <h-select placeholder="Large (44px)" size="lg">
          <h-option value="a">Option A</h-option>
          <h-option value="b">Option B</h-option>
        </h-select>
      </div>
    `,
    moduleMetadata: { imports: [HSelectComponent, HOptionComponent] },
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="width:260px;">
        <h-select placeholder="All facilities" [disabled]="true">
          <h-option value="barcelos">Barcelos · HQ</h-option>
        </h-select>
      </div>
    `,
    moduleMetadata: { imports: [HSelectComponent, HOptionComponent] },
  }),
};

interface User { id: number; name: string; role: string; }

export const RichOptions: Story = {
  render: () => ({
    template: `
      <div style="width:300px;">
        <h-select placeholder="Assign to…" [searchable]="true" [compareWith]="byId">
          @for (u of users; track u.id) {
            <h-option [value]="u" [label]="u.name">
              <span style="display:inline-flex;align-items:center;justify-content:center;
                           width:24px;height:24px;border-radius:50%;background:var(--h-muted);
                           font-size:11px;font-weight:600;flex-shrink:0;">
                {{ u.name[0] }}
              </span>
              <span>
                <span style="display:block;font-size:13px;">{{ u.name }}</span>
                <span style="display:block;font-size:11px;color:var(--h-muted-foreground);">{{ u.role }}</span>
              </span>
            </h-option>
          }
        </h-select>
      </div>
    `,
    props: {
      users: [
        { id: 1, name: 'Ana Costa',    role: 'Production Manager' },
        { id: 2, name: 'Bruno Silva',  role: 'Quality Control' },
        { id: 3, name: 'Carla Mendes', role: 'Operator' },
      ] as User[],
      byId: (a: User, b: User) => a.id === b.id,
    },
    moduleMetadata: { imports: [HSelectComponent, HOptionComponent] },
  }),
};
