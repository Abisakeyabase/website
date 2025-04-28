import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faStopwatch, faIndianRupeeSign, faDownload } from '@fortawesome/free-solid-svg-icons';

const PaymentDetails = () => {
    const navigate = useNavigate();
    const [enrollmentData, setEnrollmentData] = useState(null);

    useEffect(() => {
        //
        const storedData = localStorage.getItem('paymentSuccessData') || sessionStorage.getItem('paymentSuccessData');
        
        if (!storedData) {
            // If no payment data found, redirect to home
            navigate('/');
            return;
        }
        
        const parsedData = JSON.parse(storedData);
        setEnrollmentData(parsedData);
        
       
        window.scrollTo(0, 0);
    }, [navigate]);

    if (!enrollmentData) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

  

    return (
        <section className='sec pt-20 md:pt-40 pb-10 md:pb-20 px-4'>
        <div className='max-w-4xl mx-auto p-2 md:p-4'>
            <div className='bg-white rounded-lg overflow-hidden'>
                {/* Success Header */}
                <div className='p-4 md:p-6 text-center'>
                    <FontAwesomeIcon 
                        icon={faCheckCircle} 
                        className='text-4xl md:text-5xl text-green-800 mb-3 md:mb-4' 
                    />
                    <h1 className='text-xl md:text-2xl font-bold mt-3 md:mt-5'>Congratulations</h1>
                    <p className='mt-3 md:mt-6 capitalize text-base md:text-lg'>
                        You have successfully enrolled in {enrollmentData.courseData.name}
                    </p>
                </div>
                
                {/* Enrollment Details Table */}
                <div className='p-3 md:p-6'>
                    <div className="overflow-x-auto">
                        <table className="paydetail-div min-w-full text-white rounded-xl">
                            <thead className="">
                                <tr>
                                    <th className="py-2 md:py-3 px-2 md:px-4 text-sm md:text-base border-btext-center">Enrolled ID</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 text-sm md:text-base border-btext-center">Name</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 text-sm md:text-base border-btext-center">Phone</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 text-sm md:text-base border-btext-center">Email</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 text-sm md:text-base border-btext-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 md:py-3 px-2 md:px-4 text-sm md:text-base text-center truncate max-w-[100px]">
                                        {enrollmentData.courseData.id}
                                    </td>
                                    <td className="py-2 md:py-3 px-2 md:px-4 text-sm md:text-base text-center">
                                        {enrollmentData.userData.name}
                                    </td>
                                    <td className="py-2 md:py-3 px-2 md:px-4 text-sm md:text-base text-center">
                                        {enrollmentData.userData.mobile || 'N/A'}
                                    </td>
                                    <td className="py-2 md:py-3 px-2 md:px-4 text-sm md:text-base text-center truncate max-w-[120px] md:max-w-none">
                                        {enrollmentData.userData.email}
                                    </td>
                                    <td className="py-2 md:py-3 px-2 md:px-4 text-sm md:text-base text-center">
                                        <button 
                                            onClick={() => navigate('/payment-invoice')}
                                            className="paydetail-btn text-black font-bold py-1 px-2 md:px-3 rounded flex items-center gap-1 text-xs md:text-sm hover:cursor-pointer"
                                        >
                                            <FontAwesomeIcon icon={faDownload} size="sm" />
                                            <span>Download Invoice</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default PaymentDetails;