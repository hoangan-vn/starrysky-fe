'use client';

import InternationalServices from './InternationalServices';
import DomesticServices from './DomesticServices';
import { useTranslations } from 'next-intl';

const OurServices = () => {
  const t = useTranslations('services');

  return (
    <>
      <h1 className='text-3xl md:text-4xl font-bold text-gray-800 my-4'>{t('title')}</h1>
      <section className='px-4 max-w-6xl mx-auto flex flex-col justify-center items-center'>
        <InternationalServices />
        <DomesticServices />
      </section>
    </>
  );
};

export default OurServices;
