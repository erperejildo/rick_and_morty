import React from 'react';
import { CharacterType } from '../../interfaces/character';
import './character.scss';

interface Props {
  character: CharacterType;
}

const CharacterComponent: React.FC<Props> = ({ character }) => {
  return (
    <article key={character.id} className="character-card">
      <img src={character.image} alt={character.name} />
      <div className="character-details">
        <h2>{character.name}</h2>
        <div className="character-status">
          <span
            className={`status-dot ${character.status === 'Alive' ? 'alive' : 'dead'}`}
          ></span>
          {character.status} - {character.gender}
        </div>
        <div className="character-info">
          <span>Origin:</span>
          <div>{character.origin.name}</div>
        </div>
        <div className="character-info">
          <span>Las known location:</span>
          <div>{character.location.name}</div>
        </div>
      </div>
    </article>
  );
};

export default CharacterComponent;