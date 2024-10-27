import React, { useCallback, useEffect, useState } from 'react';
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
  const [searchText, setSearchText] = useState('');

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

  const sortByName = useCallback(
    (characters: CharacterResultsAPIType[]) => {
      return [...characters].sort((a, b) => {
        if (nameSort === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    },
    [nameSort]
  );

  useEffect(() => {
    if (!data.characters) return;
    const filtered = data.characters.results.filter((character) => {
      const matchesStatus =
        statusFilter === 'any' ||
        character.status.toLowerCase() === statusFilter;
      const matchesSearch = character.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return matchesStatus && matchesSearch;
    });
    setSortedCharacters(sortByName(filtered));
  }, [nameSort, statusFilter, searchText, data.characters, sortByName]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
  };

  return (
    <div role="main">
      <h1>Rick & Morty</h1>
      <div className="search">
        <label htmlFor="search">
          Search by name
          <input
            type="search"
            id="search"
            value={searchText}
            onChange={handleSearch}
            className="search-input"
            placeholder="Search by name"
            aria-label="Search by name"
          />
        </label>
      </div>
      <div className="filter">
        Sort by:
        <div
          className="filter-element"
          onClick={() => setNameSort(nameSort === 'asc' ? 'desc' : 'asc')}
          aria-label="Sort by name"
        >
          Name{' '}
          {nameSort === 'asc' ? (
            <span aria-hidden="true">&#8593;</span>
          ) : nameSort === 'desc' ? (
            <span aria-hidden="true">&#8595;</span>
          ) : null}
        </div>
      </div>
      <div className="filter">
        Order by Status:
        <div className="filter-element">
          <span
            className={`status-dot ${statusFilter === 'alive' ? 'active' : ''}`}
            style={{ backgroundColor: 'rgb(61, 214, 46)' }}
            onClick={() => setStatusFilter('alive')}
            aria-label="Alive"
          ></span>
          <span
            className={`status-dot ${statusFilter === 'dead' ? 'active' : ''}`}
            style={{ backgroundColor: 'rgb(214, 61, 46)' }}
            onClick={() => setStatusFilter('dead')}
            aria-label="Dead"
          ></span>
          <span
            className={`status-dot ${statusFilter === 'any' ? 'active' : ''}`}
            style={{ backgroundColor: 'grey' }}
            onClick={() => setStatusFilter('any')}
            aria-label="All"
          ></span>
        </div>
      </div>
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <section className="character-grid" role="list">
          {sortedCharacters.length ? (
            sortedCharacters.map((character: CharacterResultsAPIType) => (
              <CharacterComponent
                key={character.id}
                character={character}
                aria-label={character.name}
              />
            ))
          ) : searchText ? (
            <h3 aria-label="No characters found with that name">
              No characters found with that name
            </h3>
          ) : null}
        </section>
      )}
      {error && <p aria-label="Error">{error}</p>}
    </div>
  );
};

export default ListComponent;
