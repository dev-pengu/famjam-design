import { useEffect } from 'react';
import { useLazyRef } from '../use-lazy-ref';
import { Timer } from './use-timeout.types';

const createTimer = (): Timer => {
  let currentId: number | null = null;

  const clear = () => {
    if (currentId !== null) {
      clearTimeout(currentId);
      currentId = null;
    }
  };

  const start = (delay: number, fn: Function) => {
    clear();
    currentId = setTimeout(() => {
      currentId = null;
      fn();
    }, delay);
  };

  const disposeEffect = () => clear;

  return {
    currentId,
    start,
    clear,
    disposeEffect,
  };
};

export const useTimeout = () => {
  const timeout = useLazyRef(createTimer).current;

  useEffect(timeout?.disposeEffect!, []);

  return timeout;
};
