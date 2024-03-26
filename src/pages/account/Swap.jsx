import { MdOutlineCurrencyExchange } from 'react-icons/md';
import Button from './components/ui/Button';
import useCurrency from '../../hooks/useCurrency';
import { useState } from 'react';
import Modal from '../../components/common/Modal';
import { BsInfoCircle } from 'react-icons/bs';
import { useGlobalStore } from '../../store/Context';

function Swap() {
  const [currencyInfo, setCurrencyInfo] = useState({
    from: 'USD',
    to: 'EUR',
  });
  const [currencyInput, setCurrencyInput] = useState(1);
  const { currencyWithFlag, rates } = useCurrency(currencyInfo.from);
  const [swapConfirmModal, setSwapConfirmModal] = useState(false);
  const [swapConfirmModal2, setSwapConfirmModal2] = useState(false);
  const { setLoader } = useGlobalStore();

  const handleCurrencyInputChange = (event) => {
    setCurrencyInput(event.target.value);
  };

  const handleCurrencyChange = ({ target }) => {
    setCurrencyInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const convertCurrency = () => {
    return (currencyInput * rates?.rates[currencyInfo?.to]).toFixed(2);
  };

  return (
    <div className="flex flex-col gap-6 py-8">
      <h2 className="text-pri text-[12px] mb-4">
        Exchange your local currency for foreign currency
      </h2>
      <hr />
      <div className="convert_currency flex flex-col">
        <div className="convert_from bg-white py-7 px-3 rounded-xl shadow space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-[12px]">From</span>
            <span className="text-gray-500 text-[12px]">Balance: EUR 0.00</span>
          </div>
          <div className="flex justify-between items-center space-y-3 space-x-5">
            <input
              type="text"
              defaultValue={'1522.00'}
              onChange={handleCurrencyInputChange}
              className="bg-transparent outline-none focus:border-b focus:border-b focus:border-pri w-full py-2 font-bold text-2xl"
            />
            <select
              name="from"
              id=""
              className="font-bold outline-none border-none text-xl"
            >
              <option value="EUR" className="">
                {currencyInfo.from}
              </option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-center relative">
          <div className="h-12 w-[1px] bg-gray-300"></div>
          <div className="bg-gray-300 w-8 h-8 rounded-full absolute text-white text-sm flex items-center justify-center">
            <MdOutlineCurrencyExchange />
          </div>
        </div>
        <div className="convert_to bg-white py-7 px-3 rounded-xl shadow space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-[12px]">To</span>
          </div>
          <div className="flex justify-between items-center space-y-3 space-x-5">
            <input
              type="text"
              value={convertCurrency()}
              className="bg-transparent outline-none focus:border-b focus:border-b focus:border-pri w-full py-2 font-bold text-2xl"
            />
            <select
              name="to"
              id=""
              value={currencyInfo.to}
              className="font-bold outline-none border-none text-xl"
              onChange={handleCurrencyChange}
            >
              {currencyWithFlag?.map((e) => (
                <option key={e.currCode} value={e.currCode} className="">
                  {e.currCode}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h4 className="commision_rate ms-auto text-[11px] text-gray-400 mt-5">
          Commission rate: <span>30%</span>
        </h4>
      </div>
      <Button
        textContent={'Continue'}
        styles={'bg-pri py-4 text-white'}
        callback={() => setSwapConfirmModal(true)}
      />
      <Modal
        isOpen={swapConfirmModal}
        onClose={() => setSwapConfirmModal(false)}
      >
        <div className="flex flex-col justify-center items-center">
          <BsInfoCircle />
          <p className="my-4">Swap Currency</p>
          <p className="text-sm text-center">
            30% of your requested swap amount will be deducted from your fee
            balance to finalize the currency exchange. Click 'Okay' to continue
          </p>
          <div className="border-t w-full mt-4 text-center py-2 grid grid-cols-2 items-center  space-x-8">
            <p
              className="text-pri border-r"
              onClick={() => setSwapConfirmModal(false)}
            >
              Cancel
            </p>
            <p
              className="text-pri cursor-pointer"
              onClick={() => {
                setSwapConfirmModal(false);
                setLoader(true);
                setTimeout(() => {
                  setLoader(false);
                  setSwapConfirmModal2(true);
                }, 3000);
              }}
            >
              Okay
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={swapConfirmModal2}
        onClose={() => setSwapConfirmModal2(false)}
      >
        <div className="flex flex-col justify-center items-center">
          <BsInfoCircle />
          <p className="my-4">Swap Request</p>
          <p className="text-sm text-center">
            The minimum amount you can swap is EUR 9,522.00
          </p>
          <div className="border-t w-full mt-4 text-center py-2 text-center items-center  space-x-8">
            <p
              className="text-pri cursor-pointer"
              onClick={() => setSwapConfirmModal2(false)}
            >
              Okay
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Swap;
