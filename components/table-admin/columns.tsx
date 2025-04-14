'use client';

import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { useUsersRole, useUsersStatus } from './definitions';
import { useTranslations } from 'next-intl';

export function useColumns(): ColumnDef<User>[] {
  const t = useTranslations('table');
  const usersRole = useUsersRole();
  const usersStatus = useUsersStatus();

  return [
    {
      accessorKey: 'userName',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('columns.user')} />,
      cell: ({ row }) => {
        return <div className='font-medium'>{row.getValue('userName')}</div>;
      }
    },
    {
      accessorKey: 'phone',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('columns.phone')} />
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('columns.email')} />
    },
    {
      accessorKey: 'location',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('columns.location')} />
    },
    {
      accessorKey: 'role',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('columns.role')} />,
      cell: ({ row }) => {
        const role = usersRole.find((role) => role.value === row.getValue('role'));

        if (!role) {
          return null;
        }

        return <span>{role.label}</span>;
      }
    },
    {
      accessorKey: 'rtn',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('columns.rtn')} />
    },
    {
      accessorKey: 'otherInformation',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('columns.other-info')} />
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('columns.status')} />,
      cell: ({ row }) => {
        const status = usersStatus.find((status) => status.value === row.getValue('status'));

        if (!status) {
          return null;
        }

        return (
          <div
            className={clsx('flex w-[100px] items-center', {
              'text-red-500': status.value === 'inactive',
              'text-green-500': status.value === 'active'
            })}
          >
            {status.icon && <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />}
            <span>{status.label}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => <DataTableRowActions row={row} />
    }
  ];
}
