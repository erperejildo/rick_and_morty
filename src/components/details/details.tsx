import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();

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
      }
    }
  }, [data.characters, id]);

  useEffect(() => {
    if (character && !character.firstEpisode && character.episode[0]) {
      dispatch(fetchEpisodes(character.episode[0], character.id));
    }
  }, [character, dispatch]);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="details" role="region" aria-label="Character details">
      {isLoading || !character ? (
        <SpinnerComponent />
      ) : (
        <>
          <div className="image-container">
            <img
              src={character.image}
              alt={character.name}
              className="character-image"
            />
          </div>
          <div className="details-header">
            <h1 className="character-name">{character.name}</h1>
            <button
              className="go-back"
              onClick={handleGoBack}
              aria-label="Go back to the list of characters"
            >
              &times;
            </button>
          </div>

          <div className="details-group">
            <div className="character-info" role="listitem">
              <div>{character.status}</div>
              <span>status</span>
            </div>
            <div className="character-info" role="listitem">
              <div>{character.species}</div>
              <span>species</span>
            </div>
            <div className="character-info" role="listitem">
              <div>{character.gender}</div>
              <span>gender</span>
            </div>
            <div className="character-info" role="listitem">
              <div>{character.origin.name}</div>
              <span>species</span>
            </div>
            <div className="character-info" role="listitem">
              <div>{character.location.name}</div>
              <span>location</span>
            </div>
          </div>

          {character.firstEpisode && (
            <div
              className="first-episode"
              role="region"
              aria-label="First episode"
            >
              <div className="title">First Appearance</div>
              <div className="bottom-info">
                <div className="character-info" role="listitem">
                  <div>{character.firstEpisode.name}</div>
                  <span>in</span>
                </div>
                <div className="character-info" role="listitem">
                  <div>{character.firstEpisode.episode}</div>
                  <span>where</span>
                </div>
                <div className="character-info" role="listitem">
                  <div>{character.firstEpisode.air_date}</div>
                  <span>when</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetailsComponent;
