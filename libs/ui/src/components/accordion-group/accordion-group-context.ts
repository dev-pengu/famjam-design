import  { createContext } from 'react';
import { AccordionGroupContextValue } from './accordion-group.types';

export const AccordionGroupContext = createContext<AccordionGroupContextValue>(null);