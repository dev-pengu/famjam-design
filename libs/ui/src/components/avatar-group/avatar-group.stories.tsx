import { Meta, StoryObj } from '@storybook/react';

import { AvatarGroup } from './avatar-group.web';
import { Avatar } from '../avatar/avatar.web';
import { AvatarSize, AvatarShape } from '../avatar/avatar.types';

const meta = {
  component: AvatarGroup,
  argTypes: {
    max: {
      control: 'number',
    },
    spacing: {
      control: 'inline-radio',
      options: ['compact', 'normal', 'loose'],
    },
    size: {
      control: 'select',
      options: Object.values(AvatarSize),
    },
    shape: {
      control: 'inline-radio',
      options: Object.values(AvatarShape),
    },
  },
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar name='Jane Smith' />
      <Avatar name='John Doe' />
      <Avatar name='Alice Brown' />
      <Avatar name='Bob Chen' />
      <Avatar name='Carol White' />
    </AvatarGroup>
  ),
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    max: 3,
    children: '',
    spacing: 'normal',
  },
};
