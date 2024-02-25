import { TfiAngleLeft } from 'react-icons/tfi';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';
import { BsKeyFill } from 'react-icons/bs';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Checking from '../../components/Checking';
import AltButton from './components/AltButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const useLoginDetails = ({ target }) => {
    setLoginDetails((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoader(true);

    const { email, password } = loginDetails;
    if (!loginDetails.email || !loginDetails.password) {
      setError(true);
      setTimeout(() => setLoader(false), 2000);
      return;
    }
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setLoader(false);
        setIsLoading(false);
        navigate('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg(errorMessage.split('(')[1].split(')')[0].trim());
        setIsLoading(false);
        setLoader(false);
      })
      .finally(() => {
        setTimeout(() => setErrorMsg(null), 3000);
      });
  };

  return (
    <div className="bg-[#EDEDF5] relative">
      <div className="md:w-[40%] mx-auto bg-[#F5F5FA] h-screen px-3 md:px-7">
        <div className="py-7">
          <Link to={'/'}>
            <TfiAngleLeft className="text-3xl text-pri font-light" />
          </Link>
        </div>
        <div className="text-center flex flex-col space-y-2 py-5">
          <p className="text-xl md:text-3xl font-semibold">
            Log in to Continue
          </p>
          <p>
            {`Don't have an account?`}
            <Link to={'/get-started'}>
              <span className="text-pri ml-2">Sign Up</span>
            </Link>
          </p>
          <form action="" className="pt-12 space-y-6" onSubmit={handleLogin}>
            <div
              className={`${
                errorMsg ? 'border border-red-500' : ''
              } flex items-center px-4 rounded-md bg-white shadow w-full`}
            >
              <MdPersonAddAlt1 className="text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Your e-mail or account number"
                value={loginDetails.email}
                name="email"
                onChange={useLoginDetails}
                className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
              />
            </div>
            <div
              className={`${
                errorMsg ? 'border border-red-500' : ''
              } flex items-center px-4 rounded-md bg-white shadow w-full`}
            >
              <BsKeyFill className="text-gray-500 text-lg" />
              <div className="flex justify-between items-center w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  value={loginDetails.password}
                  name="password"
                  onChange={useLoginDetails}
                  className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
                />
                <div
                  className="text-pri"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
                </div>
              </div>
            </div>
            {errorMsg && (
              <p className="my-2 text-red-500 text-[11px]">{errorMsg}</p>
            )}
            <Link to={'/forgot-password'}>
              <p className="text-end font-thin text-sm text-gray-500 mt-5">
                Forgot Password?
              </p>
            </Link>
            <AltButton btn_text={'Log In'} />
          </form>
        </div>
      </div>
      <Checking
        isLoading={isLoading}
        error={error}
        setIsLoading={setIsLoading}
        loader={loader}
      />
    </div>
  );
}

export default Login;
