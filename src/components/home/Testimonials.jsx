import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft } from "react-icons/fa";
import feedback from "../../assets/testimonial-bg.jpeg";



const Testimonials = () => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
  return (
    <section className='py-12 px-6 bg-[#f5f5f5] inset-0 -z-10' style={{ backgroundImage: `url(${feedback})`, backgroundPosition: "1%", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundBlendMode: 'overlay' }}>
      <div className="" >
        <div className='text-center mb-6'>
            <h1 className='text-[2.25rem] font-medium'>What people are saying about SwiftPayu</h1>
            <p className='font-light text-[1.25rem]'>A payments experience people love to talk about</p>
        </div>
        <Slider {...settings} className='pb-10 md:w-[80%] mx-auto text-center'>
          <div>
            <div className='border-[1px] border-black rounded-md p-8 mx-8'>
              <FaQuoteLeft size={32} className='mx-auto mb-2 text-[#8e9a9d] opacity-30'/>
              <p className='mb-6'>“Fast and easy-to-use transfers to a different currency. It provides much better value than the banks..”</p>
              <strong>De Mortel</strong>
              <p>Online Retail</p>
            </div>
          </div>
          <div>
            <div className='border-[1px] border-black rounded-md p-8 mx-8'>
              <FaQuoteLeft size={32} className='mx-auto mb-2 text-[#8e9a9d] opacity-30'/>
              <p className='mb-6'>“I've been using SwiftPayu for a while now and it has completely changed the way I manage my finances. Their rates are fair, and the platform is incredibly easy to use. I highly recommend SwiftPayu to anyone looking for a reliable and efficient way to handle their money.”</p>
              <strong>De Mortel</strong>
              <p>Online Retail</p>
            </div>
          </div>
          <div>
            <div className='border-[1px] border-black rounded-md p-8 mx-8'>
              <FaQuoteLeft size={32} className='mx-auto mb-2 text-[#8e9a9d] opacity-30'/>
              <p className='mb-6'>“I use SwiftPayu to pay a mortgage in a different country each month. Superb. That simple.”</p>
              <strong>De Mortel</strong>
              <p>Online Retail</p>
            </div>
          </div>
          <div>
            <div className='border-[1px] border-black rounded-md p-8 mx-8'>
              <FaQuoteLeft size={32} className='mx-auto mb-2 text-[#8e9a9d] opacity-30'/>
              <p className='mb-6'>“Fast and easy-to-use transfers to a different currency. It provides much better value than the banks..”</p>
              <strong>De Mortel</strong>
              <p>Online Retail</p>
            </div>
          </div>
          <div>
            <div className='border-[1px] border-black rounded-md p-8 mx-8'>
              <FaQuoteLeft size={32} className='mx-auto mb-2 text-[#8e9a9d] opacity-30'/>
              <p className='mb-6'>“Fast and easy-to-use transfers to a different currency. It provides much better value than the banks..”</p>
              <strong>De Mortel</strong>
              <p>Online Retail</p>
            </div>
          </div>
          <div>
            <div className='border-[1px] border-black rounded-md p-8 mx-8'>
              <FaQuoteLeft size={32} className='mx-auto mb-2 text-[#8e9a9d] opacity-30'/>
              <p className='mb-6'>“Fast and easy-to-use transfers to a different currency. It provides much better value than the banks..”</p>
              <strong>De Mortel</strong>
              <p>Online Retail</p>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  )
}

export default Testimonials
