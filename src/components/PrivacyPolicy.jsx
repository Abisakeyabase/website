import React from 'react';
import { FaLock, FaShieldAlt, FaEnvelope, FaFileInvoiceDollar, FaExchangeAlt } from 'react-icons/fa';
import '../css/Home.css'
  
const PrivacyPolicy = () => {
  return (
    <div className="sec  min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-25">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Our <span className='abt-title '>Terms</span> & <span className='abt-title'>Conditions</span>
          </h1>
        
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Refund & Returns Policy */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-start mb-6">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                <FaFileInvoiceDollar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">Refund & Returns Policy</h2>
                <div className="mt-4 space-y-4 text-gray-600">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-red-500">•</div>
                    <p className="ml-2">No refunds or returns are applicable after course enrollment and successful payment.</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500">•</div>
                    <p className="ml-2">A refund will be processed only if the candidate is not allocated to any training program after making the payment.</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-yellow-500">•</div>
                    <p className="ml-2">Candidates are advised to carefully review the course details before proceeding with payment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-start mb-6">
              <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
                <FaExchangeAlt className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">Cancellation Policy</h2>
                <div className="mt-4 space-y-4 text-gray-600">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-red-500">•</div>
                    <p className="ml-2">Cancellations are not allowed once the payment has been completed.</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-red-500">•</div>
                    <p className="ml-2">All enrollments are considered final and non-transferable.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-start mb-6">
              <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
                <FaFileInvoiceDollar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">Terms & Conditions</h2>
                <div className="mt-4 space-y-4 text-gray-600">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-purple-500">•</div>
                    <p className="ml-2">By enrolling in any of our courses, you agree to our terms and conditions.</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-purple-500">•</div>
                    <p className="ml-2">Training will be provided based on the selected mode: online, offline, work from home, or work from office.</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-purple-500">•</div>
                    <p className="ml-2">After successful payment, all course materials, training schedules, and job offer details will be shared with the candidate.</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-purple-500">•</div>
                    <p className="ml-2">All communication will be sent to the registered email address or contact number.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="p-8">
            <div className="flex items-start mb-6">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                <FaLock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">Privacy Policy</h2>
                <div className="mt-4 space-y-4 text-gray-600">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500">•</div>
                    <p className="ml-2">We are committed to protecting your privacy and personal data.</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500">•</div>
                    <p className="ml-2">All information collected during registration or payment will be used strictly for training and job placement purposes.</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500">•</div>
                    <p className="ml-2">We do not share your personal information with any third parties without your explicit consent.</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500">•</div>
                    <p className="ml-2">Your data is stored securely and handled in accordance with applicable data protection laws.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Elements */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <FaShieldAlt className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Data Security</h3>
            <p className="text-gray-600">Your information is protected with industry-standard security measures.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <FaLock className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Privacy First</h3>
            <p className="text-gray-600">We never share your data without your explicit permission.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
              <FaEnvelope className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Clear Communication</h3>
            <p className="text-gray-600">All important information will be sent to your registered contacts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;