import type { HTMLAttributes } from 'react';

import { BoxVariant, type BoxProps } from './box.types';
import { cx } from '../../utils/cx';
import styles from './box.web.module.css';

export { BoxVariant };
const VARIANT_CLASS_NAME: Record<BoxVariant, string | undefined> = {
  [BoxVariant.Left]: styles.left,
  [BoxVariant.Center]: styles.center,
  [BoxVariant.Right]: styles.right,
};

export const Box = ({
  children,
  variant = BoxVariant.Center,
  className,
  ...props
}: Readonly<BoxProps & HTMLAttributes<HTMLDivElement>>) => {
  const alignmentClassName = VARIANT_CLASS_NAME[variant];

  return (
    <div
      className={cx(styles.box, alignmentClassName, className)}
      {...props}
    >
      {children}
    </div>
  );
};
