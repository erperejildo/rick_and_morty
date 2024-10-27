import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterComponent from '../components/character/character';
import { CharacterResultsAPIType } from '../interfaces/character';
import { charactersMock } from '../mocks/characters';

const mockCharacter: CharacterResultsAPIType = charactersMock.results[0];

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={children} />
        <Route path="/details/:id" element={<div>Character Details</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('CharacterComponent', () => {
  test('renders character information correctly', () => {
    render(
      <TestWrapper>
        <CharacterComponent character={mockCharacter} />
      </TestWrapper>
    );

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.origin.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.location.name)).toBeInTheDocument();
  });

  test('navigates to details page when character is clicked', () => {
    render(
      <TestWrapper>
        <CharacterComponent character={mockCharacter} />
      </TestWrapper>
    );

    const characterCard = screen.getByRole('button', {
      name: `View details of ${mockCharacter.name}`,
    });
    fireEvent.click(characterCard);

    expect(screen.getByText('Character Details')).toBeInTheDocument();
  });

  test('has appropriate accessibility attributes', () => {
    render(
      <TestWrapper>
        <CharacterComponent character={mockCharacter} />
      </TestWrapper>
    );

    const characterCard = screen.getByRole('button', {
      name: `View details of ${mockCharacter.name}`,
    });
    expect(characterCard).toHaveAttribute('tabIndex', '0');
    expect(characterCard).toHaveAttribute(
      'aria-label',
      `View details of ${mockCharacter.name}`
    );
  });
});
