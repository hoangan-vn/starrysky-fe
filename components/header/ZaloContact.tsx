'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { JSX, useEffect, useState } from 'react';
import RenderIf from '../widgets/RenderIf';

type ZaloContactProps = {
  isIcon?: boolean;
  icon?: JSX.Element;
  phone?: string;
};

export default function ZaloContact({ icon, phone, isIcon = false }: ZaloContactProps) {
  const t = useTranslations('header.header-contact.zalo');
  const [isMobile, setIsMobile] = useState(false);
  const phoneNumber = phone ?? t('ref');
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      return /android|iphone|ipad|ipod|mobile/i.test(userAgent.toLowerCase());
    };

    setIsMobile(checkMobile());
  }, []);

  const handleZaloClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const formattedPhone = phoneNumber.replace(/\D/g, '');

    if (isMobile) {
      const zaloAppUrl = `zalo://chat?phone=${formattedPhone}`;
      const zaloWebUrl = `https://zalo.me/${formattedPhone}`;

      let hasRedirected = false;

      const startTime = new Date().getTime();
      window.location.href = zaloAppUrl;

      const timer = setTimeout(() => {
        const elapsed = new Date().getTime() - startTime;
        if (elapsed > 1500 && !hasRedirected) {
          hasRedirected = true;
          window.location.href = zaloWebUrl;
        }
      }, 1500);

      window.addEventListener(
        'visibilitychange',
        () => {
          if (!document.hidden) {
            const elapsed = new Date().getTime() - startTime;
            if (elapsed < 1500) {
              hasRedirected = true;
              clearTimeout(timer);
              window.location.href = zaloWebUrl;
            }
          }
        },
        { once: true }
      );
    } else {
      window.open(`https://zalo.me/${formattedPhone}`, '_blank');
    }
  };

  return (
    <a
      href={`https://zalo.me/${phoneNumber}`}
      onClick={handleZaloClick}
      className={`flex items-center ${isIcon ? '' : 'space-x-2'}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <RenderIf condition={icon === undefined}>
        <Image src='/images/zalo.png' alt='Zalo' width={20} height={14} />
      </RenderIf>
      <RenderIf condition={icon !== undefined}>{icon}</RenderIf>
      <RenderIf condition={!isIcon}>
        <span className='text-blue-600 hover:underline'>{t('tag')}</span>
      </RenderIf>
    </a>
  );
}
