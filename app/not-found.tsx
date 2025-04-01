'use client';

import { useEffect } from 'react';
// import Error from "next/error";
import Document from '@/components/Document';
import { useLocale, useTranslations } from 'next-intl';

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations('error');

  // Use client-side effect to handle non-static behavior
  useEffect(() => {
    // You can add any client-side logic here if needed
  }, []);

  return (
    <Document locale={locale}>
      {/* <Error statusCode={404} /> */}
      {t('title')}
    </Document>
  );
}
