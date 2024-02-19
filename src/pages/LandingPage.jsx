import landingHero from '../assets/landingHero.jpeg';
import Nav from '../components/common/Nav';
import Footer from '../components/common/Footer';
import Partners from '../components/home/Partners';
import WhyUs from '../components/home/WhyUs';
import Simple from '../components/home/Simple';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import CustomerSupport from '../components/home/CustomerSupport';
import TransferForm from '../components/home/TransferForm';

function LandingPage() {
  return (
    <main className='overflow-hidden'>
      <section className="min-h-[120vh] relative overflow-hidden text-white">
        <div className="absolute inset-0" style={{ backgroundImage: `url(${landingHero})`, backgroundPosition: "10%", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
          <div className='absolute z-30'>
            <Nav />
          </div>
          <div className="absolute md:top-1/4 mt-28 md:mt-0 md:px-[9%] px-[2%] md:flex items-center gap-[1rem] z-10">
            <div>
              <h1 className='md:text-6xl text-3xl'>Pay Anyone,<br></br> Anywhere</h1>
              <p className='text-[#dee3e4] mb-4 mx-1'>Quickly and easily send, receive and request money online with SwiftPayu. Get a customised solution to fit your business needs.</p>
              <button></button>
            </div>
            <div className='md:w-[50%]'>
              <TransferForm />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gray-900 opacity-60 z-1"></div>
      </section>
      <Partners />
      <WhyUs />
      <Simple />
      <Features />
      <Testimonials />
      <CustomerSupport />
      <Footer />
    </main>
  );
}

export default LandingPage;
