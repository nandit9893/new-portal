import { Briefcase, Building, FileText, Users } from "lucide-react";
import React from "react";

const BestSection = () => {
  return (
    <section className="py-12 px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center gap-10">
      {/* Left Side - Images Grid */}
      <div className="grid grid-cols-2 gap-4 w-full md:w-1/2">
        <div
          className="h-40 sm:h-52 md:h-64 bg-gray-300 rounded-xl bg-cover bg-center"
          style={{ backgroundImage: "url('/bestSec_one.avif')" }}
        ></div>
        <div
          className="h-40 sm:h-52 md:h-64 bg-gray-300 rounded-xl bg-cover bg-center"
          style={{ backgroundImage: "url('/best_sec.avif')" }}
        ></div>
        <div
          className="h-40 sm:h-52 md:h-64 bg-gray-300 rounded-xl col-span-2 bg-cover bg-center"
          style={{ backgroundImage: "url('/best_copy.avif')" }}
        ></div>
      </div>

      {/* Right Side - Text & Icons */}
      <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black leading-snug">
          We’re Only Working <br className="hidden sm:block" /> With The Best
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          We connect top talent with leading employers, ensuring only the best
          opportunities for ambitious professionals like you.
        </p>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6">
          {/* Quality Job */}
          <div className="flex items-center space-x-3">
            <Briefcase className="w-5 sm:w-6 h-5 sm:h-6 text-primaryGreen" />
            <span className="text-black font-medium text-sm sm:text-base">Quality Job</span>
          </div>

          {/* Resume Builder */}
          <div className="flex items-center space-x-3">
            <FileText className="w-5 sm:w-6 h-5 sm:h-6 text-primaryGreen" />
            <span className="text-black font-medium text-sm sm:text-base">Resume Builder</span>
          </div>

          {/* Top Companies */}
          <div className="flex items-center space-x-3">
            <Building className="w-5 sm:w-6 h-5 sm:h-6 text-primaryGreen" />
            <span className="text-black font-medium text-sm sm:text-base">Top Companies</span>
          </div>

          {/* Top Talents */}
          <div className="flex items-center space-x-3">
            <Users className="w-5 sm:w-6 h-5 sm:h-6 text-primaryGreen" />
            <span className="text-black font-medium text-sm sm:text-base">Top Talents</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSection;