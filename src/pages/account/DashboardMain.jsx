import { useState, createContext } from "react";
import AsideLeft from "./components/AsideLeft";
import AsideRight from "./components/AsideRight";
import Header from "./components/Header";

import Deposit from "./Deposit";
import Home from "./Home";
import Transfer from "./Transfer";
import Cards from "./Cards";
import { linkObj } from "./links";
import Swap from "./Swap";
import Loan from "./Loan";
import Settings from "./Settings";

export const LinksContext = createContext()


function DashboardMain({page}) {
  const renderItem = {
    home: {component:<Home />, header:<Header type="home" />},
    deposit: {component:<Deposit />, header:<Header type='deposit'/>},
    transfer: {component:<Transfer />, header:<Header type='transfer'/>},
    cards: {component:<Cards />, header:<Header type='cards'/>},   
    swap: {component:<Swap />, header:<Header type='Exchange Currency'/>},   
    loans: {component:<Loan />, header:<Header type='loans'/>},   
    settings: {component:<Settings />, header:<Header type='settings'/>},   
  }
  return (
    <LinksContext.Provider value={linkObj}>
      {renderItem[page]?.header}
      <main className='sm:grid grid-cols-[24%_50%_24%] max-w-[1280px] mx-auto px-4 pt-20 gap-[1%]'>
        <AsideLeft />
        {renderItem[page]?.component}
        <AsideRight />
      </main>
      <div><i className='bi bi-credit-card text-blue-300'></i>Dashboard Main</div>
    </LinksContext.Provider>
  )
}

export default DashboardMain;
