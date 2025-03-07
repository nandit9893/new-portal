"use client";
import { FaBookmark, FaEye, FaBell } from "react-icons/fa";
import Image from "next/image";

const Header = () => {
  return (
    <div className="bg-teal-700 text-white flex justify-between items-center p-4 rounded-xl">
      {/* Left Side: Welcome Message */}
      <div className="flex items-center space-x-2">
        {/* Hamburger Icon (Only on Mobile) */}
        <button className="md:hidden p-2 text-white text-2xl">
          ☰ {/* Menu Icon */}
        </button>

        <div className="flex flex-col">
          <p className="text-sm font-medium whitespace-nowrap">
            Welcome <span className="font-bold">Divya Sain</span> 👋
          </p>
          <p className="text-xs hidden sm:block">
            Here&#39;s what&apos;s happening with you today.
           </p>

        </div>
      </div>

      {/* Right Side: Icons & Profile */}
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Hide some icons on small screens */}
        <FaBookmark className="text-lg cursor-pointer hover:text-gray-200 hidden sm:block" />
        <FaEye className="text-lg cursor-pointer hover:text-gray-200 hidden sm:block" />
        <FaBell className="text-lg cursor-pointer hover:text-gray-200" />

        {/* Profile Image */}
        <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center border border-white overflow-hidden">

       <Image
              src="/user.png"
              alt="User"
              width={32}  // Match h-8 w-8 (8 * 4 = 32px)
              height={32}
            className="h-full w-full object-cover"
            onError={(e) => (e.target.style.display = "none")}
           />
        </div>
      </div>
    </div>
  );
};

export default Header;