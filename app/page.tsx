'use client';

import Banner from '@/components/Banner';
import SignUpPortal from '@/components/portal/SignUpPortal';
import Benefits from '@/components/Benefits';
import { cn } from '@/lib/utils';
import Services from '@/components/Services';

export default function Home() {
  return (
    <main className='flex items-center justify-items-center font-[family-name:var(--font-geist-sans)]'>
      <div className='flex flex-col gap-[32px] w-screen items-center sm:items-start'>
        <Banner />
        <div
          className={cn(
            'flex flex-col items-center justify-items-center',
            'px-8 sm:px-20 w-full bg-gray-100',
            'font-[family-name:var(--font-geist-sans)]'
          )}
        >
          <Benefits />
        </div>
        <Services />
      </div>
      <SignUpPortal />
    </main>
  );
}
