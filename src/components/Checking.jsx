import { BsInfoCircle } from 'react-icons/bs';
import Loader from './Loader';

function Checking({ isLoading, loader, error, setIsLoading }) {
  return (
    <div>
      {isLoading && (
        <div className="absolute w-full top-0 bottom-0 flex items-center justify-center  transition-all ease-in-out duration-500">
          <div className="bg-black opacity-70 absolute w-full h-screen transition-all ease-in-out duration-500"></div>
          {loader ? (
            <Loader />
          ) : error ? (
            <div
              className={`${
                loader ? 'scale-0' : 'scale-125'
              } bg-white rounded-xl shadow-md text-center z-50 transition-all ease-in-out duration-500`}
            >
              <div className="p-5 font-thin text-sm flex flex-col items-center space-y-3">
                <BsInfoCircle />
                <p>All input fields are required</p>
              </div>
              <div className="text-center border-t py-2 text-blue-500 font-light">
                <p
                  className="cursor-pointer"
                  onClick={() => setIsLoading(false)}
                >
                  Okay
                </p>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default Checking;
