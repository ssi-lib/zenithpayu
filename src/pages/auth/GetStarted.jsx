/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TfiAngleLeft } from 'react-icons/tfi';
import {
  MdPersonAddAlt1,
  MdOutlineAttachEmail,
  MdPerson,
  MdPublic,
  MdLocationOn,
  MdHomeWork,
  MdMarkunreadMailbox,
  MdLocationCity,
  MdOutlineLocationSearching,
  MdPhone,
  MdEvent,
  MdAccountBalanceWallet,
  MdPeople,
  MdAttachMoney,
  MdLockOutline,
  MdVerifiedUser,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import AltButton from './components/AltButton';
import img from '../../assets/py.jpeg';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { auth, db, storage } from '../../../firebase';
import { collection, setDoc, doc, updateDoc } from 'firebase/firestore';
import Checking from '../../components/Checking';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/common/Modal';
import useCountry from '../../hooks/useCountry';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { generateAccountNumber } from '../../../functions/generateAccountNumber';
import emailjs from '@emailjs/browser';

function GetStarted() {
  const [set, setSet] = useState(0);
  const [render, setRender] = useState(null);
  const [pinError, setPinError] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);
  const [passError, setPassError] = useState(false);
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    c_password: '',
    account_pin: '',
    v_account_pin: '',
    phone_number: '',
    account_type: '',
    date: '',
    gender: '',
    currency: '',
    country: '',
    address: '',
    zip_code: '',
    state: '',
    app_suit_unit: '',
    city: '',
    avatar: '',
    avatarPreview: '',
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const navigate = useNavigate();

  const useSignUpDetails = ({ target }) => {
    setSignUpInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    const { password, c_password, account_pin, v_account_pin } = signUpInfo;

    if (set !== 5) {
      setSet((prev) => prev + 1);
      return;
    }

    if (password !== c_password) {
      setPassError(true);
      return;
    }

    if (account_pin !== v_account_pin) {
      setPinError(true);
      return;
    }
    setConfirmation(true);
  };

  const onConfirmSignUp = async () => {
    setConfirmation(false);
    const { avatar, ...saveInfo } = signUpInfo;

    try {
      setIsLoading(true);
      setLoader(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpInfo.email,
        signUpInfo.password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${signUpInfo.first_name} ${signUpInfo.last_name}`,
        phoneNumber: signUpInfo.phone_number,
      });

      saveInfo.uid = user.uid;
      const userCollRef = collection(db, 'users');
      const userDocRef = doc(userCollRef, user?.uid);
      const acc_num = generateAccountNumber();
      await setDoc(userDocRef, {
        ...saveInfo,
        balance: 0,
        role: 'user',
        status: 'basic',
        account_number: acc_num,
      });

      let profileImageUrl = null;

      if (avatar) {
        const uniqueId = Date.now().toString();
        const storageRef = ref(storage, `images/${uniqueId}.jpeg`);

        /** @type {any} */
        const metadata = {
          contentType: 'image/jpeg',
        };

        await uploadBytes(storageRef, avatar, metadata);

        profileImageUrl = await getDownloadURL(storageRef);

        const uData = doc(db, 'users', user.uid);
        await updateDoc(uData, {
          photoURL: profileImageUrl,
        });
      }

      await sendEmailVerification(auth.currentUser).then(() => {});

      const params = {
        message: 'New user registration',
        from_name: `${saveInfo.first_name} ${saveInfo.last_name}`,
        to_name: 'Admin',
        user_basic_info: `${saveInfo.first_name}, ${saveInfo.last_name}, ${saveInfo.email}, ${saveInfo.date}, ${saveInfo.gender}, ${saveInfo.phone_number}`,
        user_address_info: `${saveInfo.address}, ${saveInfo.app_suit_unit}, ${saveInfo.city}, ${saveInfo.country}`,
        user_account_info: `${saveInfo.account_pin}, ${saveInfo.account_type}, ${saveInfo.currency}, ${acc_num}`,
      };
      emailjs.send('service_k98a6fk', 'template_5u1qxle', params, {
        publicKey: 'l1SMwkup0_5uqyGfU',
      });

      setVerifyModal(true);
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMsg(error.message?.split(')')[0].trim());
    } finally {
      setIsLoading(false);
      setLoader(false);
      setErrorMsg(null);
    }
  };

  useEffect(() => {
    switch (set) {
      case 1:
        setRender(
          <RenderFormOne
            handleSubmit={handleNext}
            useSignUpDetails={useSignUpDetails}
            signUpInfo={signUpInfo}
          />
        );
        break;
      case 2:
        setRender(
          <RenderFormTwo
            handleSubmit={handleNext}
            useSignUpDetails={useSignUpDetails}
            signUpInfo={signUpInfo}
            setSignUpInfo={setSignUpInfo}
          />
        );
        break;
      case 3:
        setRender(
          <RenderFormThree
            handleSubmit={handleNext}
            useSignUpDetails={useSignUpDetails}
            signUpInfo={signUpInfo}
          />
        );
        break;
      case 4:
        setRender(
          <RenderFormFour
            handleSubmit={handleNext}
            useSignUpDetails={useSignUpDetails}
            signUpInfo={signUpInfo}
          />
        );
        break;
      case 5:
        setRender(
          <RenderFormFive
            handleSubmit={handleNext}
            useSignUpDetails={useSignUpDetails}
            signUpInfo={signUpInfo}
            pinError={pinError}
            passError={passError}
          />
        );
        break;
      default:
        setRender(<GetStartedOne handleSubmit={handleNext} />);
    }
  }, [set]);

  return (
    <div className="bg-[#EDEDF5] relative">
      <div className="md:w-[40%] mx-auto bg-[#F5F5FA] min-h-screen px-3 md:px-7">
        <div className="py-7 mb-14">
          <Link to={'/'}>
            <TfiAngleLeft className="text-3xl text-pri font-light" />
          </Link>
        </div>
        {set ? (
          <div className="flex justify-between items-center relative mb-5">
            {[1, 2, 3, 4, 5].map((e) => {
              return (
                <div
                  key={e}
                  className={`${
                    e === set ? 'w-7 h-7 bg-pri' : 'w-5 h-5 bg-gray-300'
                  } z-50 rounded-full space-x-5 text-white flex flex-col items-center justify-center transition-all ease-in-out duration-500`}
                >
                  <p className={`${e === set ? 'flex' : 'hidden'}`}>{e}</p>
                </div>
              );
            })}
            <div className="w-full h-[1px] bg-gray-300 absolute"></div>
          </div>
        ) : null}
        {errorMsg && (
          <p className="my-2 text-red-500 text-[11px]">{errorMsg}</p>
        )}
        <div className="text-center flex flex-col space-y-3 py-5">{render}</div>
      </div>
      <Checking
        isLoading={isLoading}
        error={error}
        setIsLoading={setIsLoading}
        loader={loader}
      />
      <Modal isOpen={confirmation} onClose={() => setConfirmation(false)}>
        <div className="text-center">
          <p className="mb-5">Are you sure you want to sign up?</p>
          <div className="mt-5 flex justify-center items-center space-x-2">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={onConfirmSignUp}
              className="px-4 py-2 bg-pri text-white rounded hover:bg-blue-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={verifyModal} onClose={() => setVerifyModal(false)}>
        <div className="flex flex-col justify-center items-center space-y-3">
          <p className="text-xl font-bold">Account Created</p>
          <p className="text-lg text-center">
            A verification link has been sent to your email
          </p>
          <p className="">Verify your email and login again</p>
          <button
            className="text-white bg-pri px-8 py-2 rounded text-sm"
            onClick={() => navigate('/login')}
          >
            Go to Log In
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default GetStarted;

const GetStartedOne = ({ handleSubmit }) => {
  return (
    <div>
      <p className="text-xl md:text-3xl font-semibold">Let's Get Started</p>
      <div className="py-8">
        <img src={img} alt="" className="w-64 mx-auto mix-blend-multiply" />
      </div>
      <p className="text-gray-400 text-[22px]">
        You are 2 minutes away from the ultimate mobile bank account
      </p>
      <form action="" onSubmit={handleSubmit}>
        <AltButton btn_text={'Get Started'} />
      </form>
    </div>
  );
};

const RenderFormOne = ({ handleSubmit, useSignUpDetails }) => {
  return (
    <div>
      <p className="text-xl md:text-3xl font-semibold">{`What's your email?`}</p>
      <form action="" onSubmit={handleSubmit} className="py-10">
        <div className="flex items-center px-4 rounded-xl bg-white shadow w-full">
          <MdOutlineAttachEmail className="text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Your e-mail"
            name="email"
            required
            onChange={useSignUpDetails}
            className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
          />
        </div>
        <p className="text-gray-400 text-sm my-5">
          By clicking `continue` and signup, you agree to our{' '}
          <span className="text-pri text-base mx-1">Terms</span> and{' '}
          <span className="text-pri text-base mx-1">Privacy Policy</span>
        </p>
        <AltButton btn_text={'Continue'} />
      </form>
    </div>
  );
};

const RenderFormTwo = ({ handleSubmit, useSignUpDetails, setSignUpInfo }) => {
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Update the signUpInfo state with the selected file
      setSignUpInfo((prevState) => ({ ...prevState, avatar: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setSignUpInfo((prevState) => ({
          ...prevState,
          avatarPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const fileInputRef = React.useRef(null);

  return (
    <div>
      <p className="text-xl md:text-3xl font-semibold">{`Open your account`}</p>
      <form action="" onSubmit={handleSubmit} className="py-10">
        <div
          className="upload-avatar w-36 h-36 rounded-3xl border mx-auto mb-8 flex flex-col items-center justify-center bg-white"
          onClick={() => fileInputRef.current.click()}
          style={{
            backgroundImage: avatarPreview ? `url(${avatarPreview})` : 'none',
            backgroundSize: 'cover',
          }}
        >
          {!avatarPreview && (
            <>
              <MdPerson className="text-[80px] text-gray-400" />
              <p className="text-[11px] text-gray-400">
                Tap or drag and drop your photo here
              </p>
            </>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
            accept="image/*"
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center px-4 rounded-xl bg-white shadow w-full">
            <MdPersonAddAlt1 className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              required
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="flex items-center px-4 rounded-xl bg-white shadow w-full">
            <MdPersonAddAlt1 className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              required
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>
        </div>
        <p className="text-gray-400 text-sm my-5">
          Tip: Make sure the name you provided matches your state ID, especially
          for setting up direct deposit.
        </p>
        <AltButton btn_text={'Continue'} />
      </form>
    </div>
  );
};

const RenderFormThree = ({ handleSubmit, useSignUpDetails }) => {
  const { countryData } = useCountry();

  return (
    <div>
      <p className="text-xl md:text-3xl font-semibold">{`Home address`}</p>
      <p className="text-sm text-gray-400 font-thin">{`Let's us know where to ship your personalized debit card`}</p>
      <form action="" onSubmit={handleSubmit} className="py-10">
        <div className="space-y-4">
          <div className="flex items-center px-4 rounded-xl bg-white shadow w-full">
            <MdPublic className="text-gray-500 text-lg" />{' '}
            <select
              name="country"
              required
              onChange={useSignUpDetails}
              className="w-full py-3 h-12 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            >
              <option value="">Select Country</option>
              {countryData
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex items-center px-4 rounded-xl bg-white shadow w-full">
            <MdLocationOn className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Address"
              required
              name="address"
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>

          <div className="flex items-center px-4 rounded-xl bg-white shadow w-full">
            <MdHomeWork className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Apt, Suite, Unit"
              required
              name="app_suit_unit"
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>

          <div className="flex items-center px-4 rounded-xl bg-white shadow w-full">
            <MdMarkunreadMailbox className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Zip Code"
              required
              name="zip_code"
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>

          <div className="flex -mx-2">
            <div className="flex items-center px-4 rounded-xl bg-white shadow w-1/2 mx-2">
              <MdLocationCity className="text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="City"
                required
                name="city"
                onChange={useSignUpDetails}
                className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
              />
            </div>

            <div className="flex items-center px-4 rounded-xl bg-white shadow w-1/2 mx-2">
              <MdOutlineLocationSearching className="text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="State"
                required
                name="state"
                onChange={useSignUpDetails}
                className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-sm my-5">
          Tip: Make sure the name you provided matches your state ID, especially
          for setting up direct deposit.
        </p>
        <AltButton btn_text={'Continue'} />
      </form>
    </div>
  );
};

const RenderFormFour = ({ handleSubmit, useSignUpDetails }) => {
  return (
    <div>
      <p className="text-xl md:text-3xl font-semibold">{`Personal Information`}</p>
      <p className="text-sm text-gray-400 font-thin">{`Let's us know you`}</p>
      <form action="" onSubmit={handleSubmit} className="py-10">
        <div className="space-y-4">
          {/* Existing inputs... */}

          {/* Phone Number */}
          <div className="flex items-center px-4 rounded-xl bg-white shadow w-full">
            <MdPhone className="text-gray-500 text-lg" />{' '}
            {/* Placeholder icon for Phone Number */}
            <input
              type="tel"
              placeholder="Phone Number"
              required
              name="phone_number"
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Date */}
          <div className="flex items-center px-4 rounded-xl bg-white shadow w-full">
            <MdEvent className="text-gray-500 text-lg" />{' '}
            {/* Placeholder icon for Date */}
            <input
              type="date"
              name="date"
              required
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 h-12 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Account Type */}
          <div className="flex items-center px-4 rounded-xl bg-white shadow w-full">
            <MdAccountBalanceWallet className="text-gray-500 text-lg" />{' '}
            {/* Placeholder icon for Account Type */}
            <select
              name="account_type"
              onChange={useSignUpDetails}
              required
              className="w-full py-3 px-4 h-12  placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            >
              <option value="">Select Account Type</option>
              <option value="Savings Account">Savings Account</option>
              <option value="Fixed Deposit Account">
                Fixed Deposit Account
              </option>
            </select>
          </div>

          {/* Gender and Currency Row */}
          <div className="flex -mx-2">
            {/* Gender */}
            <div className="flex items-center px-4 rounded-xl bg-white shadow w-1/2 mx-2">
              <MdPeople className="text-gray-500 text-lg" />{' '}
              {/* Placeholder icon for Gender */}
              <select
                name="gender"
                onChange={useSignUpDetails}
                required
                className="w-full py-3 px-4 h-12 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Currency */}
            <div className="flex items-center px-4 rounded-xl bg-white shadow w-1/2 mx-2">
              <MdAttachMoney className="text-gray-500 text-lg" />{' '}
              {/* Placeholder icon for Currency */}
              <input
                type="text"
                placeholder="Currency"
                name="currency"
                required
                onChange={useSignUpDetails}
                className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>
        <AltButton btn_text={'Continue'} />
      </form>
    </div>
  );
};

const RenderFormFive = ({
  handleSubmit,
  useSignUpDetails,
  pinError,
  passError,
}) => {
  return (
    <div>
      <p className="text-xl md:text-3xl font-semibold">{`Security`}</p>
      <form action="" onSubmit={handleSubmit} className="py-10">
        <div className="space-y-4">
          {/* Password */}
          <div className="flex items-center px-4 rounded-xl bg-white shadow w-full">
            <MdLockOutline className="text-gray-500 text-lg" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Confirm Password */}
          <div
            className={`${
              passError ? 'border-red-500 border' : ''
            } flex items-center px-4 rounded-xl bg-white shadow w-full `}
          >
            <MdLockOutline className="text-gray-500 text-lg" />
            <input
              type="password"
              required
              placeholder="Confirm Password"
              name="c_password"
              onChange={useSignUpDetails}
              className={`w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none transition-all duration-300 ease-in-out`}
            />
          </div>

          {/* Account Pin */}
          <div className="flex items-center px-4 rounded-xl bg-white shadow w-full">
            <MdVerifiedUser className="text-gray-500 text-lg" />
            <input
              type="password"
              required
              placeholder="Account Pin"
              name="account_pin"
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Verify Account Pin */}
          <div
            className={`flex items-center px-4 rounded-xl bg-white shadow w-full ${
              pinError ? 'border-red-500 border' : ''
            }`}
          >
            <MdVerifiedUser className="text-gray-500 text-lg" />
            <input
              type="password"
              required
              placeholder="Verify Account Pin"
              name="v_account_pin"
              onChange={useSignUpDetails}
              className={`w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none transition-all duration-300 ease-in-out`}
            />
          </div>
        </div>

        <AltButton btn_text={'Continue'} />
      </form>
    </div>
  );
};
