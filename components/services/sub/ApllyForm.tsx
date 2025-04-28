'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { useTranslations, useLocale } from 'next-intl';
import { showSonner } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppIcon } from '@/components/icons';
import RequirementField from '@/components/widgets/RequirementField';

interface ApllyFormProps {
  serviceTitle: string;
}

const ApllyForm = ({ serviceTitle }: ApllyFormProps) => {
  const t = useTranslations('contact-us');
  const t_sonner = useTranslations('sonner');
  const locale = useLocale();

  const dateLocale = locale === 'vi' ? vi : enUS;

  // Schema của form, message không bắt buộc
  const formSchema = z.object({
    fullname: z.string().min(1, t('errors.fullnameRequired')),
    email: z.string().email(t('errors.invalidEmail')),
    phone: z.string().min(1, t('errors.phoneRequired')),
    serviceType: z.string().min(1, t('errors.serviceTypeRequired')),
    date: z.date().refine((date) => date >= new Date(), {
      message: t('errors.invalidDate')
    }),
    message: z.string().optional()
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
      serviceType: serviceTitle,
      date: undefined,
      message: ''
    },
    mode: 'onChange'
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = useState<FormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDate = watch('date');

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
      const res = await fetch('/api/apply-services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formDataToSubmit,
          date: format(formDataToSubmit.date, 'yyyy-MM-dd')
        })
      });

      if (res.ok) {
        showSonner({
          action: t_sonner('success-label'),
          description: t_sonner('success'),
          label: t_sonner('undo'),
          icon: <AppIcon width={25} height={25} />
        });
      } else {
        let errorMessage = t_sonner('errorMessage');
        console.error('Error reading response text:', errorMessage);
        try {
          const errorData = await res.text();
          if (errorData && errorData.startsWith('{') && errorData.endsWith('}')) {
            const parsedError = JSON.parse(errorData);
            errorMessage = parsedError.message || errorMessage;
          }
        } catch (textError) {
          console.error('Error reading response text:', textError);
        }

        console.error('Failed to send request:', errorMessage);
        showSonner({
          action: t_sonner('error-label'),
          description: t_sonner('error'),
          label: t_sonner('undo'),
          icon: <AppIcon width={25} height={25} />
        });
      }
    } catch (error) {
      console.error('Error sending request:', error);
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
          <Input
            id='serviceType'
            value={serviceTitle}
            disabled
            className='mt-1 bg-gray-100'
            {...register('serviceType')}
          />
          {errors.serviceType && <p className='text-red-500 text-sm mt-1'>{errors.serviceType.message}</p>}
        </div>

        {/* Date Picker */}
        <div>
          <label htmlFor='date' className='block text-sm font-medium'>
            {t('dateLabel')} <RequirementField />
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className={cn(
                  'w-full justify-start text-left font-normal mt-1',
                  !selectedDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {selectedDate ? (
                  format(selectedDate, 'PPP', { locale: dateLocale })
                ) : (
                  <span>{t('date-placeholder')}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={selectedDate}
                onSelect={(date) => setValue('date', date as Date, { shouldValidate: true })}
                disabled={(date) => date < new Date()}
                initialFocus
                locale={dateLocale}
              />
            </PopoverContent>
          </Popover>
          {errors.date && <p className='text-red-500 text-sm mt-1'>{errors.date.message}</p>}
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
            {isSubmitting ? t('sending') : t('apply')}
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
              {t('confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ApllyForm;
