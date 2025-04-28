import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareInstagram, faLinkedin, faSquareFacebook } from '@fortawesome/free-brands-svg-icons';

import logo from '../images/vtslogo.jpg'
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import fb from '../images/fblogo-removebg-preview.png'
import insta from '../images/pngegg (3).png'
import linkedin from '../images/images-removebg-preview.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import {  useRef } from 'react';



const Footer = () => {
    const navigate = useNavigate()
    const [msg, setmsg] = useState(false)
    function showmsg() {
        setInterval(() => {
            setmsg(true)

        }, 3000);
    }
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const aboutRef = useRef(null);
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.scrollY;
          const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = (scrollTop / windowHeight) * 60;
    
          setIsAtTop(scrollPercent < 10);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
    
      const scrollToSection = () => {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
      };
    
      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

    return (
        <section className='sec'>
             <div>
             <div>
             {!isAtTop && (
    <button
      className="footer-div fixed bottom-24 right-4 z-50 flex justify-center items-center 
                 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-2xl md:text-3xl text-white 
                 rounded-full bg-gray-700 hover:bg-gray-800 transition duration-300 hover:cursor-pointer"
      onClick={scrollToTop}
    >
      ⬆
    </button>
  )}
            </div>

    </div>
            <div className='footer-div mt-10'>
                <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-5">
                    <div className='pl-2 sm:pl-5 lg:pl-10 flex' data-aos="fade-down">
                        <img src={logo} className='flex justify-center items-center rounded-full w-15 h-15 hover:cursor-pointer' onClick={() => navigate('/')}></img>
                        <h1 className="text-xl sm:text-2xl font-bold text-white pl-1"><span className="text-green-400">Vetri</span><br></br> Technology Solutions</h1>
                    </div>

                    <div data-aos="fade-up"
                        data-aos-duration="1000">
                        <h2 className="font-bold text-base sm:text-lg">Quick Links</h2>
                        <ul className="mt-1 sm:mt-2 space-y-1 ml-2 sm:ml-5">
                            <li><a href="/" className="hover:underline text-white text-base sm:text-lg">Home</a></li>
                            <li><a href="about-us" className="hover:underline text-white text-base sm:text-lg">About Us</a></li>
                            <li><a href="training-courses" className="hover:underline text-white text-base sm:text-lg">Courses</a></li>
                            <li><a href="contact-us" className="hover:underline text-white text-base sm:text-lg">Contact Us</a></li>
                            <li><a href="privacy-policy" className="hover:underline text-white text-base sm:text-lg capitalize">terms & conditions</a></li>
                        </ul>
                    </div>

                    <div data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="500">
                        <h2 className="font-bold text-base sm:text-lg">Contact Details</h2>
                        <ul className="mt-1 sm:mt-2 space-y-1 ml-2 sm:ml-5">
                            <li className="flex mt-2 sm:mt-4 items-center gap-2 text-white text-base sm:text-lg">
                                <span className="footer-textcolor text-black px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                                    <FontAwesomeIcon icon={faPhone} size="sm" />
                                </span>
                                <a href="tel:8438164827" className="hover:underline">
                                    8438164827
                                </a>
                            </li>

                            <li className="flex mt-2 sm:mt-4 items-center gap-2 text-white text-base sm:text-lg">
                                <span className='footer-textcolor text-black px-2 py-1 sm:px-3 sm:py-1 rounded-full'>
                                    <FontAwesomeIcon icon={faEnvelope} size="sm" />
                                </span>
                                <a
                                    href="mailto:joinvts@vetriit.com"
                                    className="hover:underline"
                                >
                                    joinvts@vetriit.com
                                </a>
                            </li>

                            <li className="flex mt-2 sm:mt-4 items-center gap-2 text-white text-base sm:text-lg">
                                <span className='footer-textcolor text-black px-2 py-1 sm:px-3 sm:py-1 rounded-full'>
                                    <FontAwesomeIcon icon={faLocationDot} size="sm" />
                                </span>
                                <a href='https://maps.app.goo.gl/RqCyf99mLY6TgiS39' className='hover:underline'>
                                    VTS & VIS, April's Complex, Shanthi Complex, Surandai.

                                </a>
                            </li>
                        </ul>
                    </div>


                    <div data-aos="fade-up">
                        <h2 className="font-bold text-base sm:text-lg">Follow Us</h2>
                        <div className="mt-1 sm:mt-2 flex flex-row justify-start space-x-3">

                            <a href="https://www.instagram.com/vetritechnologysolutions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className=" flex justify-center items-center w-9 h-9 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition duration-300" > <FontAwesomeIcon icon={faSquareInstagram} size="lg" /> </a>

                            <a
                                href="https://www.facebook.com/people/Vetri-Technology-Solutions/61559691146330/?mibextid=ZbWKwL"
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" flex justify-center items-center w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
                            >
                                <FontAwesomeIcon icon={faSquareFacebook} size="lg" />
                            </a>

                            <a
                                href="https://www.linkedin.com/company/vetri-technology-solutions/posts/?feedView=all"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex justify-center items-center w-9 h-9 bg-blue-800 hover:bg-blue-900 text-white rounded-md transition duration-300"
                            >
                                <FontAwesomeIcon icon={faLinkedin} size="lg" />
                            </a>

                        </div>
                    </div>
                </div>
                <div className="text-white text-center py-3 text-sm sm:text-base">
                <p className='text-xl'>Developed & Maintained by <span className="text-green-400 font-semibold uppercase text-xl"><a href='https://vetriitsystems.com/'>VETRI IT Systems Private Limited</a></span></p>
                </div>

            </div>
        
        </section>
    )
}

export default Footer