import React from 'react'
import whatsapp from '../images/whatsapp-icon-2040x2048-8b5th74o-removebg-preview.png'
import { faSquareWhatsapp,faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Whatsapp = () => {
  return (
    <div>
     <div className="fixed bottom-6 right-4 z-50">
    <a
      href="https://wa.me/918438164827"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="whatsapp-icon flex justify-center items-center 
                    w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 
                    rounded-full bg-green-500 text-white text-2xl shadow-lg 
                    hover:scale-105 transition-transform duration-200">
        <FontAwesomeIcon icon={faWhatsapp} />
      </i>
    </a>
  </div>
  </div>
  
  
  )
}

export default Whatsapp


