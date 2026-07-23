import { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './avatar.web';
import { AvatarSize, AvatarShape } from './avatar.types';
import { Color } from '@famjam/tokens/base.styles';
import { IconName } from '@famjam/icons';

const meta = {
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(AvatarSize),
    },
    shape: {
      control: 'inline-radio',
      options: Object.values(AvatarShape),
    },
    color: {
      control: 'select',
      options: Object.keys(Color),
      mapping: Color,
    },
    src: {
      control: 'text',
    },
    alt: {
      control: 'text',
      if: { arg: 'src', exists: true },
    },
    letter: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    icon: {
      control: 'select',
      options: Object.values(IconName),
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Test Name',
  },
};

export const Image: Story = {
  args: {
    src: 'https://www.loremfaces.net/48/id/1.jpg',
    alt: 'Lorem Ipsum',
  },
};
