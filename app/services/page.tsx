import OurServices from '@/components/services/OurServices';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export async function generateMetadata(): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('metadata');

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
      url: 'https://starrysky.com.vn',
      type: 'website'
    }
  };
}

export default function page() {
  return (
    <div>
      <OurServices />
    </div>
  );
}
