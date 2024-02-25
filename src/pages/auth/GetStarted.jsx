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
// import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';
// import { BsKeyFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import AltButton from './components/AltButton';
import img from '../../assets/py.jpeg';

function GetStarted() {
  const [set, setSet] = useState(0);
  const [render, setRender] = useState(null);
  const [pinError, setPinError] = useState(false);
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
  });

  const useSignUpDetails = ({ target }) => {
    setSignUpInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (set !== 5) {
      setSet((prev) => prev + 1);
    } else {
      if (signUpInfo.password !== signUpInfo.c_password) {
        setPassError(true);

        return;
      }
      if (signUpInfo.account_pin !== signUpInfo.v_account_pin) {
        setPinError(true);
        return;
      }
      console.log(signUpInfo);
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
      <div className="md:w-[40%] mx-auto bg-[#F5F5FA] h-screen px-3 md:px-7">
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
        <div className="text-center flex flex-col space-y-3 py-5">{render}</div>
      </div>
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

const RenderFormOne = ({ handleSubmit, useSignUpDetails, signUpInfo }) => {
  return (
    <div>
      <p className="text-xl md:text-3xl font-semibold">{`What's your email?`}</p>
      <form action="" onSubmit={handleSubmit} className="py-10">
        <div className="flex items-center px-4 rounded-md bg-white shadow w-full">
          <MdOutlineAttachEmail className="text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Your e-mail"
            value={signUpInfo.email}
            name="email"
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

const RenderFormTwo = ({ handleSubmit, useSignUpDetails, signUpInfo }) => {
  return (
    <div>
      <p className="text-xl md:text-3xl font-semibold">{`Open your account`}</p>
      <form action="" onSubmit={handleSubmit} className="py-10">
        <div className="w-36 h-36 rounded-3xl border mx-auto mb-8 flex flex-col items-center justify-center bg-white">
          <MdPerson className="text-[80px] text-gray-400" />
          <p className="text-[11px] text-gray-400">
            Tap or drag and drop your photo here
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center px-4 rounded-md bg-white shadow w-full">
            <MdPersonAddAlt1 className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="flex items-center px-4 rounded-md bg-white shadow w-full">
            <MdPersonAddAlt1 className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
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
const RenderFormThree = ({ handleSubmit, useSignUpDetails, signUpInfo }) => {
  const countryNames = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo, Democratic Republic of the',
    'Congo, Republic of the',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea, North',
    'Korea, South',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine State',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
  ];

  return (
    <div>
      <p className="text-xl md:text-3xl font-semibold">{`Home address`}</p>
      <p className="text-sm text-gray-400 font-thin">{`Let's us know where to ship your personalized debit card`}</p>
      <form action="" onSubmit={handleSubmit} className="py-10">
        <div className="space-y-4">
          <div className="flex items-center px-4 rounded-md bg-white shadow w-full">
            <MdPublic className="text-gray-500 text-lg" />{' '}
            <select
              name="country"
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            >
              <option value="">Select Country</option>
              {countryNames.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center px-4 rounded-md bg-white shadow w-full">
            <MdLocationOn className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Address"
              name="address"
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>

          <div className="flex items-center px-4 rounded-md bg-white shadow w-full">
            <MdHomeWork className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Apt, Suite, Unit"
              name="app_suit_unit"
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>

          <div className="flex items-center px-4 rounded-md bg-white shadow w-full">
            <MdMarkunreadMailbox className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Zip Code"
              name="zip_code"
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>

          <div className="flex -mx-2">
            <div className="flex items-center px-4 rounded-md bg-white shadow w-1/2 mx-2">
              <MdLocationCity className="text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="City"
                name="city"
                onChange={useSignUpDetails}
                className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
              />
            </div>

            <div className="flex items-center px-4 rounded-md bg-white shadow w-1/2 mx-2">
              <MdOutlineLocationSearching className="text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="State"
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

const RenderFormFour = ({ handleSubmit, useSignUpDetails, signUpInfo }) => {
  return (
    <div>
      <p className="text-xl md:text-3xl font-semibold">{`Personal Information`}</p>
      <p className="text-sm text-gray-400 font-thin">{`Let's us know you`}</p>
      <form action="" onSubmit={handleSubmit} className="py-10">
        <div className="space-y-4">
          {/* Existing inputs... */}

          {/* Phone Number */}
          <div className="flex items-center px-4 rounded-md bg-white shadow w-full">
            <MdPhone className="text-gray-500 text-lg" />{' '}
            {/* Placeholder icon for Phone Number */}
            <input
              type="tel"
              placeholder="Phone Number"
              name="phone_number"
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Date */}
          <div className="flex items-center px-4 rounded-md bg-white shadow w-full">
            <MdEvent className="text-gray-500 text-lg" />{' '}
            {/* Placeholder icon for Date */}
            <input
              type="date"
              name="date"
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Account Type */}
          <div className="flex items-center px-4 rounded-md bg-white shadow w-full">
            <MdAccountBalanceWallet className="text-gray-500 text-lg" />{' '}
            {/* Placeholder icon for Account Type */}
            <select
              name="account_type"
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
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
            <div className="flex items-center px-4 rounded-md bg-white shadow w-1/2 mx-2">
              <MdPeople className="text-gray-500 text-lg" />{' '}
              {/* Placeholder icon for Gender */}
              <select
                name="gender"
                onChange={useSignUpDetails}
                className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Currency */}
            <div className="flex items-center px-4 rounded-md bg-white shadow w-1/2 mx-2">
              <MdAttachMoney className="text-gray-500 text-lg" />{' '}
              {/* Placeholder icon for Currency */}
              <input
                type="text"
                placeholder="Currency"
                name="currency"
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
  signUpInfo,
  pinError,
  passError,
}) => {
  return (
    <div>
      <p className="text-xl md:text-3xl font-semibold">{`Security`}</p>
      <form action="" onSubmit={handleSubmit} className="py-10">
        <div className="space-y-4">
          {/* Password */}
          <div className="flex items-center px-4 rounded-md bg-white shadow w-full">
            <MdLockOutline className="text-gray-500 text-lg" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Confirm Password */}
          <div
            className={`${
              passError ? 'border-red-500 border' : ''
            } flex items-center px-4 rounded-md bg-white shadow w-full `}
          >
            <MdLockOutline className="text-gray-500 text-lg" />
            <input
              type="password"
              placeholder="Confirm Password"
              name="c_password"
              onChange={useSignUpDetails}
              className={`w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none transition-all duration-300 ease-in-out`}
            />
          </div>

          {/* Account Pin */}
          <div className="flex items-center px-4 rounded-md bg-white shadow w-full">
            <MdVerifiedUser className="text-gray-500 text-lg" />
            <input
              type="password"
              placeholder="Account Pin"
              name="account_pin"
              onChange={useSignUpDetails}
              className="w-full py-3 px-4 placeholder:font-thin placeholder:text-gray-500 outline-none focus:border-b focus:border-b-[3px] focus:border-pri transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Verify Account Pin */}
          <div
            className={`flex items-center px-4 rounded-md bg-white shadow w-full ${
              pinError ? 'border-red-500 border' : ''
            }`}
          >
            <MdVerifiedUser className="text-gray-500 text-lg" />
            <input
              type="password"
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
