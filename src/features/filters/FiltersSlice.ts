import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface FiltersState {
  liked: boolean,
}

const initialState: FiltersState = {
  liked: false,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    likeFilterChange: (state, action) => {
      state.liked = action.payload;
    },
  },
});

export const { likeFilterChange } = filterSlice.actions;

export const selectFilters = (state: RootState) => state.filters;
export const selectCardStatus = createSelector(
  selectFilters,
  (filters) => filters.liked,
);

export default filterSlice.reducer;
