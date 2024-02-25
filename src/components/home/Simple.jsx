import React from 'react'
import { BlueButton } from '../common/Button'

const Simple = () => {
  return (
    <section className='py-24 px-6 bg-feature'>
      <div className='text-center mb-6'>
          <h1 className='text-[2.25rem]'>AS SIMPLE AS 1-2-3</h1>
          <p className='font-light text-xl'>Money for here, there, and everywhere. Meet Money Without Borders</p>
      </div>
      <div className='grid md:grid-cols-3 gap-16 w-[90%] mx-auto'>
          <div className='text-center'>
            <div className='max-w-[30%] mx-auto pb-8'>
              <h2 className='text-5xl md:text-8xl p-2 font-medium border-b-2'>1</h2>
            </div>
            <h4 className='font-semibold mb-3 text-lg'>Sign Up your account</h4>
            <p className='font-light'>Sign up for your free personal account in just a few minutes.</p>
          </div>
          <div className='text-center'>
            <div className='max-w-[30%] mx-auto pb-8'>
              <h2 className='text-5xl md:text-8xl p-2 font-medium border-b-2'>2</h2>
            </div>
            <h4 className='font-semibold mb-3 text-lg'>Send & Receive Money</h4>
            <p className='font-light'>Receive and send payments from around the world in over 40 currencies.</p>
          </div>
          <div className='text-center'>
            <div className='max-w-[30%] mx-auto pb-8'>
              <h2 className='text-5xl md:text-8xl p-2 font-medium border-b-2'>3</h2>
            </div>
            <h4 className='font-semibold mb-3 text-lg'>Withdraw Funds</h4>
            <p className='font-light'>Your funds will be transferred to either your local or foreign bank account(s).</p>
          </div>
      </div>
      <div className='flex justify-center mt-12'>
        <BlueButton content="Open a free account"/>
      </div>
    </section>
  )
}

export default Simple
