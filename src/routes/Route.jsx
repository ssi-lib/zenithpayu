import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import About from '../pages/About';
import Help from '../pages/Help';
import SignUp from '../pages/auth/SignUp';
import Login from '../pages/auth/Login';
import DashboardMain from '../pages/dashboard/DashboardMain';

const AllRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardMain />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoute;
