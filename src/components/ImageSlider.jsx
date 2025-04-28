import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

const ImageSlider = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/image-slider/")
            .then((res) => {
                console.log("slider images", res.data)
                setImages(res.data)
            })
            .catch((error) => console.log("Error fetching images", error));
    }, []);
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section className="sec pt-4 md:pt-10 px-4">
            <div className="w-full max-w-[1400px] mx-auto py-4 px-4 md:px-5 shadow-lg border border-gray-200 rounded-lg">
                <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-0">
                    Our <span className="abt-title">Achievements</span> & <span className="abt-title">Memories</span>
                </h1>
                <div className="mt-6 md:mt-10" >
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={10}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        className="rounded-xl"
                        breakpoints={{
                            480: {
                                slidesPerView: 1,
                                spaceBetween: 10
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 15
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 25
                            },
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 30
                            }
                        }}
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <div className="px-1 md:px-2 pb-6 md:pb-10 group relative overflow-hidden" data-aos="fade-up">
                                    <img
                                        src={`http://127.0.0.1:8000${img.image}`}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                                        loading="lazy"
                                    />

                                    <div className="absolute h-11 w-full mt-[83%] inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-80 transition-opacity duration-300 sm:flex items-center justify-center p-4">
                                        <h1 className="text-white text-sm font-bold text-center overflow-hidden w-full capitalize">
                                            {img.content}
                                        </h1>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default ImageSlider;