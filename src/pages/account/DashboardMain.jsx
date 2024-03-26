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
    </LinksContext.Provider>
  );
}

export default DashboardMain;
