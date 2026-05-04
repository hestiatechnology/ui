import type { Meta, StoryObj } from '@storybook/angular';
import { HPaginationComponent } from './pagination.component';

const meta: Meta<HPaginationComponent> = {
  title: 'Navigation/Pagination',
  component: HPaginationComponent,
  tags: ['autodocs'],
  argTypes: {
    totalPages: { control: { type: 'number', min: 1, max: 100 } },
    totalItems: { control: { type: 'number', min: 0, max: 5000 } },
    currentPage: { control: { type: 'number', min: 1, max: 100 } },
    pageSize: { control: { type: 'number', min: 1, max: 200 } },
    showPageSize: { control: 'boolean' },
    siblingCount: { control: { type: 'number', min: 0, max: 3 } },
    showLabels: { control: 'boolean' },
    showFirstLast: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<HPaginationComponent>;

export const Default: Story = {
  args: {
    totalItems: 1248,
    currentPage: 2,
    pageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
    showPageSize: false,
    siblingCount: 1,
    showFirstLast: true,
  },
};

export const WithPageSize: Story = {
  args: {
    totalItems: 237,
    currentPage: 1,
    pageSize: 25,
    showPageSize: true,
    siblingCount: 1,
    showLabels: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
        <h-pagination
          [totalItems]="totalItems"
          [currentPage]="currentPage"
          [pageSize]="pageSize"
          [showPageSize]="showPageSize"
          [pageSizeOptions]="[10, 25, 50, 100]"
          [siblingCount]="siblingCount"
          [showLabels]="showLabels"
          [ariaLabel]="'Pagination'"
        ></h-pagination>
      </div>
    `,
  }),
};

export const MiddlePage: Story = {
  args: { totalPages: 20, currentPage: 10, siblingCount: 1 },
};

export const LastPage: Story = {
  args: { totalPages: 15, currentPage: 15, siblingCount: 1 },
};

export const WithLabels: Story = {
  args: { totalPages: 10, currentPage: 5, showLabels: true },
};

export const FewPages: Story = {
  args: { totalPages: 5, currentPage: 2, siblingCount: 1 },
};

export const ManySiblings: Story = {
  args: { totalPages: 30, currentPage: 15, siblingCount: 2 },
};
