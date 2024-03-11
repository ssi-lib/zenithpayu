import { signOut } from 'firebase/auth';
import UnderDevelopment from '../../components/UnderDevelopment';
import { auth } from '../../../firebase';

function DashboardMain() {
  const signOutAuth = () => {
    signOut(auth);
    window.location.href = '/';
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-900 anima">
      <UnderDevelopment />
      <p className="text-3xl font-bold mb-5 text-white text-center">
        DASHBOARD UNDER DEVELOPMENT
      </p>
      <p className="text-xl text-white">PLEASE CHECK BACK LATER</p>
      <button
        onClick={signOutAuth}
        className="bg-pri px-8 py-2 text-sm mt-5 rounded text-white"
      >
        Sign Out
      </button>
    </div>
  );
}

export default DashboardMain;
