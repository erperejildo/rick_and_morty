import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharactersRequest } from '../../features/rickAndMortySlices';
import { CharacterType } from '../../interfaces/character';
import ApiService from '../../services/api.service';
import CharacterComponent from '../character/character';
import './list.scss';

const ListComponent = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state: any) => state.characters.data);
  const error = useSelector((state: any) => state.characters.error);
  const isLoading = useSelector((state: any) => state.characters.isLoading);

  useEffect(() => {
    dispatch(fetchCharactersRequest());
    ApiService.getCharacters();
  }, [dispatch]);

  return (
    <div>
      <h1>Rick & Morty</h1>
      {isLoading ? (
        <p>Loading...</p>
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
