import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';

export const useUsersStatus = () => {
  const t = useTranslations('table');

  return [
    {
      value: 'active',
      label: t('active'),
      icon: CheckCircledIcon
    },
    {
      value: 'inactive',
      label: t('inactive'),
      icon: CrossCircledIcon
    }
  ];
};

export const useUsersRole = () => {
  const t = useTranslations('table');

  return [
    {
      value: 'client',
      label: t('client')
    },
    {
      value: 'provider',
      label: t('provider')
    }
  ];
};
