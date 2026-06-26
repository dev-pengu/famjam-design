import { useSyncExternalStore } from 'react';
import { Breakpoint } from '../../hooks/use-breakpoints/use-breakpoints.types';
import type { GridBreakpointValues } from './grid.types';

const space16 = 16;
const space24 = 24;
const space48 = 48;
const space80 = 80;

export const GRID_DEFAULT_COLUMNS: Record<Breakpoint, number> = {
  [Breakpoint.Desktop]: 12,
  [Breakpoint.Tablet]: 8,
  [Breakpoint.Mobile]: 4,
};

export const GRID_DEFAULT_GUTTER: Record<Breakpoint, number> = {
  [Breakpoint.Desktop]: space24,
  [Breakpoint.Tablet]: space24,
  [Breakpoint.Mobile]: space16,
} as const;

export const GRID_DEFAULT_MARGIN: Record<Breakpoint, number> = {
  [Breakpoint.Desktop]: space80,
  [Breakpoint.Tablet]: space48,
  [Breakpoint.Mobile]: space24,
};

export const GRID_DEFAULT_LAYOUT: GridBreakpointValues = {
  columns: GRID_DEFAULT_COLUMNS[Breakpoint.Desktop],
  gutter: GRID_DEFAULT_GUTTER[Breakpoint.Desktop],
  margin: GRID_DEFAULT_MARGIN[Breakpoint.Desktop],
  gap: GRID_DEFAULT_GUTTER[Breakpoint.Desktop],
  width: 1200,
};

let currentLayout: GridBreakpointValues = GRID_DEFAULT_LAYOUT;

const listeners = new Set<() => void>();

export const setGridLayout = (layout: GridBreakpointValues): void => {
  if (
    layout.columns === currentLayout.columns &&
    layout.gutter === currentLayout.gutter &&
    layout.margin === currentLayout.margin &&
    layout.gap === currentLayout.gap &&
    layout.width === currentLayout.width
  ) {
    return;
  }

  currentLayout = layout;

  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener);

  return () => listeners.delete(listener);
};

const getSnapshot = (): GridBreakpointValues => currentLayout;

const getServerSnapshot = (): GridBreakpointValues => GRID_DEFAULT_LAYOUT;

export const useGridLayout = (): GridBreakpointValues => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

export const normalizeSpan = (span: number, columns: number) => Math.min(Math.max(Math.round(span), 1), columns);

export const normalizeOffset = (offset: number, columns: number) =>
  Math.min(Math.max(Math.round(offset), 0), columns - 1);

export const getGridBreakpointValues = (
  breakpoint: Breakpoint,
  mobileMargin: number = space24,
): GridBreakpointValues => {
  const columns = GRID_DEFAULT_COLUMNS[breakpoint];
  const gutter = GRID_DEFAULT_GUTTER[breakpoint];
  const defaultMargin = GRID_DEFAULT_MARGIN[breakpoint];
  const margin =
    breakpoint === Breakpoint.Mobile ? (mobileMargin === space16 ? space16 : defaultMargin) : defaultMargin;

  return {
    columns,
    gutter,
    margin,
    gap: gutter,
  };
};
