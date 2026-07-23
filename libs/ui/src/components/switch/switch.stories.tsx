import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Switch } from './switch.web';
import { SwitchLabelPlacement, SwitchSize, SwitchVariant } from './switch.types';

const meta = {
  component: Switch,
  argTypes: {
    checked: {
      control: 'boolean',
    },
    defaultChecked: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: Object.values(SwitchSize),
    },
    variant: {
      control: 'select',
      options: Object.values(SwitchVariant),
    },
    label: {
      control: 'text',
    },
    labelPlacement: {
      control: 'select',
      options: Object.values(SwitchLabelPlacement),
    },
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Controlled: Story = {
  args: {
    checked: false,
  },
  render: (args) => {
    const [, setArgs] = useArgs();

    const onChange = (value: boolean) => {
      args.onChange?.(value);
      setArgs({ checked: value });
    };

    return (
      <Switch
        {...args}
        onChange={onChange}
      />
    );
  },
};
