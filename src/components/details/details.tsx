import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CharacterType } from '../../interfaces/character';

const DetailsComponent = () => {
  const { id } = useParams();
  const characters = useSelector((state: any) => state.characters.data);
  const character = characters.find(
    (character: CharacterType) => character.id === parseInt(id!)
  );

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
