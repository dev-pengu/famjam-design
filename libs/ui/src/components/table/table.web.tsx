import React, { useState, useRef, useCallback, useEffect, useId } from 'react';
import { IconName } from '@famjam/icons';
import { Icon } from '../icon/icon.web';
import { Checkbox } from '../checkbox/checkbox.web';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import {
  TableProps,
  TableContainerProps,
  TablePaginationProps,
  TableSortHeaderProps,
  SortValue,
  FilterValue,
  FilterOperator,
  ContextMenuState,
  TableColumn,
  ActionStyle,
} from './table.types';
import { getRowKey, getCellValue, applyLocalFilters, applyLocalSort, applyLocalPagination } from './table.utils';
import { Collapse } from '../collapse/collapse.web';
import { Dropdown, DropdownSize } from '../dropdown/dropdown.web';
import styles from './table.web.module.css';
import { Typography, TypographyTextSize } from '../typography';
import { Input, InputSize } from '../input';
import { Button, ButtonColor, ButtonShape, ButtonSize, ButtonVariant } from '../button';
import { Chip } from '../chip';
import { DropdownValueType } from '../dropdown';
import { useControlled } from '../../hooks';

export const TableContainer = ({ maxHeight, maxWidth, children, className }: TableContainerProps) => {
  useTheme();

  return (
    <div
      className={cx(styles.container, className)}
      style={{ maxHeight, maxWidth }}
    >
      {children}
    </div>
  );
};

export const TableSortHeader = ({ columnId, sort, onSortChange, children }: TableSortHeaderProps) => {
  useTheme();
  const isActive = sort.columnId === columnId && sort.direction !== null;
  const nextDirection =
    sort.columnId !== columnId || sort.direction === null ? 'asc' : sort.direction === 'asc' ? 'desc' : null;

  return (
    <Button
      onClick={() => onSortChange({ columnId, direction: nextDirection })}
      aria-label={`Sort by ${columnId} ${nextDirection ?? 'none'}`}
      size={ButtonSize.Small}
      variant={ButtonVariant.Text}
      color={isActive ? ButtonColor.Secondary : ButtonColor.Default}
    >
      {children}
      <span className={styles.sortIcon}>
        {!isActive && (
          <Icon
            name={IconName.ArrowUpDownCircle}
            decorative
            size={18}
          />
        )}
        {isActive && sort.direction === 'asc' && (
          <Icon
            name={IconName.ArrowUpCircle}
            decorative
            size={18}
          />
        )}
        {isActive && sort.direction === 'desc' && (
          <Icon
            name={IconName.ArrowDownCircle}
            decorative
            size={18}
          />
        )}
      </span>
    </Button>
  );
};

export const TablePagination = ({
  page,
  pageSize,
  total,
  pageSizeOptions = [10, 25, 50, 100],
  onChange,
}: TablePaginationProps) => {
  useTheme();
  const totalPages = Math.ceil(total / pageSize);
  const start = total === 0 ? 0 : page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, total);

  const handlePageSizeChange = (value: React.SetStateAction<DropdownValueType | DropdownValueType[] | undefined>) => {
    if (typeof value === 'string') onChange({ page: 0, pageSize: Number.parseInt(value) });
    else if (typeof value === 'number') onChange({ page: 0, pageSize: value });
    else if (Array.isArray(value))
      onChange({
        page: 0,
        pageSize: (typeof value[0] === 'string' ? Number.parseInt(value[0]) : value[0]) ?? pageSize,
      });
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationPageSize}>
        <Typography.Body
          as='span'
          size={TypographyTextSize.Small}
          className={styles.pageSizeSelectLabel}
        >
          Rows per page:{' '}
        </Typography.Body>
        <Dropdown
          value={pageSize}
          onChange={handlePageSizeChange}
          size={DropdownSize.Small}
          options={pageSizeOptions.map((size) => {
            return { label: size.toString(), value: size };
          })}
          className={styles.pageSizeSelect}
        />
      </div>

      <Typography.Body
        as='span'
        size={TypographyTextSize.Small}
        className={styles.paginationInfo}
      >
        {start}-{end} of {total}
      </Typography.Body>

      <div className={styles.paginationControls}>
        <Button
          disabled={page === 0}
          onClick={() => onChange({ page: 0, pageSize })}
          aria-label='First page'
          className={styles.pageButton}
          size={ButtonSize.Small}
          variant={ButtonVariant.Ghost}
          color={ButtonColor.Secondary}
        >
          <Icon
            name={IconName.DoubleChevronLeft}
            decorative
            size={24}
          />
        </Button>
        <Button
          disabled={page === 0}
          onClick={() => onChange({ page: page - 1, pageSize })}
          aria-label='Previous page'
          className={styles.pageButton}
          size={ButtonSize.Small}
          variant={ButtonVariant.Ghost}
          color={ButtonColor.Secondary}
        >
          <Icon
            name={IconName.ChevronLeft}
            decorative
            size={24}
          />
        </Button>
        <Button
          disabled={page >= totalPages - 1}
          onClick={() => onChange({ page: page + 1, pageSize })}
          aria-label='Next page'
          className={styles.pageButton}
          size={ButtonSize.Small}
          variant={ButtonVariant.Ghost}
          color={ButtonColor.Secondary}
        >
          <Icon
            name={IconName.ChevronRight}
            decorative
            size={24}
          />
        </Button>
        <Button
          disabled={page >= totalPages - 1}
          onClick={() => onChange({ page: totalPages - 1, pageSize })}
          aria-label='Last page'
          className={styles.pageButton}
          size={ButtonSize.Small}
          variant={ButtonVariant.Ghost}
          color={ButtonColor.Secondary}
        >
          <Icon
            name={IconName.DoubleChevronRight}
            decorative
            size={24}
          />
        </Button>
      </div>
    </div>
  );
};

export const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  maxHeight,
  maxWidth,
  stickyHeader = false,
  selectable = false,
  selectedRows: controlledSelectedRows,
  onSelectedRowsChange,
  expandable = false,
  renderExpandedRow,
  actions = [],
  sort: controlledSort,
  onSortChange,
  filters: controlledFilters,
  onFiltersChange,
  pagination: controlledPagination,
  onPaginationChange,
  totalRows,
  pageSizeOptions = [10, 25, 50],
  serverSide = false,
  footer,
  className,
}: TableProps<T>) => {
  useTheme();

  // Table State
  const [sort, setSort] = useControlled({
    defaultValue: {
      columnId: '',
      direction: null,
    },
    controlledValue: controlledSort,
    onChange: onSortChange,
  });
  const [filters, setFilters] = useControlled({
    defaultValue: [],
    controlledValue: controlledFilters,
    onChange: onFiltersChange,
  });
  const [pagination, setPagination] = useControlled({
    defaultValue: {
      page: 0,
      pageSize: pageSizeOptions[0] ?? 10,
    },
    controlledValue: controlledPagination,
    onChange: onPaginationChange,
  });
  const [selectedRows, setSelectedRows] = useControlled({
    defaultValue: [],
    controlledValue: controlledSelectedRows,
    onChange: onSelectedRowsChange,
  });

  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(
    Object.fromEntries(columns.map((c) => [c.id, c.width ?? 150])),
  );

  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterValue>({
    columnId: columns.find((c) => c.filterable)?.id ?? '',
    operator: 'contains',
    value: '',
  });

  const contextMenuRef = useRef<HTMLDivElement>(null);

  const filterableColumns = columns.filter((c) => c.filterable);
  const hasSelection = (selectedRows?.length ?? 0) > 0;

  const handleSortChange = (next: SortValue | undefined) => {
    setSort(next);
  };

  const handleFiltersChange = (next: FilterValue[] | undefined) => {
    setFilters(next);
    handlePaginationChange({ pageSize: pagination?.pageSize!, page: 0 });
  };

  const handlePaginationChange = (next: { page: number; pageSize: number } | undefined) => {
    setPagination(next);
  };

  const handleSelectedChange = (next: T[] | undefined) => {
    setSelectedRows(next);
  };

  const processedData = serverSide
    ? data
    : applyLocalPagination(
        applyLocalSort(
          applyLocalFilters(data, filters ?? [], columns),
          sort ?? { columnId: '', direction: null },
          columns,
        ),
        pagination?.page ?? 0,
        pagination?.pageSize ?? 10,
      );

  const total = serverSide ? (totalRows ?? data.length) : data.length;

  const isSelected = (row: T) => selectedRows?.some((r) => getRowKey(r, rowKey) === getRowKey(row, rowKey));

  const toggleRow = (row: T) => {
    const next = isSelected(row)
      ? selectedRows?.filter((r) => getRowKey(r, rowKey) !== getRowKey(row, rowKey))
      : [...(selectedRows ?? []), row];
    handleSelectedChange(next);
  };

  const toggleAll = () => {
    const allSelected = processedData.every((row) => isSelected(row));
    handleSelectedChange(allSelected ? [] : [...processedData]);
  };

  const allSelected = processedData.length > 0 && processedData.every((row) => isSelected(row));
  const someSelected = (selectedRows?.length ?? 0) > 0 && !allSelected;

  const toggleExpand = (key: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const resizeStart = useRef<{
    columnId: string;
    startX: number;
    startWidth: number;
  }>(null);

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent, columnId: string) => {
      e.preventDefault();
      resizeStart.current = {
        columnId,
        startX: e.clientX,
        startWidth: columnWidths[columnId] ?? 150,
      };

      const onMouseMove = (ev: MouseEvent) => {
        if (!resizeStart.current) return;
        const delta = ev.clientX - resizeStart.current.startX;
        const col = columns.find((c) => c.id === resizeStart.current!.columnId);
        const minW = col?.minWidth ?? 60;
        const next = Math.max(minW, resizeStart.current.startWidth + delta);
        setColumnWidths((prev) => ({
          ...prev,
          [resizeStart.current!.columnId]: next,
        }));
      };

      const onMouseUp = () => {
        resizeStart.current = null;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [columnWidths, columns],
  );

  const handleRowContextMenu = (e: React.MouseEvent, row: T) => {
    if (actions.length === 0) return;
    e.preventDefault();
    if (!isSelected(row)) toggleRow(row);
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const addFilter = () => {
    if (!activeFilter.value) return;
    handleFiltersChange([...(filters ?? []), activeFilter]);
    setActiveFilter((prev) => ({ ...prev, value: '' }));
  };

  const removeFilter = (index: number) => {
    handleFiltersChange(filters?.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenuRef && !contextMenuRef.current?.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const extraColCount = (selectable ? 1 : 0) + (expandable ? 1 : 0);

  const visibleActions = actions.filter((a) => !a.requiresSelection || hasSelection);
  const operators: FilterOperator[] = ['contains', 'equals', 'startsWith', 'endsWith', 'greaterThan', 'lessThan'];

  return (
    <div className={cx(styles.root, className)}>
      {(actions.length > 0 || columns.some((c) => c.filterable)) && (
        <div className={styles.toolbar}>
          <div className={styles.toolbarActions}>
            {visibleActions.map((action) => (
              <button
                key={action.label}
                type='button'
                className={cx(styles.toolbarAction, styles[`action_${action.actionStyle ?? ActionStyle.Default}`])}
                disabled={action.disabled?.(selectedRows ?? [])}
                onClick={() => action.onClick(selectedRows ?? [])}
                aria-label={action.label}
                title={action.label}
              >
                {action.icon && (
                  <Icon
                    name={action.icon}
                    decorative
                  />
                )}
                <span>{action.label}</span>
              </button>
            ))}
          </div>

          {filterableColumns.length > 0 && (
            <div className={styles.toolbarFilters}>
              <button
                type='button'
                className={cx(styles.filterToggle, filterOpen && styles.filterToggleActive)}
                onClick={() => setFilterOpen((p) => !p)}
                aria-expanded={filterOpen}
              >
                <Icon
                  name={IconName.FilterList}
                  decorative
                />
                <span>Filter</span>
                {(filters?.length ?? 0) > 0 && <span className={styles.filterBadge}>{filters?.length ?? 0}</span>}
              </button>

              {filterOpen && (
                <div className={styles.filterPanel}>
                  <div className={styles.filterRow}>
                    <Dropdown
                      size={DropdownSize.Small}
                      value={activeFilter.columnId}
                      onChange={(v) => setActiveFilter((p) => ({ ...p, columnId: v as string }))}
                      className={styles.filterSelect}
                      options={filterableColumns.map((c) => {
                        return { value: c.id, label: typeof c.header === 'string' ? c.header : c.id };
                      })}
                    />
                    <Dropdown
                      size={DropdownSize.Small}
                      value={activeFilter.operator}
                      onChange={(v) => setActiveFilter((p) => ({ ...p, operator: v as FilterOperator }))}
                      className={styles.filterSelect}
                      options={operators.map((op) => {
                        return { value: op, label: op };
                      })}
                    />
                    <Input
                      value={activeFilter.value}
                      onChange={(e) => setActiveFilter((p) => ({ ...p, value: e.target.value }))}
                      onKeyDown={(v) => v.key === 'Enter' && addFilter()}
                      placeholder='Filter value...'
                      className={styles.filterInput}
                      inputSize={InputSize.Small}
                    />
                    <Button
                      size={ButtonSize.Small}
                      variant={ButtonVariant.Ghost}
                      shape={ButtonShape.Square}
                      color={ButtonColor.Secondary}
                      onClick={() => addFilter()}
                      className={styles.filterAddButton}
                    >
                      Add
                    </Button>
                  </div>

                  {(filters?.length ?? 0) > 0 && (
                    <div className={styles.activeFilters}>
                      {filters?.map((f, i) => (
                        <Chip
                          dismissable
                          label={`${f.columnId} ${f.operator} "${f.value}"`}
                          onDismiss={() => removeFilter(i)}
                          key={i}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {hasSelection && (
            <Typography.Body
              as='span'
              size={TypographyTextSize.Small}
              className={styles.selectionCount}
            >
              {selectedRows?.length} selected
            </Typography.Body>
          )}
        </div>
      )}

      <TableContainer
        maxHeight={maxHeight}
        maxWidth={maxWidth}
      >
        <table className={styles.table}>
          <thead className={cx(styles.thead, stickyHeader && styles.stickyHeader)}>
            <tr>
              {expandable && <th className={cx(styles.th, styles.expandCol)} />}
              {selectable && (
                <th className={cx(styles.th, styles.checkboxCol)}>
                  <Checkbox
                    checked={someSelected ? 'indeterminate' : allSelected}
                    onCheckedChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={cx(styles.th, col.sticky && styles.stickyCol)}
                  style={{ width: columnWidths[col.id] }}
                >
                  <div className={styles.thInner}>
                    {col.sortable ? (
                      <TableSortHeader
                        columnId={col.id}
                        sort={sort ?? { columnId: '', direction: null }}
                        onSortChange={handleSortChange}
                      >
                        {col.header}
                      </TableSortHeader>
                    ) : (
                      <span>{col.header}</span>
                    )}
                    <div
                      className={styles.resizeHandle}
                      onMouseDown={(e) => handleResizeMouseDown(e, col.id)}
                      aria-hidden
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {processedData.map((row) => {
              const key = getRowKey(row, rowKey);
              const isExpanded = expandedRows.has(key);
              const rowIsSelected = isSelected(row);

              return (
                <React.Fragment key={key}>
                  <tr
                    className={cx(styles.tr, rowIsSelected && styles.trSelected)}
                    aria-selected={rowIsSelected}
                    onContextMenu={(e) => handleRowContextMenu(e, row)}
                  >
                    {expandable && (
                      <td className={cx(styles.td, styles.expandCol)}>
                        <button
                          type='button'
                          className={styles.expandButton}
                          onClick={() => toggleExpand(key)}
                          aria-expanded={isExpanded}
                          aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                        >
                          <Icon
                            name={isExpanded ? IconName.ChevronDown : IconName.ChevronRight}
                            decorative
                            size={18}
                          />
                        </button>
                      </td>
                    )}
                    {selectable && (
                      <td className={cx(styles.td, styles.checkboxCol)}>
                        <Checkbox
                          checked={rowIsSelected}
                          onCheckedChange={() => toggleRow(row)}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.id}
                        className={cx(styles.td, col.sticky && styles.stickyCol)}
                        style={{ width: columnWidths[col.id] }}
                      >
                        {col.cell
                          ? col.cell(getCellValue(row, col.accessor), row)
                          : String(getCellValue(row, col.accessor) ?? '')}
                      </td>
                    ))}
                  </tr>

                  {expandable && renderExpandedRow && (
                    <tr className={styles.expandedRow}>
                      <td
                        colSpan={columns.length + extraColCount}
                        className={styles.expandedCell}
                      >
                        <Collapse open={isExpanded}>
                          <div className={styles.expandedContent}>{renderExpandedRow(row)}</div>
                        </Collapse>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>

          {footer && (
            <tfoot>
              <tr>
                <td
                  colSpan={columns.length + extraColCount}
                  className={styles.tfoot}
                >
                  {footer}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </TableContainer>

      {pagination && (
        <TablePagination
          page={pagination.page}
          pageSize={pagination.pageSize!}
          total={total}
          pageSizeOptions={pageSizeOptions}
          onChange={handlePaginationChange}
        />
      )}

      {contextMenu && actions.length > 0 && (
        <div
          ref={contextMenuRef}
          className={styles.contextMenu}
          style={{ top: contextMenu.y, left: contextMenu.x }}
          role='menu'
        >
          {actions.map((action) => (
            <button
              key={action.label}
              type='button'
              role='menuitem'
              className={styles.contextMenuItem}
              disabled={action.disabled?.(selectedRows ?? [])}
              onClick={() => {
                action.onClick(selectedRows ?? []);
                setContextMenu(null);
              }}
            >
              {action.icon && (
                <Icon
                  name={action.icon}
                  decorative
                />
              )}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
