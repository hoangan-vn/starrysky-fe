import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import HTMLString from '../widgets/HTMLString';

type ServicesCardProps = {
  title: string;
  description: string;
  onClick?: () => void;
};

export default function ServicesCard({ title, description, onClick }: ServicesCardProps) {
  const t = useTranslations('our-service');

  return (
    <Card className='rounded-lg shadow-md'>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col h-full justify-between'>
        <ul className='mb-5'>
          <HTMLString className='' strTag={description} />
        </ul>
        <div className='flex justify-center items-center'>
          <Button className='bg-yellow-500 hover:bg-yellow-600 text-white w-1/3' onClick={onClick}>
            {t('apply-now')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
