import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './checkbox.web';
import { CheckboxSize } from './checkbox.types';

const meta = {
  component: Checkbox,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(CheckboxSize),
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Checkbox',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Invalid',
    error: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate',
    checked: 'indeterminate',
  },
};
