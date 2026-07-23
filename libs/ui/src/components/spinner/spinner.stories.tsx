import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './spinner.web';
import { SpinnerSize } from './spinner.types';

const meta = {
  component: Spinner,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(SpinnerSize),
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: SpinnerSize.Medium,
  },
};
