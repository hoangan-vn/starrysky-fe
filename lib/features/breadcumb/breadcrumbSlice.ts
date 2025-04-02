// breadcrumbSlice.ts - Redux slice for breadcrumb history
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbState {
  items: BreadcrumbItem[];
  maxItems: number;
}

const initialState: BreadcrumbState = {
  items: [{ label: 'Home', href: '/' }],
  maxItems: 4
};

export const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    // Add a new breadcrumb item
    addBreadcrumb: (state, action: PayloadAction<BreadcrumbItem>) => {
      // Remove current page flag from all items
      state.items = state.items.map((item) => ({
        ...item,
        isCurrentPage: false
      }));

      // Check if the item already exists in the breadcrumb
      const existingIndex = state.items.findIndex((item) => item.href === action.payload.href);

      if (existingIndex !== -1) {
        // If it exists, remove all items after it and mark it as current
        state.items = state.items.slice(0, existingIndex + 1);
        state.items[existingIndex].isCurrentPage = true;
      } else {
        // Add the new item with current page flag
        state.items.push({
          ...action.payload,
          isCurrentPage: true
        });
      }

      // Keep only the last maxItems
      if (state.items.length > state.maxItems) {
        // Keep first item (home) and last (maxItems-1) items
        state.items = [state.items[0], ...state.items.slice(-(state.maxItems - 1))];
      }
    },

    // Reset breadcrumbs to just home
    resetBreadcrumbs: (state) => {
      state.items = [{ label: 'Home', href: '/' }];
    },

    // Set maximum number of visible items
    setMaxItems: (state, action: PayloadAction<number>) => {
      state.maxItems = action.payload;
    }
  }
});

export const { addBreadcrumb, resetBreadcrumbs, setMaxItems } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
