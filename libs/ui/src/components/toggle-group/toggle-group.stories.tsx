import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { ToggleGroup, ToggleGroupItem } from './toggle-group.web';
import { Icon } from '../icon/icon.web';
import { IconName } from '@famjam/icons';

const meta = {
  component: ToggleGroup,
  argTypes: {
    multi: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    ariaLabel: {
      control: 'text',
    },
  },
  render: function Component(args) {
    const [, setArgs] = useArgs();

    const onChange = (value: unknown) => {
      args.onChange?.(value as never);
      setArgs({ value });
    };

    return (
      <ToggleGroup
        {...args}
        onChange={onChange}
      >
        {args.children}
      </ToggleGroup>
    );
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  <ToggleGroupItem
    key='left'
    value='left'
  >
    <Icon name={IconName.Add} />
  </ToggleGroupItem>,
  <ToggleGroupItem
    key='center'
    value='center'
  >
    <Icon name={IconName.Remove} />
  </ToggleGroupItem>,
  <ToggleGroupItem
    key='right'
    value='right'
  >
    <Icon name={IconName.Delete} />
  </ToggleGroupItem>,
  <ToggleGroupItem
    key='disabled'
    value='disabled'
    disabled
  >
    <Icon name={IconName.Block} />
  </ToggleGroupItem>,
];

export const Single: Story = {
  args: {
    ariaLabel: 'Alignment',
    defaultValue: 'left',
    children: items,
  },
};

export const Multiple: Story = {
  args: {
    multi: true,
    ariaLabel: 'Alignment',
    defaultValue: ['left'],
    children: items,
  },
};

export const Disabled: Story = {
  args: {
    ariaLabel: 'Alignment',
    defaultValue: 'left',
    disabled: true,
    children: items,
  },
};
