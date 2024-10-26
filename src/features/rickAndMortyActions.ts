import ApiService from '../services/api.service';
import {
  fetchCharactersFailure,
  fetchCharactersRequest,
  fetchCharactersSuccess,
} from './rickAndMortySlices';

export const fetchCharacters = () => async (dispatch: any) => {
  dispatch(fetchCharactersRequest());
  try {
    const response = await ApiService.getCharacters();
    dispatch(fetchCharactersSuccess(response));
  } catch (error: any) {
    dispatch(fetchCharactersFailure(error.message));
  }
};
