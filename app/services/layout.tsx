import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'metadata' });

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

export default function ServicesLayout({ children }: LayoutProps) {
  return children;
}
