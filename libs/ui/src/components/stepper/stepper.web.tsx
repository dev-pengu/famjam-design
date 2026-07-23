import React from 'react';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { IconName } from '@famjam/icons';
import { Icon } from '../icon/icon.web';
import { Typography } from '../typography/typography.web';
import { TypographySize } from '../typography/typography.types';
import { Collapse } from '../collapse/collapse.web';
import {
  StepperProps,
  StepperOrientation,
  StepperLabelPlacement,
  StepIconProps,
  StepLabelProps,
  StepConnectorProps,
  StepDefinition,
} from './stepper.types';
import { Color } from '@famjam/tokens/base.styles';
import { useStepperState } from './stepper.web.hooks';
import styles from './stepper.web.module.css';
import { Button, ButtonSize, ButtonVariant } from '../button';
import { ProgressBar, ProgressBarVariant } from '../progress';
import { roundToPrecision } from '../../utils/math-utils';

export { StepperOrientation, StepperLabelPlacement };

const StepIcon = ({ index, active, completed, error, icon }: StepIconProps) => {
  useTheme();

  return (
    <span
      className={cx(
        styles.stepIcon,
        active && styles.stepIconActive,
        completed && styles.stepIconCompleted,
        error && styles.stepIconError,
      )}
      aria-hidden
    >
      {error ? (
        <Icon
          name={IconName.Error}
          decorative
        />
      ) : completed ? (
        (icon ?? (
          <Icon
            name={IconName.Check}
            decorative
          />
        ))
      ) : icon ? (
        icon
      ) : (
        <Typography.Body
          as='span'
          className={styles.stepNumber}
        >
          {index + 1}
        </Typography.Body>
      )}
    </span>
  );
};

const StepLabel = ({ label, optional, error, errorText, active, completed }: StepLabelProps) => {
  useTheme();
  return (
    <span className={styles.stepLabelWrapper}>
      <span
        className={cx(
          styles.stepLabel,
          active && styles.stepLabelActive,
          completed && styles.stepLabelCompleted,
          error && styles.stepLabelError,
        )}
      >
        {label}
      </span>
      {optional && !error && (
        <Typography.Body
          size={TypographySize.Small}
          className={styles.stepOptional}
        >
          Optional
        </Typography.Body>
      )}
      {error && errorText && (
        <Typography.Body
          size={TypographySize.Small}
          className={styles.stepErrorText}
        >
          {errorText}
        </Typography.Body>
      )}
    </span>
  );
};

const StepConnector = ({ orientation, completed, active, className }: StepConnectorProps) => {
  useTheme();
  return (
    <span
      className={cx(
        styles.connector,
        styles[`connector-${orientation}`],
        completed && styles.connectorCompleted,
        active && styles.connectorActive,
        className,
      )}
      aria-hidden
    >
      <span className={styles.connectorLine} />
    </span>
  );
};

// TODO: when there is one step left in non-linear mode, clicking next takes you to complete state
export const Stepper = ({
  steps,
  activeStep: controlledStep,
  onChange,
  defaultActiveStep = 0,
  orientation = StepperOrientation.Horizontal,
  labelPlacement = StepperLabelPlacement.Right,
  linear = true,
  onReset,
  onStepComplete,
  className,
}: Readonly<StepperProps>) => {
  const { theme } = useTheme();

  const isVertical = orientation === StepperOrientation.Vertical;
  const isLabelBelow = labelPlacement === StepperLabelPlacement.Below && !isVertical;

  const { activeStep, goNext, goBack, goTo, skip, reset, isCompleted, completeStep, completed, requiredSteps } =
    useStepperState({
      activeStep: controlledStep,
      defaultActiveStep,
      onChange,
      steps,
      linear,
      onStepComplete,
    });

  const requiredCompleted = steps?.filter((s) => !s.optional).reduce((acc, s) => acc + (s.completed ? 1 : 0), 0);

  const handleReset = () => {
    reset();
    onReset?.();
  };

  const handleCompleteStep = () => {
    completeStep(activeStep);
    goNext(activeStep);
  };

  return (
    <div
      className={cx(styles.stepper, styles[orientation], isLabelBelow && styles.labelBelow, className)}
      aria-label='Progress stepper'
    >
      {/* Step track */}
      <ol className={styles.stepList}>
        {steps.map((step: StepDefinition, index: number) => {
          const isActive = index === activeStep;
          const isCompleted = step.completed || (!linear ? false : index < activeStep);
          const isError = !!step.error;

          const canNavigate = !linear || index <= activeStep || steps.slice(0, index).every((s) => s.completed);

          return (
            <React.Fragment key={index}>
              {(!isVertical || activeStep !== index - 1) && index > 0 && (
                <li
                  className={styles.connectorStep}
                  aria-hidden
                >
                  <StepConnector
                    orientation={orientation}
                    completed={isCompleted}
                    active={isActive}
                    className={styles[`connector-${labelPlacement}Label`]}
                  />
                </li>
              )}
              <li
                className={cx(
                  styles.step,
                  isActive && styles.stepActive,
                  isCompleted && styles.stepCompleted,
                  isError && styles.stepError,
                )}
              >
                {/* Step header — icon + label */}
                <div className={cx(styles.stepHeader, isLabelBelow && styles.stepHeaderBelow)}>
                  {/* Icon — clickable in non-linear or when navigable */}
                  {canNavigate && !linear ? (
                    <button
                      type='button'
                      className={styles.stepIconButton}
                      onClick={() => goTo(index)}
                      aria-current={isActive ? 'step' : undefined}
                      aria-label={`Go to step ${index + 1}: ${step.label}`}
                    >
                      <StepIcon
                        index={index}
                        active={isActive}
                        completed={isCompleted}
                        error={isError}
                        icon={step.icon}
                      />
                    </button>
                  ) : (
                    <span aria-current={isActive ? 'step' : undefined}>
                      <StepIcon
                        index={index}
                        active={isActive}
                        completed={isCompleted}
                        error={isError}
                        icon={step.icon}
                      />
                    </span>
                  )}

                  <StepLabel
                    label={step.label}
                    optional={step.optional}
                    error={isError}
                    errorText={step.errorText}
                    active={isActive}
                    completed={isCompleted}
                  />
                </div>

                {/* Vertical content panel */}
                {isVertical && (
                  <div className={styles.stepContentWrapper}>
                    {/* Vertical connector line runs alongside the content */}
                    {index < steps.length - 1 && (
                      <div
                        className={styles.stepContentLine}
                        aria-hidden
                      />
                    )}
                    <Collapse open={isActive}>
                      <div className={styles.stepContent}>
                        {step.content}
                        {/* Inline controls for vertical stepper */}
                        <div className={styles.stepActions}>
                          {!linear &&
                            (steps[activeStep]?.completed ? (
                              <Typography.Body>Step already completed</Typography.Body>
                            ) : (
                              <Button
                                variant={ButtonVariant.Outline}
                                onClick={handleCompleteStep}
                                size={ButtonSize.Small}
                              >
                                {requiredCompleted >= requiredSteps - 1 && !steps[activeStep]?.optional
                                  ? 'Finish'
                                  : 'Complete Step'}
                              </Button>
                            ))}
                          <Button
                            variant={ButtonVariant.Outline}
                            onClick={() => goNext()}
                            disabled={isError}
                            size={ButtonSize.Small}
                          >
                            {linear && activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                          </Button>
                          {index > 0 && (
                            <Button
                              variant={ButtonVariant.Ghost}
                              onClick={goBack}
                              size={ButtonSize.Small}
                            >
                              Back
                            </Button>
                          )}
                          {step.optional && (
                            <Button
                              variant={ButtonVariant.Ghost}
                              onClick={skip}
                              size={ButtonSize.Small}
                            >
                              Skip
                            </Button>
                          )}
                        </div>
                      </div>
                    </Collapse>
                  </div>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
      {isVertical && activeStep === -1 && <Typography.Body>All steps completed.</Typography.Body>}
      {isVertical && activeStep !== -1 && (
        <ProgressBar
          progress={completed}
          maxValue={steps.length}
          bgColor={theme.tokens?.Color.SurfaceBrandSecondaryDark ?? Color.SurfaceBrandSecondaryDark}
          height={16}
          hideText
          variant={steps.length <= 5 ? ProgressBarVariant.Dot : ProgressBarVariant.Bar}
          className={styles.progressWrapper}
        />
      )}

      {/* Horizontal connectors sit between steps in the list */}
      {!isVertical && (
        <>
          <div className={styles.stepContent}>
            {activeStep === -1 ? (
              <Typography.Body>All steps completed.</Typography.Body>
            ) : (
              steps && steps[activeStep]?.content
            )}
          </div>
        </>
      )}

      {/* Completion state */}
      {isCompleted && (
        <div className={styles.completionMessage}>
          {/* TODO convert this to text variant when added*/}
          <Button
            variant={ButtonVariant.Ghost}
            onClick={handleReset}
            size={ButtonSize.Small}
          >
            Reset
          </Button>
        </div>
      )}

      {/* Horizontal navigation controls */}
      {!isVertical && !isCompleted && (
        <div className={styles.horizontalControls}>
          <Button
            variant={ButtonVariant.Ghost}
            onClick={goBack}
            disabled={activeStep === 0}
            size={ButtonSize.Small}
          >
            Back
          </Button>
          <div className={styles.progressWrapper}>
            <ProgressBar
              progress={completed}
              maxValue={steps.length}
              bgColor={theme.tokens?.Color.SurfaceBrandSecondaryDark ?? Color.SurfaceBrandSecondaryDark}
              height={16}
              hideText
              variant={steps.length <= 5 ? ProgressBarVariant.Dot : ProgressBarVariant.Bar}
            />
          </div>
          <div className={styles.horizontalControlsRight}>
            {steps[activeStep]?.optional && (
              <Button
                onClick={skip}
                variant={ButtonVariant.Ghost}
                size={ButtonSize.Small}
              >
                Skip
              </Button>
            )}
            <Button
              onClick={() => goNext()}
              variant={ButtonVariant.Outline}
              disabled={!!steps[activeStep]?.error}
              size={ButtonSize.Small}
            >
              {linear && activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
            {!linear &&
              (steps[activeStep]?.completed ? (
                <Typography.Body>Step already completed</Typography.Body>
              ) : (
                <Button
                  variant={ButtonVariant.Outline}
                  onClick={handleCompleteStep}
                  size={ButtonSize.Small}
                >
                  {requiredCompleted >= requiredSteps - 1 && !steps[activeStep]?.optional ? 'Finish' : 'Complete Step'}
                </Button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
