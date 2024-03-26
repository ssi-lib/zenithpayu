import Footer from '../components/common/Footer';
import Nav from '../components/common/Nav';
import customerSupport from '../assets/customer-support.jpeg';
import React from 'react';
import { MdAccountCircle } from 'react-icons/md';
import {
  FaMoneyCheckAlt,
  FaShieldAlt,
  FaCreditCard,
  FaRegEnvelope,
  FaRegCommentAlt,
  FaChevronRight,
} from 'react-icons/fa';
import { mailTo } from '../../functions/mailTo';

function Help() {
  return (
    <main className="bg-[#f5f5f5]">
      <section className="py-28 md:py-48 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[#0076be] opacity-90 z-10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${customerSupport})`,
            backgroundPosition: '10%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute z-30">
            <Nav />
          </div>
          <div className="relative top-1/2 z-10 py-5">
            <div className="text-center">
              <h1 className="md:text-[2.75rem] text-[1.75rem] font-medium">
                How can we help you?
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section className="grid md:grid-cols-4 gap-8 w-[90%] mx-auto my-12">
        <div className="text-center bg-white py-6 rounded-xl shadow-sm">
          <div className="p-6">
            <MdAccountCircle className="mx-auto md:text-8xl text-5xl text-[#0076be]" />
          </div>
          <div className="pb-6">
            <h3 className="font-medium">My Account</h3>
          </div>
        </div>
        <div className="text-center bg-white py-6 rounded-xl shadow-sm">
          <div className="p-6">
            <FaMoneyCheckAlt className="mx-auto  md:text-8xl text-5xl text-[#0076be]" />
          </div>
          <div className="pb-6">
            <h3 className="font-medium">Payment</h3>
          </div>
        </div>
        <div className="text-center bg-white py-6 rounded-xl shadow-sm">
          <div className="p-6">
            <FaShieldAlt className="mx-auto  md:text-8xl text-5xl text-[#0076be]" />
          </div>
          <div className="pb-6">
            <h3 className="font-medium">Security</h3>
          </div>
        </div>
        <div className="text-center bg-white py-6 rounded-xl shadow-sm">
          <div className="p-6">
            <FaCreditCard className="mx-auto  md:text-8xl text-5xl text-[#0076be]" />
          </div>
          <div className="pb-6">
            <h3 className="font-medium">Payment Methods</h3>
          </div>
        </div>
      </section>
      <section className="grid md:grid-cols-2 gap-8 w-[90%] mx-auto my-12 md:my-28">
        <div className="bg-white py-6 rounded-xl shadow-sm md:flex items-center">
          <div className="p-6">
            <FaRegEnvelope className="mx-auto text-5xl text-[#dee3e4]" />
          </div>
          <div className="md:pe-8 text-center md:text-left">
            <h3 className="font-medium mb-2">
              Can't find what you're looking for?
            </h3>
            <p className="text-[#8e9a9d] text-sm">
              We want to answer all of your queries. Get in touch and we'll get
              back to you as soon as we can.
              <span className="text-[#0076be] inline-flex items-center gap-2">
                <div
                  onClick={() => mailTo()}
                  className="inline-flex items-center gap-1"
                >
                  Contact us
                  <FaChevronRight />
                </div>
              </span>
            </p>
          </div>
        </div>
        <div className="bg-white py-6 rounded-xl shadow-sm md:flex items-center">
          <div className="p-6">
            <FaRegCommentAlt className="mx-auto text-5xl text-[#dee3e4]" />
          </div>
          <div className="md:pe-8 text-center md:text-left">
            <h3 className="font-medium mb-2">Technical questions</h3>
            <p className="text-[#8e9a9d] text-sm">
              Have some technical questions? Hit us up on live chat or whatever.
              <span className="text-[#0076be] inline-flex items-center gap-2">
                <a href="/" className="inline-flex items-center gap-1">
                  Click here
                  <FaChevronRight />
                </a>
              </span>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default Help;
