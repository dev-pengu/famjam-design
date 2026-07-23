import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from './chip.web';
import { IconName } from '@famjam/icons';
import { ChipColor } from './chip.types';

const meta = {
  component: Chip,
  argTypes: {
    large: {
      control: 'boolean',
    },
    color: {
      control: 'select',
      options: Object.values(ChipColor),
    },
    leadingIcon: {
      control: 'select',
      options: Object.values(IconName),
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Test',
    color: ChipColor.Primary,
  },
};
