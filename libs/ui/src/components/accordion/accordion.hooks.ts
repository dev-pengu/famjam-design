import { useState, useRef, useLayoutEffect } from 'react';

export const useCollapseAnimation = ({
  isExpanded,
  slideDuration = 300,
}: {
  isExpanded: boolean;
  slideDuration?: number;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>(isExpanded ? 'auto' : 0);
  const [visible, setVisible] = useState(isExpanded);
  const visibilityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mounts the panel immediately on expand; unmounts it only once the
  // collapse animation below has had time to finish.
  useLayoutEffect(() => {
    if (visibilityTimerRef.current) clearTimeout(visibilityTimerRef.current);

    if (isExpanded) {
      setVisible(true);
    } else {
      visibilityTimerRef.current = setTimeout(() => setVisible(false), slideDuration);
    }

    return () => {
      if (visibilityTimerRef.current) clearTimeout(visibilityTimerRef.current);
    };
  }, [isExpanded, slideDuration]);

  useLayoutEffect(() => {
    if (!visible) return;

    let heightTimer: ReturnType<typeof setTimeout> | undefined;
    let innerFrame = 0;

    if (isExpanded) {
      const outerFrame = requestAnimationFrame(() => {
        innerFrame = requestAnimationFrame(() => {
          setHeight(contentRef.current?.scrollHeight ?? 0);
        });
      });
      heightTimer = setTimeout(() => setHeight('auto'), slideDuration);

      return () => {
        cancelAnimationFrame(outerFrame);
        cancelAnimationFrame(innerFrame);
        if (heightTimer) clearTimeout(heightTimer);
      };
    }

    setHeight(contentRef.current?.scrollHeight ?? 0);
    const outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => setHeight(0));
    });

    return () => {
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
    };
  }, [isExpanded, visible, slideDuration]);

  return { contentRef, height, visible };
};
