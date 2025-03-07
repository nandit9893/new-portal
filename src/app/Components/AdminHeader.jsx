"usec client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AdminHeader = () => {
  const router = useRouter();
  const [adminProfile, setAdminProfile] = useState(null);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const token = localStorage.getItem("authToken");
      const newURL = `${process.env.NEXT_PUBLIC_STRAPI_SERVER_BASE_URL}/api/admin/profile`;
      try {
        const response = await axios.get(newURL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setAdminProfile(response?.data); // ✅ Store data in state
        }        
      } catch (error) {
      }
    };
  
    fetchAdminProfile();
  }, []);

  const logoutAmin = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("You are not logged in!");
      return;
    }
    localStorage.removeItem("authToken");
    const url = `${process.env.NEXT_PUBLIC_STRAPI_SERVER_BASE_URL}/api/admin/logout`;
    try {
      const response = await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(response.data.message || "Logged out successfully");
      router.replace("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Logout failed!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-between items-center w-full p-5 bg-gradient-to-tr from-blue-950 to-blue-500 rounded-2xl relative">
      <div className="flex flex-col gap-1 items-center">
        <p className="text-white text-xl font-semibold">Welcome {adminProfile?.name}</p>
        <p className="text-white text-lg font-normal">Here’s what happening with you today.</p>
      </div>
      <div className="flex gap-3 items-center">
        <FaBell className="text-2xl text-white" />
        <hr className="w-[2px] h-8 bg-white" />
        <FaUser onClick={()=>setShowAdminMenu((prev) =>!prev)} className="text-3xl text-white cursor-pointer" />
      </div>
      {
        showAdminMenu ?
        (
          <div className="flex flex-col absolute right-2 top-20 bg-black p-2 rounded-2xl z-50">
            <p onClick={logoutAmin} className="text-lg font-semibold text-white px-4 cursor-pointer">Logout</p>
          </div>
        )
        :
        null
      }
    </div>
  );
};

export default AdminHeader;
