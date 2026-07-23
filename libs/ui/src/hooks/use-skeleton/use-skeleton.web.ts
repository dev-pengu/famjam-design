import { useState, useLayoutEffect, useRef } from 'react';

export const useChildDimensions = ({
  enabled,
}: {
  enabled: boolean;
}) => {
  const childRef = useRef<HTMLElement>(null);
  const [dimensions, setDimensions] = useState<{
    width: number | null;
    height: number | null;
  }>({ width: null, height: null });

  useLayoutEffect(() => {
    if (!enabled || !childRef.current) return;

    const measure = () => {
      const rect = childRef.current!.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(childRef.current);

    return () => observer.disconnect();
  }, [enabled]);

  return { childRef, dimensions };
};

export const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useLayoutEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
};