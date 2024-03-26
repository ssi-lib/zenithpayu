import { FaBell, FaRegUserCircle } from 'react-icons/fa';
import { useGlobalStore } from '../../../store/Context';

function HomeHeader({ children }) {
  const { page, setPage, setLoader, userDetail } = useGlobalStore();
  const homeHeader = [
    {
      name: 'Quick Transfer',
      route: 'transfer',
    },
    {
      name: 'Account Home',
      route: 'home',
    },
    {
      name: 'Loan',
      route: 'loan',
    },
    {
      name: 'Account Settings',
      route: 'settings',
    },
  ];

  const handlePageChange = (route) => {
    if (page === route) {
      return;
    }
    setLoader(true);
    setPage(route.toLowerCase());
  };

  return (
    <header className="fixed top-0 w-full right-0 left-0 z-10 bg-pri">
      <div className="flex justify-between px-8 text-[17px]  mx-auto py-4">
        <div
          className="left ms-2 font-bold text-lg"
          style={{ fontSize: '24px', letterSpacing: '1px' }}
          onClick={() => handlePageChange('home')}
        >
          <b>
            <span
              className="font-bold"
              style={{
                color: '#bae5ff',
                fontFamily: 'sans-serif',
                fontWeight: 'bolder',
              }}
            >
              <span
                style={{
                  fontFamily: 'sans-serif',
                  fontWeight: 'bolder',
                  background: '#fff',
                  padding: '0px 4px',
                  borderRadius: '10px',
                  color: '#0076be',
                  marginRight: '2px',
                }}
              >
                Z
              </span>
            </span>
            <span
              style={{
                fontFamily: 'sans-serif',
                fontWeight: 'normal',
                color: '#fff',
                marginLeft: '0px',
                marginRight: '10px',
              }}
            >
              enithPayu
            </span>
          </b>
        </div>

        <ul className="lg:flex items-center space-x-4 text-lg text-white hidden">
          {homeHeader.map((nav) => (
            <li
              key={nav.name}
              className="cursor-pointer"
              onClick={() => handlePageChange(nav.route)}
            >
              {nav.name}
            </li>
          ))}
        </ul>
        <div className="text-white flex items-center space-x-4 text-2xl">
          <FaBell
            className="cursor-pointer"
            onClick={() => handlePageChange('notifications')}
          />
          <div
            className="cursor-pointer"
            onClick={() => handlePageChange('settings')}
          >
            {userDetail?.photoURL ? (
              <img
                src={userDetail.photoURL}
                alt="profile"
                className="w-7 h-7 rounded-xl"
              />
            ) : (
              <FaRegUserCircle className="text-3xl" />
            )}
          </div>
        </div>
        {children}
      </div>
    </header>
  );
}

export default HomeHeader;
