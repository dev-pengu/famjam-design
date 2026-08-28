import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Select } from './select.web';
import { SelectSize, SelectSelectionDisplay, SelectValueType } from './select.types';
import { InputShape, LabelVariant } from '../input';
import { InputState } from '../input/input-base';

const meta = {
  component: Select,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(SelectSize),
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
    readOnly: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    multiple: {
      control: 'boolean',
    },
    dropup: {
      control: 'boolean',
    },
    selectionDisplay: {
      control: 'select',
      options: Object.values(SelectSelectionDisplay),
    },
    labelVariant: {
      control: 'select',
      options: Object.values(LabelVariant),
    },
    state: {
      control: 'select',
      options: Object.values(InputState),
    },
    shape: {
      control: 'select',
      options: Object.values(InputShape),
    },
  },
  render: function Component(args) {
    const [, setArgs] = useArgs();

    const onValueChange = (value: React.SetStateAction<SelectValueType | SelectValueType[] | undefined>) => {
      args.onChange?.(value);

      setArgs({ value });
    };

    return (
      <Select
        {...args}
        onChange={onValueChange}
      />
    );
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
];

export const Default: Story = {
  args: {
    options: options,
    value: 'banana',
    onChange: (v) => {},
    label: 'Fruit',
    placeholder: 'Select a fruit',
    helperMessage: 'Pick your favourite',
    required: true,
  },
};

export const MultiChips: Story = {
  args: {
    options: options,
    value: ['apple', 'banana'],
    onChange: (v) => {},
    label: 'Fruits',
    multiple: true,
    selectionDisplay: SelectSelectionDisplay.Chip,
  },
};

export const MultiIcons: Story = {
  args: {
    options: options,
    value: ['apple', 'banana'],
    onChange: (v) => {},
    label: 'Fruits',
    multiple: true,
    selectionDisplay: SelectSelectionDisplay.Icon,
  },
};

export const Dropup: Story = {
  args: {
    options: options,
    value: 'banana',
    onChange: (v) => {},
    label: 'Fruit',
    placeholder: 'Select a fruit',
    helperMessage: 'Pick your favourite',
    required: true,
    dropup: true,
  },
};
