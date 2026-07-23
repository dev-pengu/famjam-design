import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { CheckboxGroup } from './checkbox-group.web';
import { CheckboxGroupOrientation } from './checkbox-group.types';
import { Checkbox } from '../checkbox/checkbox.web';
import { CheckboxSize } from '../checkbox/checkbox.web';

const meta = {
  component: CheckboxGroup,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(CheckboxSize),
    },
    orientation: {
      control: 'radio',
      options: Object.values(CheckboxGroupOrientation),
    },
    error: {
      control: 'boolean',
    },
    checkedId: {
      control: 'text',
    },
    defaultCheckedId: {
      control: 'text',
    },
    exclusive: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: CheckboxSize.Medium,
    label: 'Group Label',
    required: true,
    helperText: 'Choose one',
    children: [
      <Checkbox label='Option 1' />,
      <Checkbox
        label='Option 2'
        disabled
      />,
      <Checkbox label='Option 3' />,
      <Checkbox label='Option 4' />,
    ],
  },
  render: (args) => {
    const [_, setArgs] = useArgs();

    const handleChange = (id: React.SetStateAction<string | undefined>) => {
      setArgs({
        checkedId: id,
      });
    };
    return (
      <CheckboxGroup
        {...args}
        onCheckedIdChange={handleChange}
      >
        {args.children}
      </CheckboxGroup>
    );
  },
};
