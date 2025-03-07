import React from "react";
import Image from "next/image";

const CTA = () => {
  return (
    <div className="bg-white h-[400px] sm:h-[600px] md:h-[550px] sm:p-20 p-5">
      <div className="bg-black h-[300px] sm:h-[400px] md:h-[350px] lg:h-[400px] rounded-2xl w-full flex sm:flex-row flex-col justify-between gap-2 relative">
        <div className="sm:w-1/2 w-full flex flex-col h-full sm:p-10 p-5">
          <p className="text-white text-4xl sm:text-4xl lg:text-5xl font-semibold sm:mt-20 md:mt-10 mt-0">Create A Better <br /> Future For Yourself</p>
          <p className="bg-[#309689] text-white p-3 absolute -bottom-8 sm:left-10 left-44 sm:bottom-5 rounded-2xl">Search Job</p>
        </div>
        <Image src="/cta_img.png" width={500} height={500} alt="Picture of the author" className="sm:w-1/2 w-full h-full rounded-2xl"/>
      </div>
    </div>
  );
};

export default CTA;
