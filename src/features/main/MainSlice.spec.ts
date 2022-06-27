import mainReducer, { MainState, toggleLike } from './MainSlice';

describe('Main reducer', () => {
  const initialState: MainState = {
    data: [{
      id: '1', liked: false, dog: 'img.png', fact: 'some fact',
    }],
    status: 'idle',
  };

  it('should get initial state', () => {
    expect(mainReducer(undefined, { type: 'unknown' })).toEqual({
      data: [],
      status: 'idle',
    });
  });

  it('should toggle a card', () => {
    const newState = mainReducer(initialState, toggleLike('1'));
    expect(newState.data[0].liked).toEqual(true);
  });
});
