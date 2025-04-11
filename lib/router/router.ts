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
    { name: t('services'), href: '/services' },
    { name: t('pricing'), href: '/pricing' },
    { name: t('blogs'), href: '/blogs' },
    { name: t('about-us'), href: '/about-us' },
    { name: t('contact-us'), href: '' }
  ];
};
