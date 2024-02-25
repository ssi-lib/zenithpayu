import React, { useState } from 'react';
import MobileNavbar from './MobileNavBar';
import { BlueButton } from './Button';
import { Link } from 'react-router-dom';

export const navLinks = [
  {
    title: 'SEND',
    url: '/login',
  },
  {
    title: 'RECEIVE',
    url: '/login',
  },
  {
    title: 'ACTIVATE CARD',
    url: '/login',
  },
  {
    title: 'ABOUT US',
    url: '/about',
  },
  {
    title: 'CONTACT US',
    url: '/contact',
  },
  {
    title: 'HELP',
    url: '/help',
  },
];

const Nav = () => {
  const [openNav, setOpenNav] = useState(false);

  const handleMobileNav = () => {
    setOpenNav(true);
  };

  return (
    <div className="text-gray-100">
      <nav className="justify-between flex items-center p-4 w-screen md:px-[9%] top-0 z-40  border-b-[1px]">
        <div className="flex gap-[2rem]">
          <a className="logo" href="/" aria-label="Go to homepage">
            <div
              className="left ms-2 font-bold text-lg"
              style={{ fontSize: '24px', letterSpacing: '1px' }}
            >
              <b>
                <span
                  className="font-bold"
                  style={{
                    color: '#bae5ff',
                    fontFamily: 'sans-serif',
                    fontWeight: 'bolder',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'sans-serif',
                      fontWeight: 'bolder',
                      background: '#fff',
                      padding: '0px 4px',
                      borderRadius: '10px',
                      color: '#0076be',
                      marginRight: '2px',
                    }}
                  >
                    S
                  </span>
                </span>
                <span
                  style={{
                    fontFamily: 'sans-serif',
                    fontWeight: 'normal',
                    color: '#fff',
                    marginLeft: '0px',
                    marginRight: '10px',
                  }}
                >
                  wiftPayu
                </span>
              </b>
            </div>
          </a>
          <div className="hidden md:block">
            <ul className="flex gap-[2rem] text-sm md:pt-1">
              {navLinks.map((link, index) => (
                <li className="hover:text-white" key={index}>
                  <a href={link.url}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {!openNav ? (
          <button
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 text-white focus:outline-none"
            onClick={handleMobileNav}
          >
            <span
              className={`w-5 h-0.5 bg-white mb-1 rounded-full ${
                !openNav ? '-rotate-0 duration-300' : ''
              }`}
            ></span>
            <span className="w-5 h-0.5 bg-white mb-1 rounded-full"></span>
            <span
              className={`w-5 h-0.5 bg-white mb-1 rounded-full ${
                !openNav ? '-rotate-0 duration-300' : ''
              }`}
            ></span>
          </button>
        ) : (
          <button
            className={`md:hidden w-10 h-10 flex flex-col items-center justify-center ${
              openNav ? 'open' : ''
            }`}
            onClick={() => setOpenNav(!openNav)}
          >
            <span
              className={`line w-5 h-0.5 bg-white mb-1 rounded-full ${
                openNav ? 'rotate-45 translate-y-1.5 duration-300' : ''
              }`}
            ></span>
            <span
              className={`line w-5 h-0.5 bg-white mb-1 rounded-full ${
                openNav ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`line w-5 h-0.5 bg-white mb-1 rounded-full ${
                openNav ? '-rotate-45 -translate-y-1.5 duration-300' : ''
              }`}
            ></span>
          </button>
        )}
        <div className="text-sm md:gap-0 flex">
          <Link to={'/login'}>
            {' '}
            <button
              type="button"
              className="text-center text-gray-100 md:px-10 py-3 hover:text-white btn-gradient text-white mx-4"
            >
              LOGIN
            </button>
          </Link>
          <Link to={'/get-started'}>
            <BlueButton content="SIGN UP" />
          </Link>
        </div>
      </nav>
      {openNav && (
        <MobileNavbar
          setOpenNav={setOpenNav}
          className={`${openNav ? 'translate-y-6 duration-600' : ''}`}
        />
      )}
    </div>
  );
};

export default Nav;
