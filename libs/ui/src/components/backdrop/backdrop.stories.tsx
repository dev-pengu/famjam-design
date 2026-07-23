import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Backdrop } from './backdrop.web';
import { Spinner, SpinnerSize } from '../spinner/spinner.web';
import { Button, ButtonVariant } from '../button/button.web';

const meta = {
  component: Backdrop,
} satisfies Meta<typeof Backdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Spinner size={SpinnerSize.Large} />,
  },
  render: (args) => {
    const [_, setArgs] = useArgs();

    const handleClose = () => {
      args.onClose?.();
      setArgs({ ...args, open: false });
    };

    const handleOpen = () => {
      setArgs({ ...args, open: true });
    };

    return (
      <>
        <Button
          onClick={handleOpen}
          variant={ButtonVariant.Outline}
        >
          Show backdrop
        </Button>
        <Backdrop
          {...args}
          onClose={handleClose}
        />
      </>
    );
  },
};
