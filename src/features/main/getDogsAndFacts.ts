import { createAsyncThunk } from '@reduxjs/toolkit';
import uniqueID from 'uniqid';
import { DogAPI, FactsAPI } from './apiInterfaces';

async function fetchData(url: string): Promise<DogAPI | FactsAPI | string> {
  try {
    const response = await fetch(`${url}`);
    const result: DogAPI | FactsAPI = await response.json();
    return result;
  } catch (e) {
    return url;
  }
}

const getDogsAndFacts = createAsyncThunk('main/getDogsAndFacts', async (parameters: { length: number, deleteItem?: string }) => {
  const { length } = parameters;
  const rawResults = await Promise.all([
    fetchData(`https://dog.ceo/api/breeds/image/random/${length}`),
    fetchData(`https://www.dogfactsapi.ducnguyen.dev/api/v1/facts/?number=${length}`),
  ]);
  const [dogs, facts] = rawResults;
  const result = (dogs as DogAPI).message.map((dog: string, i: number) => ({
    id: uniqueID(), dog, fact: (facts as FactsAPI).facts[i], liked: false,
  }));
  if (parameters.deleteItem) {
    return { result, deleteItem: parameters.deleteItem };
  }
  return { result };
});

export default getDogsAndFacts;
