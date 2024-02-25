import React, { useState } from 'react';
import { FaLongArrowAltDown } from "react-icons/fa";

const TransferForm = () => {
  const [activeTab, setActiveTab] = useState('currency');
  const [currencyInput, setCurrencyInput] = useState('');
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('EUR');

  const [countryFrom, setCountryFrom] = useState('USA');
  const [countryTo, setCountryTo] = useState('Germany');

  const handleCurrencyInputChange = (event) => {
    setCurrencyInput(event.target.value);
  };

  const handleCurrencyFromChange = (event) => {
    setCurrencyFrom(event.target.value);
  };

  const handleCurrencyToChange = (event) => {
    setCurrencyTo(event.target.value);
  };

  const handleCountryFromChange = (event) => {
    setCountryFrom(event.target.value);
  };

  const handleCountryToChange = (event) => {
    setCountryTo(event.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const convertCurrency = () => {
    return (currencyInput * 0.85).toFixed(2); // For demonstration, 0.85 is just a placeholder conversion rate
  };

  return (
    <div className='bg-white text-black rounded-md'>
      <div className="flex justify-center">
        <button className={`py-6 px-10 w-[100%] ${activeTab === 'currency' ? '' : 'bg-gray-200 text-gray-700'}`} onClick={() => handleTabChange('currency')}>Send Money</button>
        <button className={`py-6 px-10 w-[100%] ${activeTab === 'country' ? '' : 'bg-gray-200 text-gray-700'}`} onClick={() => handleTabChange('country')}>Request Money</button>
      </div>
      {activeTab === 'currency' && (
        <div>
          <form className='p-6'>
            <div className='flex flex-col'>
              <label className="mb-2">You Send</label>
              <div className="flex items-center">
                <input className='border p-3 flex-grow' type="text" value={currencyInput} onChange={handleCurrencyInputChange} />
                <select className="border p-3.5 bg-gray-200" value={currencyFrom} onChange={handleCurrencyFromChange}>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
            <FaLongArrowAltDown className='my-4 mx-auto text-gray-400 text-3xl'/>
            <div className='flex flex-col'>
              <label className="mb-2">Recipient gets</label>
              <div className="flex items-center">
                <input className='border p-3 rounded-l-md flex-grow bg-gray-300' type="text" value={convertCurrency()} />
                <select className="border p-3.5 bg-gray-200" value={currencyTo} onChange={handleCurrencyToChange}>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
            <div className='p-4 md:w-[100%] w-[100%] mx-auto bg-pri text-center text-white my-8 rounded-md'>
              <button>Continue</button>
            </div>
          </form>
        </div>
      )}
      {activeTab === 'country' && (
        <div>
          <form className='p-6'>
            <div className="flex flex-col my-4">
              <label className="mb-2">I am in</label>
              <select className="border p-3" value={countryFrom} onChange={handleCountryFromChange}>
                <option value="USA">USA</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
            <div className="flex flex-col my-4">
              <label className="mb-2">My payer is in</label>
              <select className="border p-3" value={countryTo} onChange={handleCountryToChange}>
                <option value="USA">USA</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
            <div className='flex flex-col'>
              <label className="mb-2">I want to request</label>
              <div className="flex items-center">
                <input className='border p-2 flex-grow' type="text" value={currencyInput} onChange={handleCurrencyInputChange} />
                <select className="border p-2.5 bg-gray-200" value={currencyFrom} onChange={handleCurrencyFromChange}>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
            <div className='p-4 md:w-[100%] w-[100%] mx-auto bg-pri text-center text-white my-8 rounded-md'>
              <button>Continue</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TransferForm;
