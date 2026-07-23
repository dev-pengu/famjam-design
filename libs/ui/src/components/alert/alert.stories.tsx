import { Meta, StoryObj } from '@storybook/react';

import { Alert } from './alert.web';
import { AlertSeverity, AlertVariant } from './alert.types';
import { Button, ButtonSize, ButtonVariant } from '../button/button.web';
import { Color } from '@famjam/tokens/base.styles';
import { Icon } from '../icon/icon.web';
import { IconName } from '@famjam/icons';

const meta = {
  component: Alert,
  argTypes: {
    severity: {
      control: 'select',
      options: Object.values(AlertSeverity),
    },
    variant: {
      control: 'select',
      options: Object.values(AlertVariant),
    },
    color: {
      control: 'select',
      options: Object.keys(Color),
      mapping: Color,
    },
    bgColor: {
      control: 'select',
      options: Object.keys(Color),
      mapping: Color,
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is an Alert',
    severity: AlertSeverity.Success,
  },
};

export const Dismissible: Story = {
  args: {
    children: 'Dismissible Alert',
    severity: AlertSeverity.Info,
    title: 'Info',
    onClose: () => {},
  },
};

export const CustomAction: Story = {
  args: {
    children: 'Custom action Alert',
    severity: AlertSeverity.Info,
    action: (
      <Button
        variant={ButtonVariant.Glass}
        size={ButtonSize.Small}
      >
        Undo
      </Button>
    ),
  },
};

export const CustomIconAndColor: Story = {
  args: {
    children: 'Custom icon on an Alert',
    severity: AlertSeverity.Info,
    icon: (
      <Icon
        name={IconName.Calendar}
        size={24}
      />
    ),
    color: Color.SurfaceBrandSecondaryDark,
    bgColor: Color.SurfaceBrandSecondaryLight,
  },
};
