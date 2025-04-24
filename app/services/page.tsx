import OurServices from '@/components/services/OurServices';
import { useTranslations } from 'next-intl';

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('services');

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-3xl md:text-4xl font-bold text-gray-800 my-4'>{t('title')}</h1>
      <OurServices />
    </div>
  );
}
