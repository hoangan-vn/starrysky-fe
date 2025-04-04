import Image from 'next/image';
import { Plane } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/hooks/hooks';
import { useResponsive } from '@/hooks/useResponsive';
import RenderIf from './widgets/RenderIf';

export default function Banner() {
  const t = useTranslations('banner');
  const headerHeight = useAppSelector((state) => state.headerHeight.headerHeight);
  const { isMobile, isTablet } = useResponsive();
  return (
    <div className='relative w-full overflow-hidden' style={{ height: `calc(100vh - ${headerHeight}px)` }}>
      <Image
        src='/banner-bg.png'
        alt='Airplane in the sky'
        layout='fill'
        objectFit='cover'
        className='scale-105 blur-[10px]'
      />

      <div className='absolute inset-0 flex flex-col items-center justifying-center text-center text-white p-4'>
        <h1 className='text-5xl md:text-6xl font-bold tracking-wider text-white drop-shadow-lg'>{t('title')}</h1>
        <p className='mt-2 text-lg md:text-3xl font-medium drop-shadow-md mb-10 text-[#0f5184]'>
          {t('slogan')} <Plane className='inline-block w-5 h-5 ml-1' />
        </p>
        <RenderIf condition={isMobile}>
          <Image src='/banner-center.png' alt='Airplane in the sky' width={400} height={200} className='rounded-lg' />
        </RenderIf>
        <RenderIf condition={isTablet && !isMobile}>
          <Image src='/banner-center.png' alt='Airplane in the sky' width={500} height={250} className='rounded-lg' />
        </RenderIf>
        <RenderIf condition={!(isMobile || isTablet)}>
          <Image src='/banner-center.png' alt='Airplane in the sky' width={700} height={300} className='rounded-lg' />
        </RenderIf>
      </div>
    </div>
  );
}
