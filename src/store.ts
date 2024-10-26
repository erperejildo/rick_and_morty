import { configureStore } from '@reduxjs/toolkit';
import rickAndMortyReducer from './features/rickAndMortySlices';

export const store = configureStore({
  reducer: {
    storeData: rickAndMortyReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
