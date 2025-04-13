import { RootState } from '@/lib/store';
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
import Captcha from '../captcha/Captcha';
import { PrivacyLink, TermsLink } from '@/lib/router/coordinator';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useTranslations } from 'next-intl';
import RequirementField from '../widgets/RequirementField';
import { setShowFormModal } from '@/lib/features/portal/portalSlice';
import { CheckIcon } from '../icons';
import { useEffect } from 'react';
import { showSonnerUnderDevelopment } from '@/lib/utils';

interface FormModelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormModelData {
  contactName: string;
  email: string;
  phone: string;
  customerCount: string;
  specificRequest: string;
}

export default function FormModel({ isOpen, onClose }: FormModelProps) {
  const dispatch = useAppDispatch();
  const isVerified = useAppSelector((state: RootState) => state.captcha.isVerified);

  const t_sonner = useTranslations('sonner');
  const t = useTranslations('form-model');
  const checkboxes = t.raw('checkboxes') as string[];
  const footers = t.raw('footer') as string[];

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormModelData>({
    defaultValues: {
      contactName: '',
      email: '',
      phone: '',
      customerCount: '',
      specificRequest: ''
    }
  });

  const onSubmit = (data: FormModelData) => {
    if (!isVerified) {
      alert(t('alert'));
      return;
    }
    console.log('Form submitted:', data);
    showSonnerUnderDevelopment({
      action: t_sonner('action'),
      description: t_sonner('description'),
      label: t_sonner('undo'),
      icon: <></>
    });
    onClose();
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
      <DialogContent className='sm:max-w-[600px]'>
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
                {...register('contactName', {
                  required: t('input-fields.name.required')
                })}
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
                {...register('email', {
                  required: t('input-fields.email.required'),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t('input-fields.email.is-valid')
                  }
                })}
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
                {...register('phone', {
                  required: t('input-fields.phone.required'),
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: t('input-fields.phone.is-valid')
                  }
                })}
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

          {/* CAPTCHA */}
          <div className='w-full flex justify-center items-center'>
            <Captcha />
          </div>

          <Button
            type='submit'
            className='w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'
            disabled={!isVerified}
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
