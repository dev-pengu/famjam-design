import * as reactNative from 'react-native';
import { getBreakpoint, getBreakpointValues } from './use-breakpoints-base';
import { Breakpoint, type BreakpointValues, type UseBreakpointOptions } from './use-breakpoints.types';

export function useBreakpoints(options?: UseBreakpointOptions): BreakpointValues {
  const { width } = reactNative.useWindowDimensions();
  let breakpoint = getBreakpoint(width);
  breakpoint = breakpoint === Breakpoint.Desktop ? Breakpoint.Tablet : breakpoint;

  return getBreakpointValues({
    ...options,
    width,
    breakpoint,
  });
}
