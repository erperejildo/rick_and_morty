import { configureStore } from '@reduxjs/toolkit';
import rickAndMortyReducer from './features/rickAndMortySlices';

export const store = configureStore({
  reducer: {
    characters: rickAndMortyReducer,
  },
});
