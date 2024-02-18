import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import About from '../pages/About';
import Help from '../pages/Help';
import SignUp from '../pages/auth/SignUp';
import Login from '../pages/auth/Login';
import DashboardMain from '../pages/dashboard/DashboardMain';
import ForgotPassword from '../pages/auth/ForgotPassword';
import GetStarted from '../pages/auth/GetStarted';

const AllRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardMain />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/get-started" element={<GetStarted />} />
    </Routes>
  );
};

export default AllRoute;
