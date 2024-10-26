import ApiService from '../services/api.service';
import {
  fetchCharactersFailure,
  fetchCharactersRequest,
  fetchCharactersSuccess,
  fetchEpisodesFailure,
  fetchEpisodesRequest,
  fetchEpisodesSuccess,
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

export const fetchEpisodes =
  (episodeLink: string, characterId: number) => async (dispatch: any) => {
    dispatch(fetchEpisodesRequest());
    try {
      const response = await ApiService.getEpisodes(episodeLink);
      dispatch(
        fetchEpisodesSuccess({ id: characterId, episodeInfo: response })
      );
    } catch (error: any) {
      dispatch(fetchEpisodesFailure(error.message));
    }
  };
