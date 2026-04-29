import type { Meta, StoryObj } from "@storybook/angular";
import { HDropdownComponent } from "./menu.component";

const editSvg = (size = 14) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
const trashSvg = (size = 14) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>`;

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
