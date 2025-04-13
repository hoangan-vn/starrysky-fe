import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const getInitialHistory = (): string[] => {
  if (typeof window !== 'undefined') {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        return JSON.parse(savedHistory);
      } catch (error) {
        console.error('Lỗi khi parse lịch sử tìm kiếm:', error);
      }
    }
  }
  return [];
};

interface SearchHistoryState {
  history: string[];
}

const initialState: SearchHistoryState = {
  history: getInitialHistory()
};

const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    addSearchQuery: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      if (!query) return;

      state.history = state.history.filter((item) => item !== query);
      state.history.unshift(query);

      if (state.history.length > 10) {
        state.history.pop();
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('searchHistory', JSON.stringify(state.history));
      }
    },
    clearSearchHistory: (state) => {
      state.history = [];

      if (typeof window !== 'undefined') {
        localStorage.removeItem('searchHistory');
      }
    }
  }
});

export const { addSearchQuery, clearSearchHistory } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;
