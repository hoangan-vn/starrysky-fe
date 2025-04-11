import { useTranslations } from 'next-intl';
import ServicesCard from './ServicesCard';

const InternationalServices = () => {
  const t = useTranslations('our-service.international');

  return (
    <section className='py-12 px-4 max-w-6xl mx-auto'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold'>{t('title')}</h2>
        <p className='text-gray-600 mt-2'>{t('description')}</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <ServicesCard title={t('regularArrival.title')} description={t.raw('regularArrival.description')} />
        <ServicesCard title={t('vipBArrival.title')} description={t.raw('vipBArrival.description')} />
        <ServicesCard title={t('regularDeparture.title')} description={t.raw('regularDeparture.description')} />
        <ServicesCard title={t('regularVipArrival.title')} description={t.raw('regularVipArrival.description')} />
        <ServicesCard title={t('regularVipDeparture.title')} description={t.raw('regularVipDeparture.description')} />
      </div>
    </section>
  );
};

export default InternationalServices;
