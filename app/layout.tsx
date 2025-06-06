import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { getLocale, getTranslations } from 'next-intl/server';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import StoreProvider from '@/app/StoreProvider';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { Toaster } from '@/components/ui/sonner';
import { getUserLocale } from '@/lib/locale';

const times = localFont({
  src: [
    {
      path: '../public/fonts/times.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/times_bd.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../public/fonts/times_i.ttf',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../public/fonts/times_bi.ttf',
      weight: '700',
      style: 'italic'
    }
  ]
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getUserLocale();
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${times.className} antialiased`}>
        <StoreProvider>
          <NextIntlClientProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
            {/* <ChatButton /> */}
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
