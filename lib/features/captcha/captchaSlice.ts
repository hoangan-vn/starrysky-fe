import { createSlice } from '@reduxjs/toolkit';

interface CaptchaState {
  isVerified: boolean;
  expirationTime: number | null;
}

const initialState: CaptchaState = {
  isVerified: false,
  expirationTime: null
};

const captchaSlice = createSlice({
  name: 'captcha',
  initialState,
  reducers: {
    verifyCaptcha: (state) => {
      state.isVerified = true;
      state.expirationTime = Date.now() + 60 * 1000;
    },
    resetCaptcha: (state) => {
      state.isVerified = false;
      state.expirationTime = null;
    },
    checkExpiration: (state) => {
      if (state.expirationTime && Date.now() > state.expirationTime) {
        state.isVerified = false;
        state.expirationTime = null;
      }
    }
  }
});

export const { verifyCaptcha, resetCaptcha, checkExpiration } = captchaSlice.actions;
export default captchaSlice.reducer;
