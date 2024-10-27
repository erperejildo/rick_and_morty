import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterResultsAPIType } from '../../interfaces/character';
import './character.scss';

interface Props {
  character: CharacterResultsAPIType;
}

const CharacterComponent: React.FC<Props> = ({ character }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${character.id}`);
  };

  return (
    <article
      key={character.id}
      className="character-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`View details of ${character.name}`}
    >
      <img src={character.image} alt={character.name} aria-hidden="true" />
      <div className="character-details">
        <h2>{character.name}</h2>
        <div className="character-status">
          <span
            className={`status-dot ${character.status === 'Alive' ? 'alive' : 'dead'}`}
            aria-hidden="true"
          ></span>
          <span className="sr-only">{character.status}</span>
          <span>{character.gender}</span>
        </div>
        <div className="character-info">
          <div>{character.origin.name}</div>
          <span className="sr-only">origin</span>
        </div>
        <div className="character-info">
          <div>{character.location.name}</div>
          <span className="sr-only">last known location</span>
        </div>
      </div>
    </article>
  );
};

export default CharacterComponent;
