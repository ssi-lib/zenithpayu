import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useGlobalStore } from '../../../../store/Context';

const PaymentForm = () => {
  const { userDetail } = useGlobalStore();
  const [state, setState] = useState({
    number: '5399************',
    expiry: '11/26',
    cvc: '067',
    name: userDetail.first_name + ' ' + userDetail.last_name,
    focus: 'number',
  });

  return (
    <div className="p-10 bg-pri rounded-lg shadow-md">
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
    </div>
  );
};

export default PaymentForm;
