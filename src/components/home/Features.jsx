import React from 'react'
import { FaDollarSign, FaUserFriends, FaCheckSquare, FaShareSquare } from "react-icons/fa";

const Features = () => {
  return (
    <section className='py-12 px-6'>
      <div className='text-center mb-6'>
          <h1 className='text-[2.25rem]'>WHAT CAN YOU DO?</h1>
          <p className='font-light text-[1.25rem]'>These are a few amazing things you can do with SwiftPayu </p>
      </div>
      <div className='grid md:grid-cols-4 gap-8 w-[90%] mx-auto my-12'>
          <div className='text-center'>
            <div className='p-10 border-[1px]'>
              <FaShareSquare className='mx-auto text-5xl text-icon' />
            </div>
            <div className='bg-feature py-2'>
              <h3 className='font-medium'>Send money</h3>
            </div>
          </div>
          <div className='text-center'>
            <div className='p-10 border-[1px]'>
              <FaCheckSquare className='mx-auto text-5xl text-icon' />
            </div>
            <div className='bg-feature py-2'>
              <h3 className='font-medium'>Receive money</h3>
            </div>
          </div>
          <div className='text-center'>
            <div className='p-10 border-[1px]'>
              <FaUserFriends className='mx-auto text-5xl text-icon' />
            </div>
            <div className='bg-feature py-2'>
              <h3 className='font-medium'>Pay a friend</h3>
            </div>
          </div>
          <div className='text-center'>
            <div className='p-10 border-[1px]'>
              <FaDollarSign className='mx-auto text-5xl text-icon' />
            </div>
            <div className='bg-feature py-2'>
              <h3 className='font-medium'>Loan request</h3>
            </div>
          </div>
      </div>
    </section>
  )
}

export default Features
