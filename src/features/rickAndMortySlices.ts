import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RickAndMortyState {
  data: { results: any[] };
  error: string | null;
  isLoading: boolean;
}

const initialState: RickAndMortyState = {
  data: { results: [] },
  error: null,
  isLoading: false,
};

const rickAndMortySlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    fetchCharactersRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchCharactersSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.isLoading = false;
    },
    fetchCharactersFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  fetchCharactersRequest,
  fetchCharactersSuccess,
  fetchCharactersFailure,
} = rickAndMortySlice.actions;

export default rickAndMortySlice.reducer;
