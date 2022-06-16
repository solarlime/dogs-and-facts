import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dogAPI, factsAPI } from "./apiInterfaces";
import {RootState} from "../../app/store";

interface MainState {
  data: {
    dogs: Array<string>,
    facts: Array<string>,
  }
  status: 'idle' | 'loading' | 'failed',
}

const initialState: MainState = {
  data: {
    dogs: [],
    facts: [],
  },
  status: 'idle',
};

async function fetchData(url: string): Promise<dogAPI | factsAPI | string> {
  try {
    const response = await fetch(`${url}`);
    const result: dogAPI | factsAPI = await response.json();
    return result;
  } catch (e) {
    return url;
  }
}

export const getDogsAndFacts = createAsyncThunk('main/getDogsAndFacts', async () => {
  const length = 10;

  const results = await Promise.all([
    fetchData(`https://dog.ceo/api/breeds/image/random/${length}`),
    fetchData(`https://www.dogfactsapi.ducnguyen.dev/api/v1/facts/?number=${length}`)
  ]);
  const [dogs, facts] = results;
  return {
    dogs: (dogs as dogAPI).message,
    facts: (facts as factsAPI).facts
  }
});

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    toggleLike: (state, action) => {},
    likeFilterChange: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDogsAndFacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDogsAndFacts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'idle';
      })
      .addCase(getDogsAndFacts.rejected, (state, action) => {
        state.status = 'failed';
      })
  },
});

export const selectData = (state: RootState) => state.main.data;

export default mainSlice.reducer;
