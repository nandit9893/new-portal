import React from "react";
import AboutHero from "../Components/AboutHero";
import HowItWork from "../Components/HowItWork";
import VideoSection from "../Components/VideoSection";
import FaqSection from "../Components/FaqSection";
import BestSection from "../Components/BestSection";
import NewsBlog from "../Components/NewsBlog";
import BlogManager from "../Components/BlogManager";
import CreateBlog from "../Components/CreateBlog";
import Navbar from "../Components/Navbar";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <AboutHero />
      <HowItWork />
      <VideoSection />
      <FaqSection />
      <BestSection />
      <NewsBlog />
      {/* <BlogManager/> */}
      {/* <CreateBlog/> */}
    </div>
  );
};

export default AboutUs;
