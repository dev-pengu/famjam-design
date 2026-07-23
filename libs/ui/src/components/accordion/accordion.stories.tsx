import { Meta, StoryObj } from '@storybook/react';

import { Accordion } from './accordion.web';
import Typography from '../typography/typography.web';
import { Icon } from '../icon/icon.web';
import { IconName } from '@famjam/icons';

const meta = {
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    summary: 'Shipping info',
    children: <Typography.Body>Standard shipping takes 3-5 business days.</Typography.Body>,
    expandIcon: (
      <Icon
        name={IconName.Add}
        decorative
      />
    ),
    defaultExpanded: true,
  },
};
