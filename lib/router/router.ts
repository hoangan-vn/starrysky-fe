import { useTranslations } from 'next-intl';

export const routerName = {
  home: '/',
  about: '/about-us',
  blogs: '/blogs',
  'sign-in': '/sign-in',
  'sign-up': '/sign-up',
  terms: '/terms',
  privacy: '/privacy',
  services: '/services',
  pricing: '/pricing',
  'privacy-policy': '/privacy-policy',
  'cookie-preferences': '/cookie-preferences',
  'tsn-airport': '/tan-son-nhat-airport',
  non: ''
};

export const useNavLinks = (): NavLink[] => {
  const t = useTranslations('nav');

  return [
    { id: 'services', name: t('services'), href: routerName.services },
    { id: 'pricing', name: t('pricing'), href: routerName.pricing },
    { id: 'blogs', name: t('blogs'), href: routerName.blogs },
    { id: 'about-us', name: t('about-us'), href: routerName.about },
    { id: 'contact', name: t('contact'), href: routerName.non }
  ];
};

export const useMoreNavLinks = (): NavLink[] => {
  const t = useTranslations('nav');

  return [{ id: 'tsnAirport', name: t('tsn-airport'), href: routerName['tsn-airport'] }];
};

export const useAboutNavLinks = (): NavLink[] => {
  const t = useTranslations('footer');

  return [{ id: 'starrtsky', name: t('starry-sky'), href: routerName.about }];
};

export const usePolicyNavLinks = (): NavLink[] => {
  const t = useTranslations('footer');

  return [
    { id: 'privacyPolicy', name: t('privacy-policy'), href: routerName['privacy-policy'] },
    { id: 'cookiePreferences', name: t('cookie-preferences'), href: routerName['cookie-preferences'] }
  ];
};
