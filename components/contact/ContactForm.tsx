'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import RequirementField from '../widgets/RequirementField';
import { useTranslations } from 'next-intl';
import { showSonnerUnderDevelopment } from '@/lib/utils';
import { AppIcon } from '../icons';
// import Capcha from '../captcha/Captcha';
// import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
// import { checkExpiration } from '@/lib/features/captcha/captchaSlice';
// import { RootState } from '@/lib/store';
// import { useEffect } from 'react';

const ContactForm = () => {
  const t = useTranslations('contact-us');
  const t_sonner = useTranslations('sonner');

  // const dispatch = useAppDispatch();
  // const isVerified = useAppSelector((state: RootState) => state.captcha.isVerified);

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
    showSonnerUnderDevelopment({
      action: t_sonner('action'),
      description: t_sonner('description'),
      label: t_sonner('undo'),
      icon: <AppIcon width={25} height={25} />
    });
  };

  // useEffect(() => {
  //   dispatch(checkExpiration());
  // }, [dispatch]);

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
            {t('messageLabel')} <RequirementField />
          </label>
          <Textarea id='message' {...register('message')} className='mt-1' rows={4} />
          {errors.message && <p className='text-red-500 text-sm mt-1'>{errors.message.message}</p>}
        </div>
        {/* <div className='w-full flex justify-center items-center'>
          <Capcha />
        </div> */}
        {/* Submit Button */}
        <div>
          <Button
            type='submit'
            className='bg-orange-500 hover:bg-orange-600 w-full'
            // disabled={!isVerified}
          >
            {t('sendMessage')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
