import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Stepper, StepperOrientation, StepperLabelPlacement } from './stepper.web';
import { StepDefinition } from './stepper.types';
import Typography from '../typography/typography.web';

const meta = {
  component: Stepper,
  argTypes: {
    orientation: {
      control: 'select',
      options: Object.values(StepperOrientation),
    },
    labelPlacement: {
      control: 'select',
      options: Object.values(StepperLabelPlacement),
    },
    linear: {
      control: 'boolean',
    },
  },
  render: (args) => {
    const [_, setArgs] = useArgs();

    const handleCompleteStep = (index: number) => {
      setArgs({ steps: args.steps.map((s, i) => (index === i ? { ...s, completed: true } : { ...s })) });
    };

    const handleReset = () => {
      setArgs({ steps: args.steps.map((s) => ({ ...s, completed: false })) });
    };

    return (
      <Stepper
        {...args}
        onStepComplete={handleCompleteStep}
        onReset={handleReset}
      />
    );
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: [
      { label: 'Account details', content: <Typography.Body>This is the acount details</Typography.Body> },
      { label: 'Personal info', content: <Typography.Body>This is personal info</Typography.Body>, optional: true },
      { label: 'Review', content: <Typography.Body>Please review the data</Typography.Body> },
    ],
  },
};
