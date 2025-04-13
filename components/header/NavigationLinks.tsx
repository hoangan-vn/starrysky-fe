import NavLink from '@/lib/router/NavLink';
import RenderIf from '../widgets/RenderIf';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { routerName, useNavLinks } from '@/lib/router/router';
import { useEffect, useRef } from 'react';
import { useResponsive } from '@/hooks/useResponsive';

type NavigationLinksProps = {
  className?: string;
};

export default function NavigationLinks({ className }: NavigationLinksProps) {
  const router = useRouter();
  const pathname = usePathname();
  const navLinks = useNavLinks();
  const pendingScrollTargetRef = useRef<string | null>(null);
  const { isMobile } = useResponsive();

  useEffect(() => {
    if (pendingScrollTargetRef.current && pathname === routerName.home) {
      const targetId = pendingScrollTargetRef.current;
      pendingScrollTargetRef.current = null;

      const timeoutId = setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          scrollToElement(targetElement);
        } else {
          console.warn(`Element with id "${targetId}" not found after navigation`);
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const scrollToElement = (element: HTMLElement): void => {
    const headerOffset = isMobile ? 80 : 100; // Điều chỉnh giá trị này dựa trên chiều cao header của bạn
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  const handleScrollToSection = (link: NavLink, e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const targetId = link.id.toLowerCase().replace(/\s+/g, '-');

    if (pathname !== routerName.home) {
      pendingScrollTargetRef.current = targetId;
      router.push(routerName.home);
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        scrollToElement(targetElement);
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
