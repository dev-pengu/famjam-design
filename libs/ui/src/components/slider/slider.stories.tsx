import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Slider } from './slider.web';
import { SliderVariant, SliderOrientation, SliderLabelDisplay, SliderSize } from './slider.types';

const meta = {
  component: Slider,
  argTypes: {
    range: {
      control: 'boolean',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    marks: {
      control: 'boolean',
    },
    restrictToMarks: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: Object.values(SliderSize),
    },
    variant: {
      control: 'select',
      options: Object.values(SliderVariant),
    },
    orientation: {
      control: 'select',
      options: Object.values(SliderOrientation),
    },
    disabled: {
      control: 'boolean',
    },
    labelDisplay: {
      control: 'select',
      options: Object.values(SliderLabelDisplay),
    },
    defaultValue: {
      control: 'object',
    },
    value: {
      control: 'object',
    },
    minDistance: {
      control: 'number',
    },
    pushable: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  args: {
    defaultValue: 40,
  },
};

export const Controlled: Story = {
  args: {
    value: 50,
  },
  render: (args) => {
    const [, setArgs] = useArgs();

    const onChange = (value: React.SetStateAction<number | [number, number] | undefined>) => {
      if (args.range) args.onChange?.(value as [number, number]);
      else args.onChange?.(value as number);

      setArgs({ value });
    };

    return (
      <Slider
        {...args}
        onChange={onChange as (v: React.SetStateAction<number | undefined>) => void}
      />
    );
  },
};

export const Range: Story = {
  args: {
    range: true,
    defaultValue: [20, 80],
  },
};
