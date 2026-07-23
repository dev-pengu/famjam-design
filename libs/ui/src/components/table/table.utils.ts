import { FilterValue, FilterOperator, SortValue } from './table.types';

export const getRowKey = <T>(row: T, rowKey: keyof T | ((row: T) => string)): string => {
  if (typeof rowKey === 'function') return rowKey(row);
  return String(row[rowKey]);
};

export const getCellValue = <T>(row: T, accessor: keyof T | ((row: T) => unknown)): unknown => {
  if (typeof accessor === 'function') return accessor(row);
  return row[accessor];
};

const applyOperator = (cellValue: string, operator: FilterOperator, filterValue: string): boolean => {
  const cell = cellValue.toLowerCase();
  const filter = filterValue.toLowerCase();
  switch (operator) {
    case 'contains':
      return cell.includes(filter);
    case 'equals':
      return cell === filter;
    case 'startsWith':
      return cell.startsWith(filter);
    case 'endsWith':
      return cell.endsWith(filter);
    case 'greaterThan':
      return parseFloat(cell) > parseFloat(filter);
    case 'lessThan':
      return parseFloat(cell) < parseFloat(filter);
    default:
      return true;
  }
};

export const applyLocalFilters = <T>(
  data: T[],
  filters: FilterValue[],
  columns: import('./table.types').TableColumn<T>[],
): T[] => {
  if (filters.length === 0) return data;

  return data.filter((row) =>
    filters.every((filter) => {
      console.log(columns);
      console.log(filter);
      const col = columns.find((c) => c.id === filter.columnId);
      console.log('no column found');
      if (!col) return true;
      console.log('found column');
      const value = String(getCellValue(row, col.accessor) ?? '');
      const ret = applyOperator(value, filter.operator, filter.value);
      console.log(ret);
      return ret;
    }),
  );
};

export const applyLocalSort = <T>(
  data: T[],
  sort: SortValue,
  columns: import('./table.types').TableColumn<T>[],
): T[] => {
  if (!sort.direction) return data;

  const col = columns.find((c) => c.id === sort.columnId);
  if (!col) return data;

  return [...data].sort((a, b) => {
    const av = String(getCellValue(a, col.accessor) ?? '');
    const bv = String(getCellValue(b, col.accessor) ?? '');
    const cmp = av.localeCompare(bv, undefined, { numeric: true });
    return sort.direction === 'asc' ? cmp : -cmp;
  });
};

export const applyLocalPagination = <T>(data: T[], page: number, pageSize: number): T[] => {
  const start = page * pageSize;
  return data.slice(start, start + pageSize);
};
