import { useState } from 'react';
import { FaAngleDown, FaDollarSign, FaLongArrowAltDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useCurrency from '../../hooks/useCurrency';
import useCountry from '../../hooks/useCountry';

const TransferForm = () => {
  const [activeTab, setActiveTab] = useState('currency');
  const [currencyInput, setCurrencyInput] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [showCountries, setShowCountries] = useState({
    from: false,
    to: false,
  });
  const [currencyInfo, setCurrencyInfo] = useState({
    from: 'USD',
    to: 'EUR',
  });
  const [countryInfo, setCountryInfo] = useState({
    receiver: 'United State',
    payer: 'France',
  });

  const { currencyWithFlag, rates } = useCurrency(currencyInfo.from);
  const { countryData } = useCountry();

  const handleCurrencyInputChange = (event) => {
    setCurrencyInput(event.target.value);
  };

  const handleCurrencyChange = ({ target }) => {
    setCurrencyInfo((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const convertCurrency = () => {
    return (currencyInput * rates?.rates[currencyInfo?.to]).toFixed(2);
  };

  return (
    <div className="bg-white text-black rounded-xl">
      <div className="flex justify-center">
        <button
          className={`py-6 px-10 w-[100%] transition-all ease-in-out duration-300 ${
            activeTab === 'currency'
              ? ''
              : 'bg-gray-200 text-gray-700 rounded-tl'
          }`}
          onClick={() => handleTabChange('currency')}
        >
          Send Money
        </button>
        <button
          className={`py-6 px-10 w-[100%] transition-all ease-in-out duration-300 ${
            activeTab === 'country'
              ? ''
              : 'bg-gray-200 text-gray-700 rounded-tr'
          }`}
          onClick={() => handleTabChange('country')}
        >
          Request Money
        </button>
      </div>
      {activeTab === 'currency' && (
        <div>
          <form className="p-6">
            <div className="flex flex-col">
              <label className="mb-2">You Send</label>
              <div className="flex border h-12 items-center rounded">
                <input
                  className="w-full px-2 h-full"
                  type="text"
                  value={currencyInput}
                  onChange={handleCurrencyInputChange}
                />
                <select
                  className="bg-gray-200 h-full rounded-r"
                  value={currencyInfo.from}
                  name="from"
                  onChange={handleCurrencyChange}
                >
                  {currencyWithFlag?.map((curr) => (
                    <option key={curr.currCode} value={curr.currCode}>
                      <span>{curr.currFlag}</span>
                      <span>{curr.currCode}</span>
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <FaLongArrowAltDown className="my-4 mx-auto text-gray-400 text-3xl" />
            <div className="flex flex-col">
              <label className="mb-2">Recipient gets</label>
              <div className="flex border h-12 items-center rounded">
                <input
                  className="bg-gray-300 h-full w-full px-2"
                  type="text"
                  value={convertCurrency()}
                  readOnly
                />
                <select
                  className="h-full bg-gray-200 rounded-r"
                  value={currencyInfo.to}
                  name="to"
                  onChange={handleCurrencyChange}
                >
                  {currencyWithFlag?.map((curr) => (
                    <option key={curr.currCode} value={curr.currCode}>
                      <span>{curr.currFlag}</span>
                      <span>{curr.currCode}</span>
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="p-4 md:w-[100%] w-[100%] mx-auto bg-pri text-center text-white my-8 rounded-xl">
              <Link to={'/login'}>
                <button>Continue</button>
              </Link>
            </div>
          </form>
        </div>
      )}
      {activeTab === 'country' && (
        <div className="text-gray-500">
          <form className="p-6">
            <div className="flex flex-col my-4">
              <label className="mb-2">I am in</label>
              <div className="relative">
                <div
                  className="flex justify-between items-center rounded border py-3 px-3"
                  onClick={() =>
                    setShowCountries((prev) => ({
                      ...prev,
                      from: !showCountries.from,
                    }))
                  }
                >
                  <p>{countryInfo.receiver}</p>
                  <FaAngleDown className="font-thin" />
                </div>
                {showCountries.from ? (
                  <div className="flex flex-col space-y-2 px-3 py-1 absolute top-16 w-full bg-white shad rounded z-50">
                    <input
                      type="text"
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full h-10 rounded my-2 focus:outline-blue-400 text-black px-2 border"
                      autoFocus
                    />
                    <ul className="space-y-2 max-h-96 overflow-auto">
                      {countryData
                        ?.sort((a, b) => a.name.localeCompare(b.name))
                        .filter((e) =>
                          e.name
                            .toLowerCase()
                            .includes(searchText.trim().toLowerCase())
                        )
                        .map((data) => (
                          <li
                            key={data.name}
                            onClick={() => {
                              setCountryInfo((prev) => ({
                                ...prev,
                                receiver: data.name,
                              })),
                                setShowCountries(false);
                            }}
                            className="text-sm cursor-pointer"
                          >
                            {data.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col my-4">
              <label className="mb-2">My payer is in</label>
              <div className="relative">
                <div
                  className="flex justify-between items-center rounded border py-3 px-3"
                  onClick={() =>
                    setShowCountries((prev) => ({
                      ...prev,
                      to: !showCountries.to,
                    }))
                  }
                >
                  <p>{countryInfo.payer}</p>
                  <FaAngleDown className="font-thin" />
                </div>
                {showCountries.to ? (
                  <div className="flex flex-col space-y-2 px-3 py-1 absolute top-16 w-full bg-white shad rounded z-50">
                    <input
                      type="text"
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full h-10 rounded my-2 focus:outline-blue-400 text-black px-2 border"
                      autoFocus
                    />
                    <ul className="space-y-2 max-h-96 overflow-auto">
                      {countryData
                        ?.sort((a, b) => a.name.localeCompare(b.name))
                        .filter((e) =>
                          e.name
                            .toLowerCase()
                            .includes(searchText.trim().toLowerCase())
                        )
                        .map((data) => (
                          <li
                            key={data.name}
                            onClick={() => {
                              setCountryInfo((prev) => ({
                                ...prev,
                                payer: data.name,
                              })),
                                setShowCountries(false);
                            }}
                            className="text-sm cursor-pointer"
                          >
                            {data.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-2">I want to request</label>
              <div className="flex items-center border rounded h-12">
                <div className="bg-gray-200 flex items-center justify-center px-2 h-full rounded-l border">
                  <FaDollarSign className="" />
                </div>
                <input
                  className="p-2 flex-grow focus:outline-blue-100 rounded-none"
                  type="text"
                  value={currencyInput}
                  onChange={handleCurrencyInputChange}
                />
                <select
                  className="border px-2.5 h-full bg-gray-200"
                  value={currencyInfo.from}
                  onChange={handleCurrencyChange}
                >
                  {currencyWithFlag?.map((curr) => (
                    <option key={curr.currCode} value={curr.currCode}>
                      <span>{curr.currFlag}</span>
                      <span>{curr.currCode}</span>
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="p-4 md:w-[100%] w-[100%] mx-auto bg-pri text-center text-white my-8 rounded-xl">
              <Link to={'/login'}>
                <button>Continue</button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TransferForm;
