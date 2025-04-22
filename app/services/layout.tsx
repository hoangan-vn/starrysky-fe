import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('services.title'),
    description: t('services.description'),
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
      title: t('title'),
      description: t('description'),
      url: 'https://starrysky.com.vn/services',
      type: 'website'
    }
  };
}

interface ServicesLayoutProps {
  children: ReactNode;
}

export default function ServicesLayout({ children }: ServicesLayoutProps) {
  return children;
}