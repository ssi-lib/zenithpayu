import React from 'react'
import { useNavigate } from 'react-router-dom';

function Header({ type, children }) {
  const allNavLinks = {
    home: '/account/home',
    transaction: '/account/transaction',
    transfer: '/account/transfer',
    deposit: '/account/deposit',
    cards: '/account/cards'
  }

  const navigate = useNavigate()

  

  type = type.split('').map((n,i)=>i==0?n.toUpperCase():n).join('');
  
  return (
    <header className='fixed top-0 right-0 left-0 z-10 bg-blue-900'>
      <div className='flex justify-between max-w-[1280px] px-8 text-[17px]  mx-auto py-6'>
        <button className='flex-1 text-start' onClick={()=>navigate(-1)}>back</button>
        <div className='flex-1'>{type}</div>
        {children}
      </div>
    </header>


  )
}

export default Header