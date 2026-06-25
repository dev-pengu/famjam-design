import { IconName } from '@famjam/icons';

export enum InputState {
  Default = 'default',
  Active = 'active',
  Success = 'success',
  Error = 'error',
  Disabled = 'disabled',
}

export const helperPayloadMap = {
  [InputState.Active]: undefined,
  [InputState.Success]: {
    testId: 'helper-success',
    iconName: 'check' as IconName,
  },
  [InputState.Error]: {
    testId: 'helper-error',
    iconName: 'error' as IconName,
  },
  [InputState.Disabled]: undefined,
  [InputState.Default]: undefined,
};
