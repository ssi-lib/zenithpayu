import { auth, db } from '../../../firebase';
import { useFetchUsers, toggleUserStatus } from '../../hooks/useFetchUser';
import { useGlobalStore } from '../../store/Context';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { doc, increment, updateDoc } from 'firebase/firestore';

const AdminDashboard = () => {
  const { users, loading, refetch } = useFetchUsers(db);
  const { setLoader, userDetail } = useGlobalStore();
  const [checkedUser, setCheckedUser] = useState([]);
  const [checkedUserId, setCheckedUserId] = useState([]);
  const [inputVal, setInputVal] = useState('');

  if (loading) {
    setLoader(true);
  }

  const handleCheckboxChange = (user) => {
    if (!checkedUser.includes(user.id)) {
      setCheckedUser([{ user, inputVal }]);
      setCheckedUserId([user.id]);
    } else {
      setCheckedUser([]);
      setCheckedUserId([]);
    }
  };

  const handleConfirm = () => {
    setLoader(true);
    toggleUserStatus(db, checkedUser[0].user.id, checkedUser[0].user.status)
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
      });
  };

  const handleAssignFund = () => {
    if (checkedUser.length < 1) {
      alert('Please check a user to continue');
      return;
    }

    setLoader(true);

    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = checkedUser[0].user.id;
      const newBalance = Number(checkedUser[0].inputVal);

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
          setCheckedUser([]);
          setCheckedUserId([]);
        });
    }
  };

  return (
    <div className="space-y-6 py-10">
      <div className="flex justify-end space-x-7">
        <button
          type="button"
          className="bg-pri text-white text-sm px-8 py-2 rounded-md"
          onClick={handleConfirm}
        >
          Change Status
        </button>
        <button
          type="button"
          className="bg-pri text-white text-sm px-8 py-2 rounded-md"
          onClick={handleAssignFund}
        >
          Assign Fund
        </button>
      </div>
      <div className="overflow-x-auto w-full">
        <p className="text-sm text-neutral mb-2">User List</p>
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 rounded-l-lg text-start"></th>
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
              <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-r-lg whitespace-nowrap">
                Fund
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, id) => (
              <tr key={user.id} className="bg-white">
                <td className="px-5 py-5 border-b border-gray-200 text-sm rounded-l-lg">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={checkedUserId.includes(user.id)}
                    onChange={() => handleCheckboxChange(user)}
                  />
                </td>
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
                <td className="py-5 border-b border-gray-200 text-sm whitespace-nowrap px-3 rounded-r-lg">
                  <input
                    type="number"
                    name=""
                    id=""
                    onChange={(e) => setInputVal(e.target.value)}
                    className="border w-16 text-[12px] px-2 py-1 rounded-md"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
