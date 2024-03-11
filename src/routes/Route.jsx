import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import About from '../pages/About';
import Help from '../pages/Help';
import SignUp from '../pages/auth/SignUp';
import Login from '../pages/auth/Login';
import DashboardMain from '../pages/account/DashboardMain';
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
        <Route path="/account/home" element={<DashboardMain page={'home'}/>} />
        <Route path="/account/deposit" element={<DashboardMain page={'deposit'}/>} />
        <Route path="/account/withdraw" element={<DashboardMain page={'withdraw'}/>} />
        <Route path="/account/swap" element={<DashboardMain page={'swap'}/>} />
        <Route path="/account/cards" element={<DashboardMain page={'cards'}/>} />
        <Route path="/account/transfer" element={<DashboardMain page={'transfer'}/>} />
        <Route path="/account/settings" element={<DashboardMain page={'settings'}/>} />
        <Route path="/account/loans" element={<DashboardMain page={'loans'}/>} />

    </Routes>
  );
};

export default AllRoute;
