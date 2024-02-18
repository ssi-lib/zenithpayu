// components/RouteChangeListener.js
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader';

const RouteChangeListener = () => {
  const [loader, setLoader] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoader(true);
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return loader ? <Loader /> : null;
};

export default RouteChangeListener;
