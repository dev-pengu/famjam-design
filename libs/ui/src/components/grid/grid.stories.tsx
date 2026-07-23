import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from './grid.web';

import { Box } from '../box/box.web';
import { BoxVariant } from '../box/box.web';
import { Body } from '../typography/typography.web';

const meta = {
  component: Grid,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

function Cell({ label }: { label: string }) {
  return (
    <Box
      style={{
        background: 'var(--color-surface-brand-secondary-light)',
        borderRadius: 4,
        minHeight: 64,
        border: '1px dashed var(--color-button-outline-border-default, #5c6bc0)',
        padding: '12px 8px',
        justifyContent: 'center',
      }}
      variant={BoxVariant.Center}
    >
      <Body>{label}</Body>
    </Box>
  );
}

export const Default: Story = {
  render: (args) => (
    <Grid {...args}>
      <Grid.Row>
        {Array.from({ length: 12 }, (_, i) => (
          <Grid.Column
            key={i}
            span={1}
          >
            <Cell label={`${i + 1}`} />
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  ),
};
