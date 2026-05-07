import type { Meta, StoryObj } from "@storybook/angular";
import { LucideSearch, LucideMail, LucideLock } from "@lucide/angular";
import { HInputComponent } from "./input.component";

const meta: Meta<HInputComponent> = {
  title: "Form/Input",
  component: HInputComponent,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "default", "lg"] },
    type: { control: "select", options: ["text", "email", "password", "number", "search", "tel", "url"] },
    placeholder: { control: "text" },
    suffix: { control: "text" },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    required: { control: "boolean" },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:280px;">
        <h-input
          [size]="size"
          [type]="type"
          [placeholder]="placeholder"
          [suffix]="suffix"
          [disabled]="disabled"
          [invalid]="invalid"
          [required]="required">
        </h-input>
      </div>
    `,
    moduleMetadata: { imports: [HInputComponent] },
  }),
};

export default meta;
type Story = StoryObj<HInputComponent>;

export const Default: Story = {
  args: { size: "default", placeholder: "Enter text…", disabled: false, invalid: false },
};

export const WithSuffix: Story = {
  args: { size: "default", placeholder: "0.00", suffix: "kg" },
};

export const WithSearchIcon: Story = {
  render: () => ({
    template: `
      <div style="width:280px;">
        <h-input placeholder="Search lots…" [hasIcon]="true">
          <svg slot="icon" lucideSearch [size]="14"></svg>
        </h-input>
      </div>
    `,
    moduleMetadata: { imports: [HInputComponent, LucideSearch] },
  }),
};

export const WithEmailIcon: Story = {
  render: () => ({
    template: `
      <div style="width:280px;">
        <h-input type="email" placeholder="you@example.com" [hasIcon]="true">
          <svg slot="icon" lucideMail [size]="14"></svg>
        </h-input>
      </div>
    `,
    moduleMetadata: { imports: [HInputComponent, LucideMail] },
  }),
};

export const Password: Story = {
  render: () => ({
    template: `
      <div style="width:280px;">
        <h-input type="password" placeholder="Password" [hasIcon]="true">
          <svg slot="icon" lucideLock [size]="14"></svg>
        </h-input>
      </div>
    `,
    moduleMetadata: { imports: [HInputComponent, LucideLock] },
  }),
};

export const Invalid: Story = {
  args: { size: "default", placeholder: "Enter email…", type: "email", invalid: true },
};

export const Disabled: Story = {
  args: { size: "default", placeholder: "Disabled input", disabled: true },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:280px;">
        <h-input size="sm"      placeholder="Small"></h-input>
        <h-input size="default" placeholder="Default"></h-input>
        <h-input size="lg"      placeholder="Large"></h-input>
      </div>
    `,
    moduleMetadata: { imports: [HInputComponent] },
  }),
};

export const NumberInput: Story = {
  render: () => ({
    template: `
      <div style="width:280px;">
        <h-input type="number" placeholder="0" [value]="42" suffix="units" [valueConverter]="numberConverter"></h-input>
      </div>
    `,
    moduleMetadata: { imports: [HInputComponent] },
    props: {
      numberConverter: (raw: string) => raw === '' ? 0 : Number(raw),
    },
  }),
};

export const EmailInput: Story = {
  render: () => ({
    template: `
      <div style="width:280px;">
        <h-input type="email" placeholder="user@example.com" [value]="'john@example.com'"></h-input>
      </div>
    `,
    moduleMetadata: { imports: [HInputComponent] },
  }),
};

export const URLInput: Story = {
  render: () => ({
    template: `
      <div style="width:280px;">
        <h-input type="url" placeholder="https://example.com" [value]="'https://hestia.pt'"></h-input>
      </div>
    `,
    moduleMetadata: { imports: [HInputComponent] },
  }),
};

export const TelInput: Story = {
  render: () => ({
    template: `
      <div style="width:280px;">
        <h-input type="tel" placeholder="+1 (555) 000-0000" [value]="'+1 (555) 123-4567'"></h-input>
      </div>
    `,
    moduleMetadata: { imports: [HInputComponent] },
  }),
};

export const SearchInput: Story = {
  render: () => ({
    template: `
      <div style="width:280px;">
        <h-input type="search" placeholder="Search…" [hasIcon]="true">
          <svg slot="icon" lucideSearch [size]="14"></svg>
        </h-input>
      </div>
    `,
    moduleMetadata: { imports: [HInputComponent, LucideSearch] },
  }),
};
