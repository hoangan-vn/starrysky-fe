import NavLink from '@/lib/router/NavLink';
import RenderIf from '../widgets/RenderIf';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { routerName, useNavLinks } from '@/lib/router/router';

type NavigationLinksProps = {
  className?: string;
};

export default function NavigationLinks({ className }: NavigationLinksProps) {
  const router = useRouter();
  const pathname = usePathname();
  const navLinks = useNavLinks();

  const handleScrollToSection = (link: NavLink, e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();

    const targetId = link.name.toLowerCase().replace(/\s+/g, '-');
    if (pathname !== routerName.home) {
      router.push(routerName.home, { scroll: false });
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Element with id "${targetId}" not found after navigation`);
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
