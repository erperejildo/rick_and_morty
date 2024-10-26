import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CharacterResultsAPIType } from '../interfaces/character';
import { EpisodeAPIType } from '../interfaces/episode';

const API_URL = 'https://rickandmortyapi.com/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ApiServiceType {
  getCharacters: () => Promise<CharacterResultsAPIType>;
  getEpisodes: (characterDetails: string) => Promise<any>;
}

const ApiService: ApiServiceType = {
  getCharacters: async (): Promise<CharacterResultsAPIType> => {
    try {
      const response: AxiosResponse = await api.get('/character');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  getEpisodes: async (episodeLink: string): Promise<EpisodeAPIType> => {
    try {
      const response: AxiosResponse = await api.get(episodeLink);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};

export default ApiService;
