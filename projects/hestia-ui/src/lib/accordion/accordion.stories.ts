import type { Meta, StoryObj } from '@storybook/angular';
import { HAccordionComponent, HAccordionItemDirective } from './accordion.component';

const meta: Meta<HAccordionComponent> = {
  title: 'Navigation/Accordion',
  component: HAccordionComponent,
  tags: ['autodocs'],
  argTypes: {
    multiExpandable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<HAccordionComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div style="width:480px;">
        <h-accordion>
          <ng-template hAccordionItem title="What is a Digital Product Passport?">
            A Digital Product Passport (DPP) is a structured data record that travels with a product
            throughout its lifecycle, capturing origin, materials, certifications, and traceability.
          </ng-template>
          <ng-template hAccordionItem title="Which textile processes are tracked?">
            THREAD tracks spinning, knitting, weaving, dyeing, finishing, cutting, sewing, and packaging
            stages — each linked to a machine, operator, and timestamp.
          </ng-template>
          <ng-template hAccordionItem title="How are lot codes generated?">
            Lot codes are auto-generated from the plant ID, process date, and a sequential counter.
            Custom prefixes can be configured per production line.
          </ng-template>
        </h-accordion>
      </div>
    `,
    moduleMetadata: { imports: [HAccordionComponent, HAccordionItemDirective] },
  }),
};

export const MultiExpandable: Story = {
  render: () => ({
    template: `
      <div style="width:480px;">
        <h-accordion [multiExpandable]="true">
          <ng-template hAccordionItem title="Certifications">
            GOTS, OEKO-TEX, and Bluesign certifications are stored per lot and linked to the DPP.
          </ng-template>
          <ng-template hAccordionItem title="Traceability">
            Full fibre-to-fabric traceability with GPS coordinates for each production stage.
          </ng-template>
          <ng-template hAccordionItem title="Environmental data">
            Water usage, carbon footprint, and energy consumption are recorded per kg of output.
          </ng-template>
        </h-accordion>
      </div>
    `,
    moduleMetadata: { imports: [HAccordionComponent, HAccordionItemDirective] },
  }),
};

export const WithDisabledItem: Story = {
  render: () => ({
    template: `
      <div style="width:480px;">
        <h-accordion>
          <ng-template hAccordionItem title="Available information">
            This section is accessible and contains detailed records.
          </ng-template>
          <ng-template hAccordionItem title="Restricted data" [disabled]="true">
            This content requires elevated permissions.
          </ng-template>
          <ng-template hAccordionItem title="Public records">
            Publicly available certification and compliance data.
          </ng-template>
        </h-accordion>
      </div>
    `,
    moduleMetadata: { imports: [HAccordionComponent, HAccordionItemDirective] },
  }),
};
