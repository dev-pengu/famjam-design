import { Meta, StoryObj } from '@storybook/react';

import { ProgressBar } from './progress.web';
import { ProgressBarVariant } from './progress.types';
import { Color } from '@famjam/tokens/base.styles';

const meta = {
  component: ProgressBar,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(ProgressBarVariant),
    },
    bgColor: {
      control: 'select',
      options: Object.keys(Color),
      mapping: Color,
    },
    progress: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
    hideText: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bar: Story = {
  args: {
    progress: 0,
    bgColor: Color.SurfaceAccentDark,
  },
};
