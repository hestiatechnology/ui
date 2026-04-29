import type { Meta, StoryObj } from '@storybook/angular';
import { HPaginationComponent } from './pagination.component';

const meta: Meta<HPaginationComponent> = {
  title: 'Navigation/Pagination',
  component: HPaginationComponent,
  tags: ['autodocs'],
  argTypes: {
    totalPages: { control: { type: 'number', min: 1, max: 100 } },
    currentPage: { control: { type: 'number', min: 1, max: 100 } },
    siblingCount: { control: { type: 'number', min: 0, max: 3 } },
    showLabels: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<HPaginationComponent>;

export const Default: Story = {
  args: { totalPages: 10, currentPage: 1, siblingCount: 1, showLabels: false },
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
