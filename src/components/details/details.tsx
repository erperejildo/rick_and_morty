import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCharacters } from '../../features/rickAndMortyActions';
import { updateCharacter } from '../../features/rickAndMortySlices';
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

  useEffect(() => {
    if (!data.characters && !isLoading) {
      dispatch(fetchCharacters());
    }
  }, [data.characters, isLoading, dispatch]);

  useEffect(() => {
    if (data.characters) {
      const characterFound = data.characters.results.find(
        (character: CharacterResultsAPIType) => character.id === parseInt(id!)
      ) as CharacterResultsType;

      if (characterFound) {
        setCharacter(characterFound);

        if (!characterFound.episodesInfo) {
          const characterWithEpisodesInfo: CharacterResultsType = {
            ...characterFound,
            episodesInfo: [],
          };
          dispatch(updateCharacter(characterWithEpisodesInfo));
        }
      }
    }
  }, [data.characters, id, dispatch]);

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
          <p>Episodes: {character.episodesInfo.length}</p>
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
