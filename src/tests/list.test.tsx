import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import ListComponent from '../components/list/list';
import { charactersMock } from '../mocks/characters';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares as any);

describe('ListComponent', () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore({
      storeData: {
        data: {
          characters: charactersMock,
        },
        error: null,
        isLoading: false,
      },
    });
  });

  test('renders ListComponent correctly with character data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListComponent />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
  });

  test('displays loading spinner when isLoading is true', () => {
    store = mockStore({
      storeData: {
        data: { characters: null },
        error: null,
        isLoading: true,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListComponent />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('displays error message when there is an error', () => {
    store = mockStore({
      storeData: {
        data: { characters: null },
        error: 'Something went wrong!',
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListComponent />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Something went wrong!/i)).toBeInTheDocument();
  });

  test('displays no characters found message when search text is present and no characters match', () => {
    store = mockStore({
      storeData: {
        data: {
          characters: { results: [] },
        },
        error: null,
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListComponent />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText(/Search by name/i);

    fireEvent.change(searchInput, {
      target: { value: 'Non-existing Character' },
    });

    expect(
      screen.getByText(/No characters found with that name/i)
    ).toBeInTheDocument();
  });
});
