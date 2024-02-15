import { useState, createContext } from "react";
import Deposit from "./Deposit";
import Home from "./Home";
import AsideLeft from "./components/AsideLeft";
import AsideRight from "./components/AsideRight";
import Header from "./components/Header";
import Transfer from "./Transfer";
import Cards from "./Cards";
import { linkObj } from "./links";

export const LinksContext = createContext()


function DashboardMain({page}) {
  const renderItem = {
    home: {component:<Home />, header:<Header type="home" />},
    deposit: {component:<Deposit />, header:<Header type='deposit'/>},
    transfer: {component:<Transfer />, header:<Header type='transfer'/>},
    cards: {component:<Cards />, header:<Header type='cards'/>},   
  }
  return (
    <LinksContext.Provider value={linkObj}>
      {renderItem[page].header}
      <main className='grid grid-cols-[24%_50%_24%] max-w-[1280px] mx-auto px-4 pt-20 gap-[1%]'>
        <AsideLeft />
        {renderItem[page].component}
        <AsideRight />
      </main>
      <div>Dashboard Main</div>
    </LinksContext.Provider>
  )
}

export default DashboardMain;
