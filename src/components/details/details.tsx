import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchCharacters,
  fetchEpisodes,
} from '../../features/rickAndMortyActions';
import {
  CharacterResultsAPIType,
  CharacterResultsType,
} from '../../interfaces/character';
import { AppDispatch, RootState } from '../../store';
import SpinnerComponent from '../spinner/spinner';
import './details.scss';

const DetailsComponent = () => {
  const { id } = useParams();
  const data = useSelector((state: RootState) => state.storeData.data);
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.storeData.isLoading
  );
  const [character, setCharacter] = useState<CharacterResultsType | null>(null);

  // we loaded details without coming from the list
  useEffect(() => {
    if (!data?.characters && !isLoading) {
      dispatch(fetchCharacters());
    }
  }, [data?.characters, isLoading, dispatch]);

  useEffect(() => {
    if (data?.characters) {
      const characterFound = data.characters.results.find(
        (character: CharacterResultsAPIType | CharacterResultsType) =>
          character.id === parseInt(id!)
      ) as CharacterResultsType;

      if (characterFound) {
        setCharacter(characterFound);
        if (!characterFound.firstEpisode && characterFound.episode[0]) {
          dispatch(fetchEpisodes(characterFound.episode[0], characterFound.id));
        }
      }
    }
  }, [data.characters, id, dispatch, character]);

  return (
    <div className="details">
      {isLoading || !character ? (
        <SpinnerComponent />
      ) : (
        <>
          <div className="image-container">
            <img src={character.image} alt={character.name} />
          </div>
          <h1>{character.name}</h1>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
          <p>Location: {character.location.name}</p>
          {character.firstEpisode && (
            <p>First Episode: {character.firstEpisode.name}</p>
          )}
          {character.episode.length > 0 && (
            <>
              <p>Episodes:</p>
              <ul>
                {character.episode.map((episode: string, index: number) => (
                  <li key={index}>{episode}</li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DetailsComponent;
