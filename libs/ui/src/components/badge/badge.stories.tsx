import { Meta, StoryObj } from '@storybook/react';

import { Badge } from './badge.web';
import { BadgeVariant, BadgeDisplay, BadgeHorizontalAlign, BadgeVerticalAlign } from './badge.types';
import { Button, ButtonSize, ButtonVariant } from '../button/button.web';
import { Icon } from '../icon/icon.web';
import { IconName } from '@famjam/icons';
import { Color } from '../icon';

const meta = {
  component: Badge,
  argTypes: {
    content: {
      control: 'object',
    },
    variant: {
      control: 'select',
      options: Object.values(BadgeVariant),
    },
    display: {
      control: 'inline-radio',
      options: Object.values(BadgeDisplay),
    },
    visible: {
      control: 'boolean',
    },
    showZero: {
      control: 'boolean',
    },
    max: {
      control: 'number',
    },
    horizontalAlign: {
      control: 'inline-radio',
      options: Object.values(BadgeHorizontalAlign),
    },
    verticalAlign: {
      control: 'inline-radio',
      options: Object.values(BadgeVerticalAlign),
    },
  },
  render: (args) => (
    <Button aria-label='Inbox, 4 unread messages' variant={ButtonVariant.Text}>
      <Badge {...args}>
        <Icon
          name={IconName.Mail}
          size={24}
          color={Color.IconSecondary}
        />
      </Badge>
    </Button>
  ),
} satisfies Meta<typeof Badge>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '',
    content: 100,
    max: 99,
  },
};
