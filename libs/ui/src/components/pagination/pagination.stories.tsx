import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Pagination } from './pagination.web';
import { PaginationSize, PaginationShape, PaginationColor, PaginationVariant } from './pagination.types';

const meta = {
  component: Pagination,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(PaginationSize),
    },
    shape: {
      control: 'select',
      options: Object.values(PaginationShape),
    },
    color: {
      control: 'select',
      options: Object.values(PaginationColor),
    },
    variant: {
      control: 'select',
      options: Object.values(PaginationVariant),
    },
    boundaryCount: {
      control: 'number',
    },
    count: {
      control: 'number',
    },
    defaultPage: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
    hideNextButton: {
      control: 'boolean',
    },
    hidePrevButton: {
      control: 'boolean',
    },
    page: {
      control: 'number',
    },
    showFirstButton: {
      control: 'boolean',
    },
    showLastButton: {
      control: 'boolean',
    },
    siblingCount: {
      control: 'number',
    },
  },
  render: (args) => {
    const [_, setArgs] = useArgs();

    const handleOnChange = (value: React.SetStateAction<number | undefined>) => {
      setArgs({
        ...args,
        page: value,
      });
    };

    return (
      <Pagination
        {...args}
        onChange={handleOnChange}
      />
    );
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 10,
  },
};
