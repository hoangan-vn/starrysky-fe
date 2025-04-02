// BreadcrumbWithHistory.tsx - Enhanced Breadcrumb Component with Redux
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useResponsive } from '@/hooks/useResponsive';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { addBreadcrumb, BreadcrumbItem as BreadcrumbItemType } from '@/lib/features/breadcumb/breadcrumbSlice';

interface BreadcrumbWithHistoryProps {
  // Custom routes map to transform paths into readable labels
  routesMap?: Record<string, string>;
  // Maximum number of visible breadcrumb items
  maxVisibleItems?: number;
}

export function BreadcrumbWithHistory({ routesMap = {}, maxVisibleItems = 4 }: BreadcrumbWithHistoryProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.breadcrumb);
  const { isMobile, isTablet } = useResponsive();

  // Update breadcrumb when path changes
  useEffect(() => {
    if (!pathname) return;

    // Split path and build readable label
    const pathSegments = pathname.split('/').filter(Boolean);
    const currentPath = pathname;

    // Get current page from either routesMap or last path segment
    let label;
    if (routesMap[pathname]) {
      label = routesMap[pathname];
    } else if (pathSegments.length > 0) {
      // Format last path segment into readable label (capitalize, replace hyphens with spaces)
      const lastSegment = pathSegments[pathSegments.length - 1];
      label = lastSegment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    } else {
      label = 'Home';
    }

    // Add current page to breadcrumb history
    dispatch(
      addBreadcrumb({
        label,
        href: currentPath,
        isCurrentPage: true
      })
    );
  }, [pathname, dispatch, routesMap]);

  // Adjust visible items based on screen size
  const adaptiveMaxItems = isMobile ? 2 : isTablet ? 3 : maxVisibleItems;

  // Get visible and hidden items
  let visibleItems: BreadcrumbItemType[] = [];
  let hiddenItems: BreadcrumbItemType[] = [];

  if (items.length <= adaptiveMaxItems) {
    // If we have fewer items than max, show all
    visibleItems = items;
  } else {
    // Always show home
    visibleItems = [items[0]];

    // Always show current page and one before it
    const lastItems = items.slice(-2);

    // Calculate how many items to hide
    hiddenItems = items.slice(1, -2);

    // Add last items to visible items
    visibleItems = [...visibleItems, ...lastItems];
  }

  return (
    <Breadcrumb className='py-2'>
      <BreadcrumbList>
        {visibleItems.map((item, index) => (
          <div key={item.href} className='flex items-center'>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.isCurrentPage ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}

        {/* Show dropdown if there are hidden items */}
        {hiddenItems.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-1'>
                  <BreadcrumbEllipsis className='h-4 w-4' />
                  <span className='sr-only'>Toggle history menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  {hiddenItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
