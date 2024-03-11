import Footer from "../components/common/Footer";
import Nav from "../components/common/Nav";
import customerSupport from '../assets/customer-support.jpeg';
import { FaEnvelope, FaGlobe, FaDollarSign, FaUsers, FaLifeRing } from "react-icons/fa";
import { GlassButton, BlueButton } from "../components/common/Button";

function About() {

  return (
    <main className="bg-[#f5f5f5]">
      <section className="h-screen md:h-0 py-28 md:py-72 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gray-900 opacity-80 z-10"></div>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${customerSupport})`, backgroundPosition: "10%", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
          <div className='absolute z-20'>
            <Nav />
          </div>
          <div className="relative md:top-1/3 md:mt-0 mt-28 z-10">
            <div className='text-center md:w-[75%] w-[95%] mx-auto'>
              <h1 className='md:text-[2.75rem] text-[2rem] mb-8 font-medium'>About SwiftPayu</h1>
              <p className="text-xl">Our core mission is to provide you with a cost-effective and efficient financial solution by offering competitive exchange rates and reducing transfer fees. Our team is dedicated to empowering you with the tools and resources necessary to achieve your financial goals. We believe in creating a seamless and secure platform for our clients to send and receive money, while prioritizing transparency and integrity in all our transactions.</p>
            </div>
            <div className="flex justify-center gap-4 items-center">
              <BlueButton content="Open a free account" />
              <a href="mailto: support@swiftpayu.com">
                <GlassButton text='Contact us' icon={<FaEnvelope className="text-white" />} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#0581ce] py-10">
        <div className="grid md:grid-cols-4 w-[85%] mx-auto">
          <div className="text-white text-center mb-8 md:mb-0">
            <FaGlobe className="text-4xl mx-auto" />
            <h1 className="font-medium md:text-5xl text-3xl md:my-4 my-2">180+</h1>
            <h3>Countries</h3>
          </div>
          <div className="text-white text-center mb-8 md:mb-0">
            <FaDollarSign className="text-4xl mx-auto" />
            <h1 className="font-medium md:text-5xl text-3xl md:my-4 my-2">120+</h1>
            <h3>Currencies</h3>
          </div>
          <div className="text-white text-center mb-8 md:mb-0">
            <FaUsers className="text-4xl mx-auto" />
            <h1 className="font-medium md:text-5xl text-3xl md:my-4 my-2">2.5M+</h1>
            <h3>Users</h3>
          </div>
          <div className="text-white text-center mb-8 md:mb-0">
            <FaLifeRing className="text-4xl mx-auto" />
            <h1 className="font-medium md:text-5xl text-3xl md:my-4 my-2">24X7</h1>
            <h3>Support</h3>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default About;
