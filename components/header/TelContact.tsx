import { useTranslations } from 'next-intl';
import Image from 'next/image';

type TelContactProps = {
  isIcon?: boolean;
};

export default function TelContact({ isIcon = false }: TelContactProps) {
  const t = useTranslations('header.header-contact.tel');

  return (
    <a href={`tel:${t('ref')}`} className={`flex items-center ${isIcon ? '' : 'space-x-2'}`}>
      <Image src='/images/vn-flag.png' alt='Vietnam' width={20} height={14} />
      {!isIcon && <span className='text-blue-600 hover:underline'>{t('tag')}</span>}
    </a>
  );
}
