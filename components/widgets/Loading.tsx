'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

type LoadingProps = {
  className?: string;
};

export default function Loading({ className }: LoadingProps) {
  const t = useTranslations('common');
  // const characters = t('loading').split('');

  return (
    // <div className={cn('flex items-center justify-center h-screen bg-gradient-to-r', className)}>
    //   <div className='flex items-end space-x-2'>
    //     {characters.map((char, index) => (
    //       <div
    //         key={index}
    //         className='text-6xl sm:text-7xl font-bold animate-wave'
    //         style={{
    //           animationDelay: `${index * 0.1}s`
    //         }}
    //       >
    //         {char}
    //       </div>
    //     ))}
    //   </div>

    //   <style jsx>{`
    //     @keyframes wave {
    //       0%,
    //       100% {
    //         transform: translateY(0);
    //       }
    //       50% {
    //         transform: translateY(-15px);
    //       }
    //     }
    //     .animate-wave {
    //       animation: wave 1.2s ease-in-out infinite;
    //     }
    //   `}</style>
    // </div>
    <div className={cn('flex items-center justify-center py-6', className)}>
      <div className='flex flex-col items-center gap-2'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></div>
        <p className='text-gray-600'>{t('loading')}</p>
      </div>
    </div>
  );
}
