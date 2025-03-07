"use client";
import React, { useState } from "react";
import User from "../Components/Userdetails";
import Nav from "../Components/out";
import PaymentStatus from "../Components/Lastone";
import Side from "../Components/Emailx";
import { FaBars } from "react-icons/fa";

const UserManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
        <User />
    </div>
  );
};

export default UserManagement;