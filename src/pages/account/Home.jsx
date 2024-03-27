import { useContext, useState } from 'react';
import { LinksContext } from './DashboardMain';
import { homeOptions } from './accountData';
import zenithpayu from '../../assets/ZenithpayU.mp4';
import { useGlobalStore } from '../../store/Context';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import one from '../../assets/one.png';
import two from '../../assets/two.png';
import three from '../../assets/three.png';
import { generateAccountNumber } from '../../../functions/generateAccountNumber';

function Home() {
  // const links = useContext(LinksContext);
  const { page, setPage, setLoader, userDetail } = useGlobalStore();

  const handlePage = ({ route }) => {
    setLoader(true);
    setPage(route.toLowerCase());
  };
  const handlePageChange = () => {
    setLoader(true);
    setPage('transactions');
  };

  return (
    <div className="home_render mt-2">
      <div className="py-6 px-4 bg-white rounded-xl flex flex-col gap-6 z-50">
        <div className="acc md:flex justify-between border-b-2 pb-6">
          <div className="acc_balance flex-1">
            <p className="">Dollar Balance</p>
            <p className="text-3xl font-bold">
              &#36; <span>{userDetail.balance || 0.0}</span>
            </p>
          </div>
          <div className="acc_status flex-1 hidden sm:block">
            <p className="">Account Status</p>
            <p className="text-3xl font-bold opacity-60">Dormant</p>
          </div>
          <p className="text-neutral text-[12px] md:hidden">
            Your account Number: {userDetail?.account_number}
          </p>
        </div>

        <div className="grid grid-cols-4 justify-between items-center gap-y-12">
          {homeOptions.map((opt, idx) => (
            <div
              className="flex flex-col justify-center items-center space-y-2"
              key={idx}
            >
              <div
                className="w-12 h-12 rounded-xl flex flex-col justify-center items-center text-white cursor-pointer"
                style={{
                  backgroundColor: opt.color,
                  border: !opt.color && '1px solid #000',
                  color: !opt.color && '#000',
                  fontSize: '30px',
                }}
                onClick={() => handlePage(opt)}
              >
                {opt.icon}
              </div>
              <p className="text-[12px] truncate">{opt.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="my-5 bg-black overflow-hidden items-center justify-center flex rounded-xl">
        <video
          height={300}
          width={400}
          controls
          className="rouned-md"
          autoPlay={false}
          muted
        >
          <source src={zenithpayu} type="video/mp4"></source>
        </video>
      </div>
      <Slider {...settings} dots={true} className="overflow-hidden">
        <div className="">
          <img src={one} alt="" className="" />
        </div>
        <div className="">
          <img src={two} alt="" className="" />
        </div>
        <div className="">
          <img src={three} alt="" className="" />
        </div>
      </Slider>
      <div className="flex justify-between items center my-5">
        <p>Transactions</p>
        <p className="text-pri cursor-pointer" onClick={handlePageChange}>
          View All
        </p>
      </div>
    </div>
  );
}

export default Home;

const settings = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  dot: true,

  // responsive: [
  //   {
  //     breakpoint: 600,
  //     settings: {
  //       slidesToShow: 3,
  //     },
  //   },
  // ],
};
