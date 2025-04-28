import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { faQ } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaBars, FaTimes } from 'react-icons/fa';
import { faAngleDown, faAngleUp, faChartSimple, faPaintbrush, } from '@fortawesome/free-solid-svg-icons';
import BrochureForm from './BrouchereForm'



const CourseDetails = () => {
    const [Course, setCourse] = useState([])
    const [Faq, setFaq] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const [formselectedCourse, formsetSelectedCourse] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/view-courses/${id}/`)
            .then((res) => {
                console.log(res.data)
                setCourse(res.data)
            })
            .catch((error) => {
                console.log("Error fetching course detail", error)
            })
    }, [id])
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/faq/`)
            .then((res) => {
                console.log("Raw FAQs:", res.data);
                const price = Course.price;
                console.log("Course price:", price);

                let filteredFaqs;
                if (price === "10000") {
                    filteredFaqs = res.data.filter(fa => fa.category === "10k");
                    console.log("Category 2 FAQs:", filteredFaqs);
                }
                else if (price === "3000") {
                    filteredFaqs = res.data.filter(fa => fa.category === "3k");
                    console.log("Category 3 FAQs:", filteredFaqs);
                }
                else if (price > "10000") {
                    filteredFaqs = res.data.filter(fa => fa.category === "25k");
                    console.log("Category 1 FAQs:", filteredFaqs);
                }
                else {
                    filteredFaqs = []; // Default: no filtering
                    console.log("No filtering applied.");
                }

                setFaq(filteredFaqs); // Update state once
            })
            .catch((error) => {
                console.error("Error fetching FAQs:", error);
            });
    }, [Course.price]);
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <section className='sec pt-40'>

            <div>
                <div className='block w-[93%] m-auto' data-aos="fade-down-right" data-aos-duration="500">
                    <h1 className='nav-vetri capitalize font-bold text-2xl sm:text-3xl md:text-4xl'>Vetri</h1>
                    <h1 className='nav-companyname text-black capitalize font-bold text-lg sm:text-xl'>technology solutions</h1>
                </div>

                <div className='flex flex-col lg:flex-row mt-5 sm:mt-10' >
                    <div className='w-full lg:w-[50%] px-4 sm:px-8 lg:px-15'>
                        <h1 className='font-bold text-xl sm:text-2xl capitalize' data-aos="fade-right" data-aos-duration="500"
                            data-aos-offset="300"
                            data-aos-easing="ease-in-sine">{Course.name}</h1>
                        <p className='text-justify capitalize mt-5 sm:mt-10 font-semibold text-base sm:text-lg' data-aos="fade-right"
                            data-aos-offset="300"
                            data-aos-easing="ease-in-sine" data-aos-duration="500">{Course.description}</p>
                        <div className='flex flex-col sm:flex-row gap-3 mt-5 sm:mt-10'>
                            <button className='courses-btn text-white capitalize font-bold px-3 py-1 rounded-md hover:cursor-pointer' data-aos="fade-zoom-in"
                                data-aos-easing="ease-in-back"
                                data-aos-delay="500"
                                data-aos-offset="0" onClick={() => formsetSelectedCourse(Course)}>  download syllabus </button>
                            <button
                                className='courses-btn text-white capitalize font-bold px-3 py-1 rounded-lg hover:cursor-pointer' data-aos="fade-zoom-in"
                                data-aos-easing="ease-in-back"
                                data-aos-delay="600"
                                data-aos-offset="0"
                                onClick={() => navigate(`/entroll/${Course.id}`)}
                            >
                                enroll now
                            </button>
                        </div>
                    </div>

                    <div className='w-full lg:w-[50%] mt-5 lg:mt-0' data-aos="zoom-in-up" data-aos-duration="500">
                        <div className='coursedetails-sec2 w-full sm:w-[80%] md:w-[70%] lg:w-[50%] shadow-md m-auto p-3 rounded-lg mt-5'>
                            <div>
                                <img
                                    className='w-full h-auto sm:h-50 m-auto object-cover rounded-lg'
                                    src={`http://127.0.0.1:8000${Course.image}`}
                                    alt={Course.name}
                                />
                            </div>

                            <div className='grid grid-cols-1 gap-2 mt-3'>
                                {[
                                    { label: 'duration', value: `${Course.days} Days` },
                                    { label: 'training mode', value: `${Course.days == "45" ? 'online' : 'online/offline'}` },
                                    { label: 'skill level', value: `${Course.days == "45" ? 'intermediate' : 'expert'}` },
                                    { label: 'certification', value: 'yes' },
                                    { label: 'live class', value: 'yes' },
                                    { label: 'live project training', value: 'yes' },
                                    { label: 'internship offer', value: 'yes' },
                                    { label: 'job offer',
                                         value: Course.days === "45" || 
                                         (Course.name?.toLowerCase().includes("data analytics") || 
                                         Course.name?.toLowerCase().includes("python fullstack training & wfh internship")) ? 'no' : 'yes' },
                                    { label: 'work from home',
                                         value: Course.days === "45" ||
                                          (Course.name?.toLowerCase().includes("data analytics") ||
                                          Course.name?.toLowerCase().includes("python fullstack training & wfh internship")) ? 'no' : 'yes' },
                                          
                                          { label: 'placement assistance', value: `${Course.days == "45" ? '1 week' : '100%'}` },
                                    { label: 'training material', value: 'yes' },
                                    { label: 'training recordings', value: 'yes' }
                                ].map((item, index) => (
                                    <div key={index} className='flex justify-between w-full'>
                                        <h1 className='capitalize font-semibold text-base sm:text-lg md:text-xl'>
                                            {item.label}
                                        </h1>
                                        <h1 className='coursedetails-sec2-h1 capitalize font-semibold text-base sm:text-lg md:text-xl'>
                                            {item.value}
                                        </h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                <div className='mt-10 md:mt-20' data-aos="zoom-in-up"
                    data-aos-anchor-placement="bottom-center" data-aos-duration="500">
                    <div>

                        <h1
                            className='w-full px-4 text-center text-2xl sm:text-3xl md:text-4xl font-semibold mt-6 md:mt-10'
                            dangerouslySetInnerHTML={{
                                __html: (() => {
                                    const name = Course.roadmapname || "";

                                    if (name.toLowerCase().includes("python fullstack")) {
                                        return name.replace(/(python fullstack)/i, '<span class="faq-title font-bold">$1</span>');
                                    } else if (name.toLowerCase().includes("java fullstack")) {
                                        return name.replace(/(java fullstack)/i, '<span class="faq-title font-bold">$1</span>');
                                    } else if (name.toLowerCase().includes("ui/ux designing")) {
                                        return name.replace(/(ui\/ux designing)/i, '<span class="faq-title font-bold">$1</span>');
                                    } else if (name.toLowerCase().includes("data analytics")) {
                                        return name.replace(/(data analytics)/i, '<span class="faq-title font-bold">$1</span>');
                                    } else {
                                        return name;
                                    }
                                })()
                            }}
                        />

                        <img
                            className='w-full max-w-[1200px] m-auto mt-6 md:mt-10 px-4'
                            src={`http://127.0.0.1:8000${Course.roadmapimage}`}
                            alt={Course.name}
                        />
                    </div>

                </div>
               

                {Course.faq_available === "Yes" && (
                    
                    <div className='mt-6 md:mt-10 w-full md:w-[90%] m-auto px-4 md:px-10'>
                         <div>
                <h1 className='w-full px-4 capitalize text-center text-2xl sm:text-3xl md:text-4xl font-semibold mt-6 md:mt-10'>VTS <span className='abt-title'>training programs</span> - frequently asked questions - (FAQ)</h1>

                </div>
                        {Faq.map((faq, index) => (
                            <div
                                key={index}
                                className='faq-div border p-3 md:p-4 mt-4 md:mt-6 rounded-lg shadow-lg'
                                data-aos="fade-up"
                                data-aos-duration="500"
                                data-aos-anchor-placement="top-center"
                            >
                                <div
                                    className='flex justify-between items-center cursor-pointer'
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <h1 className='capitalize text-lg md:text-xl font-bold'>
                                        {faq.question}
                                    </h1>
                                    <span className='text-xl'>
                                        {openIndex === index ? (
                                            <FontAwesomeIcon icon={faAngleUp} />
                                        ) : (
                                            <FontAwesomeIcon icon={faAngleDown} />
                                        )}
                                    </span>
                                </div>

                                {openIndex === index && (
                                    <p className='capitalize text-base md:text-lg font-medium mt-3 transition-all duration-300'>
                                        {faq.answer}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}



            </div>
            {formselectedCourse && (
                <BrochureForm
                    course={formselectedCourse}
                    closeForm={() => formsetSelectedCourse(null)}
                />
            )}
        </section>
    )
}

export default CourseDetails