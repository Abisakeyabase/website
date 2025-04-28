import React from 'react'
import '../css/Home.css'
import img1 from '../images/VTS home page img.png'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';



const Homesec1 = () => {
    useEffect(() => {
        AOS.init({ duration: 100, once: true });
    }, []);
    
    const navigate = useNavigate()
    return (
        <section className='sec pt-30 md:pt-36 lg:pt-40'>
            <div className='flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10 px-4 sm:px-8 md:px-12 lg:px-16'>
                
                {/* Left Content */}
                <div className='w-full lg:w-2/3'   >
                    <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold capitalize text-gray-600 leading-relaxed' data-aos="fade-right" data-aos-duration="1000">
                        Vetri Technology Solutions also called VTS is the India's <span className='homesec1color'>01st</span> Software Training Institute with 100% Placement Assurance Guarantee!!!
                    </h1>
                    
                    <p className='text-sm sm:text-base md:text-lg lg:text-xl mt-3 sm:mt-4 capitalize leading-relaxed' data-aos="fade-right" data-aos-duration="1000">
                        India's 01st IT Training Institute which Provides <span className='homesec1color'>100% Placement Assurance</span> in our Own IT Startup Vetri IT Systems Private Limited also called VIS. Join the leading IT institute in Surandai, offering expert trainers and 100% placement support.
                    </p>
                    
                    <button data-aos="zoom-in" data-aos-duration="2000"
                        className='contact-us mt-4 sm:mt-6 capitalize' 
                        onClick={() => navigate("contact-us")}
                    >
                        enroll now
                    </button>
                

                </div>

                {/* Right Image */}
                <div className='w-full lg:w-1/3 flex justify-center lg:justify-end' data-aos="zoom-out-down" data-aos-duration="1000">
                    <img 
                        src={img1} 
                        className='w-[80%] sm:w-[70%] md:w-[60%] lg:w-full max-w-[400px]' 
                        alt="Group illustration"
                    />
                </div>
            </div>
        </section>
    )
}

export default Homesec1
