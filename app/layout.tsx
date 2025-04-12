import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { getLocale, getTranslations } from 'next-intl/server';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import StoreProvider from '@/app/StoreProvider';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { Toaster } from '@/components/ui/sonner';
// import ChatButton from '@/components/chat/ChatButton';

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

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description')
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
            {/* Thêm vào sau */}
            {/* <ChatButton /> */}
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
