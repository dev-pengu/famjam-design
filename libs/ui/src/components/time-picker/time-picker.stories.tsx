import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { TimePicker } from './time-picker.web';
import { TimePickerSize } from './time-picker.types';
import { LabelVariant } from '../input';
import { InputState } from '../input/input-base';

const meta = {
  component: TimePicker,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(TimePickerSize),
    },
    label: {
      control: 'text',
    },
    helperMessage: {
      control: 'text',
    },
    step: {
      control: 'number',
    },
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    labelVariant: {
      control: 'select',
      options: Object.values(LabelVariant),
    },
    state: {
      control: 'select',
      options: Object.values(InputState),
    },
  },
  render: function Component(args) {
    const [, setArgs] = useArgs();

    return (
      <TimePicker
        {...args}
        onChange={(value) => {
          args.onChange?.(value);
          setArgs({ value });
        }}
      />
    );
  },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Start time',
    value: '17:00',
    required: true,
  },
};

export const FifteenMinuteSteps: Story = {
  args: {
    label: 'Start time',
    value: '17:00',
    step: 900,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Start time',
    value: '17:00',
    disabled: true,
  },
};
