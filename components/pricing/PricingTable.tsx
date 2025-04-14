import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useTranslations } from 'next-intl';

type PricingTableProps = {
  className?: string;
};

export default function PricingTable({ className }: PricingTableProps) {
  const t = useTranslations('pricing');

  const pricingData = [
    {
      section: t('international'),
      items: [
        { label: t('business-arrival'), price: '$41' },
        { label: t('standard-vip-arrival'), price: '$25' },
        { label: t('business-departure'), price: '$41' },
        { label: t('standard-vip-departure'), price: '$35' }
      ]
    },
    {
      section: t('domestic'),
      items: [
        { label: t('business-arrival'), price: '$21' },
        { label: t('business-departure'), price: '$21' }
      ]
    }
  ];

  return (
    <div className={`max-w-md mx-auto bg-white rounded-lg shadow-md p-6 ${className}`}>
      <Table>
        <TableBody>
          {pricingData.map((section, index) => (
            <div key={index}>
              {/* Section Header */}
              <TableRow>
                <TableCell colSpan={2} className='bg-gray-100 text-lg font-bold text-gray-800 uppercase py-4'>
                  {section.section}
                </TableCell>
              </TableRow>
              {/* Section Items */}
              {section.items.map((item, itemIndex) => (
                <TableRow key={itemIndex} className='hover:bg-gray-50'>
                  <TableCell className='py-2 text-gray-700'>{item.label}</TableCell>
                  <TableCell className='py-2 text-right text-gray-700 font-medium'>{item.price}</TableCell>
                </TableRow>
              ))}
            </div>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
