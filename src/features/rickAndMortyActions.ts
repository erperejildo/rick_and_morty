import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { store } from '../store';
import {
  fetchCharactersFailure,
  fetchCharactersRequest,
  fetchCharactersSuccess,
} from './rickAndMortySlices';

const API_URL = 'https://your-api-url.com/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ApiServiceType {
  getCharacters: () => Promise<any>;
}

const ApiService: ApiServiceType = {
  getCharacters: async (): Promise<any> => {
    store.dispatch(fetchCharactersRequest());
    try {
      const response: AxiosResponse = await api.get(
        'https://rickandmortyapi.com/api/character'
      );
      store.dispatch(fetchCharactersSuccess(response.data));
      return response.data;
    } catch (error: any) {
      store.dispatch(fetchCharactersFailure(error.message));
      throw error;
    }
  },
};

export default ApiService;
