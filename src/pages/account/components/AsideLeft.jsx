import { useContext, useState } from 'react';
import { LinksContext } from '../DashboardMain';
import { auth } from '../../../../firebase';
import { signOut } from 'firebase/auth';
import { asideLeftTopData } from '../accountData';
import { FaHome, FaRegUserCircle } from 'react-icons/fa';
import { BsCreditCard2Back, BsDoorClosed, BsGear } from 'react-icons/bs';
import { MdOutlineQuickreply } from 'react-icons/md';
import { CiGrid42 } from 'react-icons/ci';
import { IoHelp } from 'react-icons/io5';
import { useGlobalStore } from '../../../store/Context';
import { RiAdminFill } from 'react-icons/ri';
import { generateAccountNumber } from '../../../../functions/generateAccountNumber';

function AsideLeft() {
  // const links = useContext(LinksContext);
  const { page, setPage, setLoader, userDetail } = useGlobalStore();
  const [active, setActive] = useState(0);

  const primaryNavContent = [
    { textContent: 'Dashboard', icon: <FaHome />, route: 'home' },
    { textContent: 'Swap', icon: <CiGrid42 />, route: 'swap' },
    { textContent: 'Loans', icon: <MdOutlineQuickreply />, route: 'loan' },
    { textContent: 'My Cards', icon: <BsCreditCard2Back />, route: 'card' },
    { textContent: 'Settings', icon: <BsGear />, route: 'settings' },
    { textContent: 'Admin', icon: <RiAdminFill />, route: 'admin' },
  ];

  const signOutAuth = () => {
    signOut(auth);
    window.location.href = '/';
  };

  const handlePageChange = ({ route }, i) => {
    if (page === route) {
      return;
    }
    setActive(i);
    setLoader(true);
    setPage(route.toLowerCase());
  };
  return (
    <>
      <aside className="sticky top-0 h-screen pt-10 hidden lg:block bg-white px-1">
        <div className="user flex items-center gap-4 p-4">
          <div className="">
            {userDetail?.photoURL ? (
              <img
                src={userDetail.photoURL}
                alt="profile"
                className="w-14 h-14 rounded-xl"
              />
            ) : (
              <FaRegUserCircle className="text-3xl" />
            )}
          </div>
          <div className="">
            <p>{userDetail?.first_name + ' ' + userDetail?.last_name}</p>
            <p className="text-neutral text-[12px]">
              {userDetail?.account_type}
            </p>
            <p className="text-neutral text-[10px]">
              Your account Number: {generateAccountNumber()}
            </p>
          </div>
        </div>
        <nav>
          <div className="quick_access flex flex-col ">
            <div className="flex flex-row justify-between p-4 bg-pri">
              {asideLeftTopData.map((n, i) => (
                <div key={i} className="text-center w-fit text-[12px]">
                  <div className="flex flex-col justify-center items-center space-y-2">
                    <div
                      className="text-lg flex w-10 h-10 justify-center items-center bg-[#045385] rounded-full text-white cursor-pointer"
                      onClick={() => handlePageChange(n)}
                    >
                      {n.icon}
                    </div>
                    <p className="text-[#B7D7EC] text-thin text-[11px]">
                      {n.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="primary_nav flex flex-col px-6">
              <ul>
                {primaryNavContent
                  .filter((e) => (userDetail?.role ? e : e.route !== 'admin'))
                  .map((n, i) => (
                    <li
                      key={i}
                      className="border-b text-pri cursor-pointer"
                      onClick={() => handlePageChange(n)}
                    >
                      <div className="flex items-center space-x-3 py-4 text-lg">
                        <div className="text-3xl">{n.icon}</div>
                        <p>{n.textContent}</p>
                      </div>
                    </li>
                  ))}
                <li
                  className="border-b text-pri cursor-pointer"
                  onClick={signOutAuth}
                >
                  <div className="flex items-center space-x-3 py-4 text-lg">
                    <div className="text-3xl">
                      <BsDoorClosed />
                    </div>
                    <p>{'Log Out'}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <footer className="fixed w-full bottom-0 bg-white border-t lg:hidden z-50">
        <div
          className={`grid ${
            userDetail.role === 'admin' ? 'grid-cols-6' : 'grid-cols-5'
          } justify-between items-center px-4`}
        >
          {primaryNavContent
            .filter((e) => (userDetail?.role ? e : e.route !== 'admin'))
            .map((e, i) => (
              <div
                key={i}
                onClick={() => handlePageChange(e, i)}
                className={`flex flex-col items-center justify-center py-2 text-lg ${
                  active === i ? 'border-t-2 border-pri' : ''
                }`}
              >
                <div className="text-xl text-pri">{e.icon}</div>
                <p className="text-[10px]">{e.textContent}</p>
              </div>
            ))}
        </div>
      </footer>
    </>
  );
}

export default AsideLeft;
