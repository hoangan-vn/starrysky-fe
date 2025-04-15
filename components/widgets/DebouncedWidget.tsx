'use client';

import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface DebouncedWidgetProps {
  children: React.ReactNode;
  debounceTime?: number;
}

const DebouncedWidget: React.FC<DebouncedWidgetProps> = ({ children, debounceTime = 500 }) => {
  const childRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isDebouncing && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => prev - 100);
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDebouncing, remainingTime]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isDebouncing) {
      const secondsLeft = Math.ceil(remainingTime / 1000);
      toast.warning(`Không nên spam! Thao tác đang được thực hiện và Nút sẽ có hiệu lực click sau ${secondsLeft} giây nữa.`, {
        position: 'top-center',
        duration: 3000
      });
      return;
    }

    setIsDebouncing(true);
    setRemainingTime(debounceTime);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsDebouncing(false);
      timeoutRef.current = null;
    }, debounceTime);
  };

  return (
    <span ref={childRef} onClick={handleClick} style={{ display: 'inline-block', cursor: 'pointer' }}>
      {children}
    </span>
  );
};

export default DebouncedWidget;
