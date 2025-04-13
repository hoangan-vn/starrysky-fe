import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  showFormModal: boolean;
  showPortalIn: string | null;
}

const getInitialModalState = (): ModalState => {
  const showFormModalStored = typeof window !== 'undefined' ? localStorage.getItem('showFormModal') : null;
  const showPortalInStored = typeof window !== 'undefined' ? localStorage.getItem('showPortalIn') : null;

  const currentTime = Date.now();
  const sixtyMinutesInMs = 10 * 60 * 1000;

  if (showPortalInStored) {
    const lastClosedTimestamp = parseInt(showPortalInStored, 10);
    if (currentTime - lastClosedTimestamp >= sixtyMinutesInMs) {
      localStorage.setItem('showFormModal', 'true');
      localStorage.setItem('showPortalIn', currentTime.toString());
      return {
        showFormModal: true,
        showPortalIn: currentTime.toString()
      };
    }
  }

  return {
    showFormModal: showFormModalStored ? showFormModalStored === 'true' : true,
    showPortalIn: showPortalInStored || null
  };
};

const initialState: ModalState = getInitialModalState();

const portalSlice = createSlice({
  name: 'portal',
  initialState,
  reducers: {
    setShowFormModal: (state, action: { payload: { show: boolean; timestamp: string | null } }) => {
      state.showFormModal = action.payload.show;
      state.showPortalIn = action.payload.timestamp;

      localStorage.setItem('showFormModal', action.payload.show.toString());
      if (action.payload.timestamp) {
        localStorage.setItem('showPortalIn', action.payload.timestamp);
      } else {
        localStorage.removeItem('showPortalIn');
      }
    }
  }
});

export const { setShowFormModal } = portalSlice.actions;
export default portalSlice.reducer;
