import type { Meta, StoryObj } from '@storybook/react';

import { Fab } from './fab.web';
import { FabColor, FabSize, FabVariant } from './fab.types';
import { IconName } from '@famjam/icons';

const meta = {
  component: Fab,
  argTypes: {
    icon: {
      control: 'select',
      options: Object.values(IconName),
    },
    extended: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: Object.values(FabVariant),
    },
    color: {
      control: 'select',
      options: Object.values(FabColor),
    },
    size: {
      control: 'select',
      options: Object.values(FabSize),
    },
  },
} satisfies Meta<typeof Fab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: IconName.Add,
    label: 'Add item',
  },
};

export const Extended: Story = {
  args: {
    icon: IconName.Delete,
    label: 'Delete',
    extended: true,
  },
};
