'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MessageCircle, MessageSquare } from 'lucide-react';
import RequirementField from './widgets/RequirementField';
import { useTranslations } from 'next-intl';
import { useNavLinks } from '@/lib/router/router';

// Định nghĩa schema cho form với thông báo lỗi đa ngôn ngữ
const ContactUs = () => {
  const t = useTranslations('contact-us');
  const navLinks = useNavLinks();

  // Định nghĩa schema với thông báo lỗi từ t
  const formSchema = z.object({
    fullname: z.string().min(1, t('errors.fullnameRequired')),
    email: z.string().email(t('errors.invalidEmail')),
    phone: z.string().min(1, t('errors.phoneRequired')),
    serviceType: z.string().min(1, t('errors.serviceTypeRequired')),
    message: z.string().min(1, t('errors.messageRequired'))
  });

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      email: '',
      phone: '',
      serviceType: '',
      message: ''
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Add your form submission logic here (e.g., API call)
  };

  return (
    <section id={navLinks.at(4)?.id} className='py-12 px-4 max-w-6xl mx-auto'>
      <h2 className='text-3xl font-bold text-center mb-8'>{t('title')}</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Form Section */}
        <div>
          <p className='text-gray-600 mb-6'>{t('description')}</p>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            {/* Fullname */}
            <div>
              <label htmlFor='fullname' className='block text-sm font-medium'>
                {t('fullnameLabel')} <RequirementField />
              </label>
              <Input id='fullname' {...register('fullname')} className='mt-1' />
              {errors.fullname && <p className='text-red-500 text-sm mt-1'>{errors.fullname.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium'>
                {t('emailLabel')} <RequirementField />
              </label>
              <Input id='email' type='email' {...register('email')} className='mt-1' />
              {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor='phone' className='block text-sm font-medium'>
                {t('phoneLabel')} <RequirementField />
              </label>
              <div className='flex items-center mt-1'>
                <span className='inline-flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50'>🇻🇳 +84</span>
                <Input id='phone' type='tel' {...register('phone')} className='rounded-l-none' />
              </div>
              {errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone.message}</p>}
            </div>

            {/* Service Type */}
            <div>
              <label htmlFor='serviceType' className='block text-sm font-medium'>
                {t('serviceTypeLabel')} <RequirementField />
              </label>
              <Select onValueChange={(value) => setValue('serviceType', value)} value={watch('serviceType')}>
                <SelectTrigger className='mt-1'>
                  <SelectValue placeholder='Select a service type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='arrival-fast-track'>Arrival fast track</SelectItem>
                  <SelectItem value='departure-fast-track'>Departure fast track</SelectItem>
                  <SelectItem value='transit-fast-track'>Transit fast track</SelectItem>
                </SelectContent>
              </Select>
              {errors.serviceType && <p className='text-red-500 text-sm mt-1'>{errors.serviceType.message}</p>}
            </div>

            {/* Message */}
            <div>
              <label htmlFor='message' className='block text-sm font-medium'>
                {t('messageLabel')} <RequirementField />
              </label>
              <Textarea id='message' {...register('message')} className='mt-1' rows={4} />
              {errors.message && <p className='text-red-500 text-sm mt-1'>{errors.message.message}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <Button type='submit' className='bg-orange-500 hover:bg-orange-600 w-full'>
                {t('sendMessage')}
              </Button>
            </div>
          </form>
        </div>

        {/* Contact Info Section */}
        <div>
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
                    <Phone className='w-5 h-5 mr-2 text-gray-600' />
                    <span className='text-gray-600'>{t('hotline.phone')}</span>
                  </div>
                  <div className='flex items-center'>
                    <Phone className='w-5 h-5 mr-2 text-gray-600' />
                    <span className='text-gray-600'>{t('hotline.hotline')}</span>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <h3 className='text-lg font-semibold'>{t('email.title')}</h3>
                <div className='flex items-center'>
                  <Mail className='w-5 h-5 mr-2 text-gray-600' />
                  <a href={`mailto:${t('email.content')}`} className='text-gray-600 hover:underline'>
                    {t('email.content')}
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className='flex space-x-4'>
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
