'use client';

import { useTranslations } from 'next-intl';
import ContactInfoSection from './ContactInfoSection';
import ContactForm from './ContactForm';
import DataListener from '../widgets/DataListener';

const ContactUs = () => {
  const t = useTranslations('contact-us');

  return (
    <section className='py-12 px-4 max-w-6xl mx-auto'>
      <h2 id={'contact'} className='text-3xl font-bold text-center mb-8'>
        {t('title')}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <DataListener>
          <ContactForm />
        </DataListener>
        <div>
          <ContactInfoSection />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
