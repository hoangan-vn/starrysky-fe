import { Plane, CheckSquare, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Benefits() {
  const t = useTranslations('benefits');

  const benefits = [
    {
      icon: <Plane className='w-6 h-6 text-gray-800' />,
      text: t('convenience')
    },
    {
      icon: <CheckSquare className='w-6 h-6 text-gray-800' />,
      text: t('quick-check-in')
    },
    {
      icon: <Clock className='w-6 h-6 text-gray-800' />,
      text: t('time-saving')
    }
  ];

  return (
    <div className='flex flex-col md:flex-row items-center justify-between w-full max-w-4xl mx-auto py-8 px-4 space-y-6 md:space-y-0 md:space-x-12'>
      {benefits.map((benefit, index) => (
        <div key={index} className='flex items-center space-x-3 w-1/2'>
          <div className='flex-shrink-0 flex-1 md:flex-none'>{benefit.icon}</div>
          <p className='text-sm md:text-base font-semibold text-gray-800 uppercase flex-2 md:flex-none'>{benefit.text}</p>
        </div>
      ))}
    </div>
  );
}
