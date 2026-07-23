import { Meta, StoryObj } from '@storybook/react';

import { AccordionGroup } from './accordion-group.web';
import { Accordion } from '../accordion/accordion.web';
import Typography from '../typography/typography.web';

const meta = {
  component: AccordionGroup,
} satisfies Meta<typeof AccordionGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <Accordion
        summary='Section one'
        id='panel-0'
      >
        <Typography.Body>Content one.</Typography.Body>
      </Accordion>,
      <Accordion
        summary='Section two'
        id='panel-1'
      >
        <Typography.Body>Content two.</Typography.Body>
      </Accordion>,
      <Accordion
        summary='Section three'
        id='panel-2'
      >
        <Typography.Body>Content three.</Typography.Body>
      </Accordion>,
    ],
    exclusive: true,
    defaultExpandedId: 'panel-0',
  },
};
