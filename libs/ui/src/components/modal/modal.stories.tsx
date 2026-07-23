import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Modal, ModalActions, ModalContent, ModalContentText, ModalTitle } from './modal.web';
import { ModalSize, ModalSlideFrom } from './modal.types';
import { Button, ButtonVariant } from '../button/button.web';

const meta = {
  component: Modal,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(ModalSize),
    },
    slideFrom: {
      control: 'select',
      options: Object.values(ModalSlideFrom),
    },
    open: {
      control: 'boolean',
    },
    isAlert: {
      control: 'boolean',
    },
    closeable: {
      control: 'boolean',
    },
    fadeDuration: {
      control: 'number',
    },
  },
  render: (args) => {
    const [_, setArgs] = useArgs();

    const handleOpen = () => {
      setArgs({ ...args, open: true });
    };

    const handleClose = () => {
      setArgs({ ...args, open: false });
    };

    return (
      <>
        <Button
          variant={ButtonVariant.Outline}
          onClick={handleOpen}
        >
          Open Modal
        </Button>
        <Modal
          {...args}
          onClose={handleClose}
        />
      </>
    );
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: [
        <ModalTitle>Confirm deletion</ModalTitle>,
        <ModalContent>
            <ModalContentText>
                Are you sure you want to delete this item? This action cannot be undone.
            </ModalContentText>
        </ModalContent>,
        <ModalActions>
            <Button variant={ButtonVariant.Outline} onClick={() => console.log('closed dialog')}>
                Cancel
            </Button>
            <Button variant={ButtonVariant.Filled} onClick={() => console.log('handle delete')}>
                Delete
            </Button>
        </ModalActions>
    ],
    onClose: () => {},
    open: false,
  },
};
