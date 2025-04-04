import { useEffect, useState, useRef } from 'react';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/input';
import { useResponsive } from '@/hooks/useResponsive';
import RenderIf from '@/components/widgets/RenderIf';
import { cn } from '@/lib/utils';
import { DeviceBrandtypeEnum } from '@/lib/enum';

type SearchProps = {
  className?: string;
};

export default function Search({ className }: SearchProps) {
  const t = useTranslations('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [shortcutKey, setShortcutKey] = useState(t('apple-shortcut'));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isMobile, isTablet, isLaptop, isDesktop } = useResponsive();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMac =
      typeof navigator !== 'undefined' &&
      (navigator.userAgent.toUpperCase().indexOf(DeviceBrandtypeEnum.mac) >= 0 ||
        navigator.userAgent.toUpperCase().indexOf(DeviceBrandtypeEnum.iphone) >= 0 ||
        navigator.userAgent.toUpperCase().indexOf(DeviceBrandtypeEnum.ipad) >= 0);

    setShortcutKey(isMac ? t('apple-shortcut') : t('windows-shortcut'));
  }, [t]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen && (isMobile || isTablet)) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen, isMobile, isTablet]);

  return (
    <div className={cn('relative', className)} ref={searchRef}>
      <RenderIf condition={isLaptop || isDesktop}>
        <>
          <Input
            type='text'
            placeholder={t('placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-64'
          />
          <span className='absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500'>
            {shortcutKey}
          </span>
        </>
      </RenderIf>
      <RenderIf condition={isMobile || isTablet}>
        <>
          {!isSearchOpen ? (
            <button
              onClick={() => setIsSearchOpen(true)}
              className='p-2 rounded-md hover:bg-gray-200 focus:outline-none'
            >
              <SearchIcon className='w-5 h-5 text-gray-500' />
            </button>
          ) : (
            <>
              <Input
                type='text'
                placeholder={t('placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-64'
              />
              <span className='absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500'>
                {shortcutKey}
              </span>
            </>
          )}
        </>
      </RenderIf>
    </div>
  );
}
