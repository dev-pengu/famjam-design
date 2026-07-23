import { Meta, StoryObj } from '@storybook/react';

import { Link } from './link.web';
import { TypographySize, TypographyScale } from '../typography/typography.types';
import { LinkUnderline } from './link.types';

const meta = {
  component: Link,
  argTypes: {
    children: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: Object.values(TypographyScale),
    },
    size: {
      control: 'select',
      options: Object.values(TypographySize),
    },
    bold: {
      control: 'boolean',
    },
    underline: {
      control: 'inline-radio',
      options: Object.values(LinkUnderline),
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Link',
    underline: LinkUnderline.Always,
  },
};
