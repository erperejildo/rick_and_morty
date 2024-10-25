import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import AppRoutes from './routes';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);

reportWebVitals();
