import { useEffect, useState, useRef } from 'react';
import { SearchIcon, X, Clock, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useResponsive } from '@/hooks/useResponsive';
import RenderIf from '@/components/widgets/RenderIf';
import { cn, showSonner } from '@/lib/utils';
import { DeviceBrandtypeEnum } from '@/lib/enum';
import { RootState } from '@/lib/store';
import { addSearchQuery, clearSearchHistory } from '@/lib/features/search/searchHistorySlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

type SearchProps = {
  className?: string;
};

export default function Search({ className }: SearchProps) {
  const t = useTranslations('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [shortcutKey, setShortcutKey] = useState(t('apple-shortcut'));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isMobile, isTablet, isLaptop, isDesktop } = useResponsive();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRefDialog = useRef<HTMLInputElement>(null);
  const t_sonner = useTranslations('sonner');

  // Redux
  const dispatch = useAppDispatch();
  const searchHistory = useAppSelector((state: RootState) => state.searchHistory.history);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(addSearchQuery(searchQuery));
      showSonner({
        action: t_sonner('action'),
        description: t_sonner('description'),
        label: t_sonner('undo'),
        icon: <></>
      });
    }
  };

  const handleClearHistory = () => {
    dispatch(clearSearchHistory());
  };

  const handleHistoryItemClick = (query: string) => {
    setSearchQuery(query);
    if (inputRefDialog.current) {
      inputRefDialog.current.focus();
    } else if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const isMac =
      typeof navigator !== 'undefined' &&
      (navigator.userAgent.toUpperCase().indexOf(DeviceBrandtypeEnum.mac) >= 0 ||
        navigator.userAgent.toUpperCase().indexOf(DeviceBrandtypeEnum.iphone) >= 0 ||
        navigator.userAgent.toUpperCase().indexOf(DeviceBrandtypeEnum.ipad) >= 0);

    setShortcutKey(isMac ? t('apple-shortcut') : t('windows-shortcut'));
  }, [t]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscKey);
      inputRefDialog.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const handleShortcutKey = (event: KeyboardEvent) => {
      const isMac = navigator.userAgent.toUpperCase().indexOf(DeviceBrandtypeEnum.mac) >= 0;

      if ((isMac && event.metaKey && event.key === 'k') || (!isMac && event.ctrlKey && event.key === 'k')) {
        event.preventDefault();

        if (isMobile || isTablet) {
          setIsSearchOpen(true);
        } else {
          inputRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleShortcutKey);

    return () => {
      document.removeEventListener('keydown', handleShortcutKey);
    };
  }, [shortcutKey, isMobile, isTablet]);

  return (
    <div className={cn('relative', className)}>
      <RenderIf condition={isLaptop || isDesktop}>
        <div className='relative'>
          <Input
            ref={inputRef}
            type='text'
            placeholder={t('placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className='w-64 pr-20'
          />
          <div className='absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center'>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className='text-gray-400 hover:text-gray-600 mr-2'
                aria-label='Clear search'
              >
                <X className='h-4 w-4' />
              </button>
            )}
            <span className='text-sm text-gray-500'>{shortcutKey}</span>
          </div>

          {/* Dropdown for search history */}
          {searchQuery && searchHistory.length > 0 && (
            <div className='absolute left-0 right-0 top-full mt-1 bg-white rounded-md shadow-lg z-10 max-h-80 overflow-y-auto'>
              {searchHistory
                .filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer'
                    onClick={() => handleHistoryItemClick(item)}
                  >
                    <Clock className='h-4 w-4 text-gray-400 mr-2' />
                    <span>{item}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </RenderIf>

      <RenderIf condition={isMobile || isTablet}>
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsSearchOpen(true)}
              className='p-2 rounded-md hover:bg-gray-200 focus:outline-none'
              aria-label={t('search')}
            >
              <SearchIcon className='w-5 h-5 text-gray-500' />
            </Button>
          </DialogTrigger>

          <DialogContent className='sm:max-w-md p-6'>
            <DialogHeader>
              <DialogTitle className='sr-only'>{t('search')}</DialogTitle>
            </DialogHeader>

            <div className='relative flex items-center space-x-2 mb-3'>
              <div className='relative w-full'>
                <Input
                  ref={inputRefDialog}
                  type='text'
                  placeholder={t('placeholder-dialog')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className='pr-20'
                  aria-label={t('search')}
                />
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center'>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className='text-gray-400 hover:text-gray-600 mr-2'
                      aria-label='Clear search'
                    >
                      <X className='h-4 w-4' />
                    </button>
                  )}
                  <span className='text-xs text-gray-500'>{t('esc-shortcut')}</span>
                </div>
              </div>
            </div>

            {/* History */}
            <div className={`${isMobile ? 'max-h-[60vh] overflow-y-auto' : ''} mb-4`}>
              {searchHistory.length > 0 && (
                <div className='mb-2'>
                  <div className='flex justify-between items-center mb-2'>
                    <h3 className='text-sm font-medium text-gray-500'>{t('recent-searches')}</h3>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={handleClearHistory}
                      className='text-xs text-red-500 hover:text-red-700 flex items-center justify-center gap-1 h-8'
                    >
                      <Trash2 className='h-3 w-3' />
                      {t('clear-all')}
                    </Button>
                  </div>
                  <div className='space-y-1'>
                    {searchHistory.map((item, index) => (
                      <div
                        key={index}
                        className='flex items-center px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer'
                        onClick={() => handleHistoryItemClick(item)}
                      >
                        <Clock className='h-4 w-4 text-gray-400 mr-2 flex-shrink-0' />
                        <span className='text-sm text-gray-700 truncate'>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant='outline' onClick={handleSearch} className='py-[6px] w-full sm:w-auto'>
                {t('search')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </RenderIf>
    </div>
  );
}
