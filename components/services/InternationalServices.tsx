import { useTranslations } from 'next-intl';
import ServicesCard from './ServicesCard';

const InternationalServices = () => {
  const t = useTranslations('our-service.international');
  
  return (
    <section className='py-12 px-4 max-w-6xl mx-auto'>
      {/* <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold'>{t('title')}</h2>
        <p className='text-gray-600 mt-2'>{t('description')}</p>
      </div> */}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <ServicesCard
          title={t('regularArrival.title')}
          description={
            '<li>Pick up guests at the arrival gate or designated pick-up point at the international terminal</li><li>Assist guests with visa procedures (if applicable)</li><li>Assist guests with immigration procedures</li><li>Assist guests with customs procedures</li><li>Assist guests with luggage retrieval</li><li>Escort guests with their luggage to the vehicle</li>'
          }
        />
        {/* <ServicesCard title={t('regularArrival.title')} description={t('regularArrival.description')} />
        <ServicesCard title={t('vipBArrival.title')} description={t('vipBArrival.description')} />
        <ServicesCard title={t('regularDeparture.title')} description={t('regularDeparture.description')} />
        <ServicesCard title={t('regularVipArrival.title')} description={t('regularVipArrival.description')} />
        <ServicesCard title={t('regularVipDeparture.title')} description={t('regularVipDeparture.description')} /> */}
      </div>
    </section>
  );
};

export default InternationalServices;
