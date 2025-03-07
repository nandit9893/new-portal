"use client";
import React, { useEffect } from "react";
import { BiShoppingBag } from "react-icons/bi";

const Footer = () => {
  useEffect(() => {
    if (!document.querySelector('script[src*="dialogflow-console/fast/messenger/bootstrap.js"]')) {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="bg-black w-full h-[1000px] sm:h-[500px] sm:p-20 p-5 relative">
      <div className="flex flex-col gap-14">
        <div className="flex flex-col sm:flex-row justify-between gap-5 mt-10 w-full">
          <div className="flex flex-col gap-10 w-96">
            <div className="flex gap-5 items-center cursor-pointer">
              <BiShoppingBag className="text-white text-3xl" />
              <h3 className="text-white text-2xl font-semibold">Job Portal</h3>
            </div>
            <p className="text-white text-xl font-semibold">
              Elite jobs for elite minds—start your journey and meet your dream employer!
            </p>
          </div>
          <div className="flex flex-col gap-5 w-36">
            <h4 className="text-white text-2xl">Company</h4>
            <div className="flex flex-col gap-2">
              <p className="text-white text-[15px]">About Us</p>
              <p className="text-white text-[15px]">Our Team</p>
              <p className="text-white text-[15px]">Partners</p>
              <p className="text-white text-[15px]">For Candidate</p>
              <p className="text-white text-[15px]">For Employers</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-36">
            <h4 className="text-white text-2xl">Company</h4>
            <div className="flex flex-col gap-2">
              <p className="text-white text-[15px]">About Us</p>
              <p className="text-white text-[15px]">Our Team</p>
              <p className="text-white text-[15px]">Partners</p>
              <p className="text-white text-[15px]">For Candidate</p>
              <p className="text-white text-[15px]">For Employers</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-96">
            <h4 className="text-white text-2xl">Newsletter</h4>
            <p className="text-gray-300 text-[15px]">Subscribe to our Newsletter</p>
            <input
              type="text"
              className="w-full border-2 border-gray-600 rounded-xl p-3 placeholder:text-gray-500"
              placeholder="Email Address"
            />
            <p className="bg-[#309689] text-white p-3 rounded-xl text-center font-semibold">
              Subscribe Now
            </p>
            <div className="flex gap-2 items-center justify-center">
              <p className="text-gray-300 underline">Privacy Terms</p>
              <p className="text-gray-300 underline">Terms & Conditions</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full -mt-8 sm:mt-0">
          <p className="text-gray-400">Copyright Job Portal 2025, Designed by Team-5</p>
        </div>
      </div>

      {/* Dialogflow Messenger */}
      <df-messenger
  intent="WELCOME"
  chat-title="JobBuddy"
  agent-id="593fa4ae-4881-441d-9659-e78e3f0e860c"
  language-code="en"
></df-messenger>
    </div>
  );
};

export default Footer;