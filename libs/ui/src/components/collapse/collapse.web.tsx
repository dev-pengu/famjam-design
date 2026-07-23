import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { CollapseProps } from './collapse.types';
import styles from './collapse.web.module.css';

export const Collapse = ({ open, children, className }: CollapseProps) => {
  useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>(open ? 'auto' : 0);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (!ref.current) return;

    if (open) {
      setVisible(true);
      // Measure then animate to the real height
      const h = ref.current.scrollHeight;
      setHeight(h);
      const timer = setTimeout(() => setHeight('auto'), 300);
      return () => clearTimeout(timer);
    } else {
      // Snap from 'auto' to measured px before animating to 0
      const h = ref.current.scrollHeight;
      setHeight(h);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHeight(0);
        });
      });
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!visible && !open) return null;

  return (
    <div
      ref={ref}
      className={cx(styles.collapse, className)}
      style={{
        height: height === 'auto' ? 'auto' : `${height}px`,
        overflow: height === 'auto' ? 'visible' : 'hidden',
      }}
    >
      {children}
    </div>
  );
};
