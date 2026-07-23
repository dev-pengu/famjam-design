import type { Meta, StoryObj } from '@storybook/react';

import { ButtonGroup } from './button-group.web';
import { ButtonGroupOrientation } from './button-group.types';
import { Button } from '../button/button.web';
import { ButtonVariant, ButtonSize, ButtonColor } from '../button/button.types';

const meta = {
  component: ButtonGroup,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(ButtonSize),
    },
    variant: {
      control: 'select',
      options: Object.values(ButtonVariant),
    },
    orientation: {
      control: 'radio',
      options: Object.values(ButtonGroupOrientation),
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: ButtonSize.Medium,
    variant: ButtonVariant.Ghost,
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button color={ButtonColor.Error}>Button 1</Button>
      <Button>Button 2</Button>
      <Button color={ButtonColor.Success}>Button 3</Button>
    </ButtonGroup>
  ),
};
