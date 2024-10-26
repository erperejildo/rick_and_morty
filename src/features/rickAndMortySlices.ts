import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CharacterResultsType,
  CharactersAPIType,
} from '../interfaces/character';

interface RickAndMortyState {
  data: { characters: CharactersAPIType | null };
  error: string | null;
  isLoading: boolean;
}

const initialState: RickAndMortyState = {
  data: { characters: null },
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
      state.data.characters = action.payload;
      state.isLoading = false;
    },
    fetchCharactersFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateCharacter(state, action: PayloadAction<CharacterResultsType>) {
      if (state.data.characters) {
        state.data.characters.results = state.data.characters.results.map(
          (character) =>
            character.id === action.payload.id ? action.payload : character
        );
      }
    },
  },
});

export const {
  fetchCharactersRequest,
  fetchCharactersSuccess,
  fetchCharactersFailure,
  updateCharacter,
} = rickAndMortySlice.actions;

export default rickAndMortySlice.reducer;
