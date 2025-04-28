import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';



const VideoSection = () => {
    const swiperRef = useRef(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        AOS.init({ duration: 3000, once: true });
    }, []);
    
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/videos/', {
                    timeout: 10000,
                });
                setVideos(response.data);
                console.log("Video data:", response.data);
            } catch (err) {
                if (err.code === 'ECONNABORTED') {
                    console.log('Request timed out');
                } else if (err.code === 'ECONNRESET') {
                    console.log('Connection reset by peer');
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) return <div className="text-center py-10 text-lg font-semibold">Loading videos...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error loading videos: {error}</div>;

    const onlineTraineesVideos = videos.filter((v) => v.name === "1");
    const EmployeesVideos = videos.filter((v) => v.name === "2");

    const VideoSliderSection = ({ title, videos }) => (
        <section className="video-section py-10">
            <div className="text-center px-4 sm:px-6 lg:px-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">{title}</h1>
            </div>

            <div className="w-[95%] mx-auto px-2 sm:px-4 md:px-6">
                <Swiper
                    className="custom-swiper"
                    modules={[Pagination, Navigation, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    loop={videos.length > 3}
                    pagination={{ clickable: true }}
                    navigation
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                >
                    {videos.map((video, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col items-center border py-4 px-1 shadow-md border-gray-300 rounded-lg bg-white h-full" data-aos="fade-right"
     data-aos-offset="100"
     data-aos-easing="ease-in-sine">
                                <video
                                    className="aspect-[4/5] w-full max-w-xs object-cover rounded-xl"
                                    controls
                                    preload="metadata"
                                    onPlay={() => {
                                        if (swiperRef.current?.autoplay?.running) {
                                            swiperRef.current.autoplay.stop();
                                        }
                                    }}
                                    onPause={() => {
                                        if (!swiperRef.current?.autoplay?.running) {
                                            swiperRef.current.autoplay.start();
                                        }
                                    }}
                                >
                                    <source
                                        src={`http://127.0.0.1:8000/${video.video}`}
                                        type={`video/${video.video.split('.').pop()}`}
                                    />
                                    Your browser does not support the video tag.
                                </video>
                                <h1  className="footer-div capitalize text-center mt-4 px-1 py-2 text-md text-white w-80 lg:w-70 rounded-lg font-bold h-15 flex justify-center items-center">
                                    {video.video_content}
                                </h1>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );

    return (
        <div className="sec bg-gray-50 mt-10">
            <VideoSliderSection 
                title={<>VTS <span className='abt-title'>Trainees</span> Real World <span className='abt-title'>Learning Experience</span></>}
                videos={onlineTraineesVideos}
            />
             <VideoSliderSection
                title={<><span className='abt-title'>VETRI</span> COMPANIES <span className='abt-title'>Career</span> Journey!!!</>}
                videos={EmployeesVideos}
            />
            {/* <VideoSliderSection
                title={<><span className='abt-title'>VETRI</span> IT SYSTEMS <span className='abt-title'>Offline Employees Experience</span></>}
                videos={offlineEmployeesVideos}
            />  */}
        </div>
    );
};

export default VideoSection;
