import { MessageCircle } from 'lucide-react';

import NavLink from '@/lib/router/NavLink';
import { useAboutNavLinks, useMoreNavLinks, useNavLinks, usePolicyNavLinks } from '@/lib/router/router';
import { useTranslations } from 'next-intl';
import Logo from '../logo/Logo';
import NewsletterSubscription from './NewsletterSubscription';

export default function Footer() {
  const navLinks = useNavLinks();
  const moreNavLinks = useMoreNavLinks();
  const aboutNavLinks = useAboutNavLinks();
  const policyNavLinks = usePolicyNavLinks();

  const t = useTranslations('footer');

  const footerLinks = [
    {
      title: t('resources'),
      links: navLinks
    },
    {
      title: t('more'),
      links: moreNavLinks
    },
    {
      title: t('about-us'),
      links: aboutNavLinks
    },
    {
      title: t('legal'),
      links: policyNavLinks
    }
  ];

  return (
    <footer className='bg-white border-t py-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <div className='mb-8'>
          <Logo />
        </div>

        {/* Main Footer Content */}
        <div className='grid grid-cols-2 md:grid-cols-5 gap-8'>
          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className='text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4'>{section.title}</h3>
              <ul className='space-y-2'>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <NavLink href={link.href} className='text-sm text-gray-600 hover:text-gray-900'>
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <NewsletterSubscription />
        </div>

        {/* Bottom Section */}
        <div className='mt-10 flex justify-between items-center border-t pt-6'>
          <p className='text-sm text-gray-600'>© 2025 Starry Sky Co.,Ltd | Deveoped by Hoang An</p>
          <div className='flex space-x-4'>
            <NavLink href='zalo://chat?phone=0779672566' className='text-gray-600 hover:text-gray-900'>
              <MessageCircle className='w-5 h-5' />
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
