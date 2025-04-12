'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConstructionIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { HomeLink } from '@/lib/router/coordinator';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/hooks/hooks';

export default function UnderDevelopment() {
  const t = useTranslations('under-development');
  const headerHeight = useAppSelector((state) => state.headerHeight.headerHeight);

  return (
    <div
      className='relative w-full h-full overflow-hidden flex items-center justify-center bg-gray-100'
      style={{ height: `calc(100vh - ${headerHeight}px)` }}
    >
      <Card className='max-w-md w-full mx-4 shadow-lg'>
        <CardHeader className='text-center'>
          <div className='flex justify-center mb-4'>
            <ConstructionIcon className='w-16 h-16 text-yellow-500' />
          </div>
          <CardTitle className='text-2xl font-bold'>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className='text-center'>
          <p className='text-gray-600 mb-6'>{t('description')}</p>
          <HomeLink
            className={cn(
              'rounded-md bg-matisse-200 hover:bg-matisse-300 active:bg-matisse-400 px-3.5 py-2.5 text-sm font-semibold',
              'text-matisse-950 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2'
            )}
          >
            {t('back-to-home')}
          </HomeLink>
        </CardContent>
      </Card>
    </div>
  );
}
