import { useTranslations } from 'next-intl';
import Image from 'next/image';

type MailContactProps = {
  isIcon?: boolean;
};

export default function MailContact({ isIcon = false }: MailContactProps) {
  const t = useTranslations('header.header-contact');

  return (
    <a href={`mailto:${t('mail')}`} className={`flex items-center ${isIcon ? '' : 'space-x-2'}`}>
      <Image src='/images/mail.png' alt='Mail' width={20} height={14} />
      {!isIcon && <span className='text-blue-600 hover:underline'>{t('mail')}</span>}
    </a>
  );
}
