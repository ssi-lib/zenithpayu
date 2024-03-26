import React from 'react';
import LoaderComp from '../../../../components/Loader';

function Loader() {
  return (
    <div className="fixed top-0 bottom-0 h-[100%] w-full z-50 flex items-center justify-center transition-all ease-in-out duration-500">
      <div className="bg-black opacity-40 absolute w-full h-screen transition-all ease-in-out duration-500"></div>
      <LoaderComp />
    </div>
  );
}

export default Loader;
