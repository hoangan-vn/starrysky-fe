import { cn } from '@/lib/utils';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

interface XImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function XImage({ src, alt, width, height, className, ...args }: XImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? undefined}
      height={height ?? undefined}
      className={cn('transform transition duration-300 ease-in-out hover:scale-110 hover:blur-sm', className)}
      {...args}
    ></Image>
  );
}
