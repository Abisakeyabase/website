import React from 'react';
import logo from '../images/vtslogo.jpg';
import '../css/Home.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaBars, FaTimes } from 'react-icons/fa';
import { faAngleDown, faAngleUp, faChartSimple, faPaintbrush, } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { faPython, faJava, faReact } from '@fortawesome/free-brands-svg-icons';
import { useLocation } from "react-router-dom";


const Nav = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [showMessage, setShowMessage] = useState(false);

  const toggleMessage = () => {
    setShowMessage(prevState => !prevState);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const location = useLocation();

  const currentPath = location.pathname;

  const isActive = (path) => currentPath.includes(path);

  return (
    <section className="sec fixed top-0 left-0 w-full bg-white z-50 shadow-md">
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center w-full md:w-[30%] p-2">
          <img
            src={logo}
            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full hover:cursor-pointer"
            alt="Logo"
            onClick={() => navigate("/")}
          />
          <div className='block w-[90%] ml-3'>
            <h1 className='nav-vetri capitalize font-bold text-2xl md:text-4xl'>Vetri</h1>
            <h1 className='nav-companyname text-black capitalize font-bold text-lg md:w-[160%] lg:w-[120%]'>technology solutions</h1>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className=" text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes className='hover:cursor-pointer' size={24} /> : <FaBars className='hover:cursor-pointer' size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-evenly items-center w-[50%] gap-4">
          <button
            className={`text-2xl font-bold px-4 py-2 hover:cursor-pointer nav-course-sec ${isActive("training-courses") ? "nav-btn" : ""
              }`} onClick={() => navigate("training-courses")}>IT Trainings</button>
          <button
            className={`text-2xl font-bold px-4 py-2 hover:cursor-pointer nav-course-sec ${isActive("about-us") ? "nav-btn" : ""
              }`} onClick={() => navigate("about-us")}> About Us</button>
        
        </div>
        <div className="hidden md:flex justify-end items-center w-[30%] gap-4">
        <button
            className="contact-us text-lg font-bold px-4 py-2 hover:cursor-pointer hover:border-b-1"
            onClick={() => navigate("contact-us")}
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full py-4 px-2">
          <button className="block w-full text-left px-4 py-2 text-lg font-bold mb-2 hover:bg-gray-100 hover:cursor-pointer"
          onClick={() => {
            navigate("training-courses");
            setIsMenuOpen(false);
          }}>
            IT Training
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-lg font-bold mb-2 hover:bg-gray-100 hover:cursor-pointer"
            onClick={() => {
              navigate("about-us");
              setIsMenuOpen(false);
            }}
          >
            About Us
          </button>
          <button
            className="contact-us block w-full text-left px-4 py-2 text-lg font-bold hover:bg-gray-100 hover:cursor-pointer"
            onClick={() => {
              navigate("contact-us");
              setIsMenuOpen(false);
            }}
          >
            Contact Us
          </button>
        </div>
      )}


    </section>
  );
};

export default Nav;