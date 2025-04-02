import Banner from '@/components/Banner';
import { CalendarForm } from '@/components/CalendarForm';
import { Confirm } from '@/components/Conform';
import ContactForm from '@/components/ContactForm';
import LatestBlogs from '@/components/LatestBlogs';
import Table from '@/components/table/Table';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Home() {
  const t = useTranslations('home');
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
          <ContactForm />
          <LatestBlogs />
          <CalendarForm/>
          <Confirm/>
        </div>
      </main>
    </div>
  );
}
