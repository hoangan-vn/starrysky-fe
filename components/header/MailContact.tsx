import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function MailContact() {
  const t = useTranslations('header.header-contact');
  return (
    <div className='flex items-center space-x-2'>
      <Image src='/images/mail.png' alt='Mail' width={20} height={14} />
      <a href={`mailto:${t('mail')}`} className='text-blue-600 hover:underline'>
        {t('mail')}
      </a>
    </div>
  );
}
