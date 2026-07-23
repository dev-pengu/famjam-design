import { useRef, useEffect } from 'react';

function useEventCallback<Fn extends (...args: any[]) => any = (...args: unknown[]) => unknown>(fn: Fn): Fn;
function useEventCallback<Args extends unknown[], Return>(fn: (...args: Args) => Return): (...args: Args) => Return;
function useEventCallback<Args extends unknown[], Return>(fn: (...args: Args) => Return): (...args: Args) => Return {
  const ref = useRef(fn);
  useEffect(() => {
    ref.current = fn;
  });
  return useRef((...args: Args) => ref.current!(...args)).current;
}

export { useEventCallback };
