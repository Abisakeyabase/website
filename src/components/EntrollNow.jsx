import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

const EntrollNow = () => {
    const navigate = useNavigate();
    const [entrollcourse, setEntrolcourse] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [verifyingPayment, setVerifyingPayment] = useState(false);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showTermsPopup, setShowTermsPopup] = useState(false);

    const [userData, setUserData] = useState({
        name: "",
        dob: "",
        mobile: "",
        email: "",
        gstNumber: ""
    });

    // Form validation
    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        const today = new Date().toISOString().split("T")[0];

        if (!userData.name.trim()) {
            errors.name = "Name is required";
        }

        if (!userData.email) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(userData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (!userData.mobile) {
            errors.mobile = "Mobile number is required"
        }
        else if (userData.mobile && !mobileRegex.test(userData.mobile)) {
            errors.mobile = "Please enter a valid 10-digit mobile number";
        }

        if (userData.gstNumber && !gstRegex.test(userData.gstNumber)) {
            errors.gstNumber = "Please enter a valid GST number";
        }
        if (!userData.dob) {
            errors.dob = "Date of Birth is required";
        } else if (userData.dob > today) {
            errors.dob = "Future dates are not allowed for DOB";
        }

        if (!termsAccepted) {
            errors.terms = "You must accept the terms and conditions";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Calculate amounts safely
    const calculateAmounts = () => {
        const price = parseFloat(entrollcourse?.price || 0);
        const baseAmount = price;
        const gstAmount = parseFloat((price * 0.18).toFixed(2));
        const totalAmount = parseFloat((price + gstAmount).toFixed(2));
        return { baseAmount, gstAmount, totalAmount };
    };

    const { baseAmount, gstAmount, totalAmount } = calculateAmounts();

    // Fetch CSRF token on component mount
    useEffect(() => {
        const fetchCSRF = async () => {
            try {
                await axios.get('http://127.0.0.1:8000/api/get-csrf-token/', {
                    withCredentials: true
                });
            } catch (error) {
                console.error("Initial CSRF fetch error:", error);
            }
        };
        fetchCSRF();
    }, []);

    // Fetch course details
    useEffect(() => {
        let isMounted = true;
        axios.get(`http://127.0.0.1:8000/api/entroll/${id}/`)
            .then((res) => {
                if (isMounted) setEntrolcourse(res.data);
            })
            .catch((error) => {
                console.error("Error fetching enroll course detail", error);
                setError("Failed to load course details");
            });

        return () => { isMounted = false };
    }, [id]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        if (formErrors[e.target.name]) {
            setFormErrors({ ...formErrors, [e.target.name]: "" });
        }
    };

    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
        if (formErrors.terms) {
            setFormErrors({ ...formErrors, terms: "" });
        }
    };

    const handleTermsClick = (e) => {
        e.preventDefault();
        setShowTermsPopup(!showTermsPopup);
    };

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setError(null);

        try {
            const scriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
            if (!scriptLoaded) {
                throw new Error("Razorpay SDK failed to load. Are you online?");
            }

            const csrfResponse = await axios.get('http://127.0.0.1:8000/api/get-csrf-token/', {
                withCredentials: true
            });
            const csrfToken = csrfResponse.data.csrftoken;

            const payload = {
                amount: baseAmount,
                course_id: parseInt(entrollcourse.id),
                name: userData.name,
                email: userData.email,
                mobile: userData.mobile || '',
                dob: userData.dob || null,
                gst_number: userData.gstNumber || ''
            };

            const response = await axios.post(
                'http://127.0.0.1:8000/api/initiate-payment/',
                payload,
                {
                    headers: {
                        "X-CSRFToken": csrfToken,
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message || "Payment initiation failed");
            }

            const paymentData = response.data;
            
            const options = {
                key: paymentData.key,
                amount: paymentData.amount,
                currency: paymentData.currency,
                name: paymentData.name,
                description: paymentData.description,
                image: '/logo.png',
                order_id: paymentData.order_id,
                handler: async (razorpayResponse) => {
                    console.log("Payment success, response:", razorpayResponse);
                    setVerifyingPayment(true);
                    try {
                        const verificationResponse = await axios.post(
                            'http://127.0.0.1:8000/api/payment-callback/',
                            {
                                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                                razorpay_order_id: razorpayResponse.razorpay_order_id,
                                razorpay_signature: razorpayResponse.razorpay_signature,
                                enrollment_data: {
                                    ...payload,
                                    base_amount: baseAmount,
                                    gst_amount: gstAmount,
                                    total_amount: totalAmount
                                }
                            },
                            {
                                headers: {
                                    "X-CSRFToken": csrfToken,
                                    "Content-Type": "application/json"
                                },
                                withCredentials: true
                            }
                        );

                        if (verificationResponse.data.success) {
                            localStorage.setItem('paymentSuccessData', JSON.stringify({
                                userData,
                                courseData: entrollcourse,
                                transactionId: razorpayResponse.razorpay_payment_id,
                                amountDetails: {
                                    baseAmount,
                                    gstAmount,
                                    totalAmount
                                },
                                enrollment_id: verificationResponse.data.enrollment_id,
                                date: new Date().toISOString()
                            }));
                            navigate('/payment-success');
                        } else {
                            throw new Error(verificationResponse.data.message || "Payment verification failed");
                        }
                    } catch (error) {
                        console.error("Payment verification error:", error);
                        setError('Payment verification failed. Please contact support.');
                    } finally {
                        setVerifyingPayment(false);
                    }
                },
                prefill: paymentData.prefill,
                notes: paymentData.notes,
                theme: { color: "#3399cc" },
                modal: {
                    ondismiss: () => {
                        alert('Payment window closed. If you already paid, your enrollment will be processed shortly.');
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment error:", error);
            setError(error.message || "Payment failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const isFormValid = () => {
        return (
            userData.name.trim() &&
            userData.email &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email) &&
            termsAccepted
        );
    };

    return (
        <section className='sec pt-40'>
            {verifyingPayment && (
    <div className="payment-loader">
        <p>Verifying payment... Please wait</p>
        <div className="spinner" />
    </div>
)}

            <div className='flex flex-col lg:flex-row'>
                {/* Left Column - Form */}
                <div className='w-full lg:w-[60%] p-3 sm:p-5'>
                    <div className='w-full sm:w-fit m-auto'>
                        <div className='flex flex-col px-4 sm:px-10 border border-gray-300 rounded-lg w-full sm:w-100 py-4 mt-4 sm:mt-6'>
                            <label className='text-lg sm:text-xl capitalize'>Enter your Name*</label>
                            <input type='text' onChange={handleChange} placeholder='Enter Name' name='name' className={`border p-2 w-full sm:w-80 m-auto mt-1 sm:ml-3 rounded-lg ${formErrors.name ? 'border-red-500' : ''}`} required value={userData.name}
                            />
                            {formErrors.name && <p className="text-red-500 text-sm mt-1 ml-3">{formErrors.name}</p>}

                            <label className='text-lg sm:text-xl capitalize mt-3 sm:mt-4'>Enter your date of birth</label>
                            <input
                                type='date'
                                onChange={handleChange}
                                name='dob'
                                className='border p-2 w-full sm:w-80 m-auto mt-1 sm:ml-3 rounded-lg'
                                value={userData.dob}
                                max={new Date().toISOString().split("T")[0]}
                            />
                            {formErrors.dob && <p className="text-red-500 text-sm">{formErrors.dob}</p>}


                            <label className='text-lg sm:text-xl capitalize mt-3 sm:mt-4'>Enter your mobile number</label>
                            <input
                                type='text'
                                onChange={handleChange}
                                placeholder='Enter Mobile Number'
                                name='mobile'
                                className={`border p-2 w-full sm:w-80 m-auto mt-1 sm:ml-3 rounded-lg ${formErrors.mobile ? 'border-red-500' : ''}`}
                                value={userData.mobile}
                                maxLength="10"
                            />
                            {formErrors.mobile && <p className="text-red-500 text-sm mt-1 ml-3">{formErrors.mobile}</p>}

                            <label className='text-lg sm:text-xl capitalize mt-3 sm:mt-4'>Enter your GST number (optional)</label>
                            <input
                                type='text'
                                onChange={handleChange}
                                placeholder='Enter GST number'
                                name='gstNumber'
                                className={`border p-2 w-full sm:w-80 m-auto mt-1 sm:ml-3 rounded-lg ${formErrors.gstNumber ? 'border-red-500' : ''}`}
                                value={userData.gstNumber}
                            />
                            {formErrors.gstNumber && <p className="text-red-500 text-sm mt-1 ml-3">{formErrors.gstNumber}</p>}

                            <label className='text-lg sm:text-xl capitalize mt-3 sm:mt-4'>Enter your email</label>
                            <input
                                type='email'
                                onChange={handleChange}
                                placeholder='Enter Email'
                                name='email'
                                className={`border p-2 w-full sm:w-80 m-auto mt-1 sm:ml-3 rounded-lg ${formErrors.email ? 'border-red-500' : ''}`}
                                required
                                value={userData.email}
                            />
                            {formErrors.email && <p className="text-red-500 text-sm mt-1 ml-3">{formErrors.email}</p>}

                            <div className='flex mt-3 relative'>
                                <input
                                    type='checkbox'
                                    id="termsCheckbox"
                                    className='hover:cursor-pointer'
                                    checked={termsAccepted}
                                    onChange={handleTermsChange}
                                />
                                <label htmlFor="termsCheckbox" className='ml-2 capitalize'>
                                    accept
                                    <span
                                        className='text-blue-500 hover:underline hover:cursor-pointer ml-1'
                                        onClick={handleTermsClick}
                                    >
                                        terms & conditions
                                    </span>
                                </label>




                                {showTermsPopup && (
                                    <div className="p-5 absolute left-60 top-[-90px] z-10 w-100 p-3 bg-white border border-red-300 shadow-md rounded-lg text-sm h-80 overflow-y-auto">
                                        <div>
                                            <p className='m-auto w-fit text-2xl font-bold capitalize'>terms & conditions</p>
                                            <p className='text-lg font-bold mt-3'>Refund & Returns Policy</p>
                                            <ul className='list-disc pl-7 text-[16px]'>
                                                <li>No refunds or returns are applicable after course enrollment and successful payment.</li>
                                                <li>A refund will be processed only if the candidate is not allocated to any training program after making the payment.</li>
                                                <li>Candidates are advised to carefully review the course details before proceeding with payment.</li>
                                            </ul>
                                            <p className='text-lg font-bold'>Cancellation Policy</p>
                                            <ul className='list-disc pl-7 text-[16px]'>
                                                <li>Cancellations are not allowed once the payment has been completed.</li>
                                                <li>All enrollments are considered final and non-transferable.</li>
                                            </ul>
                                            <p className='text-lg font-bold'>Terms & Conditions</p>
                                            <ul className='list-disc pl-7 text-[16px]'>
                                                <li>By enrolling in any of our courses, you agree to our terms and conditions.</li>
                                                <li>Training will be provided based on the selected mode: online, offline, work from home, or work from office.</li>
                                                <li>After successful payment, all course materials, training schedules, and job offer details will be shared with the candidate.</li>
                                                <li>All communication will be sent to the registered email address or contact number.</li>
                                            </ul>
                                            <p className='text-lg font-bold'>Privacy Policy</p>
                                            <ul className='list-disc pl-7 text-[16px]'>
                                                <li>We are committed to protecting your privacy and personal data.</li>
                                                <li>All information collected during registration or payment will be used strictly for training and job placement purposes.</li>
                                                <li>We do not share your personal information with any third parties without your explicit consent.</li>
                                                <li>Your data is stored securely and handled in accordance with applicable data protection laws.</li>
                                            </ul>
                                        </div>
                                        <button className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md text-lg hover:cursor-pointer " onClick={() => setShowTermsPopup(false)}>Close</button>
                                    </div>
                                )}
                            </div>
                            {formErrors.terms && (
                                <p className="text-red-500 text-sm mt-1 ml-7">{formErrors.terms}</p>
                            )}
                            <div className='w-full sm:w-[80%] md:w-[60%] lg:w-[85%] mt-4 m-auto'>
                                <button
                                    disabled={loading}
                                    className={`footer-div w-full px-4 py-3 font-semibold text-base sm:text-lg rounded-lg md:text-sm capitalize text-white hover:cursor-pointer 
                                    ${loading ? 'cursor-not-allowed' :
                                            !isFormValid() ? 'cursor-not-allowed' :
                                                'hover:shadow-lg'}`}
                                    onClick={handlePayment}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-1">
                                            Processing Payment
                                            <span className="dot-1">.</span>
                                            <span className="dot-2">.</span>
                                            <span className="dot-3">.</span>
                                        </span>
                                    ) : "Proceed to Payment"}
                                </button>
                                {error && (
                                    <p className="mt-2 text-red-500 text-sm">{error}</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                {/* Right Column - Course Info */}
                <div className='w-full lg:w-[40%] p-3 sm:p-5'>
                    <div className='border border-gray-400 rounded-lg shadow-md w-full sm:w-[80%] md:w-[60%] lg:w-[85%] m-auto'>
                        <div className='p-3'>
                            <img
                                className="w-full rounded-lg"
                                src={entrollcourse.image ? `http://127.0.0.1:8000${entrollcourse.image}` : "/default-image.jpg"}
                                alt={entrollcourse.name || "Course Image"}
                            />
                        </div>
                        <div className=''>
                            <h1 className='font-bold text-base sm:text-md uppercase text-center px-2'>{entrollcourse.name}</h1>
                        </div>
                           <div className='flex px-1 sm:p-3 py-1 mt-2 sm:mt-4 justify-between'>
                                                       <h1 className='font-bold capitalize text-xl lg:text-2xl sm:text-lg md:text-xl'>
                                                           <i className='pr-2 course-timer'><FontAwesomeIcon icon={faStopwatch} /></i>{entrollcourse.days} Days
                                                       </h1>
                                                       <h1 className='font-bold text-xl lg:text-2xl sm:text-lg md:text-xl'>
                                                           <i className='pr-2 course-timer'><FontAwesomeIcon icon={faIndianRupeeSign} /></i>{new Intl.NumberFormat('en-IN').format(entrollcourse.price)}
                                                       </h1>
                                                   </div>
                    </div>

                    <div className='border border-gray-400 rounded-lg shadow-md w-full sm:w-[80%] md:w-[60%] lg:w-[85%] mt-5 p-3 sm:p-5 m-auto'>
                        <div className='flex justify-between px-3'>
                            <h1 className='capitalize'>Course Price</h1>
                            <h1 className='text-lg sm:text-md'>₹{new Intl.NumberFormat('en-IN').format(baseAmount.toFixed())}</h1>
                        </div>
                        <div className='flex justify-between px-3 mt-2'>
                            <h1 className='capitalize'>GST (18%)</h1>
                            <h1 className='text-lg sm:text-md'>₹{new Intl.NumberFormat('en-IN').format(gstAmount.toFixed())}</h1>
                        </div>
                        <hr className='mt-2 border-gray-400' />
                        <div className='mt-1 flex justify-between px-3'>
                            <h1 className='capitalize text-lg sm:text-lg font-bold'>Total Amount</h1>
                            <h1 className='text-xl sm:text-md font-bold'>₹{new Intl.NumberFormat('en-IN').format(totalAmount.toFixed())}</h1>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default EntrollNow;