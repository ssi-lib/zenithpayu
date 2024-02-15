import Home from "./Home";
import AsideLeft from "./components/AsideLeft";
import AsideRight from "./components/AsideRight";
import Header from "./components/Header";

function DashboardMain({page}) {
  const renderItem = {
    home: {component:<Home />, header:<Header type="home" />},
    deposit: {component:<Home />},
   
  }
  return (
    <div>
      {renderItem[page].header}
      <main className='grid grid-cols-[24%_50%_24%] max-w-[1280px] mx-auto px-4 pt-20 gap-[1%]'>
        <AsideLeft />
        {renderItem[page].component}
        <AsideRight />
      </main>
      <div>Dashboard Main</div>
    </div>
  )
}

export default DashboardMain;
