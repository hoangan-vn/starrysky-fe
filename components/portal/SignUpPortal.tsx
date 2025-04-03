'use client';

import SignUpModal from '@/components/portal/SignUpModal';
import { useAppSelector } from '@/hooks/hooks';
import { RootState } from '@/lib/store';
import { useEffect,  useState } from 'react';

export default function SignUpPortal() {
  const showSignUpModal = useAppSelector((state: RootState) => state.portal.showSignUpModal);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!showSignUpModal) return;

    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [showSignUpModal]);

  return <SignUpModal isOpen={isModalOpen} onClose={handleCloseModal} />;
}
