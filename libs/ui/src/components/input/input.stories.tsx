import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Input } from './input.web';
import { LabelVariant, InputVariant, InputSize, InputShape } from './input.types';
import { InputState } from './input-base';
import { InputAdornment } from '../input-adornment/input-adornment.web';
import { Icon } from '../icon/icon.web';
import { IconName } from '@famjam/icons';
import { Button, ButtonVariant } from '../button/button.web';

const meta = {
  component: Input,
  argTypes: {
    labelVariant: {
      control: 'select',
      options: Object.values(LabelVariant),
      description: 'Sets label style',
    },
    variant: {
      control: 'select',
      options: Object.values(InputVariant),
      description: 'Sets input style',
    },
    state: {
      control: 'select',
      options: Object.values(InputState),
      description: 'Sets input state',
    },
    inputSize: {
      control: 'select',
      options: Object.values(InputSize),
    },
    shape: {
      control: 'select',
      options: Object.values(InputShape),
    },
    value: {
      control: 'object',
    },
    defaultValue: {
      control: 'object',
    },
  },
  render: (args) => {
    const [_, setArgs] = useArgs();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setArgs({
        value: e.target.value,
      });
    };

    return (
      <Input
        {...args}
        onChange={handleChange}
      />
    );
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    label: 'Test Label',
    labelVariant: LabelVariant.Primary,
    variant: InputVariant.Text,
    showCharacterCount: true,
    maxLength: 40,
  },
};

export const Number: Story = {
  args: {
    label: 'Number Input',
    labelVariant: LabelVariant.Primary,
    variant: InputVariant.Number,
  },
};

export const TextArea: Story = {
  args: {
    label: 'Test Label',
    labelVariant: LabelVariant.Primary,
    variant: InputVariant.TextArea,
    showCharacterCount: true,
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    labelVariant: LabelVariant.Primary,
    variant: InputVariant.Password,
  },
  render: (args) => {
    const [_, setArgs] = useArgs();

    const handlePasswordToggle = () => {
      const newType = args.variant === InputVariant.Password ? InputVariant.Text : InputVariant.Password;
      setArgs({ variant: newType });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setArgs({
        value: e.target.value,
      });
    };

    return (
      <Input
        {...args}
        onChange={handleChange}
      >
        <InputAdornment
          position='start'
          disablePointerEvents
          style={{ paddingLeft: '8px' }}
        >
          <Icon
            name={IconName.Lock}
            size={22}
          />
        </InputAdornment>
        <InputAdornment position='end'>
          <Button
            onClick={handlePasswordToggle}
            variant={ButtonVariant.Text}
          >
            <Icon
              name={args.variant === InputVariant.Text ? IconName.VisibilityOff : IconName.Visibility}
              size={18}
            />
          </Button>
        </InputAdornment>
      </Input>
    );
  },
};
