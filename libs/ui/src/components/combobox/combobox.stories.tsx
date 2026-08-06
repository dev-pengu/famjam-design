import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Combobox } from './combobox.web';
import { ComboboxSize } from './combobox.types';
import { LabelVariant } from '../input';
import { InputState } from '../input/input-base';

const meta = {
  component: Combobox,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(ComboboxSize),
    },
    label: {
      control: 'text',
    },
    helperMessage: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    noOptionsMessage: {
      control: 'text',
    },
    readOnly: {
      control: 'boolean',
    },
    required: {
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

    const onValueChange = (value: React.SetStateAction<string | undefined>) => {
      args.onChange?.(value);

      setArgs({ value });
    };

    return (
      <Combobox
        {...args}
        onChange={onValueChange}
      />
    );
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { label: 'Eastern Time (US & Canada)', value: 'Eastern Time (US & Canada)' },
  { label: 'Central Time (US & Canada)', value: 'Central Time (US & Canada)' },
  { label: 'Mountain Time (US & Canada)', value: 'Mountain Time (US & Canada)' },
  { label: 'Pacific Time (US & Canada)', value: 'Pacific Time (US & Canada)' },
  { label: 'London', value: 'London' },
  { label: 'Paris', value: 'Paris' },
  { label: 'Tokyo', value: 'Tokyo' },
];

export const Default: Story = {
  args: {
    options: options,
    value: 'Central Time (US & Canada)',
    label: 'Timezone',
    placeholder: 'Search for a timezone',
    helperMessage: 'Used for displaying event times',
    required: true,
  },
};

export const FloatingLabel: Story = {
  args: {
    options: options,
    value: 'Central Time (US & Canada)',
    label: 'Timezone',
    labelVariant: LabelVariant.Float,
  },
};

export const Empty: Story = {
  args: {
    options: options,
    label: 'Timezone',
    placeholder: 'Search for a timezone',
  },
};

export const Disabled: Story = {
  args: {
    options: options,
    value: 'Central Time (US & Canada)',
    label: 'Timezone',
    state: InputState.Disabled,
  },
};
