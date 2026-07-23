import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Snackbar } from './snackbar.web';

import { Button, ButtonVariant, ButtonSize } from '../button/button.web';
import { Alert } from '../alert/alert.web';
import { AlertSeverity } from '../alert/alert.types';

const meta = {
  component: Snackbar,
  argTypes: {
    maxStack: {
      control: 'number',
    },
    onToastClose: {
      control: 'object',
    },
    message: {
      control: 'text',
    },
    open: {
      control: 'boolean',
    },
    children: {
      control: 'object',
    },
    action: {
      control: 'object',
    },
    autoHideDuration: {
      control: 'object',
    },
    anchorOrigin: {
      control: 'object',
    },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleMode: Story = {
  args: {
    open: false,
    message: 'Changes saved successfully',
    autoHideDuration: 4000,
    anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
  },
  render: (args) => {
    const [_, setArgs] = useArgs();

    const handleOpenClick = () => {
      setArgs({
        ...args,
        open: true,
      });
    };

    const handleCloseClick = () => {
      setArgs({
        ...args,
        open: false,
      });
    };

    return (
      <>
        <Button
          onClick={handleOpenClick}
          variant={ButtonVariant.Outline}
        >
          Show Toast
        </Button>
        <Snackbar
          {...args}
          onClose={handleCloseClick}
          action={
            <Button
              size={ButtonSize.Small}
              variant={ButtonVariant.Outline}
              onClick={() => console.log('undo')}
            >
              Undo
            </Button>
          }
        />
      </>
    );
  },
};

export const SingleWithChild: Story = {
  args: {
    open: false,
    autoHideDuration: 5000,
    anchorOrigin: { horizontal: 'center', vertical: 'top' },
    children: <Alert severity={AlertSeverity.Error}>Something went wrong - please try again.</Alert>,
  },
  render: (args) => {
    const [_, setArgs] = useArgs();

    const handleOpenClick = () => {
      setArgs({
        ...args,
        open: true,
      });
    };

    const handleCloseClick = () => {
      setArgs({
        ...args,
        open: false,
      });
    };

    return (
      <>
        <Button
          onClick={handleOpenClick}
          variant={ButtonVariant.Outline}
        >
          Show Toast
        </Button>
        <Snackbar
          {...args}
          onClose={handleCloseClick}
        />
      </>
    );
  },
};

export const MultiMode: Story = {
  args: {
    toasts: [],
    maxStack: 3,
    autoHideDuration: 4000,
    anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
  },
  render: (args) => {
    const [_, setArgs] = useArgs();

    const handleAddToast = (message: string) => {
      setArgs({
        ...args,
        toasts: [...(args.toasts ?? []), { id: crypto.randomUUID(), message }],
      });
    };

    const removeToast = (id: string) => {
      setArgs({
        ...args,
        toasts: args.toasts?.filter((t) => t.id !== id),
      });
    };

    return (
      <>
        <Button
          onClick={() => handleAddToast('New toast added!')}
          variant={ButtonVariant.Outline}
        >
          Add Toast
        </Button>
        <Snackbar
          {...args}
          onToastClose={removeToast}
        />
      </>
    );
  },
};
