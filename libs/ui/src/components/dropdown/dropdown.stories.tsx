import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Dropdown } from './dropdown.web';
import { DropdownSize, DropdownSelectionDisplay, DropdownValueType } from './dropdown.types';
import { LabelVariant } from '../input';
import { InputState } from '../input/input-base';

const meta = {
  component: Dropdown,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(DropdownSize),
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
      options: Object.values(DropdownSelectionDisplay),
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

    const onValueChange = (value: React.SetStateAction<DropdownValueType | DropdownValueType[] | undefined>) => {
      args.onChange?.(value);

      setArgs({ value });
    };

    return (
      <Dropdown
        {...args}
        onChange={onValueChange}
      />
    );
  },
} satisfies Meta<typeof Dropdown>;

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
    selectionDisplay: DropdownSelectionDisplay.Chip,
  },
};

export const MultiIcons: Story = {
  args: {
    options: options,
    value: ['apple', 'banana'],
    onChange: (v) => {},
    label: 'Fruits',
    multiple: true,
    selectionDisplay: DropdownSelectionDisplay.Icon,
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
