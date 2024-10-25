// src/services/api.service.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  fetchCharactersFailure,
  fetchCharactersSuccess,
} from '../features/rickAndMortySlices';
import { CharactersAPIType } from '../interfaces/charactersAPI';
import { store } from '../store';

const API_URL = 'https://rickandmortyapi.com/api';

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
  getCharacters: async (): Promise<CharactersAPIType> => {
    try {
      const response: AxiosResponse = await api.get('/character');
      store.dispatch(fetchCharactersSuccess(response.data));
      return response.data;
    } catch (error) {
      store.dispatch(fetchCharactersFailure(error));
      throw error;
    }
  },
};

export default ApiService;
