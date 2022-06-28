import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import mainReducer from '../features/main/MainSlice';
import filtersReducer from '../features/filters/FiltersSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    filters: filtersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
