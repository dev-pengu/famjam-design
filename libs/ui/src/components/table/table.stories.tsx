import { Meta, StoryObj } from '@storybook/react';

import { Table } from './table.web';
import { ActionStyle, TableAction, TableColumn } from './table.types';
import { Badge } from '../badge/badge.web';
import { BadgeVariant } from '../badge/badge.types';
import { IconName } from '@famjam/icons';

const meta = {
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

const columns: TableColumn<User>[] = [
  { id: 'name', header: 'Name', accessor: 'name', sortable: true, filterable: true, sticky: true, minWidth: 120 },
  { id: 'email', header: 'Email', accessor: 'email', sortable: true, filterable: true },
  { id: 'role', header: 'Role', accessor: 'role', sortable: true },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    sortable: true,
    filterable: true,
    cell: (value, row) => {
      return (
        <span style={{ marginLeft: '20px' }}>
          <Badge
            content={String(value)}
            variant={value === 'active' ? BadgeVariant.Success : BadgeVariant.Error}
          >
            {' '}
          </Badge>
        </span>
      );
    },
  },
];

const actions: TableAction<User>[] = [
  {
    label: 'Delete',
    icon: IconName.Delete,
    requiresSelection: true,
    actionStyle: ActionStyle.Error,
    onClick: (rows) => console.log('delete', rows),
  },
  { label: 'Export', icon: IconName.Upload, requiresSelection: false, onClick: (rows) => console.log('export', rows) },
  {
    label: 'Deactivate',
    icon: IconName.Block,
    requiresSelection: true,
    actionStyle: ActionStyle.Error,
    onClick: (rows) => console.log('deactivate', rows),
    disabled: (rows) => rows.every((r) => r.status === 'inactive'),
  },
];

const users: User[] = [
  { id: '1', name: 'Sally Fields', email: 'sally@example.com', role: 'user', status: 'active' },
  { id: '2', name: 'Johnny Bravo', email: 'johnny@example.com', role: 'user', status: 'active' },
  { id: '3', name: 'Billy Bob', email: 'billy@example.com', role: 'user', status: 'inactive' },
  { id: '4', name: 'Johnny Bravo', email: 'johnny@example.com', role: 'user', status: 'active' },
  { id: '5', name: 'Johnny Bravo', email: 'johnny@example.com', role: 'user', status: 'active' },
  { id: '6', name: 'Johnny Bravo', email: 'johnny@example.com', role: 'user', status: 'active' },
  { id: '7', name: 'Johnny Bravo', email: 'johnny@example.com', role: 'user', status: 'active' },
  { id: '8', name: 'Johnny Bravo', email: 'johnny@example.com', role: 'user', status: 'active' },
  { id: '9', name: 'Johnny Bravo', email: 'johnny@example.com', role: 'user', status: 'active' },
  { id: '10', name: 'Johnny Bravo', email: 'johnny@example.com', role: 'user', status: 'active' },
  { id: '11', name: 'Last user', email: 'johnny@example.com', role: 'user', status: 'active' },
];

export const Default: Story = {
  args: {
    columns: columns,
    data: users,
    rowKey: 'id',
    maxHeight: '600px',
    stickyHeader: true,
    selectable: true,
    expandable: true,
    renderExpandedRow: (row) => <div>Details for {String(row.name)}</div>,
    actions: actions,
    footer: <span>Total: {users.length} users</span>,
  },
};
