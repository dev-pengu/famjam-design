import { useSyncExternalStore } from 'react';
import type { BreakpointSnapshot, BreakpointValues, UseBreakpointOptions } from './use-breakpoints.types';
import { DEFAULT_BREAKPOINT_WIDTH, getBreakpoint, getBreakpointValues } from './use-breakpoints-base';

const getWindowWidth = (): number => (typeof window === 'undefined' ? DEFAULT_BREAKPOINT_WIDTH : window.innerWidth);

const createSnapshot = (): BreakpointSnapshot => ({
  breakpoint: getBreakpoint(getWindowWidth()),
  width: getWindowWidth(),
});

const SERVER_SNAPSHOT: BreakpointSnapshot = {
  breakpoint: getBreakpoint(DEFAULT_BREAKPOINT_WIDTH),
  width: DEFAULT_BREAKPOINT_WIDTH,
};

let currentSnapshot: BreakpointSnapshot = createSnapshot();

const listeners = new Set<() => void>();

let cleanupResizeListener: (() => void) | null = null;

const updateSnapshot = (): void => {
  const nextSnapshot = createSnapshot();

  if (nextSnapshot.breakpoint === currentSnapshot.breakpoint) {
    currentSnapshot = nextSnapshot;
    return;
  }

  currentSnapshot = nextSnapshot;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void): (() => void) => {
  currentSnapshot = createSnapshot();
  listeners.add(listener);
  if (typeof window === 'undefined' || cleanupResizeListener) {
    // Don't need to setup on server, and if already setup skip
  } else {
    window.addEventListener('resize', updateSnapshot);
    cleanupResizeListener = () => {
      window.removeEventListener('resize', updateSnapshot);
      cleanupResizeListener = null;
    };
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size > 0) {
      return;
    } else {
      cleanupResizeListener?.();
    }
  };
};

const getSnapshot = (): BreakpointSnapshot => currentSnapshot;

const getServerSnapshot = (): BreakpointSnapshot => SERVER_SNAPSHOT;

export function useBreakpoints(options?: UseBreakpointOptions): BreakpointValues {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return getBreakpointValues({
    ...options,
    width: snapshot.width,
    breakpoint: snapshot.breakpoint,
  });
}
