import NavLink from '@/lib/router/NavLink';
import { navLinks } from '@/lib/router/router';
import RenderIf from '../RenderIf';
import { usePathname, useRouter } from 'next/navigation';

export default function NavigationLinks() {
  const router = useRouter();
  const pathname = usePathname();

  const handleScrollToSection = (link: NavLink, e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();

    const targetId = link.name.toLowerCase().replace(/\s+/g, '-');
    if (pathname !== '/') {
      router.push(`/`, { scroll: false });
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Element with id "${targetId}" not found after navigation`);
    }
  };

  return (
    <nav className='flex space-x-4'>
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
