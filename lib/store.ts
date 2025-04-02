import { configureStore } from '@reduxjs/toolkit';
import breadcrumbReducer from '@/lib/features/breadcumb/breadcrumbSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      breadcrumb: breadcrumbReducer
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
