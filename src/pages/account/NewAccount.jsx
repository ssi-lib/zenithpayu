import React, { useState } from 'react';
import useCountry from '../../hooks/useCountry';
import useCurrency from '../../hooks/useCurrency';
import { BsInfoCircle, BsPlus } from 'react-icons/bs';
import Modal from '../../components/common/Modal';
import { useGlobalStore } from '../../store/Context';

function NewAccount() {
  const { currencyWithFlag } = useCurrency();
  const [accountConfirm, setAccountConfirm] = useState(false);
  const [accountConfirm2, setAccountConfirm2] = useState(false);
  const { setLoader } = useGlobalStore();

  return (
    <div>
      <p className="text-pri text-sm my-10">
        Create a new account number for your preferred currency. The account
        number may take up to 6-24 hours to activate
      </p>
      <div className="bg-white shadow p-4 rounded-xl">
        <p className="text-sm my-4">Select currency</p>
        <select
          name=""
          id=""
          className="w-full border-0 text-2xl font-bold focus:outline-0"
        >
          {currencyWithFlag?.map((curr, id) => {
            return (
              <option key={id} value={curr.currCode}>
                {curr.currCode}
              </option>
            );
          })}
        </select>
        <div
          className="flex items-center justify-center space-x-2 text-white w-full bg-pri py-[6px] rounded-lg text-sm my-8 hover:bg-[#4E1CFF] cursor-pointer"
          onClick={() => setAccountConfirm(true)}
        >
          <BsPlus />
          <p>Create a new account number</p>
        </div>
      </div>
      <Modal isOpen={accountConfirm} onClose={() => setAccountConfirm(false)}>
        <div className="flex flex-col justify-center items-center">
          <BsInfoCircle />
          <p className="my-4">New account number</p>
          <p className="text-sm text-center">
            € 952 will be deducted from your fee balance in order to process and
            complete the creation of your new account number
          </p>
          <div className="border-t w-full mt-4 text-center py-2 grid grid-cols-2 items-center  space-x-8">
            <p
              className="text-pri border-r"
              onClick={() => setAccountConfirm(false)}
            >
              Cancel
            </p>
            <p
              className="text-pri cursor-pointer"
              onClick={() => {
                setAccountConfirm(false);
                setLoader(true);
                setTimeout(() => {
                  setLoader(false);
                  setAccountConfirm2(true);
                }, 3000);
              }}
            >
              Okay
            </p>
          </div>
        </div>
      </Modal>
      <Modal isOpen={accountConfirm2} onClose={() => setAccountConfirm2(false)}>
        <div className="flex flex-col justify-center items-center">
          <BsInfoCircle />
          <p className="text-sm text-center">
            Insufficient balance. Please deposit $1,000 into your fee balance to
            complete your account number creation
          </p>
          <div className="border-t w-full mt-4 text-center py-2 text-center items-center  space-x-8">
            <p
              className="text-pri cursor-pointer"
              onClick={() => setAccountConfirm2(false)}
            >
              Okay
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default NewAccount;
