'use client';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { HomeLink } from '@/lib/router/coordinator';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { AppIcon } from '@/components/icons';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState<boolean>(false);

  const navLinks = [
    { name: 'Docs', href: '/docs' },
    { name: 'Components', href: '/components' },
    { name: 'Blocks', href: '/blocks' },
    { name: 'Charts', href: '/charts' },
    { name: 'Themes', href: '/themes' },
    { name: 'Colors', href: '/colors' }
  ];

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
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
    <header
      className={cn(
        'sticky top-0 z-50 w-full flex items-center justify-between px-6 py-4 border-b bg-white',
        scrolled && 'shadow-md'
      )}
    >
      {/* Logo */}
      <div className='flex items-center space-x-2'>
        <AppIcon width={40} height={40} />
        <HomeLink className='text-lg font-bold' onClick={handleLogoClick}>
          Starry Sky
        </HomeLink>
      </div>

      {/* Navigation Links */}
      <nav className='flex space-x-4'>
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} className='text-sm hover:text-gray-600'>
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Search Bar and Icons */}
      <div className='flex items-center space-x-2'>
        {/* Search Input */}
        <div className='relative'>
          <Input
            type='text'
            placeholder='Search documentation...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-64'
          />
          <span className='absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500'>⌘ K</span>
        </div>
        <LocaleSwitcher />
      </div>
    </header>
  );
};

export default Header;
