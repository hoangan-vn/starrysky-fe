'use client';

import { useAppSelector } from '@/hooks/hooks';
import { RootState } from '@/lib/store';
import { useEffect, useState } from 'react';
import FormModel from './FormModel';

export default function FormPortal() {
  const showFormModal = useAppSelector((state: RootState) => state.portal.showFormModal);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!showFormModal) return;

    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showFormModal]);

  return <FormModel isOpen={isModalOpen} onClose={handleCloseModal} />;
}
