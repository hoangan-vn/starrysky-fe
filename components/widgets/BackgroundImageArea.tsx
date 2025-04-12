import { cn } from '@/lib/utils';
import Image from 'next/image';

type BackgroundImageAreaType = {
  src: string;
  alt: string;
  scale?: string;
  blur?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function BackgroundImageArea({ src, alt, scale, blur, className, children }: BackgroundImageAreaType) {
  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        layout='fill'
        objectFit='cover'
        className={cn(scale ?? 'scale-105', blur ?? 'blur-[10px]')}
      />
      {children}
    </div>
  );
}
