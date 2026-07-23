import { Meta, StoryObj } from '@storybook/react';

import { Divider, DividerChildAlign, DividerColor, DividerOrientation, DividerVariant } from './divider.web';
import { Icon } from '../icon/icon.web';
import { Chip } from '../chip/chip.web';
import { IconName } from '@famjam/icons';

const meta = {
  component: Divider,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(DividerVariant),
    },
    orientation: {
      control: 'inline-radio',
      options: Object.values(DividerOrientation),
    },
    color: {
      control: 'select',
      options: Object.values(DividerColor),
    },
    childAlign: {
      control: 'inline-radio',
      options: Object.values(DividerChildAlign),
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: DividerOrientation.Vertical,
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        height: '2rem',
        alignItems: 'center',
        width: '72px',
        border: '1px solid var(--color-border-primary)',
        borderRadius: 'var(--radius-4)',
      }}
    >
      <Icon
        name={IconName.Calendar}
        size={24}
        style={{ paddingLeft: '4px' }}
      />
      <Divider {...args} />
      <Icon
        name={IconName.Chat}
        size={24}
        style={{ paddingRight: '4px' }}
      />
    </div>
  ),
};

export const Children: Story = {
  args: {
    childAlign: DividerChildAlign.Center,
  },
  render: (args) => (
    <Divider {...args}>
      <Chip
        label='OR'
        dismissable={false}
      />
    </Divider>
  ),
};
