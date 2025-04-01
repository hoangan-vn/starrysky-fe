import NavLink from '@/components/NavLink';
import { routerName } from '@/lib/router/router';

export type RoutingProps = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
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
