import { BsInfoCircle, BsKeyFill } from 'react-icons/bs';
import useCurrency from '../../hooks/useCurrency';
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';
import { useState } from 'react';
import Button from './components/ui/Button';
import { useGlobalStore } from '../../store/Context';
import Modal from '../../components/common/Modal';

function Transfer() {
  const { currencyWithFlag } = useCurrency();
  const { setLoader, setPage, switchKey } = useGlobalStore();
  const [showPassword, setShowPassword] = useState(false);
  const [transferConfirmModal, setTransferConfirmModal] = useState(false);

  const handleTransferFund = (e) => {
    e.preventDefault();
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setTransferConfirmModal(true);
    }, 2000);
  };

  const handlePage = () => {
    setTransferConfirmModal(false);
    setLoader(true);
    setPage('card');
  };

  return (
    <div className="max-w-2xl mx-auto my-8">
      <div className="">
        <div className="bg-white p-4 rounded-xl text-sm border-b pb-4 mb-4 text-gray-500">
          <p className="border-b border-pri py-2">
            Do not perform transactions on public Wifi as they may be unsecure.
          </p>
          <p className="py-2">
            Transactions may not be processed if any information provided is
            incorrect.
          </p>
        </div>
        {switchKey === 1 ? null : (
          <p className="text-sm text-neutral mb-4">
            We will send the equivalent amount of crypto to the address provided
          </p>
        )}
        {switchKey === 1 ? (
          <div className="grid gap-4">
            <label className="">
              <span className="text-gray-700">From</span>
              <select
                name="from"
                id="from"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none bg-white p-4 rounded-xl"
              >
                <option value="011987874260-Balance(EUR 0.00)">
                  011987874260 - Balance (EUR 0.00)
                </option>
              </select>
            </label>

            {[
              'Cash Amount',
              'Destination Bank Name',
              'Destination Bank Branch',
              'Destination Bank Swift/Iban/Branch Code',
              'Destination Account Number',
              'Destination Account Name',
            ].map((field) => (
              <div key={field} className="block">
                <label
                  htmlFor={field.replaceAll(/\s+/g, '_').toLowerCase()}
                  className="text-gray-500 text-sm"
                >
                  {field}
                </label>

                <div className="bg-white px-2 rounded-xl shadow">
                  <input
                    type="text"
                    id={field.replaceAll(/\s+/g, '_').toLowerCase()}
                    className="mt-1 w-full py-2 shadow-sm outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
                  />
                </div>
              </div>
            ))}

            <label className="block">
              <span className="text-gray-500">
                Destination Country/Currency
              </span>
              <select
                name="accountype"
                id="destination_country_currency"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  focus:outline-none bg-white p-2 rounded-xl"
              >
                {currencyWithFlag?.map((curr, index) => (
                  <option key={index} value={curr.currCode}>
                    {curr.currCode}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-gray-500 text-sm">
                Transaction note/remark
              </span>
              <textarea
                name="remark"
                id="remark"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 placeholder:text-sm"
                placeholder="Let us know more about you"
              ></textarea>
            </label>
            <label htmlFor="">
              <span className="text-gray-500 text-sm">
                You ZenithPayu credit card pin
              </span>
              <div
                className={`flex items-center px-4 rounded-xl bg-white shadow w-full`}
              >
                <BsKeyFill className="text-gray-500 text-lg" />
                <div className="flex justify-between items-center w-full">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Your password"
                    value=""
                    required
                    name="password"
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
            </label>
            <Button
              textContent={'Transfer Funds'}
              callback={handleTransferFund}
              styles={'bg-pri py-2 w-full rounded-lg text-white mt-4'}
            />
          </div>
        ) : (
          <div className="">
            <form action="" onSubmit={handleTransferFund}>
              <label htmlFor="" className="text-sm text-neutral">
                Crypto Coin
                <select
                  name=""
                  id=""
                  required
                  className="block w-full p-2 rounded-md shadow mb-3"
                >
                  <option value="eth">ETH</option>
                  <option value="btc">BTC</option>
                </select>
              </label>
              <label htmlFor="" className="text-sm text-neutral">
                Destination wallet address
                <input
                  type="text"
                  required
                  className="block w-full p-2 rounded-md shadow"
                />
              </label>
              <div className="flex justify-center items-center my-8">
                <button
                  type="submit"
                  className="px-8 py-2 rounded-md bg-pri text-sm text-white"
                >
                  Transfer Crypto
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <Modal
        isOpen={transferConfirmModal}
        onClose={() => setTransferConfirmModal(false)}
      >
        <div className="flex flex-col justify-center items-center">
          <BsInfoCircle />
          <p className="my-4">Transfer Request</p>
          <p className="text-sm text-center">
            Please unlock your card to be able to transfer
          </p>
          <div className="border-t w-full mt-4 text-center py-2 text-center items-center  space-x-8">
            <p className="text-pri cursor-pointer" onClick={handlePage}>
              Okay
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Transfer;
