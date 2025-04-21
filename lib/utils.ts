import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';
import { JSX } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type SonnerType = {
  action?: string;
  description?: string;
  label?: string;
  icon?: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function showSonner({ action, description, label, onClick, icon }: SonnerType) {
  const defaultOnClick = () => {};

  toast(action, {
    description,
    action: {
      label,
      onClick: onClick ?? defaultOnClick
    },
    icon: icon
  });
}
