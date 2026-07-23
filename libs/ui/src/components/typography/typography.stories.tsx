import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from './typography.web';
import {
  HeadingTag,
  TypographyBodyProps,
  TypographyDisplayProps,
  TypographyHeadlineProps,
  TypographySize,
  TypographyTitleProps,
} from './typography.types';

const meta = {
  component: Typography,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(TypographySize),
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  args: {
    children: 'Display Typography',
    size: TypographySize.Large,
    bold: false,
    muted: false,
  },
  render: (args) => (
    <Typography.Display
      {...(args as TypographyDisplayProps & React.HtmlHTMLAttributes<HTMLElement> & { as?: HeadingTag })}
    >
      {args.children}
    </Typography.Display>
  ),
};

export const Headline: Story = {
  args: {
    children: 'Headline Typography',
    size: TypographySize.Large,
    bold: false,
    muted: false,
  },
  render: (args) => (
    <Typography.Headline
      {...(args as TypographyHeadlineProps & React.HtmlHTMLAttributes<HTMLElement> & { as?: HeadingTag })}
    >
      {args.children}
    </Typography.Headline>
  ),
};

export const Title: Story = {
  args: {
    children: 'Headline Typography',
    size: TypographySize.Medium,
    bold: false,
    muted: false,
  },
  render: (args) => (
    <Typography.Title {...(args as TypographyTitleProps & React.HtmlHTMLAttributes<HTMLElement> & { as?: string })}>
      {args.children}
    </Typography.Title>
  ),
};

export const Body: Story = {
  args: {
    children: 'Headline Typography',
    size: TypographySize.Medium,
    bold: false,
    muted: false,
  },
  render: (args) => (
    <Typography.Body {...(args as TypographyBodyProps & React.HtmlHTMLAttributes<HTMLElement> & { as?: string })}>
      {args.children}
    </Typography.Body>
  ),
};
