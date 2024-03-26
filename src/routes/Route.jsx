import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import About from '../pages/About';
import Help from '../pages/Help';
import SignUp from '../pages/auth/SignUp';
import Login from '../pages/auth/Login';
import DashboardMain from '../pages/account/DashboardMain';
import ForgotPassword from '../pages/auth/ForgotPassword';
import GetStarted from '../pages/auth/GetStarted';
import { useGlobalStore } from '../store/Context';
import Error from '../error/Error';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useGlobalStore();
  return currentUser ? children : <Navigate to="/login" />;
};

const AllRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="*" element={<Error />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardMain />
          </PrivateRoute>
        }
      />
      <Route
        path="/account/dashboard"
        element={
          <PrivateRoute>
            <DashboardMain page={'home'} />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoute;
