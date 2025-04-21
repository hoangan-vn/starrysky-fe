'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { showSonner } from '@/lib/utils';

export default function NewsletterSubscription() {
  const t = useTranslations('footer.newsletter-subscription');
  const t_sonner = useTranslations('sonner');

  const handleClick = () => {
    showSonner({
      action: t_sonner('action'),
      description: t_sonner('description'),
      label: t_sonner('undo'),
      icon: <></>
    });
  };
  return (
    <div>
      <h3 className='text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4'>{t('title')}</h3>
      <p className='text-sm text-gray-600 mb-4'>{t('description')}</p>
      <div className='flex space-x-2'>
        <Input type='email' placeholder='you@gmail.com' className='flex-1' />
        <Button onClick={handleClick}>{t('action')}</Button>
      </div>
    </div>
  );
}
