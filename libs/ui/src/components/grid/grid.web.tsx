import type { HTMLAttributes } from 'react';
import { useEffect } from 'react';
import { useBreakpoints } from '../../hooks/use-breakpoints/use-breakpoints.web';
import { type GridColumnProps, type GridProps, type GridRowProps } from './grid.types';
import { normalizeOffset, normalizeSpan, useGridLayout, setGridLayout } from './grid-base';
import { cx } from '../../utils/cx';
import styles from './grid.web.module.css';
import { useTheme } from '../theme-provider/theme-context';

function GridRoot({
  children,
  mobileMargin = 24,
  className,
  testID,
  ...props
}: Readonly<GridProps & HTMLAttributes<HTMLDivElement>>) {
  useTheme();
  const layout = useBreakpoints({ mobileMargin });

  useEffect(() => {
    setGridLayout({ ...layout, width: 0 });
  }, [layout]);

  return (
    <div
      className={cx(styles.grid, className)}
      data-mobile-margin={mobileMargin}
      data-testid={testID}
      {...props}
    >
      {children}
    </div>
  );
}

function GridRow({ children, className, testID, ...props }: Readonly<GridRowProps & HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cx(styles.row, className)}
      data-testid={testID}
      {...props}
    >
      {children}
    </div>
  );
}

function GridColumn({
  children,
  span,
  offset,
  className,
  testID,
  ...props
}: Readonly<GridColumnProps & HTMLAttributes<HTMLDivElement>>) {
  const layout = useGridLayout();
  const resolvedSpan = normalizeSpan(span ?? 1, layout.columns);
  const resolvedOffset = normalizeOffset(offset ?? 0, layout.columns);

  return (
    <div
      className={cx(
        styles.column,
        styles[`span-${resolvedSpan}`],
        resolvedOffset > 0 ? styles[`offset-${resolvedOffset}`] : undefined,
        className,
      )}
      data-span={resolvedSpan}
      data-offset={resolvedOffset > 0 ? resolvedOffset : undefined}
      data-testid={testID}
      {...props}
    >
      {children}
    </div>
  );
}

type GridComponent = typeof GridRoot & {
  Row: typeof GridRow;
  Column: typeof GridColumn;
};

export const Grid = Object.assign(GridRoot, {
  Row: GridRow,
  Column: GridColumn,
}) as GridComponent;

export default Grid;
