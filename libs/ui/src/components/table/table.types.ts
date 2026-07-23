import React from 'react';
import { IconName } from '@famjam/icons';

export type SortDirection = 'asc' | 'desc' | null;

export type FilterOperator = 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';

export type FilterValue = {
  columnId: string;
  operator: FilterOperator;
  value: string;
};

export type SortValue = {
  columnId: string;
  direction: SortDirection;
};

export type PaginationValue = {
  page: number;
  pageSize: number;
};

export type TableColumn<T = unknown> = {
  id: string;
  header: React.ReactNode;
  accessor: keyof T | ((row: T) => React.ReactNode);
  width?: number;
  minWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  sticky?: boolean;
  cell?: (value: unknown, row: T) => React.ReactNode;
};

export enum ActionStyle {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
  Accent = 'accent',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error'
}

export type TableAction<T = unknown> = {
  label: string;
  icon?: IconName;
  onClick: (selectedRows: T[]) => void;
  disabled?: (selectedRows: T[]) => boolean;
  // if true, only shows when rows are selected
  requiresSelection?: boolean;
  actionStyle?: ActionStyle
};

export type TableProps<T = unknown> = {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: keyof T | ((row: T) => string);

  // Container
  maxHeight?: string;
  maxWidth?: string;
  stickyHeader?: boolean;

  // Selection
  selectable?: boolean;
  selectedRows?: T[];
  onSelectedRowsChange?: (rows: React.SetStateAction<T[] | undefined>) => void;

  // Expandable rows
  expandable?: boolean;
  renderExpandedRow?: (row: T) => React.ReactNode;

  // Actions
  actions?: TableAction<T>[];

  // Sort
  sort?: SortValue;
  onSortChange?: (sort: React.SetStateAction<SortValue | undefined>) => void;

  // Filter
  filters?: FilterValue[];
  onFiltersChange?: (filters: React.SetStateAction<FilterValue[] | undefined>) => void;

  // Pagination
  pagination?: PaginationValue;
  onPaginationChange?: (pagination: React.SetStateAction<PaginationValue | undefined>) => void;
  totalRows?: number;
  pageSizeOptions?: number[];

  serverSide?: boolean;

  footer?: React.ReactNode;

  className?: string;
};

export type TableContainerProps = {
  maxHeight?: string;
  maxWidth?: string;
  children: React.ReactNode;
  className?: string;
};

export type TablePaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  pageSizeOptions?: number[];
  onChange: (pagination: PaginationValue) => void;
};

export type TableSortHeaderProps = {
  columnId: string;
  sort: SortValue;
  onSortChange: (sort: SortValue) => void;
  children: React.ReactNode;
};

export type ContextMenuState = {
  x: number;
  y: number;
} | null;
