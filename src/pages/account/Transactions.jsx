import { useEffect, useState } from 'react';
import { useGlobalStore } from '../../store/Context';

function Transactions() {
  const { setPage, setLoader, userDetail } = useGlobalStore();

  const handlePageChange = () => {
    setLoader(true);
    setPage('statement');
  };

  return (
    <div className="space-y-8 my-10">
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <p className="text-neutral text-xs">Total Income</p>
        <p className="text-green-500 text-3xl font-bold">
          + &#8364; {userDetail.balance.toLocaleString() || 0.0}
        </p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <p className="text-neutral text-xs">Total Expenses</p>
        <p className="text-red-500 text-3xl font-bold">- &#8364; 0.00</p>
      </div>
      <div className="flex justify-between items-center text-xs">
        <p className="text-neutral">Transactions</p>
        <p className="text-pri cursor-pointer" onClick={handlePageChange}>
          Account Statement
        </p>
      </div>
    </div>
  );
}

export default Transactions;
