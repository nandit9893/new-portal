"use client"
import React, { useState } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const NewsBlog = () => {
  const [slide, setSlide] = useState(null);

  return (
    <div className="sm:p-20 p-5 bg-white">
      <div className="flex flex-col gap-5">
        <h3 className="text-4xl font-semibold text-black sm:text-left text-center">News and Blog</h3>
        <div className="flex flex-col sm:flex-row justify-between w-full items-center">
          <p>Metus faucibus sed turpis lectus feugiat tincidunt. Rhocus sed tristique in dolar</p>
          <p className="text-[#309689] text-lg font-semibold underline sm:mt-0 mt-5">View all</p>
        </div>
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-between gap-5 w-full items-center">
          <div className="flex flex-col md:flex-row lg:flex-col gap-5 w-full sm:w-full md:w-full lg:w-1/2 md:items-center">
            <div className="relative">
              <Image src="/newsBlog1.avif" width={700} height={500} alt="Picture of the author" className="w-2xl rounded-2xl h-[450px] md:h-[350px] lg:h-[450px]"/>              
              <p className="absolute top-8 left-6 bg-[#309689] text-white px-5 py-1 text-lg rounded-2xl">News</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-normal text-slate-500">30 March 2024</p>
              <p className="text-2xl font-semibold text-black">How To Avoid The Top Six Most Common Job Interview Mistakes</p>
              <div className="flex gap-5 items-center cursor-pointer" onMouseEnter={()=>setSlide(1)} onMouseLeave={()=>setSlide(null)}>
                <p className="text-[#309689] text-lg font-semibold">Read More</p>
                <FaArrowRight className={`text-[#309689] text-xl transition-transform duration-300 ease-in-out ${slide === 1 ? "translate-x-2" : ""}`}/>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-col gap-5 w-full sm:w-full md:w-full lg:w-1/2 md:items-center">
            <div className="relative">
              <Image src="/newsBlog2.avif" width={700} height={500} alt="Picture of the author" className="w-2xl rounded-2xl h-[450px] md:h-[350px] lg:h-[450px]"/>              
              <p className="absolute top-8 left-6 bg-[#309689] text-white px-5 py-1 text-lg rounded-2xl">News</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-normal text-slate-500">30 March 2024</p>
              <p className="text-2xl font-semibold text-black">How To Avoid The Top Six Most Common Job Interview Mistakes</p>
              <div className="flex gap-5 items-center cursor-pointer" onMouseEnter={()=>setSlide(2)} onMouseLeave={()=>setSlide(null)}>
                <p className="text-[#309689] text-lg font-semibold">Read More</p>
                <FaArrowRight className={`text-[#309689] text-xl transition-transform duration-300 ease-in-out ${slide === 2 ? "translate-x-2" : ""}`}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsBlog;
