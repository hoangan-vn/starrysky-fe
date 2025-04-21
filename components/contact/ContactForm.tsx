'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import RequirementField from '../widgets/RequirementField';
import { useTranslations } from 'next-intl';
import { showSonner } from '@/lib/utils';
import { AppIcon } from '../icons';

const ContactForm = () => {
  const t = useTranslations('contact-us');
  const t_sonner = useTranslations('sonner');

  const formSchema = z.object({
    fullname: z.string().min(1, t('errors.fullnameRequired')),
    email: z.string().email(t('errors.invalidEmail')),
    phone: z.string().min(1, t('errors.phoneRequired')),
    serviceType: z.string().min(1, t('errors.serviceTypeRequired')),
    message: z.string().min(1)
  });

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      email: '',
      phone: '',
      serviceType: '',
      message: ''
    },
    mode: 'onChange'
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = useState<FormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (!isValid) {
      showSonner({
        action: t_sonner('error-label'),
        description: t_sonner('error'),
        label: t_sonner('undo'),
        icon: <AppIcon width={25} height={25} />
      });
      return;
    }
    setFormDataToSubmit(data);
    setIsDialogOpen(true);
  };

  const handleConfirmSubmit = async () => {
    if (!formDataToSubmit) return;

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataToSubmit)
      });

      if (res.ok) {
        let responseData;
        const contentType = res.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          try {
            responseData = await res.json();
            console.log('Response: ', responseData);
          } catch (jsonError) {
            console.warn('Could not parse JSON response:', jsonError);
          }
        }

        showSonner({
          action: t_sonner('success-label'),
          description: t_sonner('success'),
          label: t_sonner('undo'),
          icon: <AppIcon width={25} height={25} />
        });
      } else {
        let errorMessage = t_sonner('errorMessage');

        try {
          const errorData = await res.text();
          if (errorData && errorData.startsWith('{') && errorData.endsWith('}')) {
            const parsedError = JSON.parse(errorData);
            errorMessage = parsedError.message || errorMessage;
          }
        } catch (textError) {
          console.error('Error reading response text:', textError);
        }

        console.error('Failed to send email:', errorMessage);
        showSonner({
          action: t_sonner('error-label'),
          description: t_sonner('error'),
          label: t_sonner('undo'),
          icon: <AppIcon width={25} height={25} />
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      showSonner({
        action: t_sonner('error-label'),
        description: t_sonner('error'),
        label: t_sonner('undo'),
        icon: <AppIcon width={25} height={25} />
      });
    } finally {
      setIsSubmitting(false);
      setIsDialogOpen(false);
      setFormDataToSubmit(null);
    }
  };

  return (
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
            <span className='inline-flex items-center px-3 py-[5px] border border-r-0 rounded-l-md bg-gray-50'>
              +84
            </span>
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
              <SelectItem value='arrival-fast-track'>{t('select-item.arrival')}</SelectItem>
              <SelectItem value='departure-fast-track'>{t('select-item.departure')}</SelectItem>
            </SelectContent>
          </Select>
          {errors.serviceType && <p className='text-red-500 text-sm mt-1'>{errors.serviceType.message}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor='message' className='block text-sm font-medium'>
            {t('messageLabel')}
          </label>
          <Textarea id='message' {...register('message')} className='mt-1' rows={4} />
        </div>

        {/* Submit Button */}
        <div>
          <Button type='submit' className='bg-orange-500 hover:bg-orange-600 w-full' disabled={isSubmitting}>
            {isSubmitting ? t('sending') : t('sendMessage')}
          </Button>
        </div>
      </form>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('confirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>{t('confirmDescription')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSubmit} disabled={isSubmitting}>
              {t('sending')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ContactForm;
