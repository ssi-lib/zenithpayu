import { TfiAngleLeft } from 'react-icons/tfi';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Checking from '../../components/Checking';
import AltButton from './components/AltButton';

function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoader(true);
    if (!email) {
      setError(true);
      setTimeout(() => setLoader(false), 2000);
      return;
    }
    navigate('/dashboard');
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
          <p className="text-xl md:text-3xl font-semibold">Forgot Password</p>
          <p>Reset your password</p>
          <form
            action=""
            className="pt-12 space-y-6"
            onSubmit={handleResetPassword}
          >
            <div className="flex items-center px-4 rounded-md bg-white shadow w-full">
              <MdPersonAddAlt1 className="text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Your e-mail or account number"
                value={email}
                name="email"
                onChange={({ target }) => setEmail(target.value)}
                className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
              />
            </div>
            <AltButton btn_text={'Reset Password'} />
            <div className="flex items-center justify-center">
              <Link to={'/get-started'}>
                <p className="text-end font-thin text-sm text-gray-500 px-4 text-pri">
                  Sign Up
                </p>
              </Link>
              <Link to={'/login'}>
                <p className="text-end font-thin text-sm text-gray-500 px-4 text-pri border-l">
                  Log In
                </p>
              </Link>
            </div>
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
