import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailsComponent from './components/details/details';
import ListComponent from './components/list/list';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListComponent />} />
        <Route path="/details/:id" element={<DetailsComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
