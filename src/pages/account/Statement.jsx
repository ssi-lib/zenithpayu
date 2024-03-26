import { MdEvent } from 'react-icons/md';
import Button from './components/ui/Button';
import { useState } from 'react';
import { useGlobalStore } from '../../store/Context';
import { BsInfoCircle } from 'react-icons/bs';
import Modal from '../../components/common/Modal';

function Statement() {
  const [requestModal, setRequestModal] = useState(false);
  const { setLoader } = useGlobalStore();

  const handleRequestModal = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setRequestModal(true);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 my-5">
      <div className="text-center border-b pb-4">
        <p className="font-bold">
          Please select the specific dates of the statment
        </p>
        <p className="text-[12px] text-gray-400 mt-3">
          Your account statement contains records of all transactions that
          occurred in your account. The account statement will be sent to your
          email address upon request
        </p>
      </div>
      <div className="space-y-5 py-8">
        <div className="flex items-center px-4 rounded-xl bg-[#F4F5FA] shadow w-full">
          <MdEvent className="text-gray-500 text-lg" />{' '}
          <input
            type="date"
            name="date"
            required
            className="w-full py-3 px-4 h-12 placeholder:font-thin bg-transparent placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="flex items-center px-4 rounded-xl bg-[#F4F5FA] shadow w-full">
          <MdEvent className="text-gray-500 text-lg" />{' '}
          <input
            type="date"
            name="date"
            required
            className="w-full py-3 px-4 h-12 placeholder:font-thin bg-transparent placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
          />
        </div>
      </div>
      <div className="mx-auto w-80">
        <Button
          textContent={'Request for account statemnet'}
          styles={'bg-pri py-2 text-white'}
          callback={handleRequestModal}
        />
      </div>
      <Modal isOpen={requestModal} onClose={() => setRequestModal(false)}>
        <div className="flex flex-col justify-center items-center">
          <BsInfoCircle />
          <p className="text-sm text-center mt-5">
            There was an issue requesting your account statement. Please contact
            our support team
          </p>
          <div className="border-t w-full mt-4 text-center py-2 text-center items-center  space-x-8">
            <p
              className="text-pri cursor-pointer"
              onClick={() => setRequestModal(false)}
            >
              Okay
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Statement;
