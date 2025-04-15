'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DebouncedWidget from '../widgets/DebouncedWidget';
import { Button } from '../ui/button';

export interface Feature {
  name: string;
  available: boolean;
  note?: string;
}

interface ComparisonTableProps {
  features: Feature[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ features }) => {
  return (
    <div className='w-full overflow-x-auto'>
      <Table className='min-w-full border border-gray-200'>
        <TableHeader>
          <TableRow>
            <TableHead className='text-left font-semibold text-gray-700'>Tính năng</TableHead>
            <TableHead className='text-center font-semibold text-gray-700'>Thương Gia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature, index) => (
            <TableRow key={index} className='border-t'>
              <TableCell className='text-left'>
                {feature.name}
                {feature.note && <span className='text-sm text-gray-500'> {feature.note}</span>}
              </TableCell>
              <TableCell className='text-center'>
                {feature.available ? (
                  <span className='text-green-500 text-xl'>✅</span>
                ) : (
                  <span className='text-red-500 text-xl'>❌</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DebouncedWidget>
        <Button
          onClick={() => {
            console.log('abc');
          }}
        >
          Spam
        </Button>
      </DebouncedWidget>
    </div>
  );
};

export default ComparisonTable;
