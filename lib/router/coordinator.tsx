import NavLink from '@/components/NavLink';
import { routerName } from '@/lib/router/router';

export type RoutingProps = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  slug?: string;
};

export function HomeLink({ className, onClick, children }: RoutingProps) {
  return (
    <NavLink href={routerName.home} className={className} onClick={onClick}>
      {children}
    </NavLink>
  );
}

export function AboutLink({ className, onClick, children }: RoutingProps) {
  return (
    <NavLink href={routerName.about} className={className} onClick={onClick}>
      {children}
    </NavLink>
  );
}

export function BlogsLink({ className, onClick, children, slug }: RoutingProps) {
  return (
    <NavLink href={`${routerName.blogs}/${slug}`} className={className} onClick={onClick}>
      {children}
    </NavLink>
  );
}
