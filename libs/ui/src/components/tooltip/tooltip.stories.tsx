import { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './tooltip.web';
import { Button } from '../button/button.web';
import { Icon } from '../icon/icon.web';
import { IconName } from '@famjam/icons';

const meta = {
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonStory: Story = {
  args: {
    children: <Button>Save</Button>,
    content: 'Save your changes',
  },
};

export const IconStory: Story = {
  args: {
    children: (
      <Icon
        name={IconName.Account}
        size={32}
      />
    ),
    content: 'View Account',
    describeChild: true,
  },
};

export const Arrowless: Story = {
  args: {
    children: <Button>Save</Button>,
    content: 'Keyboard shortcut: ⌘S',
    showArrow: false,
    position: { horizontal: 'end', vertical: 'center' },
  },
};
