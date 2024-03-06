import { useState, useEffect } from 'react';
import axios from 'axios';

const useCountry = () => {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const formattedData = response.data.map((country) => ({
          name: country.name.common,
          flag: country.flags.svg,
          currencies: country.currencies,
        }));
        setCountryData(formattedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { loading, error, countryData };
};

export default useCountry;
