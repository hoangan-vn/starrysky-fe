'use client';

import Banner from '@/components/Banner';
import { CalendarForm } from '@/components/CalendarForm';
import { Confirm } from '@/components/Conform';
import ContactForm from '@/components/ContactForm';
import LatestBlogs from '@/components/LatestBlogs';
import SignUpPortal from '@/components/portal/SignUpPortal';
import Table from '@/components/table/Table';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Home() {
  const t = useTranslations('home');

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        await fetch('/api', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token })
        });
        setIsVerified(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setIsVerified(false);
    }
  }

  const handleChange = (token: string | null) => {
    handleCaptchaSubmission(token);
  };

  const handleExpired = () => {
    setIsVerified(false);
    // recaptchaRef.current.reset();
  };

  return (
    <div className='flex items-center justify-items-center min-h-screen px-8 pb-20 sm:px-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <Banner />
        <Image className='dark:invert' src='/playstore-icon.png' alt='Next.js logo' width={180} height={38} priority />
        <ol className='list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]'>
          <li className='mb-2 tracking-[-.01em]'>
            Get started by editing{' '}
            <code className='bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold'>
              {t('title')}
            </code>
            .
          </li>
          <li className='tracking-[-.01em]'>{t('home')}</li>
        </ol>
        <div className='flex gap-4 items-center flex-col'>
          <Table></Table>
          <Image src='/test.png' width={1200} height={500} alt='test' />
          <ContactForm />
          <LatestBlogs />
          <CalendarForm />
          <Confirm />
          <div>
            <ReCAPTCHA
              sitekey={process.env['NEXT_PUBLIC_RECAPTCHA_SITE_KEY'] || ''}
              ref={recaptchaRef}
              onChange={handleChange}
              onExpired={handleExpired}
            />
            <button
              className='border-solid border-1 border-gray-300 rounded-md p-2 bg-blue-500 text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'
              type='submit'
              disabled={!isVerified}
            >
              Submit Form
            </button>
          </div>
        </div>
        <SignUpPortal />
      </main>
    </div>
  );
}
