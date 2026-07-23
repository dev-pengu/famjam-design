import { Meta, StoryObj } from '@storybook/react';

import { ColorSpinner } from './color-spinner.web';
import { ColorSpinnerSize } from './color-spinner.types';

const meta = {
  component: ColorSpinner,
  argTypes: {
    color: {
      control: 'inline-radio',
      options: ['brand', 'monotone', 'dark'],
    },
    size: {
        control: 'select',
        options: Object.values(ColorSpinnerSize)
    }
  },
} satisfies Meta<typeof ColorSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: 'brand',
  },
};
