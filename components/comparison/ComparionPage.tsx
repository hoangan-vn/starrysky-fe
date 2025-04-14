import React from 'react';
import ComparisonTable from './ComparisonTable';
import { Feature } from './ComparisonTable';

export const fetchData = async (): Promise<Feature[]> => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return [
    { name: 'Đón tại sảnh khởi hành', available: true },
    { name: 'Hỗ trợ check-in', available: true },
    { name: 'Hỗ trợ xuất cảnh', available: false },
    { name: 'Hỗ trợ hải quan', available: false },
    { name: 'Hỗ trợ an ninh', available: true },
    { name: 'Lối ưu tiên xuất cảnh/an ninh', available: false },
    { name: 'Tiễn đến sảnh chờ/cửa ra máy bay', available: true, note: '(cửa ra máy bay)' }
  ];
};

export default function ComparionPage() {
  const features = React.use(fetchData());

  return (
    <main className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>So sánh dịch vụ Thương Gia</h1>
      <ComparisonTable features={features} />
    </main>
  );
}
