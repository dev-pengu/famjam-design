import type { ReactNode } from 'react';
import { useEffect } from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { View } from 'react-native';
import { useTheme } from '../theme-provider/theme-context';
import { styles } from './grid.native.styles';
import { useBreakpoints } from '../../hooks';
import { type GridColumnProps, type GridProps, type GridRowProps } from './grid.types';
import { normalizeOffset, normalizeSpan, setGridLayout, useGridLayout } from './grid-base';

const getItemWidth = ({
  width,
  margin,
  gutter,
  columns,
  span,
}: {
  width: number;
  margin: number;
  gutter: number;
  columns: number;
  span: number;
}) => {
  const availableWidth = width - margin * 2 - gutter * (columns - 1);
  const columnWidth = availableWidth / columns;

  return columnWidth * span + gutter * (span - 1);
};

function GridRoot({
  children,
  mobileMargin = 24,
  style,
  testID,
  ...props
}: Readonly<GridProps & Omit<ViewProps, 'children'>>) {
  useTheme();
  const layout = useBreakpoints({ mobileMargin });

  useEffect(() => setGridLayout(layout), [layout]);

  return (
    <View
      style={[
        styles.grid,
        {
          paddingHorizontal: layout.margin,
        },
        style,
      ]}
      testID={testID}
      {...props}
    >
      {children}
    </View>
  );
}

function GridRow({
  children,
  style,
  testID,
  ...props
}: Readonly<GridRowProps & { style?: StyleProp<ViewStyle>; children: ReactNode } & Omit<ViewProps, 'children'>>) {
  const layout = useGridLayout();

  return (
    <View
      style={[
        styles.row,
        {
          marginHorizontal: -layout.gutter / 2,
        },
        style,
      ]}
      testID={testID}
      {...props}
    >
      {children}
    </View>
  );
}

function GridColumn({
  children,
  span,
  offset,
  style,
  testID,
  ...props
}: Readonly<GridColumnProps & { style?: StyleProp<ViewStyle>; children: ReactNode } & Omit<ViewProps, 'children'>>) {
  const layout = useGridLayout();
  const width = layout.width ?? 0;
  const resolvedSpan = normalizeSpan(span ?? 1, layout.columns);
  const resolvedOffset = normalizeOffset(offset ?? 0, layout.columns);

  const itemWidth = getItemWidth({
    width,
    margin: layout.margin,
    gutter: layout.gutter,
    columns: layout.columns,
    span: resolvedSpan,
  });

  const offsetWidth =
    resolvedOffset === 0
      ? 0
      : getItemWidth({
          width,
          margin: layout.margin,
          gutter: layout.gutter,
          columns: layout.columns,
          span: resolvedOffset,
        }) + layout.gutter;

  return (
    <View
      style={[
        styles.column,
        {
          width: Math.max(itemWidth, 0),
          marginLeft: offsetWidth,
          paddingHorizontal: layout.gutter / 2,
          marginBottom: layout.gap,
        },
        style,
      ]}
      testID={testID}
      {...props}
    >
      {children}
    </View>
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

export { useBreakpoints };

export default Grid;
