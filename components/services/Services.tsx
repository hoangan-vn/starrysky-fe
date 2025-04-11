import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Services() {
  const t = useTranslations('services');

  return (
    <div className='flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto py-12 px-4'>
      <div className='relative w-full md:w-1/2 flex justify-center mb-8 md:mb-0'>
        <div className='absolute w-80 h-80'></div>
        <Image src='/images/fast-track.png' alt='Travel illustration' width={400} height={300} className='rounded-lg' />
      </div>

      <div className='w-full md:w-1/2 space-y-4'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>{t('title')}</h2>
        <p className='text-base md:text-lg text-gray-600 leading-relaxed'>{t('description')}</p>
        <p className='text-lg md:text-xl font-medium text-gray-700 italic'>{t('quote')}</p>
      </div>
    </div>
  );
}
