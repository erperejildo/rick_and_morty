import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../../features/rickAndMortyActions';
import { CharacterResultsAPIType } from '../../interfaces/character';
import { AppDispatch, RootState } from '../../store';
import CharacterComponent from '../character/character';
import SpinnerComponent from '../spinner/spinner';
import './list.scss';

const ListComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.storeData.data);
  const error = useSelector((state: RootState) => state.storeData.error);
  const isLoading = useSelector(
    (state: RootState) => state.storeData.isLoading
  );
  const [sortedCharacters, setSortedCharacters] = useState<
    CharacterResultsAPIType[]
  >([]);
  const [nameSort, setNameSort] = useState<'asc' | 'desc' | null>(null);
  const [statusFilter, setStatusFilter] = useState<'alive' | 'dead' | 'any'>(
    'any'
  );

  useEffect(() => {
    if (!data.characters) {
      dispatch(fetchCharacters());
    }
  }, [data.characters, dispatch]);

  useEffect(() => {
    if (data.characters) {
      const sorted = [...data.characters.results];
      setSortedCharacters(sorted);
    }
  }, [data.characters]);

  const sortByName = () => {
    const sorted = [...sortedCharacters].sort((a, b) => {
      if (nameSort === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortedCharacters(sorted);
    setNameSort(nameSort === 'asc' ? 'desc' : 'asc');
  };

  const filterByStatus = (status: 'alive' | 'dead' | 'any') => {
    setStatusFilter(status);
    if (status === 'any') {
      setSortedCharacters([...data.characters!.results]);
    } else {
      const filtered = data.characters!.results.filter(
        (character) => character.status.toLowerCase() === status
      );
      setSortedCharacters(filtered);
    }
  };

  return (
    <div>
      <h1>Rick & Morty</h1>
      <div className="filter">
        Sort by:
        <div className="filter-element" onClick={sortByName}>
          Name{' '}
          {nameSort === 'asc' ? (
            <span>&#8593;</span>
          ) : nameSort === 'desc' ? (
            <span>&#8595;</span>
          ) : null}
        </div>
      </div>
      <div className="filter">
        Order by Status:
        <div className="filter-element">
          <span
            className={`status-dot ${statusFilter === 'alive' ? 'active' : ''}`}
            style={{ backgroundColor: 'rgb(61, 214, 46)' }}
            onClick={() => filterByStatus('alive')}
          ></span>
          <span
            className={`status-dot ${statusFilter === 'dead' ? 'active' : ''}`}
            style={{ backgroundColor: 'rgb(214, 61, 46)' }}
            onClick={() => filterByStatus('dead')}
          ></span>
          <span
            className={`status-dot ${statusFilter === 'any' ? 'active' : ''}`}
            style={{ backgroundColor: 'grey' }}
            onClick={() => filterByStatus('any')}
          ></span>
        </div>
      </div>
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <section className="character-grid">
          {sortedCharacters.map((character: CharacterResultsAPIType) => (
            <CharacterComponent key={character.id} character={character} />
          ))}
        </section>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ListComponent;
