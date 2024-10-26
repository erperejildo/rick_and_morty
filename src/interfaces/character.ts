import { EpisodeAPIType } from './episode';

export interface CharactersAPIType {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: any;
  };
  results: Array<CharacterResultsAPIType | CharacterResultsType>;
}

export interface CharacterResultsAPIType {
  created: string;
  episode: Array<string>;
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  species: string;
  origin: {
    name: string;
    url: string;
  };
  status: string;
  type: string;
  url: string;
}

export interface CharacterResultsType extends CharacterResultsAPIType {
  firstEpisode: EpisodeAPIType;
}
