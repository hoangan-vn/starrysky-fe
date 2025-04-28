import { getUserLocale } from '@/lib/locale';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getUserLocale();
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('about.title'),
    description: t('about.description'),
    keywords: t.raw('keywords') as string[],
    robots: {
      index: true,
      follow: true
    },
    icons: {
      icon: '/favicon.ico'
    },
    other: {
      'google-site-verification': '0yGDbl7oqMmKMf-W6lD0UyrT9coaZNqLS9x9GKeOE38'
    },
    openGraph: {
      title: t('about.title'),
      description: t('about.description'),
      url: 'https://starrysky.com.vn/about-us',
      type: 'website'
    }
  };
}

export default function ServicesLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
