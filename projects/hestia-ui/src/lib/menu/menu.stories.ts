import type { Meta, StoryObj } from "@storybook/angular";
import { HDropdownComponent } from "./menu.component";

const editSvg = (size = 14) =>
  `<svg lucidePencil [size]="${size}" aria-hidden="true"></svg>`;
const trashSvg = (size = 14) =>
  `<svg lucideTrash2 [size]="${size}" aria-hidden="true"></svg>`;

const meta: Meta<HDropdownComponent> = {
  title: "Navigation/Dropdown",
  component: HDropdownComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<HDropdownComponent>;

export const Default: Story = {
  render: () => ({
    props: {
      items: [
        { value: "edit", label: "Edit lot" },
        { value: "duplicate", label: "Duplicate" },
        { value: "export", label: "Export CSV" },
        { separator: true, value: "__sep", label: "" },
        { value: "delete", label: "Delete lot" },
      ],
    },
    template: `
      <div style="height:200px;padding:16px;">
        <h-dropdown [items]="items">
          <span hTrigger>Actions</span>
        </h-dropdown>
      </div>
    `,
    moduleMetadata: { imports: [HDropdownComponent] },
  }),
};

export const WithIcons: Story = {
  render: () => ({
    props: {
      items: [
        { value: "edit",   label: "Edit",   icon: editSvg() },
        { value: "delete", label: "Delete", icon: trashSvg() },
      ],
    },
    template: `
      <div style="height:160px;padding:16px;">
        <h-dropdown [items]="items">
          <span hTrigger>More</span>
        </h-dropdown>
      </div>
    `,
    moduleMetadata: { imports: [HDropdownComponent] },
  }),
};

export const IconTrigger: Story = {
  render: () => ({
    props: {
      items: [
        { value: 'edit', label: 'Edit' },
        { value: 'duplicate', label: 'Duplicate' },
        { separator: true, value: '__sep', label: '' },
        { value: 'delete', label: 'Delete' },
      ],
    },
    template: `
      <div style="height:200px;padding:16px;">
        <h-dropdown [items]="items" [iconTrigger]="true">
          <span hTrigger>⋯</span>
        </h-dropdown>
      </div>
    `,
    moduleMetadata: { imports: [HDropdownComponent] },
  }),
};

export const WithDisabledItem: Story = {
  render: () => ({
    props: {
      items: [
        { value: "view",    label: "View DPP" },
        { value: "certify", label: "Request certification", disabled: true },
        { value: "archive", label: "Archive" },
      ],
    },
    template: `
      <div style="height:180px;padding:16px;">
        <h-dropdown [items]="items">
          <span hTrigger>Options</span>
        </h-dropdown>
      </div>
    `,
    moduleMetadata: { imports: [HDropdownComponent] },
  }),
};
