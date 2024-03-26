import { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { MdLockOutline, MdVerifiedUser } from 'react-icons/md';
import { auth } from '../../../firebase';
import { updatePassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGlobalStore } from '../../store/Context';

function UpdatePassword() {
  const [passwords, setPasswords] = useState({
    password: '',
    c_password: '',
    cardPin: '',
  });
  const [showPass, setShowPass] = useState(false);
  const { setPage, setLoader } = useGlobalStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    if (passwords.password === passwords.c_password) {
      const user = auth.currentUser;

      updatePassword(user, passwords.password)
        .then(() => {
          toast.success('Password updated successfully');
        })
        .catch((error) => {
          console.error(error);
          toast.error('error', error);
        })
        .finally(() => {
          setLoader(false);
          setPasswords({});
        });
    } else {
      setLoader(false);
      console.error('Passwords do not match');
      toast.error('password not match');
    }
  };

  return (
    <div className="my-8">
      <div className="w-full p-4 px-5 py-5 bg-white rounded-xl">
        <p className="text-neutral text-xs border-b py-4 text-center">
          Changing your account photo is a simple process that allows you to
          personalize your profile
        </p>
        <form onSubmit={handleSubmit} className="py-8 space-y-4">
          <div className="flex items-center px-4 rounded-xl bg-[#F4F5FA] shadow w-full">
            <MdLockOutline className="text-gray-500 text-lg" />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              className="w-full py-3 px-4 placeholder:font-thin bg-transparent placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
            <div
              className="transition-all ease-in-out duration-300"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <BsEyeSlashFill className="text-pri cursor-pointer transition-all ease-in-out duration-300" />
              ) : (
                <BsEyeFill className="text-pri cursor-pointer transition-all ease-in-out duration-300" />
              )}
            </div>
          </div>
          <div
            className={` flex items-center px-4 rounded-xl bg-[#F4F5FA] shadow w-full `}
          >
            <MdLockOutline className="text-gray-500 text-lg" />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Confirm Password"
              name="c_password"
              onChange={handleChange}
              className={`w-full py-3 px-4 placeholder:font-thin bg-transparent placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out`}
            />
            <div
              className="transition-all ease-in-out duration-300"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <BsEyeSlashFill className="text-pri cursor-pointer transition-all ease-in-out duration-300" />
              ) : (
                <BsEyeFill className="text-pri cursor-pointer transition-all ease-in-out duration-300" />
              )}
            </div>
          </div>

          {/* Account Pin */}
          <div className="flex items-center px-4 rounded-xl bg-[#F4F5FA] shadow w-full">
            <MdVerifiedUser className="text-gray-500 text-lg" />
            <input
              type="password"
              placeholder="Account Pin"
              name="account_pin"
              onChange={handleChange}
              className="w-full py-3 px-4 placeholder:font-thin bg-transparent placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>
          <p className="text-end text-xs text-pri pb-8">See card pin</p>
          <div className="flex justify-center">
            <button
              type="submit"
              className="h-8 text-white px-5 text-sm transition-colors duration-150 bg-pri rounded-lg focus:shadow-outline hover:bg-blue-600"
            >
              Change account password
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdatePassword;
