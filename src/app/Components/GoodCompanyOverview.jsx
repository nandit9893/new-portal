"use client"
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const GoodCompanyOverview = () => {
  return (
    <div className="sm:p-20 p-5 bg-white">
      <div className="flex flex-col gap-10 w-full">
        <div className="flex flex-col sm:flex-col lg:flex-row justify-between w-full gap-10 items-center">
          <Image src="/home_about_bg.png" width={550} height={550} className="rounded-2xl" alt="Picture of the author" />
          <div className="flex flex-col gap-8 w-auto">
            <h4 className="sm:text-6xl text-4xl font-semibold text-black">Good Life Begins With A Good Company</h4>
            <p className="text-gray-600">
              The company we keep shapes our thoughts, influences our decisions,
              and contributes to our personal and professional growth. Positive,
              supportive, and like-minded individuals inspire us to strive for
              better, while toxic or negative influences can hold us back., .
              After all, happiness is not just about success or wealth—it’s
              about the people we share our journey with.
            </p>
            <div className="flex gap-5 items-center">
              <p className="bg-[#309689] text-white px-7 py-3 rounded-2xl">Search Job</p>
              <div className="w-0.5 h-10 bg-gray-300"></div>
              <p className="text-[#309689] text-lg font-semibold underline">Learn more</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-6 lg:gap-0 gap-5 justify-between w-full ">
          <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} viewport={{ once: false, amount: 0.2 }} className="flex flex-col sm:items-center gap-5 w-full sm:w-80">
            <p className="text-[#309689] text-4xl font-semibold">12k +</p>
            <p className="text-2xl font-semibold text-black">Clients worldwide</p>
            <p className="text-gray-600 text-left sm:text-center">
              Connect with top MBA talent worldwide! Our global services match
              businesses with the best MBA professionals for every industry.
              Find your best match today!
            </p>
          </motion.div>
          <div className="flex flex-col sm:items-center gap-5 w-full sm:w-80">
            <p className="text-[#309689] text-4xl font-semibold">20k +</p>
            <p className="text-2xl font-semibold text-black">Active resume</p>
            <p className="text-gray-600 text-left sm:text-center">
              Choose from multiple professional templates and build a polished resume
              in minutes. Upgrade to our paid feature for exclusive designs and advanced
              customization. Start crafting your perfect resume today!
            </p>
          </div>
          <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} viewport={{ once: false, amount: 0.2 }} className="flex flex-col sm:items-center gap-5 w-full sm:w-80">
            <p className="text-[#309689] text-4xl font-semibold">18k +</p>
            <p className="text-2xl font-semibold text-black">Clients worldwide</p>
            <p className="text-gray-600 text-left sm:text-center">
              Multiple companies across various industries, including technology, finance, 
              healthcare, retail, and manufacturing.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GoodCompanyOverview;
