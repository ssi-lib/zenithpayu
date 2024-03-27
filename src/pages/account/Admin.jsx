import { auth, db } from '../../../firebase';
import { useFetchUsers, toggleUserStatus } from '../../hooks/useFetchUser';
import { useGlobalStore } from '../../store/Context';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { doc, increment, updateDoc } from 'firebase/firestore';
import Modal from '../../components/common/Modal';

const AdminDashboard = () => {
  const { users, loading, refetch } = useFetchUsers(db);
  const { setLoader, userDetail } = useGlobalStore();
  const [pushFund, setPushFund] = useState(false);
  const [pushUser, setPushUser] = useState({});
  const [inputVal, setInputVal] = useState('');

  if (loading) {
    setLoader(true);
  }

  const handleConfirm = () => {
    setLoader(true);
    toggleUserStatus(db, pushUser.id, pushUser.status)
      .then(() => {
        refetch();
        toast.success('User status updated successfully.');
      })
      .catch((error) => {
        toast.error('An error occurred while updating the user status.');
        console.error('Error updating user status:', error);
      })
      .finally(() => {
        setLoader(false);
        setPushFund(false);
      });
  };

  const handleAssignFund = (e) => {
    e.preventDefault();
    setLoader(true);

    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = pushUser.id;
      const newBalance = Number(inputVal);

      const updateDocRef = doc(db, 'users', userId);
      updateDoc(updateDocRef, { balance: increment(newBalance) })
        .then(() => {
          refetch();
          toast.success('User balance updated successfully.');
        })
        .catch((error) => {
          toast.error('An error occurred while updating the balance.');
          console.error('Error updating user balance:', error);
        })
        .finally(() => {
          setLoader(false);
          setInputVal('');
          setPushFund(false);
        });
    }
  };

  return (
    <div className="space-y-6 py-10">
      <div className="overflow-x-auto w-full">
        <p className="text-sm text-neutral mb-2">User List</p>
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                S/N
              </th>
              <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"></th>
              <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Name
              </th>
              <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Phone Number
              </th>
              <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-r-lg whitespace-nowrap">
                Current Bal
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, id) => (
              <tr
                key={user.id}
                className="bg-white hover:bg-blue-200 transition-all duration-300 ease-in-out cursor-pointer"
                onClick={() => {
                  setPushFund(true);
                  setPushUser(user);
                }}
              >
                <td className="px-3 py-5 border-b border-gray-200 text-sm">
                  {id + 1}
                </td>
                <td className="py-5 border-b border-gray-200 text-sm px-3">
                  <div className="flex items-center">
                    <img
                      src={user.photoURL}
                      alt=""
                      width={40}
                      className="rounded-xl"
                    />
                  </div>
                </td>
                <td className="py-5 border-b border-gray-200 text-sm whitespace-nowrap px-3">
                  <div className="flex items-center">
                    <div className="">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.first_name + ' ' + user.last_name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-5 border-b border-gray-200 text-sm whitespace-nowrap px-3">
                  <div className="flex items-center">
                    <div className="">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.phone_number}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-5 border-b border-gray-200 text-sm whitespace-nowrap px-3">
                  <span
                    className={`relative inline-block py-1 font-semibold leading-tight`}
                  >
                    <span className="relative">
                      &#36; {user?.balance || 0.0}
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
      <Modal isOpen={pushFund} onClose={() => setPushFund(false)}>
        <form
          onSubmit={handleAssignFund}
          action=""
          className="text-center text-sm text-neutral flex flex-col items-center justify-center space-y-4"
        >
          <p className="text-base">
            {pushUser.first_name + ' ' + pushUser.last_name}
          </p>
          <p>Balance: {pushUser.balance}</p>
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => setInputVal(e.target.value)}
            className="border w-full text-[12px] px-2 py-1 rounded-md"
          />
          <div className="flex space-x-4">
            {/* <button
              type="submit"
              className="px-4 py-1 rounded border border-pri"
              onClick={handleConfirm}
            >
              Confirm
            </button> */}
            <button
              type="submit"
              className="px-4 py-1 rounded border border-pri hover:bg-blue-200"
            >
              Send
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
