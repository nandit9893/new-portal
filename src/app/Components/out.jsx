"use client";
import React from "react";
import { FaRegBookmark, FaBell } from "react-icons/fa";
import { BsToggleOn } from "react-icons/bs";
import Image from "next/image";

const Nav = () => {
  return (
    <div className="bg-teal-600 p-4 w-full flex flex-wrap justify-between items-center rounded-xl shadow-md text-white">
      {/* Left Section */}
      <div className="mb-2 sm:mb-0">
        <p className="text-sm font-medium">Welcome, Divya Sain 👋</p>
        <p className="text-xs">Here’s what happening with you today.</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <FaRegBookmark className="text-lg cursor-pointer" />
        <BsToggleOn className="text-2xl cursor-pointer" />
        <FaBell className="text-lg cursor-pointer" />

        {/* Profile Image */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
          <Image
            src="/logo.jpg" // Ensure this is the correct path
            alt="Profile"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
