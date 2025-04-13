import { configureStore } from '@reduxjs/toolkit';
import breadcrumbReducer from '@/lib/features/breadcumb/breadcrumbSlice';
import portalReducer from '@/lib/features/portal/portalSlice';
import headerHeightReducer from '@/lib/features/header-height/headerHeightSlice';
import captchaReducer from '@/lib/features/captcha/captchaSlice';
import searchHistoryReducer from '@/lib/features/search/searchHistorySlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      breadcrumb: breadcrumbReducer,
      portal: portalReducer,
      headerHeight: headerHeightReducer,
      captcha: captchaReducer,
      searchHistory: searchHistoryReducer
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
