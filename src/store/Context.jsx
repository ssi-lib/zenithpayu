import { useContext, createContext } from 'react';

const store = createContext();

// eslint-disable-next-line react/prop-types
const StoreProvider = ({ children }) => {
  return <store.Provider value={{}}>{children}</store.Provider>;
};

const useGlobalStore = () => {
  return useContext(store);
};

export { useGlobalStore, StoreProvider };
