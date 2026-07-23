import { useRef } from 'react';

export const useLazyRef = <T, U>(init: (arg?: U) => T, initArg?: U) => {
  const ref = useRef<T | undefined>(undefined);

  if (ref.current === undefined) {
    ref.current = init(initArg);
  }

  return ref;
};
