import axios, { AxiosInstance, AxiosResponse } from 'axios';

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
  getCharacters: async (): Promise<any> => {
    try {
      const response: AxiosResponse = await api.get('/character');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};

export default ApiService;
