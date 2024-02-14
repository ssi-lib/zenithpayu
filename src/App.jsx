import { useEffect, useState } from 'react';
import './App.css';
import Loader from './components/Loader';
import AllRoute from './routes/Route';

function App() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <AllRoute />
    </>
  );
}

export default App;
