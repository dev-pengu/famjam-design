import { GridBreakpointValues } from '../../components/grid/grid.types';

export type UseBreakpointOptions = {
  width?: number;
  mobileMargin?: 16 | 24;
};

export enum Breakpoint {
  Mobile = 'mobile',
  Tablet = 'tablet',
  Desktop = 'desktop',
}

export enum BreakpointDirection {
  Up = 'up',
  Down = 'down',
  Only = 'only',
}

export type BreakpointValues = GridBreakpointValues & {
  breakpoint: Breakpoint;
  mediaQuery: (breakpoint: Breakpoint, direction: BreakpointDirection) => boolean;
};

export type BreakpointSnapshot = Readonly<{
  breakpoint: Breakpoint;
  width: number;
}>;
