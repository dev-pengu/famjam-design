import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { ColorSwatchPicker } from './color-swatch-picker.web';
import { ColorSwatchPickerSize } from './color-swatch-picker.types';

const meta = {
  component: ColorSwatchPicker,
  argTypes: {
    label: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: Object.values(ColorSwatchPickerSize),
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
  render: function Component(args) {
    const [, setArgs] = useArgs();

    const onChange = (value: string) => {
      args.onChange?.(value);

      setArgs({ value });
    };

    return (
      <ColorSwatchPicker
        {...args}
        onChange={onChange}
      />
    );
  },
} satisfies Meta<typeof ColorSwatchPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Color',
    value: 'blue',
  },
};

export const Small: Story = {
  args: {
    label: 'Color',
    size: ColorSwatchPickerSize.Small,
    value: 'teal',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Color',
    value: 'violet',
    disabled: true,
  },
};
