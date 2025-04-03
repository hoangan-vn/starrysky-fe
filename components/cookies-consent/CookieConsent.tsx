'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { PrivacyLink } from '@/lib/router/coordinator';

interface CookieConsentProps {
  initialConsent: string | null;
}

export default function CookieConsent({ initialConsent }: CookieConsentProps) {
  const [isOpen, setIsOpen] = useState(!initialConsent);

  const handleAccept = async () => {
    await fetch('/api/set-consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consent: 'accepted' })
    });
    setIsOpen(false);
    loadAdScripts();
  };

  const handleDecline = async () => {
    await fetch('/api/set-consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consent: 'declined' })
    });
    setIsOpen(false);
  };

  const loadAdScripts = () => {
    console.log('Loading ad scripts...');
    // Ví dụ: Tải Google Ads script
    // const script = document.createElement("script");
    // script.src = "https://example.com/ad-script.js";
    // document.head.appendChild(script);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>We value your privacy</DialogTitle>
          <DialogDescription>
            {`We use cookies to enhance your experience and for advertising purposes. By clicking "Accept", you agree to
            our use of cookies. `}
            <PrivacyLink className='underline'>Learn more</PrivacyLink>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex justify-between'>
          <Button variant='outline' onClick={handleDecline}>
            Decline
          </Button>
          <Button onClick={handleAccept}>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
