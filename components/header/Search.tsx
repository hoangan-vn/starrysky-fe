import { Input } from '@/components/ui/input';
import { useResponsive } from '@/hooks/useResponsive';
import { useEffect, useState, useRef } from 'react';
import RenderIf from '../RenderIf';
import { SearchIcon } from 'lucide-react';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [shortcutKey, setShortcutKey] = useState('⌘ K');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isMobile, isTablet, isLaptop, isDesktop } = useResponsive();
  const searchRef = useRef<HTMLDivElement>(null); // Ref để theo dõi vùng search

  useEffect(() => {
    const isMac =
      typeof navigator !== 'undefined' &&
      (navigator.userAgent.toUpperCase().indexOf('MAC') >= 0 ||
        navigator.userAgent.toUpperCase().indexOf('IPHONE') >= 0 ||
        navigator.userAgent.toUpperCase().indexOf('IPAD') >= 0);

    setShortcutKey(isMac ? '⌘ K' : 'Ctrl+K');
  }, []);

  // Xử lý nhấp chuột ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    // Chỉ thêm listener khi isSearchOpen = true và trên mobile/tablet
    if (isSearchOpen && (isMobile || isTablet)) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup listener khi component unmount hoặc isSearchOpen thay đổi
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen, isMobile, isTablet]);

  return (
    <div className='relative' ref={searchRef}>
      <RenderIf condition={isLaptop || isDesktop}>
        <>
          <Input
            type='text'
            placeholder='Search documentation...'
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
                placeholder='Search documentation...'
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
