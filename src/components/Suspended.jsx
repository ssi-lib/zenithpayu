import { signOut } from 'firebase/auth';
import { IoIosLock } from 'react-icons/io';
import { auth } from '../../firebase';
import { renderItem } from '../pages/account/DashboardMain';

function Suspended() {
  const signOutAuth = () => {
    signOut(auth);
    window.location.href = '/';
  };

  return (
    <div>
      {renderItem['home'].header}
      <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center">
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-pri opacity-10"></div>
        <div className="flex flex-col justify-center items-center space-y-5 z-50">
          <IoIosLock className="text-[150px] text-red-900" />
          <h1 className="text-4xl text-red-900 font-bold">Account Suspended</h1>
          <h1 className="text-xl font-semibold">Contact Support</h1>
          <div className="flex space-x-8">
            <a
              href="http://wa.me/13078889799?text=Hello! I need your support"
              target="_blank"
            >
              <div className="px-8 py-2 text-white cursor-pointer rounded-md bg-[#045385]">
                <p className="">Support</p>
              </div>
            </a>
            <button
              className="px-8 py-2 text-white bg-red-900 cursor-pointer rounded-md"
              onClick={signOutAuth}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Suspended;
