import filtersReducer, { FiltersState, likeFilterChange } from './FiltersSlice';

describe('Filter reducer', () => {
  const initialState: FiltersState = {
    liked: false,
  };

  it('should change a like-filter mode', () => {
    const newState = filtersReducer(initialState, likeFilterChange(true));
    expect(newState.liked).toEqual(true);
  });
});
