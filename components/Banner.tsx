import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/hooks/hooks';
import { useResponsive } from '@/hooks/useResponsive';
import RenderIf from './widgets/RenderIf';
import { Lobster } from 'next/font/google';
import { cn } from '@/lib/utils';

const lobster = Lobster({
  weight: '400',
  subsets: ['latin', 'latin-ext', 'vietnamese']
});

export default function Banner() {
  const t = useTranslations('banner');
  const headerHeight = useAppSelector((state) => state.headerHeight.headerHeight);
  const { isMobile, isTablet } = useResponsive();

  return (
    <div
      className='relative w-full h-full overflow-hidden flex flex-col items-center justify-center'
      style={{ height: `calc(100vh - ${headerHeight}px)` }}
    >
      {/* Background Image */}
      <Image
        src='/images/banner-bg.png'
        alt='Airplane in the sky'
        layout='fill'
        objectFit='cover'
        className='scale-105 blur-[10px]'
      />

      {/* Content */}
      <div className='relative flex flex-col items-center justify-center text-center text-white space-y-10 lg:space-y-0'>
        <h1
          className={cn('text-5xl md:text-6xl font-bold tracking-wider text-white drop-shadow-lg', lobster.className)}
        >
          {t('title')}
        </h1>
        <p className='mt-2 text-lg md:text-3xl font-medium drop-shadow-md text-[#0f5184]'>{t('slogan')}</p>
        <div className='mt-4'>
          <RenderIf condition={isMobile}>
            <Image
              src='/images/banner-center.png'
              alt='Airplane in the sky'
              width={400}
              height={200}
              className='rounded-lg'
            />
          </RenderIf>
          <RenderIf condition={isTablet && !isMobile}>
            <Image
              src='/images/banner-center.png'
              alt='Airplane in the sky'
              width={500}
              height={250}
              className='rounded-lg'
            />
          </RenderIf>
          <RenderIf condition={!(isMobile || isTablet)}>
            <Image
              src='/images/banner-center.png'
              alt='Airplane in the sky'
              width={700}
              height={300}
              className='rounded-lg'
            />
          </RenderIf>
        </div>
      </div>
    </div>
  );
}
