import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  showSignUpModal: boolean;
  showPortalIn: string | null;
}

const getInitialModalState = (): ModalState => {
  const showSignUpModalStored = typeof window !== 'undefined' ? localStorage.getItem('showSignUpModal') : null;
  const showPortalInStored = typeof window !== 'undefined' ? localStorage.getItem('showPortalIn') : null;

  const currentTime = Date.now();
  const sixtyMinutesInMs = 10 * 60 * 1000;

  if (showPortalInStored) {
    const lastClosedTimestamp = parseInt(showPortalInStored, 10);
    if (currentTime - lastClosedTimestamp >= sixtyMinutesInMs) {
      localStorage.setItem('showSignUpModal', 'true');
      localStorage.setItem('showPortalIn', currentTime.toString());
      return {
        showSignUpModal: true,
        showPortalIn: currentTime.toString()
      };
    }
  }

  return {
    showSignUpModal: showSignUpModalStored ? showSignUpModalStored === 'true' : true,
    showPortalIn: showPortalInStored || null
  };
};

const initialState: ModalState = getInitialModalState();

const portalSlice = createSlice({
  name: 'portal',
  initialState,
  reducers: {
    setShowSignUpModal: (state, action: { payload: { show: boolean; timestamp: string | null } }) => {
      state.showSignUpModal = action.payload.show;
      state.showPortalIn = action.payload.timestamp;

      localStorage.setItem('showSignUpModal', action.payload.show.toString());
      if (action.payload.timestamp) {
        localStorage.setItem('showPortalIn', action.payload.timestamp);
      } else {
        localStorage.removeItem('showPortalIn');
      }
    }
  }
});

export const { setShowSignUpModal } = portalSlice.actions;
export default portalSlice.reducer;
