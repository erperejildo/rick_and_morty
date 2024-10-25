import { CharacterType } from './character';

export interface CharactersAPIType {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: any;
  };
  results: Array<CharacterType>;
}
