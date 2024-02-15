import React from 'react'

function Header({ type='home' }) {
  const allNavLinks = {
    home: '/account/home',
    transaction: '/account/transaction',
    transfer: '/account/transfer',
    deposit: '/account/deposit',
    cards: '/account/cards'
  }
  return (
    <header className='fixed top-0 right-0 left-0 z-10'>
      {
        type == 'home' ?
          <div className='p-4 bg-pri'>
            <div 
              className='px-4 flex flex-row gap-4  justify-between items-center text-white font-semibold tracking-wider text-[17px] max-w-[1280px] mx-auto'
            >
              <div className='text-[24px]'>logo</div>
              <div className="header_nav">
                <nav>
                  <ul className='flex gap-4'>
                    <li><a href="#">Quick Transfer</a></li>
                    <li><a href="#">Account Home</a></li>
                    <li><a href="#">Loan</a></li>
                    <li><a href="#">Account Settings</a></li>
                  </ul>
                </nav>
              </div>

              <div className="not_and_prof flex flex-row gap-4">
                <div className="notification">
                  not
                </div>
                <a href="#"><img src="#" alt="prof" /></a>
              </div>
            </div>
          </div> :
          type == 'transaction' ?
            <div>transaction header</div> :
            <div>this type</div>
      }
    </header>


  )
}

export default Header