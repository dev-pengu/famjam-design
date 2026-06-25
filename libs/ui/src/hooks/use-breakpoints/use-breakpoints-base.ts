import { getGridBreakpointValues } from '../../components/grid/grid-base';
import { Breakpoint, BreakpointDirection, BreakpointValues, type UseBreakpointOptions } from './use-breakpoints.types';

type BreakpointCalculationOptions = UseBreakpointOptions & {
  breakpoint: Breakpoint;
};

export const DEFAULT_BREAKPOINT_WIDTH = 1200;

export const BREAKPOINT_MAX_WIDTH: Record<Breakpoint, number> = {
  [Breakpoint.Mobile]: 768,
  [Breakpoint.Tablet]: 1024,
  [Breakpoint.Desktop]: Infinity,
};

export const BREAKPOINT_MIN_WIDTH: Record<Breakpoint, number> = {
  [Breakpoint.Mobile]: 0,
  [Breakpoint.Tablet]: BREAKPOINT_MAX_WIDTH[Breakpoint.Mobile] + 1,
  [Breakpoint.Desktop]: BREAKPOINT_MAX_WIDTH[Breakpoint.Tablet] + 1,
};

export const BREAKPOINT_MEDIA_QUERIES: string[] = [
  `(max-width: ${BREAKPOINT_MAX_WIDTH[Breakpoint.Mobile]}px)`,
  `(min-width: ${BREAKPOINT_MIN_WIDTH[Breakpoint.Tablet]}px) and (max-width: ${BREAKPOINT_MAX_WIDTH[Breakpoint.Tablet]}px)`,
  `(min-width: ${BREAKPOINT_MIN_WIDTH[Breakpoint.Desktop]}px)`,
];

const BREAKPOINT_ORDER: Record<Breakpoint, number> = {
  [Breakpoint.Mobile]: 0,
  [Breakpoint.Tablet]: 1,
  [Breakpoint.Desktop]: 2,
};

const createMediaQuery = (breakPointFromState: Breakpoint): BreakpointValues['mediaQuery'] => {
  const breakpointLevel = BREAKPOINT_ORDER[breakPointFromState];

  return (bp: Breakpoint, direction?: BreakpointDirection): boolean => {
    const bpLevel = BREAKPOINT_ORDER[bp];

    switch (direction) {
      case BreakpointDirection.Up:
        return breakpointLevel >= bpLevel;
      case BreakpointDirection.Down:
        return breakpointLevel <= bpLevel;
      default:
        return breakpointLevel === bpLevel;
    }
  };
};

const MEDIA_QUERIES_BY_BREAKPOINT: Record<Breakpoint, BreakpointValues['mediaQuery']> = {
  [Breakpoint.Mobile]: createMediaQuery(Breakpoint.Mobile),
  [Breakpoint.Tablet]: createMediaQuery(Breakpoint.Tablet),
  [Breakpoint.Desktop]: createMediaQuery(Breakpoint.Desktop),
};

export const getBreakpoint = (width: number): Breakpoint => {
  if (width <= BREAKPOINT_MAX_WIDTH[Breakpoint.Mobile]) return Breakpoint.Mobile;
  if (width <= BREAKPOINT_MAX_WIDTH[Breakpoint.Tablet]) return Breakpoint.Tablet;
  return Breakpoint.Desktop;
};

export const getBreakpointValues = (options: BreakpointCalculationOptions): BreakpointValues => {
  return {
    breakpoint: options.breakpoint,
    mediaQuery: MEDIA_QUERIES_BY_BREAKPOINT[options.breakpoint!],
    ...getGridBreakpointValues(options.breakpoint!, options.mobileMargin),
    width: options.width,
  };
};
