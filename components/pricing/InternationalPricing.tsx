import { useTranslations } from 'next-intl';
import ServicesCard from './ServicesCard';
import { showSonnerUnderDevelopment } from '@/lib/utils';

const InternationalServices = () => {
  const t = useTranslations('our-service.international');

  const t_sonner = useTranslations('sonner');
  const handShowSonner = () => {
    showSonnerUnderDevelopment({
      action: t_sonner('action'),
      description: t_sonner('description'),
      label: t_sonner('undo'),
      icon: <></>
    });
  };
  
  return (
    <section className='py-12 px-4 max-w-6xl mx-auto'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold'>{t('title')}</h2>
        <p className='text-gray-600 mt-2'>{t('description')}</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <ServicesCard
          title={t('regularArrival.title')}
          description={t.raw('regularArrival.description')}
          onClick={handShowSonner}
        />
        <ServicesCard
          title={t('vipBArrival.title')}
          description={t.raw('vipBArrival.description')}
          onClick={handShowSonner}
        />
        <ServicesCard
          title={t('regularDeparture.title')}
          description={t.raw('regularDeparture.description')}
          onClick={handShowSonner}
        />
        <ServicesCard
          title={t('regularVipArrival.title')}
          description={t.raw('regularVipArrival.description')}
          onClick={handShowSonner}
        />
        <ServicesCard
          title={t('regularVipDeparture.title')}
          description={t.raw('regularVipDeparture.description')}
          onClick={handShowSonner}
        />
      </div>
    </section>
  );
};

export default InternationalServices;
