'use client';

import React from 'react';
import { navLinks } from './Nav';

const MobileNavbar = ({ setOpenNav }) => {
  const handleClick = () => {
    setOpenNav(false);
  };

  return (
    <div className="max-h-[300px] w-full fixed text-black bg-white p-4 z-30">
      <div className="">
        <ul className="flex flex-col gap-6 min-h-[300px]">
          {navLinks.map((link, index) => (
            <li
              className="hover:text-blue-300 border-b-[1px]"
              key={index}
              onClick={handleClick}
            >
              <a href={link.url}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;
