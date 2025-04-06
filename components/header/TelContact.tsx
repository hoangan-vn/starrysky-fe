import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function TelContact() {
  const t = useTranslations('header.header-contact.tel');
  return (
    <div className='flex items-center space-x-2'>
      <Image src='/vn-flag.png' alt='Vietnam' width={20} height={14} />
      <a href={`tel:${t('ref')}`} className='text-blue-600 hover:underline'>
        {t('tag')}
      </a>
    </div>
  );
}
