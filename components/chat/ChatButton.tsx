'use client';

import { useState } from 'react';
import ChatWidget from './ChatWidget';
import { Button } from '@/components/ui/button';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Floating Chat Icon */}
      <Button
        className='fixed bottom-4 right-4 rounded-full w-12 h-12 bg-blue-500 hover:bg-blue-600'
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 text-white'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
          />
        </svg>
      </Button>

      {/* Chat Widget (shown when isOpen is true) */}
      {isOpen && (
        <div className='fixed bottom-20 right-4'>
          <ChatWidget />
        </div>
      )}
    </div>
  );
};

export default ChatButton;
