'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { HomeLink } from '@/lib/router/coordinator';
import { toast } from 'sonner';
import { AppIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

export default function NotFound() {
  const t = useTranslations('not-found');

  useEffect(() => {}, []);
  const handClick = () => {
    toast(t('action'), {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => {}
      },
      icon: <AppIcon width={25} height={25} />
    });
  };

  return (
    <div className='h-screen flex justify-center items-center dark:bg-[#282a36]'>
      <div className='text-center'>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white'>
          {t('title')}
        </h1>
        <p className='mt-6 text-base leading-7 text-gray-600 dark:text-gray-300'>{t('content')}</p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <HomeLink
            className={cn(
              'rounded-md bg-teal-900 hover:bg-teal-700 active:bg-teal-900 px-3.5 py-2.5 text-sm font-semibold',
              'text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2'
            )}
            onClick={handClick}
          >
            {t('action')}
          </HomeLink>
        </div>
      </div>
    </div>
  );
}
