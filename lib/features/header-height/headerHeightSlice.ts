import { createSlice } from '@reduxjs/toolkit';

interface HeaderHeightState {
  headerHeight: number;
}

const initialState: HeaderHeightState = {
  headerHeight: 0
};

const headerHeightSlice = createSlice({
  name: 'headerHeight',
  initialState,
  reducers: {
    setHeaderHeight: (state, action) => {
      state.headerHeight = action.payload;
    }
  }
});

export const { setHeaderHeight } = headerHeightSlice.actions;
export default headerHeightSlice.reducer;
