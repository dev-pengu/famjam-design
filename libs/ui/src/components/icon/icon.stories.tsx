import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from './icon.web';
import { IconName } from '@famjam/icons';
import { Color } from './icon.types';

const meta = {
  component: Icon,
  argTypes: {
    color: {
      control: 'select',
      options: Object.keys(Color),
      mapping: Color,
      description: 'Color of the icon',
      defaultValue: Color.IconPrimary,
    },
    name: {
      control: 'select',
      options: Object.values(IconName),
      description: 'Sets the icon',
    },
    decorative: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: IconName.Account,
    size: 32,
  },
};
