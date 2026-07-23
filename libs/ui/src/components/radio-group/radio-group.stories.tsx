import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { RadioGroup } from './radio-group.web';
import { RadioGroupOrientation } from './radio-group.types';
import { RadioItem } from '../radio/radio.web';
import { RadioSize } from '../radio/radio.types';

const meta = {
  component: RadioGroup,
  argTypes: {
    defaultValue: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: Object.values(RadioSize),
    },
    label: {
      control: 'text',
    },
    required: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    helperText: {
      control: 'text',
    },
    orientation: {
      control: 'inline-radio',
      options: Object.values(RadioGroupOrientation),
    },
    radioLabelPosition: {
      control: 'inline-radio',
      options: ['start', 'end'],
    },
  },
  render: function Component(args) {
    const [, setArgs] = useArgs();

    const onValueChange = (value: string) => {
      args.onValueChange?.(value);

      setArgs({ value });
    };

    return (
      <div style={{ width: '125px' }}>
        <RadioGroup
          {...args}
          onValueChange={onValueChange}
        >
          {args.children}
        </RadioGroup>
      </div>
    );
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: RadioSize.Medium,
    value: '1',
    children: [
      <RadioItem
        value='1'
        label='First Item'
      />,
      <RadioItem
        value='2'
        label='Second Item'
      />,
      <RadioItem
        value='3'
        label='Third Item'
      />,
      <RadioItem
        value='4'
        label='Disabled'
        disabled
      />,
    ],
  },
};

export const Horizontal: Story = {
  args: {
    size: RadioSize.Medium,
    value: '2',
    orientation: RadioGroupOrientation.Horizontal,
    children: [
      <RadioItem
        value='1'
        label='First Item'
      />,
      <RadioItem
        value='2'
        label='Second Item'
      />,
      <RadioItem
        value='3'
        label='Third Item'
      />,
      <RadioItem
        value='4'
        label='Disabled'
        disabled
      />,
    ],
  },
};

export const Error: Story = {
  args: {
    size: RadioSize.Medium,
    value: '1',
    children: [
      <RadioItem
        value='1'
        label='First Item'
      />,
      <RadioItem
        value='2'
        label='Second Item'
      />,
      <RadioItem
        value='3'
        label='Third Item'
      />,
      <RadioItem
        value='4'
        label='Disabled'
        disabled
      />,
    ],
  },
};

export const Disabled: Story = {
  args: {
    size: RadioSize.Medium,
    value: '1',
    disabled: true,
    children: [
      <RadioItem
        value='1'
        label='First Item'
      />,
      <RadioItem
        value='2'
        label='Second Item'
      />,
      <RadioItem
        value='3'
        label='Third Item'
      />,
      <RadioItem
        value='4'
        label='Disabled'
        disabled
      />,
    ],
  },
};
