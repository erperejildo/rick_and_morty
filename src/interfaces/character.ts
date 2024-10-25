export interface CharacterType {
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
