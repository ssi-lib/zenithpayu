import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import About from '../pages/About';
import Help from '../pages/Help';
import SignUp from '../pages/auth/SignUp';
import Login from '../pages/auth/Login';
import DashboardMain from '../pages/account/DashboardMain';

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
        <Route path="/account/home" element={<DashboardMain page={'home'}/>} />
        <Route path="/account/deposit" element={<DashboardMain page={'deposit'}/>} />
        <Route path="/account/withdraw" element={<DashboardMain page={'withdraw'}/>} />
        <Route path="/account/swap" element={<DashboardMain page={'swap'}/>} />
        <Route path="/account/cards" element={<DashboardMain page={'cards'}/>} />
        <Route path="/account/transfer" element={<DashboardMain page={'transfer'}/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default AllRoute;
