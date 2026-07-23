export enum StepperOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum StepperLabelPlacement {
  Below = 'below',
  Right = 'right',
}

export type StepState = {
  completed?: boolean;
  error?: boolean;
  errorText?: string;
};

export type StepDefinition = {
  label: string;
  optional?: boolean;
  icon?: React.ReactNode;
  content?: React.ReactNode;
} & StepState;

export type StepperProps = {
  steps: StepDefinition[];
  activeStep?: number;
  onChange?: (step: React.SetStateAction<number | undefined>) => void
  defaultActiveStep?: number;
  orientation?: StepperOrientation;
  labelPlacement?: StepperLabelPlacement;
  linear?: boolean;
  onReset?: () => void;
  onStepComplete?: (index: number) => void;
  className?: string;
};

export type StepIconProps = {
  index: number;
  active: boolean;
  completed: boolean;
  error: boolean;
  icon?: React.ReactNode;
};

export type StepLabelProps = {
  label: string;
  optional?: boolean;
  error?: boolean;
  errorText?: string;
  active: boolean;
  completed: boolean;
};

export type StepConnectorProps = {
  orientation: StepperOrientation;
  completed: boolean;
  active: boolean;
  className?: string;
};
