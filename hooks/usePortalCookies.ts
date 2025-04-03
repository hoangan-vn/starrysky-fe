import { cookies } from 'next/headers';

interface PortalState {
  showSignUpModal: boolean;
  lastClosedTimestamp: number | null;
}

export async function usePortalCookies(): Promise<PortalState> {
  const cookieStore = await cookies();
  const showSignUpModalCookie = cookieStore.get('showSignUpModal');
  const lastClosedTimestampCookie = cookieStore.get('lastClosedTimestamp');

  const lastClosedTimestamp = lastClosedTimestampCookie ? parseInt(lastClosedTimestampCookie.value, 10) : null;

  const currentTime = Date.now();
  const sixtyMinutesInMs = 60 * 60 * 1000;

  if (lastClosedTimestamp && currentTime - lastClosedTimestamp > sixtyMinutesInMs) {
    cookieStore.set('showSignUpModal', 'true', { maxAge: 24 * 60 * 60 });
    cookieStore.set('lastClosedTimestamp', '0', { maxAge: 24 * 60 * 60 });
    return {
      showSignUpModal: true,
      lastClosedTimestamp: null
    };
  }

  return {
    showSignUpModal: showSignUpModalCookie ? showSignUpModalCookie.value === 'true' : true,
    lastClosedTimestamp: lastClosedTimestamp || null
  };
}
