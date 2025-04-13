'use client';

import { useTranslations } from 'next-intl';
import { useNavLinks } from '@/lib/router/router';
import ContactInfoSection from './ContactInfoSection';
import ContactForm from './ContactForm';

const ContactUs = () => {
  const t = useTranslations('contact-us');
  const navLinks = useNavLinks();

  return (
    <section className='py-12 px-4 max-w-6xl mx-auto'>
      <h2 id={navLinks.at(4)?.id} className='text-3xl font-bold text-center mb-8'>
        {t('title')}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <ContactForm />
        <div>
          <ContactInfoSection />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
