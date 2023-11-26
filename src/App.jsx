import './index.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import DetailPage from '../pages/DetailPage/index.jsx';
import MainPage from '../pages/MainPage/index.jsx';
import LoginPage from '../pages/LoginPage/index.jsx';
import NavBar from './components/NavBar.jsx';

const Layout = () => {
  return (
    <>
      <NavBar />
      <br />
      <br />
      <br />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pokemon/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
