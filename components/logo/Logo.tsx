import { HomeLink } from '@/lib/router/coordinator';
import { AppIcon } from '../icons';

export default function Logo() {
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className='flex items-center space-x-2'>
      <AppIcon width={40} height={40} />
      <HomeLink className='text-lg font-bold' onClick={handleLogoClick}>
        Starry Sky
      </HomeLink>
    </div>
  );
}
