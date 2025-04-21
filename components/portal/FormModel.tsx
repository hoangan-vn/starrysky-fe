import { checkExpiration } from '@/lib/features/captcha/captchaSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { PrivacyLink, TermsLink } from '@/lib/router/coordinator';
import { useAppDispatch } from '@/hooks/hooks';
import { useTranslations } from 'next-intl';
import RequirementField from '../widgets/RequirementField';
import { setShowFormModal } from '@/lib/features/portal/portalSlice';
import { AppIcon, CheckIcon } from '../icons';
import { useEffect, useState } from 'react';
import { cn, showSonner } from '@/lib/utils';
import { useResponsive } from '@/hooks/useResponsive';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormModelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FormModel({ isOpen, onClose }: FormModelProps) {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t_sonner = useTranslations('sonner');
  const t = useTranslations('form-model');
  const checkboxes = t.raw('checkboxes') as string[];
  const footers = t.raw('footer') as string[];

  const { isMobile } = useResponsive();

  // Define Zod schema for form validation
  const formSchema = z.object({
    contactName: z.string().min(1, t('input-fields.name.required')),
    email: z.string().min(1, t('input-fields.email.required')).email(t('input-fields.email.is-valid')),
    phone: z
      .string()
      .min(1, t('input-fields.phone.required'))
      .regex(/^[0-9]{10,11}$/, t('input-fields.phone.is-valid')),
    customerCount: z.string().optional(),
    specificRequest: z.string().optional()
  });

  // Define type based on the schema
  type FormSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactName: '',
      email: '',
      phone: '',
      customerCount: '',
      specificRequest: ''
    }
  });

  const onSubmit = async (data: FormSchemaType) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/send-email-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(t('errorMessage'));
      }

      console.log('Form submitted:', data);
      showSonner({
        action: t_sonner('success-label'),
        description: t_sonner('success'),
        label: t_sonner('undo'),
        icon: <AppIcon width={25} height={25} />
      });
      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      showSonner({
        action: t_sonner('error-label'),
        description: t_sonner('error'),
        label: t_sonner('undo'),
        icon: <AppIcon width={25} height={25} />
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDontShowAgain = () => {
    const currentTimestamp = Date.now().toString();
    dispatch(
      setShowFormModal({
        show: false,
        timestamp: currentTimestamp
      })
    );
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      dispatch(checkExpiration());
    }
  }, [dispatch, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn('sm:max-w-[600px]', `${isMobile ? 'max-h-[80vh] overflow-y-auto' : ''}`)}>
        <DialogHeader className='flex flex-col justify-center items-center'>
          <DialogTitle>{t('dialog-title')}</DialogTitle>
          <DialogDescription>{t('dialog-description')}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
          {/* Checkboxes */}
          <div className='space-y-2'>
            {checkboxes.map((label: string, index: number) => (
              <div key={index} className='flex items-center space-x-2 ml-[20%]'>
                <CheckIcon className='w-1/12' />
                <Label>{label}</Label>
              </div>
            ))}
          </div>

          {/* Input Fields */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='contactName' className='mb-2'>
                {t('input-fields.name.label')}
                <RequirementField />
              </Label>
              <Input
                id='contactName'
                placeholder={t('input-fields.name.placeholder')}
                {...register('contactName')}
                className='w-full'
              />
              {errors.contactName && <p className='text-red-500 text-xs mt-1'>{errors.contactName.message}</p>}
            </div>
            <div>
              <Label htmlFor='email' className='mb-2'>
                {t('input-fields.email.label')}
                <RequirementField />
              </Label>
              <Input
                id='email'
                type='email'
                placeholder={t('input-fields.email.placeholder')}
                {...register('email')}
                className='w-full'
              />
              {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='phone' className='mb-2'>
                {t('input-fields.phone.label')}
                <RequirementField />
              </Label>
              <Input
                id='phone'
                type='tel'
                placeholder={t('input-fields.phone.placeholder')}
                {...register('phone')}
                className='w-full'
              />
              {errors.phone && <p className='text-red-500 text-xs mt-1'>{errors.phone.message}</p>}
            </div>
            <div>
              <Label htmlFor='customerCount' className='mb-2'>
                {t('input-fields.clients.label')}
              </Label>
              <Input
                id='customerCount'
                type='number'
                placeholder={t('input-fields.clients.placeholder')}
                {...register('customerCount')}
                className='w-full'
              />
            </div>
          </div>

          <div>
            <Label htmlFor='specificRequest' className='mb-2'>
              {t('input-fields.specific-request.label')}
            </Label>
            <Textarea
              id='specificRequest'
              placeholder={t('input-fields.specific-request.placeholder')}
              {...register('specificRequest')}
              rows={4}
              className='w-full'
            />
          </div>

          <Button
            type='submit'
            className='w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'
            disabled={isSubmitting}
          >
            {t('send')}
          </Button>

          <p className='text-xs text-gray-500 text-center mt-4'>
            {footers[0]} <TermsLink className='underline font-bold'>{footers[1]}</TermsLink> {footers[2]}{' '}
            <PrivacyLink className='underline font-bold'>{footers[3]}</PrivacyLink> {footers[4]}
          </p>
        </form>

        <DialogFooter className='flex justify-between'>
          <Button variant='outline' onClick={handleDontShowAgain}>
            {t('dont-show-again')}
          </Button>
          <Button variant='outline' onClick={onClose}>
            {t('close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
