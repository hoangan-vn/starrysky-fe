import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ZaloContact() {
  const t = useTranslations('header.header-contact.zalo');

  const handleZaloClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();

    let hasOpenedZalo = false;

    const handleBlur = () => {
      hasOpenedZalo = true;
      window.removeEventListener('blur', handleBlur);
    };
    window.addEventListener('blur', handleBlur);

    window.location.href = `zalo://chat?phone=${t('ref')}`;

    setTimeout(() => {
      if (!hasOpenedZalo) {
        window.location.href = `https://zalo.me/${t('ref')}`;
      }
      window.removeEventListener('blur', handleBlur);
    }, 3000);
  };
  return (
    <div className='flex items-center space-x-2'>
      <Image src='/images/zalo.png' alt='Zalo' width={20} height={14} />
      <a
        href={`zalo://chat?phone=${t('ref')}`}
        onClick={(e) => handleZaloClick(e)}
        className='text-blue-600 hover:underline'
        target='_blank'
        rel='noopener noreferrer'
      >
        {t('tag')}
      </a>
    </div>
  );
}
