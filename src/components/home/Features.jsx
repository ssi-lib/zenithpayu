import React from 'react';
import {
  FaDollarSign,
  FaUserFriends,
  FaCheckSquare,
  FaShareSquare,
} from 'react-icons/fa';

const items = [
  {
    icon: FaShareSquare,
    text: 'Send money',
  },
  {
    icon: FaCheckSquare,
    text: 'Receive money',
  },
  {
    icon: FaUserFriends,
    text: 'Pay a friend',
  },
  {
    icon: FaDollarSign,
    text: 'Loan request',
  },
];

const Features = () => {
  return (
    <section className="py-12 px-6">
      <div className="text-center mb-6">
        <h1 className="text-[2.25rem]">WHAT CAN YOU DO?</h1>
        <p className="font-light text-[1.25rem]">
          These are a few amazing things you can do with SwiftPayu{' '}
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-8 w-[90%] mx-auto my-12">
        {items.map((item, index) => {
          return (
            <div key={index} className="text-center hover:shadow-lg">
              <div className="p-10 border-[1px]">
                <item.icon className="mx-auto text-5xl text-icon" />
              </div>
              <div className="bg-feature py-2">
                <h3 className="font-semibold">{item.text}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
