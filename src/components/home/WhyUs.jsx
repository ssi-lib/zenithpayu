import { FaHandPointer, FaShare, FaDollarSign, FaLock } from 'react-icons/fa';

const items = [
  {
    icon: FaHandPointer,
    title: 'Easy to use',
    description:
      "Payu's online platform is user-friendly and easy to navigate, providing customers with a hassle-free banking experience. With a simple and intuitive interface, customers can access their accounts, make payments, and transfer funds with ease.",
  },
  {
    icon: FaShare,
    title: 'Faster Payments',
    description:
      'Transfer money instantly between bank accounts 24/7, including weekends and bank holidays, and transfer funds without having to wait for days.',
  },
  {
    icon: FaDollarSign,
    title: 'Lower Fees',
    description:
      'Our transaction fees and rates are incredibly low for all customers and market makers alike.',
  },
  {
    icon: FaLock,
    title: '100% secure',
    description:
      'Your finances are secure with our advanced technologies that protect you against digital theft and hacking.',
  },
];

const WhyUs = () => {
  return (
    <section className="py-20 md:px-8 px-2">
      <div className="text-center mb-5">
        <h1 className="text-[2.25rem]">WHY CHOOSE US?</h1>
        <p className="font-light text-[1.25rem]">
          Here’s Top 4 reasons why using a ZenithPayu account for manage your
          money.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 md:w-[70%] mx-auto mt-12">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 mb-10">
            <div className="rounded-full border-[1px] border-pri mx-auto mb-auto p-6">
              <item.icon className="text-pri text-3xl" />
            </div>
            <div className="md:mb-0">
              <h2 className="text-[20px] mb-2">{item.title}</h2>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
