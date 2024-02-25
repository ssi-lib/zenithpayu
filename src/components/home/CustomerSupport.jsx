import React from 'react';
import customerSupport from '../../assets/customer-support.jpeg';

const CustomerSupport = () => {
  return (
    <section className="py-28 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-icon opacity-90 z-20"></div>
      <div className="absolute inset-0" style={{ backgroundImage: `url(${customerSupport})`, backgroundPosition: "10%", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}></div>
      <div className="relative z-30 py-5">
        <div className='text-center'>
          <h1 className='text-[2.25rem] font-medium'>Awesome customer support</h1>
          <p className='font-light text-[1.25rem]'>Have you any query? Don't worry. We have great people ready to help you whenever you need it.</p>
          <div className='p-4 w-[50%] md:w-[10%] mx-auto bg-white text-center text-pri my-8 rounded-md'>
            <button>Contact us</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerSupport
