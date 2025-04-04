'use client';

import { useLayoutEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { LocaleSwitcher } from '@/components/locale';
import { HeaderContact } from './HeaderContact';
import RenderIf from '../RenderIf';
import { useResponsive } from '@/hooks/useResponsive';
import Search from './Search';
import NavigationLinks from './NavigationLinks';
import Logo from '../logo/Logo';

export default function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { isMobile } = useResponsive();

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <RenderIf condition={isMobile}>
        <div className='sticky top-0 z-50 w-full'>
          <header
            className={cn('flex items-center justify-between px-6 py-4 border-b bg-white', scrolled && 'shadow-md')}
          >
            <div></div>
            <Logo />
            <div className='flex items-center space-x-2'>
              <Search />
              <LocaleSwitcher />
            </div>
          </header>
        </div>
      </RenderIf>
      <RenderIf condition={!isMobile}>
        <HeaderContact />
        <div className='sticky top-0 z-50 w-full'>
          <header
            className={cn('flex items-center justify-between px-6 py-4 border-b bg-white', scrolled && 'shadow-md')}
          >
            <Logo />
            <NavigationLinks />
            <div className='flex items-center space-x-2'>
              <Search />
              <LocaleSwitcher />
            </div>
          </header>
        </div>
      </RenderIf>
    </>
  );
}
