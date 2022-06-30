import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { selectCardStatus } from '../filters/FiltersSlice';
import getDogsAndFacts from './getDogsAndFacts';

export interface MainState {
  data: Array<{
    id: string,
    dog: string,
    fact: string,
    liked: boolean,
  }>
  status: 'idle' | 'loading' | 'failed',
}

const initialState: MainState = {
  data: [],
  status: 'idle',
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const cardID = action.payload;
      const card = state.data.find((item) => item.id === cardID)!;
      if (card) {
        card.liked = !card.liked;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDogsAndFacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDogsAndFacts.fulfilled, (state, action) => {
        const { deleteItem, result } = action.payload;
        // Если был передан id для удаления, возвращаем новый массив без этого id,
        // модифицируем его и присваиваем состоянию
        if (deleteItem) {
          const newData = state.data.filter((card) => card.id !== deleteItem).map((card) => card);
          newData.push(result[0]);
          state.data = newData;
        } else {
          state.data = result;
        }
        state.status = 'idle';
      })
      .addCase(getDogsAndFacts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { toggleLike } = mainSlice.actions;
export const selectData = (state: RootState) => state.main.data;

// Используем фильтр, чтобы вернуть только необходимые карточки
export const selectLikedData = createSelector(
  selectData,
  selectCardStatus,
  (data, liked) => {
    if (liked) {
      return data.filter((card) => card.liked === liked);
    }
    return data;
  },
);

export const selectID = createSelector(
  selectLikedData,
  (data) => data.map((card) => card.id),
);

// Возвращаем не весь массив карточек, а лишь необходимую
export const selectCardByID = (state: RootState, id: string) => state.main.data
  .find((card) => card.id === id)!;

export default mainSlice.reducer;
