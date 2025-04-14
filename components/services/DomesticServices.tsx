import { useTranslations } from 'next-intl';
import ServicesCard from './ServicesCard';
import { showSonnerUnderDevelopment } from '@/lib/utils';

const DomesticServices = () => {
  const t = useTranslations('our-service.domestic');
  const t_sonner = useTranslations('sonner');
  const services = t.raw('services') as ServiceCardInfo[];

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
        {services.map((item: ServiceCardInfo, index: number) => (
          <ServicesCard key={index} title={item.title} description={item.description} onClick={handShowSonner} />
        ))}
      </div>
    </section>
  );
};

export default DomesticServices;
