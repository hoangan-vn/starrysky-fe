'use client';
import { HomeLink } from '@/lib/router/coordinator';
import { AppIcon } from '../icons';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useResponsive } from '@/hooks/useResponsive';
import RenderIf from '../widgets/RenderIf';

type LogoProps = {
  className?: string;
  isMenu?: boolean;
};

export default function Logo({ className, isMenu = false }: LogoProps) {
  const t = useTranslations('footer');
  const { isMobile } = useResponsive();

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <RenderIf condition={!isMobile || isMenu}>
        <AppIcon width={40} height={40} />
      </RenderIf>
      <HomeLink className='text-lg font-bold' onClick={handleLogoClick}>
        {t('starry-sky')}
      </HomeLink>
    </div>
  );
}
