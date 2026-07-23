import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Shuttle } from './shuttle.web';
import { ShuttleItem } from './shuttle.types';

const items: ShuttleItem[] = [
  {
    value: '1',
    label: 'List item 1',
  },
  {
    value: '2',
    label: 'List item 2',
  },
  {
    value: '3',
    label: 'List item 3',
  },
  {
    value: '4',
    label: 'List item 4',
  },
  {
    value: '5',
    label: 'List item 5',
  },
  {
    value: '6',
    label: 'List item 6',
    disabled: true,
  },
  {
    value: '7',
    label: 'List item 7',
  },
  {
    value: '8',
    label: 'List item 8',
  },
  {
    value: '9',
    label: 'List item 9',
  },
  {
    value: '10',
    label: 'List item 10',
  },
];

const meta = {
  component: Shuttle,
  args: {
    items,
  },
  argTypes: {
    items: {
      control: 'object',
    },
    value: {
      control: 'object',
    },
    sourceLabel: {
      control: 'text',
    },
    targetLabel: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Shuttle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  args: {
    defaultValue: [],
  },
};

export const Controlled: Story = {
  args: {
    value: [],
  },
  render: (args) => {
    const [, setArgs] = useArgs();

    const onChange = (value: string[]) => {
      args.onChange?.(value);
      setArgs({ value });
    };

    return (
      <Shuttle
        {...args}
        onChange={onChange}
      />
    );
  },
};
