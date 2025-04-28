
import React, { useEffect, useState } from 'react'
import '../css/Home.css'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams, } from 'react-router-dom';
import BrochureForm from './BrouchereForm';
import certificate_image from '../images/VETRI VEERIYAN V _certificate.851495856a9a2d950195.jpg'

const ItTrainingCourses = () => {
    const [courses, setCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/courses/")
            .then((response) => {
                console.log("Courses log", response.data)
                setCourses(response.data)
            })
            .catch((error) => console.error("Error fetching allpots:", error));
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on page load
    }, []);

    const pythonfullstack = courses.filter((course) => course.findname == "pythonfullstack")
    const javafullstack = courses.filter((course) => course.findname == "javafullstack")
    const uiux = courses.filter((course) => course.findname == "uiux")
    const mern = courses.filter((course) => course.findname == "mern")
    const dataanalytics = courses.filter((course) => course.findname == "data")
    const datascience = courses.filter((course) => course.findname == "datascience")
    const business = courses.filter((course) => course.findname == "business")
    const app = courses.filter((course) => course.findname == "app")
    const testing = courses.filter((course) => course.findname == "testing")
    const amazon = courses.filter((course) => course.findname == "amazon")
    const digital = courses.filter((course) => course.findname == "digital")


    const [formselectedCourse, formsetSelectedCourse] = useState(null);




    // Course section component to avoid repetition
    const CourseSection = ({ title, courses }) => (
        <div>
            <div data-aos="fade-up" className='flex justify-center mt-8 sm:mt-12'>
                <h1 className='font-bold text-xl sm:text-2xl md:text-3xl capitalize'>{title}</h1>
            </div>

            <div className='flex flex-wrap mt-8 sm:mt-15 px-2 sm:px-5 justify-center gap-3 sm:gap-5'>
                {courses.map((course, index) => (
                    <div className=' xl:w-[22%] lg:w-[28%] sm:w-[45%] md:w-[48%] flex flex-col' key={course.id} data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}>
                        <div className='courses-top-style p-2'>
                            <h1 className='p-1 font-bold text-lg sm:text-xl md:text-2xl capitalize'>{course.assistance}</h1>
                            <h1 className='p-1 font-bold text-lg sm:text-xl md:text-2xl capitalize'>{course.liveclasses}</h1>
                        </div>
                        <div className='border border-gray-400 rounded-lg shadow-md flex flex-col h-full'>
                            <div className='p-2 sm:p-3'>
                                <img className='w-full h-40 sm:h-50 rounded-lg object-cover' src={`http://127.0.0.1:8000${course.image}`} alt={course.name} />
                            </div>
                            <div className='flex-grow min-h-[80px] px-2 sm:px-4'>
                                <h1 className=' font-bold text-lg sm:text-xl md:text-xl lg:text-[18px] uppercase text-center line-clamp-3'>
                                    {course.name}
                                </h1>
                            </div>
                            <div className='flex px-1 sm:p-3 py-1 mt-2 sm:mt-4 justify-between'>
                                <h1 className='font-bold capitalize text-xl lg:text-2xl sm:text-lg md:text-xl'>
                                    <i className='pr-2 course-timer'><FontAwesomeIcon icon={faStopwatch} /></i>{course.days} Days
                                </h1>
                                <h1 className='font-bold text-xl lg:text-2xl sm:text-lg md:text-xl'>
                                    <i className='pr-2 course-timer'><FontAwesomeIcon icon={faIndianRupeeSign} /></i>{new Intl.NumberFormat('en-IN').format(course.price)}<span className='text-red-700 text-sm'>+GST</span>
                                </h1>

                            </div>

                            <div className='mt-2 mb-4 flex justify-between pb-4 sm:pb-5 px-4 sm:px-8 py-1 md:p-1'>
                                {course.available == "yes" ? (
                                    <>

                                        <button className='courses-btn text-white capitalize font-bold px-2 sm:px-3 py-1 lg:p-1 rounded-lg hover:cursor-pointer text-sm sm:text-base' onClick={() => formsetSelectedCourse(course)}>download brochure</button>
                                        <button className='courses-btn text-white capitalize font-bold px-2 sm:px-3 py-1 lg:p-1 rounded-lg hover:cursor-pointer text-sm sm:text-base' onClick={() => navigate(`/course-details/${course.id}`)}>know more</button>


                                    </>
                                ) : (
                                    <div className=' w-fit m-auto'>
                                        <button className='courses-btn text-white capitalize font-bold px-2 sm:px-3 py-1 rounded-lg hover:cursor-pointer text-sm sm:text-base'>launching soon</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )


    return (
<div className="overflow-x-hidden md:overflow-visible">

        <section className='sec sm:mt-15'>
            <div>
                <h1 className='flex mt-40 justify-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
                    Our <span className='homesec1color pl-2'>IT Trainings</span>
                </h1>
            </div>
            <div className='flex justify-center mt-4 sm:mt-7 px-2'>
                <h1 className='font-semibold text-lg sm:text-base md:text-lg text-center'>
                    Choosing the best course in IT sector will allow you to grow more professionally
                    and will make increase your social network.
                </h1>
            </div>


            {/* <main className='w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 mx-auto'> */}
            <main className='w-[95%] lg:w-[100%] sm:w-[90%] m-auto'>

            <CourseSection title={<><span className='abt-title'>Python Fullstack</span> Technical Training</>} courses={pythonfullstack} />
                <CourseSection title={<><span className='abt-title'>UI/UX Designing</span> & Training</>} courses={uiux} />
                <CourseSection title={<><span className='abt-title'>Java Fullstack</span> Technical Training</>} courses={javafullstack} />
                <CourseSection title={<><span className='abt-title'>Data Analytics</span> & Training</>} courses={dataanalytics} />
                <CourseSection title={<><span className='abt-title'>Mern Stack</span> Technical Training</>} courses={mern} />
                <CourseSection title={<><span className='abt-title'>Data Science</span> & Training</>} courses={datascience} />
                <CourseSection title={<><span className='abt-title'>Business Analytics</span> & Training</>} courses={business} />
                <CourseSection title={<><span className='abt-title'>Software Testing</span> & Training</>} courses={testing} />
                <CourseSection title={<><span className='abt-title'>Digital Marketing</span> & Training</>} courses={digital} />
                <CourseSection title={<><span className='abt-title'>Amazon Web Services</span> (AWS) & Training</>} courses={amazon} />
                <CourseSection title={<><span className='abt-title'>Mobile App</span> Development & Training</>} courses={app} />
            </main>
            {formselectedCourse && (
                <BrochureForm
                    course={formselectedCourse}
                    closeForm={() => formsetSelectedCourse(null)}
                />
            )}
        </section>
        </div>
    )
}

export default ItTrainingCourses
