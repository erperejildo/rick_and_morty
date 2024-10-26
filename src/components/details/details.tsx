import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCharactersRequest } from '../../features/rickAndMortySlices';

const DetailsComponent = () => {
  const { id } = useParams();
  const characters = useSelector((state: any) => state.characters);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!characters.data || !characters.data.results) {
      setLoading(true);
      dispatch(fetchCharactersRequest());
    } else {
      setLoading(false);
    }
  }, [characters, dispatch]);

  const character =
    characters.data && characters.data.results
      ? characters.data.results.find(
          (character: any) => character.id === parseInt(id!)
        )
      : null;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
    </div>
  );
};

export default DetailsComponent;
