import { useState, createContext, useEffect } from 'react';
import AsideLeft from './components/AsideLeft';
import AsideRight from './components/AsideRight';
import Header from './components/Header';

import Deposit from './Deposit';
import Home from './Home';
import Transfer from './Transfer';
import Cards from './Cards';
import { linkObj } from './links';
import Swap from './Swap';
import Loan from './Loan';
import Settings from './Settings';
import HomeHeader from './components/HomeHeader';
import { useGlobalStore } from '../../store/Context';
import Loader from './components/ui/Loader';
import UpdatePassword from './UpdatePassword';
import NewAccount from './NewAccount';
import NotificationsList from './NotificationList';
import Statement from './Statement';
import Transactions from './Transactions';
import AdminDashboard from './Admin';
import { IoHelp } from 'react-icons/io5';

export const LinksContext = createContext();

function DashboardMain() {
  const { page, loader, setLoader } = useGlobalStore();
  const renderItem = {
    home: { component: <Home />, header: <HomeHeader /> },
    deposit: { component: <Deposit />, header: <Header type="deposit" /> },
    transfer: { component: <Transfer />, header: <Header type="transfer" /> },
    card: { component: <Cards />, header: <Header type="cards" /> },
    swap: { component: <Swap />, header: <Header type="Exchange Currency" /> },
    loan: { component: <Loan />, header: <Header type="loans" /> },
    admin: { component: <AdminDashboard />, header: <Header type="Admin" /> },
    settings: { component: <Settings />, header: <Header type="settings" /> },
    transactions: {
      component: <Transactions />,
      header: <Header type="transactions" />,
    },
    statement: {
      component: <Statement />,
      header: <Header type="statement" />,
    },
    notifications: {
      component: <NotificationsList />,
      header: <Header type="Message Center" />,
    },
    newaccount: {
      component: <NewAccount />,
      header: <Header type="deposit" />,
    },
    update_password: {
      component: <UpdatePassword />,
      header: <Header type="settings" />,
    },
  };

  useEffect(() => {
    setLoader(true);
    const timer = setTimeout(() => setLoader(false), 1000);
    return () => clearTimeout(timer);
  }, [page]);

  return (
    <LinksContext.Provider value={linkObj}>
      {renderItem[page]?.header}
      <main className="lg:grid lg:grid-cols-[24%_50%_24%] mx-auto pt-[3.5rem] gap-[1%] bg-[#EDEDF5]">
        <AsideLeft />
        <div className="min-h-screen pb-20 mx-3">
          {renderItem[page]?.component}
        </div>
        <AsideRight />
      </main>
      {loader ? <Loader /> : null}
      <a
        href="http://wa.me/13078889799?text=Hello! I need your support"
        target="_blank"
      >
        <div className="sticky bottom-20 flex flex-col shadow-md items-center justify-center w-14 h-14 rounded-full bg-[#045385] text-white mt-4 ml-4">
          <IoHelp />
          <p className="text-[10px]">Support</p>
        </div>
      </a>
    </LinksContext.Provider>
  );
}

export default DashboardMain;
