import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { DatePicker } from './date-picker.web';
import { DatePickerSize } from './date-picker.types';
import { LabelVariant } from '../input';
import { InputState } from '../input/input-base';

const meta = {
  component: DatePicker,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(DatePickerSize),
    },
    label: {
      control: 'text',
    },
    helperMessage: {
      control: 'text',
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
      <DatePicker
        {...args}
        onChange={(value) => {
          args.onChange?.(value);
          setArgs({ value });
        }}
      />
    );
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Start date',
    value: '2026-08-05',
    required: true,
  },
};

export const FloatingLabel: Story = {
  args: {
    label: 'Start date',
    value: '2026-08-05',
    labelVariant: LabelVariant.Float,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Start date',
    value: '2026-08-05',
    disabled: true,
  },
};
