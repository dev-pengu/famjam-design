import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Rating } from './ratings.web';
import { RatingSize } from './ratings.types';

const meta = {
  component: Rating,
  argTypes: {
    max: {
      control: 'number',
    },
    precision: {
      control: 'select',
      options: [0.1, 0.25, 0.5, 1],
    },
    size: {
      control: 'select',
      options: Object.values(RatingSize),
    },
    readOnly: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    hideCount: {
      control: 'boolean',
    },
  },
  render: function Component(args) {
    const [, setArgs] = useArgs();

    const onValueChange = (value: number | null) => {
      args.onChange?.(value);

      setArgs({ value });
    };

    return (
      <Rating
        {...args}
        onChange={onValueChange}
      />
    );
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    count: 1,
    onCountClick: () => {
      alert('clicked on count');
    },
  },
};
