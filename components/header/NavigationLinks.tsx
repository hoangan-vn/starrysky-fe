import NavLink from '@/lib/router/NavLink';
import RenderIf from '../widgets/RenderIf';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { routerName, useNavLinks } from '@/lib/router/router';
import { useEffect, useRef } from 'react';

type NavigationLinksProps = {
  className?: string;
};

export default function NavigationLinks({ className }: NavigationLinksProps) {
  const router = useRouter();
  const pathname = usePathname();
  const navLinks = useNavLinks();
  const pendingScrollTargetRef = useRef<string | null>(null);

  // Effect để xử lý scroll sau khi component đã render và DOM đã sẵn sàng
  useEffect(() => {
    if (pendingScrollTargetRef.current && pathname === routerName.home) {
      const targetId = pendingScrollTargetRef.current;
      pendingScrollTargetRef.current = null;

      // Thêm slight delay để đảm bảo DOM đã render
      const timeoutId = setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY;
          const scrollToPosition = offsetTop - window.innerHeight / 2 + targetElement.offsetHeight / 2;
          window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth'
          });
        } else {
          console.warn(`Element with id "${targetId}" not found after navigation`);
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [pathname]);

  const handleScrollToSection = (link: NavLink, e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const targetId = link.id.toLowerCase().replace(/\s+/g, '-');

    if (pathname !== routerName.home) {
      // Lưu target ID và điều hướng về trang chủ
      pendingScrollTargetRef.current = targetId;
      router.push(routerName.home);
    } else {
      // Nếu đã ở trang chủ, scroll ngay lập tức
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY;
        const scrollToPosition = offsetTop - window.innerHeight / 2 + targetElement.offsetHeight / 2;
        window.scrollTo({
          top: scrollToPosition,
          behavior: 'smooth'
        });
      } else {
        console.warn(`Element with id "${targetId}" not found`);
      }
    }
  };

  return (
    <nav className={cn('flex space-x-4', className)}>
      {navLinks.map((link) => (
        <div key={link.name.toLowerCase().replace(/\s+/g, '-')}>
          <RenderIf condition={link.href !== ''}>
            <NavLink
              key={link.name.toLowerCase().replace(/\s+/g, '-')}
              href={link.href}
              className='text-sm hover:text-gray-600'
            >
              {link.name}
            </NavLink>
          </RenderIf>
          <RenderIf condition={link.href === ''}>
            <NavLink
              key={link.name.toLowerCase().replace(/\s+/g, '-')}
              href={link.href}
              className='text-sm hover:text-gray-600'
              onClick={(e) => handleScrollToSection(link, e)}
            >
              {link.name}
            </NavLink>
          </RenderIf>
        </div>
      ))}
    </nav>
  );
}
