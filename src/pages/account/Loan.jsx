import { FaDollarSign } from 'react-icons/fa';
import Button from './components/ui/Button';
import { useState } from 'react';
import { loanMonths } from '../../../functions/loanMonths';
import { calculateLoanDetails } from '../../../functions/calculateLoanDetails';
import Modal from '../../components/common/Modal';
import { BsInfoCircle } from 'react-icons/bs';
import { useGlobalStore } from '../../store/Context';

function Loan() {
  const [range, setRange] = useState(10);
  const [inputValue, setInputValue] = useState('');
  const [loanDetails, setLoanDetails] = useState(null);
  const [loanConfirmModal, setLoanConfirmModal] = useState(false);
  const [loanConfirmModal2, setLoanConfirmModal2] = useState(false);
  const { setLoader } = useGlobalStore();

  const handleCalculate = () => {
    setLoanDetails(calculateLoanDetails(inputValue, loanMonths(range)));
  };

  const handleRequestLoanConfirm = () => {
    setLoanConfirmModal(true);
  };

  return (
    <div className="py-8">
      <p className="text-sm text-pri">
        We offer competitive rates and flexible repayment options to help you
        achieve your financial goals.
      </p>
      <p className="text-sm text-pri mt-2">
        Apply now and take control of your finances.
      </p>

      <div className="get_loan bg-white shadow p-4 rounded-xl my-8">
        <div className="w-[50%] mx-auto  min-w-[150px]">
          <h3 className="text-gray-400">How much do you want?</h3>
          <div className="flex items-center space-x-3  border px-3 h-12 rounded-xl">
            <FaDollarSign />
            <input
              type="number"
              name=""
              id=""
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter amount"
              required
              className="bg-transparent w-full focus:outline-0 focus:border-b-2 focus:border-pri h-full"
            />
          </div>
          <p className="mt-8 text-gray-400">{loanMonths(range)} months</p>
          <input
            type="range"
            name=""
            id=""
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="w-full my-4"
          />

          <Button
            textContent={'Calculate'}
            styles={'border-2 text-neutral rounded-lg border-gray-600'}
            callback={handleCalculate}
          />
          {loanDetails && (
            <div className="mt-8">
              <p className="font-bold">
                Monthly payment: {loanDetails.monthlyPayment}
              </p>
              <p className="text-gray-400">
                Total payment: {loanDetails.totalPayment}
              </p>
              <p className="text-gray-400">Interest rate: 3%</p>
              <Button
                textContent={'Request for your loan'}
                styles={'text-neutral rounded-lg py-4 my-4 bg-pri text-white'}
                callback={handleRequestLoanConfirm}
              />
            </div>
          )}
        </div>
      </div>

      <div className="loan_history">
        <h3 className="font-bold">Loan history</h3>
        <div className="px-4 py-8 shadow mt-3 bg-white rounded-xl">
          <p className="text-gray-400">
            You have not requested a loan. Once you request a loan, your loan
            request will appear here.
          </p>
        </div>
      </div>
      <Modal
        isOpen={loanConfirmModal}
        onClose={() => setLoanConfirmModal(false)}
      >
        <div className="flex flex-col justify-center items-center">
          <BsInfoCircle />
          <p className="my-4">Loan Request</p>
          <p className="text-sm text-center">
            5% of your requested loan amount will be deducted from your fee
            balance to complete and process your loan request. Click 'Okay to
            continue
          </p>
          <div className="border-t w-full mt-4 text-center py-2 grid grid-cols-2 items-center  space-x-8">
            <p
              className="text-pri border-r"
              onClick={() => setLoanConfirmModal(false)}
            >
              Cancel
            </p>
            <p
              className="text-pri cursor-pointer"
              onClick={() => {
                setLoanConfirmModal(false);
                setLoader(true);
                setTimeout(() => {
                  setLoader(false);
                  setLoanConfirmModal2(true);
                }, 3000);
              }}
            >
              Okay
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={loanConfirmModal2}
        onClose={() => setLoanConfirmModal2(false)}
      >
        <div className="flex flex-col justify-center items-center">
          <BsInfoCircle />
          <p className="my-4">Loan Request</p>
          <p className="text-sm text-center">
            Activate your card to get a loan
          </p>
          <div className="border-t w-full mt-4 text-center py-2 text-center items-center  space-x-8">
            <p
              className="text-pri cursor-pointer"
              onClick={() => setLoanConfirmModal2(false)}
            >
              Okay
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Loan;
