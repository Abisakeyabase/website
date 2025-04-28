import React from 'react';
import img1 from '../images/img1.png';
import { useEffect } from 'react';

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on page load
      }, []);
      
    return (
        <section className='sec px-4 py-6 pt-40'>
            {/* Make it column by default (mobile) and row on md+ screens */}
            <div className='flex flex-col md:flex-row'>
                
                {/* Left Image Section */}
                <div className='w-full sm:w-[90%] md:w-[30%] m-auto flex justify-center' data-aos="fade-up"
     data-aos-duration="3000">
                    <img src={img1} className='w-full mt-10 sm:mt-[10px]' alt="About Us" />
                </div>

                {/* Right Content Section */}
                <div className='w-full md:w-[70%] px-6 sm:px-4 text-center md:text-left' data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
                    <h1 className='abt-title text-4xl mt-10 font-bold capitalize mx-auto '>About Us</h1>
                    <h1 className='uppercase text-2xl mt-6 font-bold'>VTS BUILDS THE SKILLS TO DRIVE YOUR</h1>
                    <h1 className='abt-title1 font-bold text-xl mt-6'>IT CAREER!!</h1>

                    <p className='capitalize text-xl lg:px-10 mt-5 md:px-4 sm:px-2'>
                        VTS is the No.1 Software Training Institute in Tamilnadu – Based
                        out of Tenkasi & Tirunelveli providing 100% placement in our
                        own IT Startup <span className='abt-title'>Vetri IT Systems</span> to the graduated students from
                        IT and Non-IT streams.
                    </p>

                    <p className='capitalize text-xl lg:px-10 mt-5 md:px-4 sm:px-2'>
                        VTS has a team of highly experienced trainers who have worked
                        on a wide range of projects and have a deep understanding
                        of the development and testing process. We believe in providing
                        hands-on training to our trainees, which helps them to gain
                        practical experience and prepare them for real-world scenarios.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
