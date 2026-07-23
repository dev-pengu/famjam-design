import { act, SetStateAction, useCallback } from 'react';
import { useControlled } from '../../hooks';
import { StepDefinition } from './stepper.types';

export const useStepperState = ({
  activeStep: controlledStep,
  defaultActiveStep = 0,
  onChange,
  steps,
  linear,
  onStepComplete,
}: {
  activeStep?: number;
  defaultActiveStep?: number;
  onChange?: (value: SetStateAction<number | undefined>) => void;
  steps: StepDefinition[];
  linear?: boolean;
  onStepComplete?: (index: number) => void;
}) => {
  const [activeStep, setActiveStep] = useControlled({
    controlledValue: controlledStep,
    defaultValue: defaultActiveStep,
    onChange,
  });

  const goNext = useCallback((justCompletedIndex?: number) => {
    if (linear) {
      onStepComplete?.(activeStep ?? 0);
    }

    const currentIndex = activeStep ?? 0;

    const effectiveSteps = steps?.map((s, i) => 
      i === justCompletedIndex ? { ...s, completed: true } : s
    ) ?? [];

    const requiredSteps = effectiveSteps?.filter((s) => !s.optional) ?? [];
    const allRequiredComplete = requiredSteps.every((s) => s.completed);

    const candidates =
      effectiveSteps
        ?.map((s, i) => ({ ...s, index: i }))
        .filter((s) => {
          if (s.index === currentIndex) return false;
          if (s.completed) return false;
          if (s.optional && allRequiredComplete) return false;
          return true;
        }) ?? [];

    if (candidates.length === 0) {
      setActiveStep(-1);
      return;
    }

    const after = candidates.filter((s) => s.index > currentIndex);
    const before = candidates.filter((s) => s.index < currentIndex);
    const ordered = [...after, ...before];

    setActiveStep(ordered[0]?.index);
  }, [activeStep, steps, linear, onStepComplete, setActiveStep]);

  const goBack = useCallback(() => {
    setActiveStep((prev) => Math.max(0, (prev ?? 0) - 1));
  }, [setActiveStep]);

  const goTo = useCallback(
    (index: number) => {
      if (linear) {
        const canNavigate = index <= (activeStep ?? 0) || steps?.slice(0, index).every((s) => s.completed);
        if (!canNavigate) return;
      }
      setActiveStep(index);
    },
    [linear, activeStep, steps, setActiveStep],
  );

  const skip = useCallback(() => {
    const step = steps![activeStep ?? 0];
    if (!step?.optional) return;
    goNext();
  }, [activeStep, steps, goNext]);

  const reset = useCallback(() => setActiveStep(0), [setActiveStep]);

  const completeStep = useCallback(
    (index: number) => {
      onStepComplete?.(index);
    },
    [onStepComplete],
  );

  const isCompleted = steps?.every((s) => s.completed || s.optional);

  const completed = steps?.reduce((acc, s) => acc + (s.completed ? 1 : 0), 0);

  const requiredSteps = steps?.reduce((acc, s) => acc + (s.optional ? 0 : 1), 0);

  return {
    activeStep: activeStep ?? 0,
    goNext,
    goBack,
    goTo,
    skip,
    reset,
    isCompleted,
    completeStep,
    completed,
    requiredSteps,
  };
};
