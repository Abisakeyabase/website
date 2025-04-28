import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import logo from '../images/vtslogo.jpg';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';

const PaymentInvoice = () => {
    const navigate = useNavigate();
    const [invoiceData, setInvoiceData] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const targetRef = useRef(null);
    const termsRef = useRef(null);
    

    useEffect(() => {
        const storedData = localStorage.getItem('paymentSuccessData') || sessionStorage.getItem('paymentSuccessData');
        if (!storedData) {
            navigate('/');
            return;
        }
        const parsedData = JSON.parse(storedData);
        setInvoiceData({ ...parsedData });
        window.scrollTo(0, 0);
    }, [navigate]);

    const options = {
        margin: 0.5,
        filename: `invoice_${invoiceData?.enrollment_id || 'default'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            if (invoiceData?.enrollment_id) {
                const wrapper = document.createElement('div');
                const invoiceClone = targetRef.current.cloneNode(true);
                const pageBreak = document.createElement('div');
                const termsClone = termsRef.current.cloneNode(true);

                // Important fix:
                termsClone.style.position = 'static';
                termsClone.style.left = '0';
                termsClone.style.display = 'block';

                pageBreak.style.pageBreakBefore = 'always';
                wrapper.appendChild(invoiceClone);
                wrapper.appendChild(pageBreak);
                wrapper.appendChild(termsClone);

    
                // Inject fallback style to override oklch usage
                const style = document.createElement('style');
                style.textContent = `
                    * {
                        color: initial !important;
                        background-color: initial !important;
                        border-color: initial !important;
                    }
                    [style*="oklch"] {
                        color: #000 !important;
                        background-color: #fff !important;
                        border-color: #000 !important;
                    }
                `;
                wrapper.insertBefore(style, wrapper.firstChild);
    
                // Apply inline fallback on cloned elements (for html2canvas to pick up)
                const cleanUnsupportedStyles = (el) => {
                    el.querySelectorAll('*').forEach(child => {
                        const style = getComputedStyle(child);
                        try {
                            if (style.color?.includes('oklch')) child.style.color = '#000';
                            if (style.backgroundColor?.includes('oklch')) child.style.backgroundColor = '#fff';
                            if (style.borderColor?.includes('oklch')) child.style.borderColor = '#000';
                        } catch (err) {
                            console.warn('Style parse error:', err);
                        }
                    });
                };
                cleanUnsupportedStyles(wrapper);
    
                // Generate PDF
                const pdfBlob = await html2pdf()
                    .set(options)
                    .from(wrapper)
                    .outputPdf('blob');
                // Trigger file download in browser
                const blobUrl = URL.createObjectURL(pdfBlob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = `invoice_${invoiceData.userData.name}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl); // Clean up

              
                // Send to backend
                const formData = new FormData();
                formData.append('enrollment_id', invoiceData.enrollment_id);
                formData.append('invoice_pdf', pdfBlob, `invoice_${invoiceData.enrollment_id}.pdf`);
                formData.append('user_email', invoiceData.userData.email);
                formData.append('user_name', invoiceData.userData.name);
                formData.append('course_name', invoiceData.courseData.name);
                formData.append('amount', invoiceData.amountDetails.totalAmount.toFixed(2));
    
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/send-invoice-email-api/',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            

                        },
                    }
                );
                 
                if (response.data.status === 'success') {
                    console.log(response.data)
                    toast.success('Invoice downloaded and email sent successfully!');
                } else {
                    toast.error(`Email sending failed: ${response.data.message || 'Unknown error'}`);
                    console.log(`Email sending failed: ${response.data.message || 'Unknown error'}`);
                }
            }
        } catch (error) {
            console.error('Download error:', error);
            toast.error('Error generating or sending invoice PDF.');
        } finally {
            setIsDownloading(false);
        }
    };
    

    if (!invoiceData) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    const invoiceDate = invoiceData.date
        ? new Date(invoiceData.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
        : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

    return (
        <section className="sec mt-30 lg:mt-30 px-4">
        {/* Download Button */}
        <div className="w-full md:w-[90%] m-auto mb-4 text-right">
          <button
            onClick={handleDownload}
            className="footer-div bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:cursor-pointer"
            disabled={isDownloading}
          >
            {isDownloading ? 'Email sending...' : 'Download Invoice PDF'}
          </button>
        </div>
      
        {/* Invoice PDF Section */}
        <div ref={targetRef} className="w-full md:w-[90%] m-auto p-4 md:p-6 border border-gray-300 rounded-lg" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
      
          {/* Logo and Header */}
          <div className="text-center">
            <img src={logo} alt="Logo" className="w-20 h-20 m-auto rounded-full object-cover" />
            <h1 className="nav-vetri font-bold text-xl md:text-2xl mt-2 capitalize">Vetri</h1>
            <h2 className="text-black font-bold text-base md:text-lg capitalize">Technology Solutions</h2>
          </div>
      
          {/* Title */}
          <h1 className="text-center mt-6 text-2xl font-bold underline">
            IT Training Fees Payment Invoice
          </h1>
      
          {/* Invoice Details */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-base"><strong>Invoice Number:</strong> {invoiceData.enrollment_id}</p>
              <p className="text-base mt-1"><strong>Date:</strong> {invoiceDate}</p>
            </div>
          </div>
      
          <hr className="my-6" />
      
          {/* Bill From / To */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h2 className="font-bold text-lg">Bill From:</h2>
              <p className="text-base mt-1"><strong>GST No:</strong> 33FGPP6566F1Z9</p>
              <p className="text-base mt-2">Vetri Technology Solutions</p>
              <p className="text-base">Old Ward No 17, 1-9-140/29, Sivagurunathapuram, Surandai,</p>
              <p className="text-base">Tenkasi, Tamil Nadu - 627859</p>
              <p className="text-base mt-2">Phone: 8438164827 / 8438781327</p>
            </div>
            <div>
              <h2 className="font-bold text-lg">Bill To:</h2>
              <p className="text-base mt-1"><strong>GST No:</strong> N/A</p>
              <p className="text-base">{invoiceData.userData.name}</p>
              <p className="text-base">{invoiceData.userData.email}</p>
              <p className="text-base">{invoiceData.userData.mobile || 'Phone not provided'}</p>
            </div>
          </div>
      
          {/* Table */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm md:text-base border border-gray-400">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-center">Course Name</th>
                  <th className="border border-gray-300 p-3 text-center">Duration</th>
                  <th className="border border-gray-300 p-3 text-center">Price</th>
                  <th className="border border-gray-300 p-3 text-center">GST (18%)</th>
                  <th className="border border-gray-300 p-3 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 text-center capitalize">{invoiceData.courseData.name}</td>
                  <td className="border border-gray-300 p-3 text-center ">{invoiceData.courseData.days} Days</td>
                  <td className="border border-gray-300 p-3 text-center ">₹{invoiceData.amountDetails.baseAmount.toFixed(2)}</td>
                  <td className="border border-gray-300 p-3 text-center ">₹{invoiceData.amountDetails.gstAmount.toFixed(2)}</td>
                  <td className="border border-gray-300 p-3 text-center  font-semibold">₹{invoiceData.amountDetails.totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
      
          {/* Total Section */}
          <div className="text-right mt-6">
            <p className="text-2xl font-bold">GST (18%): ₹{invoiceData.amountDetails.gstAmount.toFixed(2)}</p>
            <p className="text-2xl font-bold mt-2">Total Paid: ₹{invoiceData.amountDetails.totalAmount.toFixed(2)}</p>
          </div>
      
          {/* Footer Note */}
          <div className="text-center mt-6">
            <p className="text-sm font-bold">
              <i className="text-red-600 text-[12px]"><FontAwesomeIcon icon={faStar} /></i> This is a system generated invoice, signature not required. <i className="text-red-600 text-[12px] "><FontAwesomeIcon icon={faStar} /></i>
            </p>
          </div>
        </div>

  {/* Terms and Conditions Page - Will go on 2nd page due to pageBreak */}
  <div
    ref={termsRef}
    className="w-full md:w-[90%] m-auto p-4 md:p-6 border border-gray-300 rounded-lg"
    style={{ display:'none', fontFamily: "'Josefin Sans', sans-serif" }}
  >
    <div>
      <h2 className="text-center text-2xl font-bold underline mb-6">Terms and Conditions</h2>

      <h3 className="font-bold text-lg mt-4">Refund & Returns Policy</h3>
      <ul className="list-disc pl-6 text-base">
        <li>No refunds or returns are applicable after course enrollment and successful payment.</li>
        <li>A refund will be processed only if the candidate is not allocated to any training program after making the payment.</li>
        <li>Candidates are advised to carefully review the course details before proceeding with payment.</li>
      </ul>

      <h3 className="font-bold text-lg mt-4">Cancellation Policy</h3>
      <ul className="list-disc pl-6 text-base">
        <li>Cancellations are not allowed once the payment has been completed.</li>
        <li>All enrollments are considered final and non-transferable.</li>
      </ul>

      <h3 className="font-bold text-lg mt-4">Terms & Conditions</h3>
      <ul className="list-disc pl-6 text-base">
        <li>By enrolling in any of our courses, you agree to our terms and conditions.</li>
        <li>Training will be provided based on the selected mode: online, offline, work from home, or work from office.</li>
        <li>After successful payment, all course materials, training schedules, and job offer details will be shared with the candidate.</li>
        <li>All communication will be sent to the registered email address or contact number.</li>
      </ul>

      <h3 className="font-bold text-lg mt-4">Privacy Policy</h3>
      <ul className="list-disc pl-6 text-base">
        <li>We are committed to protecting your privacy and personal data.</li>
        <li>All information collected during registration or payment will be used strictly for training and job placement purposes.</li>
        <li>We do not share your personal information with any third parties without your explicit consent.</li>
        <li>Your data is stored securely and handled in accordance with applicable data protection laws.</li>
      </ul>

      <div className="text-center mt-6">
        <p className="text-sm font-bold">
          <i className="text-red-600 text-[12px]"><FontAwesomeIcon icon={faStar} /></i> This is a system generated invoice, signature not required. <i className="text-red-600 text-[12px]"><FontAwesomeIcon icon={faStar} /></i>
        </p>
      </div>
    </div>
  </div>
</section>
    );
};

export default PaymentInvoice;