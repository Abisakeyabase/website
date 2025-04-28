import React, { useEffect, useState } from 'react'
import '../css/Home.css'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faUser, faFile } from '@fortawesome/free-solid-svg-icons';
import img from '../images/image.png'

const ContactUs = () => {
    const [msg, setMsg] = useState(false)
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        whatsapp_number: "",
        enquiry_type: "",
    });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        whatsapp_number: "",
        enquiry_type: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
            newErrors.name = "Name should only contain letters and spaces";
            isValid = false;
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        // WhatsApp number validation
        if (!formData.whatsapp_number.trim()) {
            newErrors.whatsapp_number = "WhatsApp number is required";
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(formData.whatsapp_number)) {
            newErrors.whatsapp_number = "Please enter a 10-digit phone number";
            isValid = false;
        }

        // Enquiry type validation
        if (!formData.enquiry_type) {
            newErrors.enquiry_type = "Please select an enquiry type";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/contact-us/", formData);
            setMessage(response.data.message);
            alert("Submitted successfully");
            setMsg(true);
            setInterval(() => {
                setMsg(false);
            }, 3000);
            
            // Reset form after successful submission
            setFormData({
                name: "",
                email: "",
                whatsapp_number: "",
                enquiry_type: "",
            });
        } catch (error) {
            if (error.response && error.response.data) {
                // Handle backend validation errors
                const backendErrors = error.response.data;
                const newErrors = { ...errors };
                
                if (backendErrors.name) {
                    newErrors.name = backendErrors.name.join(' ');
                }
                if (backendErrors.email) {
                    newErrors.email = backendErrors.email.join(' ');
                }
                if (backendErrors.whatsapp_number) {
                    newErrors.whatsapp_number = backendErrors.whatsapp_number.join(' ');
                }
                if (backendErrors.enquiry_type) {
                    newErrors.enquiry_type = backendErrors.enquiry_type.join(' ');
                }
                
                setErrors(newErrors);
            } else {
                setMessage("An error occurred. Please try again.");
                console.error("Error submitting form:", error.message);
            }
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className='sec pt-30'>
            {msg && <p className='m-auto w-fit border p-2 bg-red-400 text-white text-lg rounded-lg capitalize absolute ml-[50%] top-10'>Form saved successfully</p>}
            
            <div className='flex flex-col md:flex-row lg:flex-row p-5 lg:p-10 gap-5 lg:gap-10'>
                {/* Left Column */}
                <div className='w-full lg:w-[50%] gradient-border'>
                    <div className='p-3 lg:p-5' data-aos="fade-up">
                        <h1 className='contactus-title capitalize font-bold text-2xl lg:text-3xl'>contact us</h1>
                        <p className='mt-3 lg:mt-5 px-2 lg:px-4 text-base lg:text-lg'>Let us know your queries, feedbacks, and enquiries.
                            We are here to support you 10.00 AM to 07.00 PM -
                            Monday to Saturday (Excluding Public Tamilnadu
                            Holidays)</p>
                        <div className="mt-4 lg:mt-6 space-y-1 ml-2 lg:ml-5">
                            <div className="flex mt-2 lg:mt-4 items-center gap-2 text-black text-base lg:text-lg">
                                <span className='footer-textcolor text-black flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full'><FontAwesomeIcon icon={faPhone} /></span>
                                <div className='flex flex-col ml-3 lg:ml-6'>
                                    <h1 className='capitalize'>give as a call</h1>
                                    <h1 className='capitalize font-semibold text-xs lg:text-sm'>8438164827 / 8438781327</h1>
                                </div>
                            </div>
                            <div className="flex mt-6 lg:mt-10 items-center gap-2 text-black text-base lg:text-lg">
                                <span className='footer-textcolor text-black flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full'><FontAwesomeIcon icon={faEnvelope} /></span>
                                <div className='flex flex-col ml-3 lg:ml-6'>
                                    <h1 className='capitalize'>write to us</h1>
                                    <h1 className='capitalize font-semibold text-xs lg:text-sm'>joinvts@vetriit.com</h1>
                                </div>
                            </div>

                            <div className="flex mt-6 lg:mt-10 items-center gap-2 text-black text-base lg:text-lg">
                                <span className='footer-textcolor text-black flex items-center justify-center w-12 lg:w-16 h-8 lg:h-10 rounded-full'><FontAwesomeIcon icon={faLocationDot} /></span>
                                <div className='flex flex-col ml-3 lg:ml-6'>
                                    <h1 className='capitalize'>visit us in surandai @</h1>
                                    <h1 className='capitalize font-semibold text-xs lg:text-sm'>VETRI TECHNOLOGY SOLUTIONS & VETRI IT
                                        SYSTEMS PRIVATE LIMITED, April's Complex,
                                        Shanthi Complex, Surandai, Tenkasi District.</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className='w-full lg:w-[50%] gradient-border' >
                    <div className='p-3 lg:p-5'data-aos="fade-down">
                        <h1 className='contactus-title capitalize font-bold text-2xl lg:text-3xl'>say hello!</h1>
                        <h1 className='capitalize text-lg lg:text-xl mt-3 lg:mt-5'>feel free to stop by and say hi!</h1>
                        <div>
                            <form onSubmit={handleSubmit} className="mt-3 lg:mt-5">
                                <div className="flex flex-col">
                                    <div className="flex">
                                        <span className="contactus-icon flex justify-center w-8 lg:w-10 h-5">
                                            <FontAwesomeIcon icon={faUser} />
                                        </span>
                                        <label className="capitalize">Name</label>
                                    </div>
                                    <input 
                                        className={`contactus-input border p-2 lg:p-3 rounded-lg mt-1 w-full text-base lg:text-xl ${errors.name ? 'border-red-500' : ''}`} 
                                        placeholder="Enter Your Name" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
                                </div>

                                <div className="flex flex-col mt-2 lg:mt-3">
                                    <div className="flex">
                                        <span className="contactus-icon flex justify-center w-8 lg:w-10 h-5">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </span>
                                        <label className="capitalize">Email</label>
                                    </div>
                                    <input 
                                        className={`contactus-input border p-2 lg:p-3 rounded-lg mt-1 w-full text-base lg:text-xl ${errors.email ? 'border-red-500' : ''}`} 
                                        placeholder="Enter Your Email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
                                </div>

                                <div className="flex flex-col mt-2 lg:mt-3">
                                    <div className="flex">
                                        <span className="contactus-icon flex justify-center w-8 lg:w-10 h-5">
                                            <FontAwesomeIcon icon={faPhone} />
                                        </span>
                                        <label className="capitalize">WhatsApp Number</label>
                                    </div>
                                    <input 
                                        className={`contactus-input border p-2 lg:p-3 rounded-lg mt-1 w-full text-base lg:text-xl ${errors.whatsapp_number ? 'border-red-500' : ''}`} 
                                        placeholder="Enter Your WhatsApp Number" 
                                        name="whatsapp_number"
                                        value={formData.whatsapp_number}
                                        onChange={handleChange}
                                        maxLength={10}
                                    />
                                    {errors.whatsapp_number && <span className="text-red-500 text-sm mt-1">{errors.whatsapp_number}</span>}
                                </div>

                                <div className="flex flex-col mt-2 lg:mt-3">
                                    <div className="flex">
                                        <span className="contactus-icon flex justify-center w-8 lg:w-10 h-5">
                                            <FontAwesomeIcon icon={faFile} />
                                        </span>
                                        <label className="capitalize">Select the enquiry you required</label>
                                    </div>
                                    <select 
                                        className={`contactus-input border p-2 lg:p-3 rounded-lg mt-1 w-full ${errors.enquiry_type ? 'border-red-500' : ''}`} 
                                        name="enquiry_type"
                                        value={formData.enquiry_type}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select your request type</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Support Request">Support Request</option>
                                        <option value="Feedback">Feedback</option>
                                    </select>
                                    {errors.enquiry_type && <span className="text-red-500 text-sm mt-1">{errors.enquiry_type}</span>}
                                </div>

                                <div className="flex flex-col mt-4 lg:mt-8">
                                    <button 
                                        type="submit" 
                                        className="contactus-btn border py-2 lg:py-3 capitalize font-bold text-white rounded-lg hover:cursor-pointer"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactUs;