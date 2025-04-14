'use client';

import { useColumns } from './columns';
import DataTable from './data-table';
import { users } from './users';

export default function Table() {
  const columns = useColumns();

  return (
    <div className='w-[1200px] h-[500px]'>
      <DataTable data={users} columns={columns} />
    </div>
  );
}
