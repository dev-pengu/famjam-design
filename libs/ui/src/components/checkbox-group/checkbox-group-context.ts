import { createContext } from 'react';
import { CheckboxGroupContextValue } from './checkbox-group.types';

export const CheckboxGroupContext = createContext<CheckboxGroupContextValue>(null);
