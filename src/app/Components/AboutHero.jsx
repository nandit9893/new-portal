import Image from "next/image";
import React from "react";


const AboutHero = () => {
  return (
    <section className="bg-gray-50 py-12 px-4 md:px-8">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
            Empowering MBA & BBA Careers
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Welcome to Job Portal, the ultimate career hub designed exclusively
            for MBA and BBA graduates. We bridge the gap between top-tier
            business talent and leading companies, helping aspiring professionals
            find the right opportunities to thrive in the corporate world.
          </p>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 flex justify-center">
          <Image width ={600} height={600}
            className="w-full max-w-md md:max-w-lg lg:max-w-full h-auto rounded-2xl shadow-lg"
            src="/About.avif"
            alt="Career Opportunities"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;