import NavLink from '@/lib/router/NavLink';
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

export function SignInLink({ className, onClick, children }: RoutingProps) {
  return (
    <NavLink href={routerName['sign-in']} className={className} onClick={onClick}>
      {children}
    </NavLink>
  );
}

export function SignUpLink({ className, onClick, children }: RoutingProps) {
  return (
    <NavLink href={routerName['sign-up']} className={className} onClick={onClick}>
      {children}
    </NavLink>
  );
}

export function PrivacyLink({ className, onClick, children }: RoutingProps) {
  return (
    <NavLink href={routerName.privacy} className={className} onClick={onClick}>
      {children}
    </NavLink>
  );
}

export function TermsLink({ className, onClick, children }: RoutingProps) {
  return (
    <NavLink href={routerName.terms} className={className} onClick={onClick}>
      {children}
    </NavLink>
  );
}
