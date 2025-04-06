import { HomeLink } from '@/lib/router/coordinator';
import { AppIcon } from '../icons';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <AppIcon width={40} height={40} />
      <HomeLink className='text-lg font-bold' onClick={handleLogoClick}>
        Starry Sky
      </HomeLink>
    </div>
  );
}
