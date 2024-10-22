import { auth, db } from '../../../firebase';
import { useFetchUsers, toggleUserStatus } from '../../hooks/useFetchUser';
import { useGlobalStore } from '../../store/Context';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { doc, increment, updateDoc } from 'firebase/firestore';
import Modal from '../../components/common/Modal';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import { generateLabel } from '../../../utils/generateLabel';
import { sortedKeys } from '../../../utils/sortedKeys';
import { FaTimes, FaUserCircle } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { GiCancel } from 'react-icons/gi';
import { GoVerified } from 'react-icons/go';

const AdminDashboard = () => {
  const { users, loading, refetch } = useFetchUsers(db);
  const { setLoader } = useGlobalStore();
  const [pushFund, setPushFund] = useState(false);
  const [pushUser, setPushUser] = useState({});
  const [inputVal, setInputVal] = useState('');
  const [viewDoc, setViewDoc] = useState(false);

  useEffect(() => {
    if (loading) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [loading]);

  // const handleConfirm = () => {
  //   setLoader(true);
  //   toggleUserStatus(db, pushUser.id, pushUser.status)
  //     .then(() => {
  //       refetch();
  //       toast.success('User status updated successfully.');
  //     })
  //     .catch((error) => {
  //       toast.error('An error occurred while updating the user status.');
  //       console.error('Error updating user status:', error);
  //     })
  //     .finally(() => {
  //       setLoader(false);
  //       setPushFund(false);
  //     });
  // };

  const handleBlockUser = () => {
    if (pushUser.role === 'admin') {
      toast.error('You cannot block an admin user');
      return;
    }
    setLoader(true);

    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = pushUser.id;
      const updateDocRef = doc(db, 'users', userId);
      updateDoc(updateDocRef, {
        account: pushUser.account === 'active' ? 'suspended' : 'active',
      })
        .then(() => {
          refetch();
          toast.success(
            `You have changed ${pushUser.first_name} ${pushUser.last_name} account status`
          );
        })
        .catch((error) => {
          toast.error('An error while changing user account status.');
          console.error('Error changing user account status:', error);
        })
        .finally(() => {
          setLoader(false);
          setInputVal('');
          setPushFund(false);
        });
    }
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

  const handleDoc = async (option) => {
    setLoader(true);
    try {
      const userId = pushUser.id;
      const uData = doc(db, 'users', userId);
      await updateDoc(uData, {
        status: option,
        doc_verified: option === 'verified' ? true : false,
      });

      setPushFund(false);
      setViewDoc(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const order = [
    'first_name',
    'last_name',
    'phone_number',
    'balance',
    'gender',
    'date',
  ];

  const userInfo = sortedKeys(
    Object.keys(pushUser || {}).filter((e) => !exclude.includes(e)),
    order
  );

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
      <Modal
        isOpen={pushFund}
        onClose={() => setPushFund(false)}
        width={'max-w-7xl'}
      >
        <div
          action=""
          className="text-center text-sm text-neutral flex flex-col items-center justify-center space-y-4"
        >
          <div
            className="absolute right-3 top-3 text-lg text-red-600 cursor-pointer"
            onClick={() => setPushFund(false)}
          >
            <FaTimes />
          </div>
          <div className="grid md:grid-cols-4 gap-4 flex flex-col w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg space-y-4 w-full shadow col-span-2">
              <div className="img-part p-4 border-r border-gray-200 flex flex-col items-center gap-y-4">
                <div className="w-28 h-28 rounded-full">
                  {pushUser.photoURL ? (
                    <img
                      src={pushUser?.photoURL}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="w-full h-full text-gray-400" />
                  )}
                </div>
                <p className="text-xl font-semibold text-gray-700 text-balance text-center">
                  {pushUser.first_name + ' ' + pushUser.last_name}
                </p>
                <p className="text-gray-500 text-[12px]">
                  {pushUser?.email ?? 'default_email@email.com'}
                </p>
                <p className="text-gray-500 text-[12px]">
                  Account Number: {pushUser?.account_number}
                </p>
                <p className="text-gray-500 text-[12px]">
                  User ID: {pushUser?.id}
                </p>
                <div className="">
                  <p className="font-semibold text-sm text-center">
                    Transactions
                  </p>
                  <p>-</p>
                </div>
                <div className="flex flex-col gap-6">
                  <button
                    className={`${
                      pushUser.account === 'active'
                        ? 'bg-green-200 text-pri'
                        : 'bg-gray-200 text-gray-400'
                    } px-8 py-2 rounded-lg text-sm cursor-default`}
                  >
                    {capitalizeFirstLetter(pushUser.account)}
                  </button>
                  <button className="bg-green-200 px-8 py-2 rounded-lg text-pri text-sm cursor-default">
                    {capitalizeFirstLetter(pushUser.role)}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 p-4">
                {userInfo.map((e, idx) => (
                  <div
                    className="text-sm text-gray-500 w-full truncate flex items-center gap-5 space-y-2 border-b border-gray-200"
                    key={idx}
                  >
                    <div className="">
                      <div className="flex items-center gap-x-5">
                        <p className="text-[12px] font-semibold text-gray-400">
                          {generateLabel(e)}
                        </p>
                      </div>
                      <p className="text-[12px] font-semibold text-green-900 text-start">
                        {capitalizeFirstLetter(pushUser[e])}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full col-span-2 grid gap-4  h-full shadow rounded-md bg-gray-100">
              <div className="grid md:grid-cols-2 text-center p-3">
                <div className="flex flex-col text-sm md:gap-5 justify-center text-center md:text-start">
                  <div className="flex flex-col md:flex-row">
                    <p className="text-xs text-center md:text-start">
                      Document Type:{' '}
                    </p>
                    <p className="text-center md:text-start">
                      {pushUser.doc_type ?? 'No upload yet'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <p>Verification: </p>
                    <p>{capitalizeFirstLetter(pushUser.status)}</p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 min-h-40 flex items-center justify-center">
                  {pushUser.doc ? (
                    <div className="flex justify-center items-center">
                      <img src={pushUser.doc} alt="" />
                      <div className="absolute flex justify-center items-center space-x-4 text-2xl bg-gray-900 px-2 py-1 rounded-md">
                        <MdOutlineRemoveRedEye
                          className="text-pri"
                          onClick={() => setViewDoc(true)}
                        />
                        {/* <IoMdCheckmarkCircleOutline className="text-green-500" />
                        <GiCancel className="text-red-600" /> */}
                      </div>
                    </div>
                  ) : (
                    <p className="text-7xl">?</p>
                  )}
                </div>
              </div>
              <form
                onSubmit={handleAssignFund}
                className="grid md:grid-cols-2 text-center p-3"
              >
                <div className="flex flex-col justify-center">
                  <p className="text-xs text-center md:text-start">
                    Fund User Balance
                  </p>
                </div>
                <div className="flex flex-col space-y-4 items-center ">
                  <p>Balance: &#36;{pushUser.balance}</p>
                  <input
                    type="number"
                    name=""
                    id=""
                    onChange={(e) => setInputVal(e.target.value)}
                    className="border w-full text-[12px] px-2 py-2 rounded-md max-w-md"
                  />
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="px-4 py-1 rounded border border-pri hover:bg-blue-200"
                    >
                      Fund
                    </button>
                  </div>
                </div>
              </form>
              <div className="grid md:grid-cols-2 text-center p-3">
                <div className="text-start justify-center flex flex-col">
                  <p className="text-xs text-center md:text-start">
                    Suspend User
                  </p>
                  <p className="text-[10px] text-center md:text-start">
                    Note: User will not be able to access anything on the
                    dashboard
                  </p>
                  <p className="text-[10px] text-center md:text-start">
                    Also: You can always unblock the user anytime
                  </p>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                  <button
                    onClick={handleBlockUser}
                    className={`${
                      pushUser.account === 'active' ? 'bg-red-600' : 'bg-pri'
                    } text-white w-40 py-3 rounded-md`}
                  >
                    {pushUser.account === 'active'
                      ? 'Suspend User'
                      : 'Activate User'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal isOpen={viewDoc} onClose={() => setViewDoc} width={'max-w-4xl'}>
        <div className="flex justify-end items-end">
          <img src={pushUser.doc} alt="" className="w-full object-contain" />
          <div className="absolute flex justify-center items-center space-x-8 text-4xl bg-gray-900 px-2 py-2 rounded-md">
            {/* <MdOutlineRemoveRedEye
              className="text-pri"
              onClick={() => setViewDoc(true)}
            /> */}
            <IoMdCheckmarkCircleOutline
              className="text-green-500 cursor-pointer"
              onClick={() => handleDoc('verified')}
            />
            <GiCancel
              className="text-red-600 cursor-pointer"
              onClick={() => handleDoc('not verified')}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDashboard;

const exclude = [
  'id',
  'account_number',
  'account',
  'uid',
  'email',
  'status',
  'photoURL',
];
