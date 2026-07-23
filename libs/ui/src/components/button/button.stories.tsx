import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button.web';
import { ButtonVariant, ButtonSize, ButtonColor, ButtonShape } from './button.types';
import { IconName } from '@famjam/icons';
import { Icon } from '../icon/icon.web';

const meta = {
  component: Button,
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(ButtonSize),
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: Object.values(ButtonVariant),
    },
    color: {
      control: 'select',
      options: Object.values(ButtonColor),
      defaultValue: ButtonColor.Default,
    },
    shape: {
      control: 'select',
      options: Object.values(ButtonShape),
    },
    startIcon: {
      control: 'select',
      options: Object.values(IconName),
    },
    endIcon: {
      control: 'select',
      options: Object.values(IconName),
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    children: 'Test Button',
    variant: ButtonVariant.Filled,
  },
};

export const Outline: Story = {
  args: {
    children: 'Test Button',
    variant: ButtonVariant.Outline,
  },
};

export const Ghost: Story = {
  args: {
    children: 'Test Button',
    variant: ButtonVariant.Ghost,
  },
};

export const Glass: Story = {
  args: {
    children: 'Test Button',
    variant: ButtonVariant.Glass,
  },
};

export const Link: Story = {
  args: {
    children: 'Link',
    href: '#',
    variant: ButtonVariant.Ghost,
  },
};

export const IconButton: Story = {
  args: {
    children: (
      <Icon
        name={IconName.Home}
        size={16}
        decorative={false}
        accessibilityLabel={IconName.Home}
      />
    ),
  },
};
