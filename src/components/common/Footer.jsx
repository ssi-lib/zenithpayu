import React from 'react';
import { mailTo } from '../../../functions/mailTo';

const Footer = () => {
  return (
    <section className="py-10 bg-[#f4faff]">
      <div className="border-b-[1px]">
        <div className="md:flex md:gap-[12rem] md:w-[80%] w-[90%] mx-auto py-6">
          <div className="flex justify-between md:w-[66%]">
            <div className="mx-6 md:mx-0 ">
              <h3 className="pb-4 text-lightgray">INFORMATION</h3>
              <a href="">
                <p className="text-sm mb-4">About us</p>
              </a>

              <p onClick={() => mailTo()} className="text-sm mb-4">
                Contact us
              </p>

              <a href="">
                <p className="text-sm mb-4">Help</p>
              </a>
            </div>
            <div className="mx-6 md:mx-0">
              <h3 className="pb-4 text-lightgray">SERVICES</h3>
              <a href="">
                <p className="text-sm mb-4">Transfer money</p>
              </a>
              <a href="">
                <p className="text-sm mb-4">Send money</p>
              </a>
              <a href="">
                <p className="text-sm mb-4">Receive money</p>
              </a>
              <a href="">
                <p className="text-sm mb-4">Online Shopping</p>
              </a>
              <a href="">
                <p className="text-sm mb-4">Pay bill</p>
              </a>
            </div>
          </div>
          <div className="md:w-[65%] w-[90%] mx-auto pt-4 md:pt-0 border-t-[1px] md:border-0">
            <h3 className="pb-4 text-lightgray">LEGAL</h3>
            <p className="text-sm">
              ZenithPayu is authorised by the Financial Conduct Authority under
              the Electronic Money Regulations 2011, for the issuing of
              electronic money.
            </p>
          </div>
        </div>
      </div>
      <div className="md:flex justify-between md:w-[80%] mx-auto pt-10 text-lightgray">
        <div className="text-center">
          Copyright © 2024&nbsp;{' '}
          <a href="/" className="text-icon">
            ZenithPayu.
          </a>{' '}
          All Rights Reserved.
        </div>
        <div className="flex gap-4 justify-center">
          <p>Terms</p>
          <p>Privacy</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
