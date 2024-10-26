import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../../features/rickAndMortyActions';
import { CharacterType } from '../../interfaces/character';
import { AppDispatch, RootState } from '../../store';
import CharacterComponent from '../character/character';
import SpinnerComponent from '../spinner/spinner';
import './list.scss';

const ListComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const characters = useSelector((state: RootState) => state.characters.data);
  const error = useSelector((state: RootState) => state.characters.error);
  const isLoading = useSelector(
    (state: RootState) => state.characters.isLoading
  );

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  return (
    <div>
      <h1>Rick & Morty</h1>
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <section className="character-grid">
          {characters.results &&
            characters.results.map((character: CharacterType) => (
              <CharacterComponent key={character.id} character={character} />
            ))}
        </section>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ListComponent;
