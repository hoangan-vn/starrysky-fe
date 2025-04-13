'use client';

import FormPortal from '@/components/portal/FormPortal';
import Benefits from '@/components/benefits/Benefits';
import { cn } from '@/lib/utils';
import FastTrackServices from '@/components/services/FastTrackServices';
import OurServices from '@/components/services/OurServices';
import ContactUs from '@/components/contact/ContactUs';
import Banner from '@/components/banner/Banner';

export default function Home() {
  return (
    <main className='flex items-center justify-items-center font-[family-name:var(--font-geist-sans)]'>
      <div className='flex flex-col gap-[32px] w-screen items-center sm:items-start'>
        <Banner />
        <div
          className={cn(
            'flex flex-col items-center justify-items-center',
            'px-8 sm:px-20 w-full bg-gray-100',
            'font-[family-name:var(--font-geist-sans)]'
          )}
        >
          <Benefits />
        </div>
        <FastTrackServices />
        <OurServices />
        <ContactUs />
      </div>
      <FormPortal />
    </main>
  );
}
