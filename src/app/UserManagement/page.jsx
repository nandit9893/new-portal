"use client";
import React, { useState } from "react";
import User from "../Components/Userdetails";
import Nav from "../Components/out";
import PaymentStatus from "../Components/Lastone";
import Side from "../Components/Emailx";
import { FaBars } from "react-icons/fa";

const UserManagementPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar (Hidden on mobile, toggles open) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0 md:w-1/4 lg:w-1/5`}
      >
        <Side />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:pl-6">
        {/* Navbar + Sidebar Toggle Button */}
        <div className="flex justify-between items-center mb-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars className="text-2xl" />
          </button>
          <Nav />
        </div>

        {/* Main Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <User />
          <PaymentStatus />
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
