'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const ChatWidget = () => {
  const [initialMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        return JSON.parse(savedMessages);
      }
    }
    return [
      {
        id: '1',
        role: 'assistant',
        content: 'Hi, how can I help you today?'
      }
    ];
  });

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: 'api/chat',
    initialMessages
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('chatMessages');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hi, how can I help you today?'
      }
    ]);
    localStorage.removeItem('chatMessages');
  };

  return (
    <Card className='w-80 shadow-lg z-40'>
      <CardHeader className='bg-gray-100 flex flex-row items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <div className='w-8 h-8 rounded-full bg-gray-300' />
          <div>
            <CardTitle className='text-sm'>Sofia Davis</CardTitle>
            <p className='text-xs text-gray-500'>m@example.com</p>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Button variant='ghost' size='sm' onClick={handleClearChat}>
            Clear Chat
          </Button>
          <Button variant='ghost' size='icon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
            </svg>
          </Button>
        </div>
      </CardHeader>
      <CardContent className='h-64 overflow-y-auto p-4 space-y-2'>
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs p-2 rounded-lg ${
                message.role === 'user' ? 'bg-black text-white' : 'bg-gray-200 text-black'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className='flex justify-start'>
            <div className='max-w-xs p-2 rounded-lg bg-gray-200 text-black'>Typing...</div>
          </div>
        )}
      </CardContent>

      <div className='p-4 border-t'>
        <form onSubmit={handleSubmit} className='flex space-x-2'>
          <Input placeholder='Type your message...' value={input} onChange={handleInputChange} />
          <Button type='submit' disabled={isLoading}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
            </svg>
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ChatWidget;
