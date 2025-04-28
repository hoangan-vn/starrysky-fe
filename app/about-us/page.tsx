import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const t = useTranslations('about-us');

  return (
    <div className='max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
      {/* Header Section */}
      <section className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-gray-900'>{t('title')}</h1>
        <p className='mt-4 text-lg text-gray-600 max-w-3xl mx-auto'>{t('subtitle')}</p>
      </section>

      <Separator className='my-8' />

      {/* Introduction Section */}
      <section className='mb-12'>
        <h2 className='text-3xl font-semibold text-gray-900 mb-6'>{t('intro.title')}</h2>
        <p className='text-gray-600 leading-relaxed'>{t('intro.description')}</p>
      </section>

      {/* Fast Track Service Section */}
      <section className='mb-12'>
        <h2 className='text-3xl font-semibold text-gray-900 mb-6'>{t('fastTrack.title')}</h2>
        <p className='text-gray-600 leading-relaxed mb-6'>{t('fastTrack.description')}</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {t.raw('fastTrack.benefits').map((benefit: { title: string; description: string }, index: number) => (
            <Card key={index} className='shadow-md hover:shadow-lg transition-shadow'>
              <CardHeader>
                <CardTitle className='text-xl font-medium'>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600'>{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className='text-center'>
        <h2 className='text-2xl font-semibold text-gray-900 mb-4'>{t('cta.title')}</h2>
        <p className='text-gray-600 mb-6'>{t('cta.description')}</p>
        <Link href='/services'>
          <Button className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-3'>
            {t('cta.button')}
            <ArrowRight className='ml-2 h-5 w-5' />
          </Button>
        </Link>
      </section>
    </div>
  );
}
