import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import ZaloContact from './ZaloContact';
import TelContact from './TelContact';
import MailContact from './MailContact';

interface HeaderContactProps {
  className?: string;
}

export function HeaderContact({ className }: HeaderContactProps) {
  const t = useTranslations('header.header-contact');
  return (
    <div className={cn('w-full flex items-center justify-start space-x-2 px-6 py-2 bg-gray-100 text-sm', className)}>
      <span className='font-medium'>{t('question')}</span>
      <TelContact />
      <ZaloContact />
      <MailContact />
    </div>
  );
}
