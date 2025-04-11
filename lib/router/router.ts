import { useTranslations } from 'next-intl';

export const routerName = {
  home: '/',
  about: '/about-us',
  blogs: '/blogs',
  'sign-in': '/sign-in',
  'sign-up': '/sign-up',
  terms: '/terms',
  privacy: '/privacy'
};

export const useNavLinks = (): NavLink[] => {
  const t = useTranslations('nav');

  return [
    { id: 'services', name: t('services'), href: '/services' },
    { id: 'pricing', name: t('pricing'), href: '/pricing' },
    { id: 'blogs', name: t('blogs'), href: '/blogs' },
    { id: 'about-us', name: t('about-us'), href: '/about-us' },
    { id: 'contact', name: t('contact'), href: '' }
  ];
};
