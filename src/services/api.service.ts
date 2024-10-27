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
    const response: AxiosResponse = await api.get('/character');
    return response.data;
  },
  getEpisodes: async (episodeLink: string): Promise<EpisodeAPIType> => {
    const response: AxiosResponse = await api.get(episodeLink);
    return response.data;
  },
};

export default ApiService;
