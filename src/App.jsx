import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Homesec1 from "./components/Homesec1";
import Courses from "./components/Courses";
import './css/Home.css'
import Footer from "./components/Footer";
import CourseDetails from "./components/CourseDetails";
import AboutUs from "./components/AboutUs";
import { useEffect } from "react";
import EntrollNow from "./components/EntrollNow";
import ContactUs from "./components/ContactUs";
import ImageSlider from "./components/ImageSlider";
import PaymentDetails from "./components/PaymentDetails";
import PaymentInvoice from "./components/PaymentInvoice";
import Ex from "./components/ex";
import VideoSection from "./components/VideoSection";
import ScrollToTop from "./components/ScrollToTop";
import PrivacyPolicy from "./components/PrivacyPolicy";
import React from "react";
import Whatsapp from "./components/Whatsapp";
import ItTrainingCourses from "./components/ItTrainingCourses"
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
 
  return (
    <>
    <ScrollToTop/>
    <Nav />
    <Routes>

      <Route path="/" element={
        <>
        <Homesec1 />

        <Courses />

        <ImageSlider/>
        <VideoSection/>


        </>
      }>
      </Route>

      <Route path="course-details/:id" element={
        <>
        <CourseDetails/>
        </>
      }>
      </Route>

      <Route path="about-us" element={
        <>
        <AboutUs/>
        </>
      }>
      </Route>

      
      <Route path="entroll/:id" element={
        <>
        <EntrollNow/>
        </>
      }>
      </Route>

      <Route path="contact-us" element={
        <>
        <ContactUs/>
        </>
      }>
      </Route>
      <Route path="payment-success" element={
        <>
        <PaymentDetails/>
        </>
      }>
      </Route>

      <Route path="payment-invoice" element={<PaymentInvoice/>}/>

      <Route path="ex" element={<Ex />}/>

      <Route path="privacy-policy" element={<PrivacyPolicy />}/>

      <Route path="training-courses" element={<ItTrainingCourses />}/>





      </Routes>
      <Whatsapp/>
      <ErrorBoundary>
      <Footer />

      </ErrorBoundary>

    </>
  );
}

export default App;
