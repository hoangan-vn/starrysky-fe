// import { Phone, Mail, MessageCircle, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { useTranslations } from 'next-intl';
import ZaloContact from '../header/ZaloContact';
import TelContact from '../header/TelContact';
import MailContact from '../header/MailContact';

export default function ContactInfoSection() {
  const t = useTranslations('contact-us');

  return (
    <Card className='shadow-md'>
      <CardContent className='pt-6 space-y-6'>
        {/* Address */}
        <div>
          <h3 className='text-lg font-semibold'>{t('address.title')}</h3>
          <p className='text-gray-600'>{t('address.content')}</p>
        </div>

        {/* Hotline */}
        <div>
          <h3 className='text-lg font-semibold'>{t('hotline.title')}</h3>
          <div className='space-y-2'>
            <div className='flex items-center'>
              <TelContact />
            </div>
            <div className='flex items-center'>
              <ZaloContact />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <h3 className='text-lg font-semibold'>{t('email.title')}</h3>
          <div className='flex items-center'>
            <MailContact />
          </div>
        </div>

        {/* Social Media */}
        {/* <div className='flex space-x-4'>
          <a href='https://whatsapp.com' target='_blank' rel='noopener noreferrer'>
            <MessageCircle className='w-6 h-6 text-green-500 hover:text-green-600' />
          </a>
          <a href='https://zalo.me' target='_blank' rel='noopener noreferrer'>
            <MessageSquare className='w-6 h-6 text-blue-500 hover:text-blue-600' />
          </a>
          <a href='https://skype.com' target='_blank' rel='noopener noreferrer'>
            <svg
              className='w-6 h-6 text-blue-400 hover:text-blue-500'
              viewBox='0 0 24 24'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12 2C6.48 2 2 6.48 2 12c0 2.07.64 4 1.73 5.62L2 22l4.38-1.73C8 21.36 9.93 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm3.5 15.5c-.6.5-1.38.88-2.38 1.12-1 .25-2.12.38-3.38.38-1.5 0-2.88-.25-4.12-.75l-.5-.25-2.62 1 1-2.62.25-.5c-.5-1.25-.75-2.62-.75-4.12 0-1.25.12-2.38.38-3.38.25-1 .62-1.88 1.12-2.38S6.5 6 7.5 5.5 9.38 5 10.5 5h1c1.12 0 2.12.12 3.12.38.88.25 1.62.62 2.12 1.12.5.5.88 1.12 1.12 1.88.25.75.38 1.62.38 2.62 0 1-.12 1.88-.38 2.62-.25.75-.62 1.38-1.12 1.88zM12 15.5c1.5 0 2.62-.5 3.38-1.38.75-.88.75-2 0-2.88-.75-.88-1.88-1.38-3.38-1.38s-2.62.5-3.38 1.38c-.75.88-.75 2 0 2.88.75.88 1.88 1.38 3.38 1.38z' />
            </svg>
          </a>
        </div> */}
      </CardContent>
    </Card>
  );
}
