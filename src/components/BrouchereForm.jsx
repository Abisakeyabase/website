import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faEnvelope,faPhone } from '@fortawesome/free-solid-svg-icons';



const BrochureForm = ({ course, closeForm }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        course_id: course.id,
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Special handling for phone number to only allow digits
        if (name === 'phone') {
            const digitsOnly = value.replace(/\D/g, '');
            setFormData({ ...formData, [name]: digitsOnly });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        
        // Clear error when user types
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        // Name validation - only letters and spaces allowed
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        } else if (!/^[a-zA-Z.\s]+$/.test(formData.name)) {
            newErrors.name = "Name should only contain letters, spaces, or initials";
            isValid = false;
        }
        

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
            isValid = false;
        }

        // Phone validation - exactly 10 digits
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be 10 digits";
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

        setIsSubmitting(true);
    
        try {
            const csrfToken = Cookies.get("csrftoken");
            const response = await axios.post(
                "http://127.0.0.1:8000/api/brochure-request/",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,
                    },
                }
            );
    
            if (!response.data.brochure_url) {
                alert("File does not exist. Please try again later.");
                navigate('/');
                setIsSubmitting(false);
                return;
            }
    
            const fileUrl = `http://127.0.0.1:8000${response.data.brochure_url}`;
    
            // Fetch the file and trigger download
            const fileResponse = await axios.get(fileUrl, { responseType: "blob" });
    
            if (fileResponse.status === 200) {
                const url = window.URL.createObjectURL(new Blob([fileResponse.data]));
                const fileName = fileUrl.split('/').pop();
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download",fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
    
                alert(`Brochure downloaded successfully`);
            } else {
                alert("File not found.");
                navigate('/');
            }
    
            closeForm();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error downloading file. Please try again.");
            navigate("/");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
            <div className="contactus-input mt-20 xl:left-[40%] md:left-[30%] sm:left-[1px] fixed flex justify-center items-center top-20 left-3 z-50 bg-white shadow-lg rounded-lg overflow-y-auto ">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                    <div className="flex justify-end">
                        <button onClick={closeForm} className="contactus-input mt-3 rounded-lg border flex justify-center items-center text-xl p-1 w-fit hover:cursor-pointer">
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    
                    <h2 className="nav-companyname text-xl font-bold mt-3 mb-4">Fill the Form to Download Brochure</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <label className="font-bold nav-companyname capitalize">enter your name</label>
                       <div className="flex brouchere-inputdiv ">
                        <i className="flex justify-center items-center w-10 h-10"><FontAwesomeIcon icon={faUser} /></i>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            className={`w-[100%] rounded-md p-1 ${errors.name ? 'border-red-500' : ''}`}
                        />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

                        <label className="font-bold nav-companyname mt-4 capitalize">enter your email</label>
                       <div className="flex brouchere-inputdiv ">
                       <i className="flex justify-center items-center w-10 h-10"><FontAwesomeIcon icon={faEnvelope} /></i>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className={`w-[100%] rounded-md p-1 ${errors.email ? 'border-red-500' : ''}`}
                        />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

                        <label className="font-bold nav-companyname mt-4 capitalize">enter your mobile number</label>
                        <div className="flex brouchere-inputdiv ">
                        <i className="flex justify-center items-center w-10 h-10"><FontAwesomeIcon icon={faPhone} /></i>
                        <input 
                            type="text" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            maxLength={10}
                            className={`w-[100%] rounded-md p-1  ${errors.phone ? 'border-red-500' : ''}`}
                        />
                        </div>
                        {errors.phone && <p className="text-red-500 text-sm mb-2">{errors.phone}</p>}

                        <button 
                            type="submit" 
                            className="footer-div text-white text-xl px-4 py-2 rounded hover:cursor-pointer mt-5" 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit & Download"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BrochureForm;