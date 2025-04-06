'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { LocaleSwitcher } from '@/components/locale';
import { HeaderContact } from './HeaderContact';
import RenderIf from '../widgets/RenderIf';
import { useResponsive } from '@/hooks/useResponsive';
import Search from './Search';
import NavigationLinks from './NavigationLinks';
import Logo from '../logo/Logo';
import { useAppDispatch } from '@/hooks/hooks';
import { setHeaderHeight } from '@/lib/features/header-height/headerHeightSlice';
import Flexibility from '../widgets/Flexibility';
import Navbar from './Navbar';

export default function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { isMobile } = useResponsive();
  const mobileHeaderRef = useRef<HTMLDivElement>(null);
  const desktopHeaderRef = useRef<HTMLDivElement>(null);
  const headerContactRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const updateHeaderHeight = () => {
      let totalHeight = 0;

      if (isMobile && mobileHeaderRef.current) {
        totalHeight = mobileHeaderRef.current.getBoundingClientRect().height;
      } else {
        if (headerContactRef.current) {
          totalHeight += headerContactRef.current.getBoundingClientRect().height;
        }
        if (desktopHeaderRef.current) {
          totalHeight += desktopHeaderRef.current.getBoundingClientRect().height;
        }
      }

      dispatch(setHeaderHeight(totalHeight));
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [isMobile, dispatch]);

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
        <div ref={mobileHeaderRef} className='sticky top-0 z-50 w-full'>
          <header
            className={cn('flex items-center justify-between px-6 py-4 border-b bg-white', scrolled && 'shadow-md')}
          >
            <div>
              <Navbar />
            </div>
            <Logo />
            <div className='flex items-center space-x-2'>
              <Search />
              <LocaleSwitcher />
            </div>
          </header>
        </div>
      </RenderIf>
      <RenderIf condition={!isMobile}>
        <div ref={headerContactRef}>
          <HeaderContact />
        </div>
        <div ref={desktopHeaderRef} className='sticky top-0 z-50 w-full'>
          <header
            className={cn('flex items-center justify-between px-6 py-4 border-b bg-white', scrolled && 'shadow-md')}
          >
            <Flexibility className='flex justify-start items-center'>
              <Logo />
            </Flexibility>
            <Flexibility className='flex justify-center items-center'>
              <NavigationLinks />
            </Flexibility>
            <Flexibility className='flex justify-end items-center'>
              <div className='flex items-center space-x-2'>
                <Search />
                <LocaleSwitcher />
              </div>
            </Flexibility>
          </header>
        </div>
      </RenderIf>
    </>
  );
}
