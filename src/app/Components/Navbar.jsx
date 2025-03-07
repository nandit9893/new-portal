"use client"
import React, { useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { HiOutlineMenu } from "react-icons/hi";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaMoon, FaSun, FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const [menu, setMenu] = useState("home");
  const [toggle, setToggle] = useState("sun");
  const [openMenus, setOpenMenus] = useState(false);
  const [slide, setSlide] = useState(null);
  const [viewProfile, setViewProfile] = useState(false);
  const [tokenFromLocalStorage, setTokenFromLocalStorage] = useState(false);
  const pathname = usePathname();
  const [_id, setID] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const fetchToken = () => {
    const token = localStorage.getItem("authToken");
    setTokenFromLocalStorage(!!token); // Converts to boolean
  };

  useEffect(() => {
    fetchToken(); 
  }, [pathname]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const url = `${process.env.NEXT_PUBLIC_STRAPI_SERVER_BASE_URL}/api/v1/job/listAllJobs`;
      try {
        const response = await axios.get(url);
        if (response.data.success && response.data.jobs.length > 0) {
          const firstJobId = response.data.jobs[0]._id;
          setID(firstJobId);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
  
    fetchJobDetails();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("authToken");
    const url = `${process.env.NEXT_PUBLIC_STRAPI_SERVER_BASE_URL}/api/getProfile`;
    try {
      const response = await axios.get(url, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setProfileData(response.data.profile);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if(token) {
      fetchUserProfile();
    } else {
      return;
    };
  }, []);
  

  const logOutUser = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("You are not logged in!");
      return;
    }
    localStorage.removeItem("authToken");
    setTokenFromLocalStorage(false);
    const url = `${process.env.NEXT_PUBLIC_STRAPI_SERVER_BASE_URL}/api/v1/auth/logout`;
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
    <div className="flex justify-between items-center px-3 py-5 sm:px-2 sm:py-4 lg:p-6 lg:px-20 bg-black overflow-x-hidden">
      <a href="/" className="flex gap-5 items-center cursor-pointer border-none outline-none">
        <BiShoppingBag className="text-white text-3xl" />
        <h3 className="text-white text-2xl font-semibold">Job Portal</h3>
      </a>
      {
        tokenFromLocalStorage === false ? <HiOutlineMenu className="block sm:hidden text-3xl text-white cursor-pointer" onClick={()=>setOpenMenus((prev) => !prev)} />  : null
      }
      <div className="hidden sm:flex gap-5 items-center">
        <Link href="/" className={`${menu === "home" ? "text-white" : "text-gray-500"} hover:text-gray-300 text-[15px] font-semibold cursor-pointer transition-colors duration-300`} onClick={() => setMenu("home")}>Home</Link>
        <Link href="/Jobs" className={`${menu === "job" ? "text-white" : "text-gray-500"} hover:text-gray-300 text-[15px] font-semibold cursor-pointer transition-colors duration-300`} onClick={() => setMenu("job")}>Jobs</Link>
        <Link href={`/JobDetails/${_id}`}  className={`${menu === "job-details" ? "text-white" : "text-gray-500"} hover:text-gray-300 text-[15px] font-semibold cursor-pointer transition-colors duration-300`} onClick={() => setMenu("job-details")}>Job Details</Link>
        <Link href="/AboutUs" className={`${menu === "about" ? "text-white" : "text-gray-500"} hover:text-gray-300 text-[15px] font-semibold cursor-pointer transition-colors duration-300`} onClick={() => setMenu("about")}>About Us</Link>
        <Link href="/ContactUs" onClick={() => setMenu("contact")} className={`${menu === "contact" ? "text-white" : "text-gray-500"} hover:text-gray-300 text-[15px] font-semibold cursor-pointer transition-colors duration-300`}>Contact Us</Link>
      </div>
      {/* <div className="hidden lg:flex items-center justify-center cursor-pointer p-2 hover:bg-gray-900 hover:shadow-[20px_0_50px_rgba(255,255,255,0.5),inset_20px_0_30px_rgba(255,255,255,0.3)] transition-colors duration-300 rounded-2xl">
        {
          toggle === "sun" ? <FaSun onClick={()=>setToggle("moon")} className="text-white text-xl drop-shadow-[0_0_30px_rgba(255,255,255,1)]" /> : <FaMoon onClick={()=>setToggle("sun")} className="text-white text-xl drop-shadow-[0_0_30px_rgba(255,255,255,1)]" />
        }
      </div> */}
      {
        tokenFromLocalStorage ? 
        (
          <div>
            <div onClick={()=>setViewProfile((prev) => !prev)} className="bg-slate-500 hover:bg-slate-600 cursor-pointer transition-colors duration-300 rounded-full p-2">
              <FaUser className="text-white text-2xl" />
            </div>
            {
              viewProfile && 
              (
                <motion.div 
                  initial={{ x: 6, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="flex flex-col gap-4 px-2 py-3 bg-gradient-to-tr from-slate-950 to-slate-600 rounded-2xl z-50 absolute right-4 w-56 top-16">
                  <Link onClick={()=>setViewProfile(false)} href="/Profile" onMouseEnter={() => setSlide(1)} onMouseLeave={() => setSlide(null)} className={`text-white text-center text-[14px] cursor-pointer font-semibold transition-transform duration-300 ease-in-out ${slide === 1 ? "translate-x-1" : ""}`}>{profileData?.email}</Link>
                  <Link onClick={()=>setViewProfile(false)} href="/MyApplication" onMouseEnter={() => setSlide(2)} onMouseLeave={() => setSlide(null)} className={`text-white text-center text-[14px] cursor-pointer font-semibold transition-transform duration-300 ease-in-out ${slide === 2 ? "translate-x-1" : ""}`}>MY APPLICATION</Link>
                  <Link onClick={()=>setViewProfile(false)} href="/Resume" onMouseEnter={() => setSlide(3)} onMouseLeave={() => setSlide(null)} className={`text-white text-center text-[14px] cursor-pointer font-semibold transition-transform duration-300 ease-in-out ${slide === 3 ? "translate-x-1" : ""}`}>RESUME</Link>
                  <Link onClick={()=>setViewProfile(false)} href="/Payment" onMouseEnter={() => setSlide(4)} onMouseLeave={() => setSlide(null)} className={`text-white text-center text-[14px] cursor-pointer font-semibold transition-transform duration-300 ease-in-out ${slide === 4 ? "translate-x-1" : ""}`}>PAYMENT</Link>
                  <Link onClick={()=>setViewProfile(false)} href="/HelpSupport" onMouseEnter={() => setSlide(5)} onMouseLeave={() => setSlide(null)} className={`text-white text-center text-[14px] cursor-pointer font-semibold transition-transform duration-300 ease-in-out ${slide === 5 ? "translate-x-1" : ""}`}>HELP CENTER</Link>
                  <p onClick={logOutUser} onMouseEnter={() => setSlide(6)} onMouseLeave={() => setSlide(null)} className={`text-white text-center text-[14px] cursor-pointer font-semibold transition-transform duration-300 ease-in-out ${slide === 6 ? "translate-x-1" : ""}`}>LOGOUT</p>
                </motion.div>
              )
            }
          </div>
        )
        :
        <div className="hidden sm:flex items-center gap-7">
          <Link href="/Login" className="text-white text-lg font-semibold">Login</Link>
          <Link href="/Register" className="text-white text-lg font-semibold px-5 py-2 bg-[#309689] rounded-2xl">Register</Link>
        </div>
      }
      <motion.div 
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: openMenus ? 0 : 50, opacity: openMenus ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="flex sm:hidden flex-col gap-2 px-4 py-6 bg-gradient-to-tr from-slate-950 to-slate-600 rounded-2xl z-50 absolute right-4 w-44 top-16">
        <Link onClick={()=>setOpenMenus(false)} href="/" onMouseEnter={() => setSlide(1)} onMouseLeave={() => setSlide(null)} className={`text-white text-[14px] cursor-pointer font-semibold transition-transform duration-300 ease-in-out ${slide === 1 ? "translate-x-1" : ""}`}>Home</Link>
        <hr className="w-full h-2" />
        <Link onClick={()=>setOpenMenus(false)} href="/Jobs" onMouseEnter={() => setSlide(2)} onMouseLeave={() => setSlide(null)} className={`text-white text-[14px] cursor-pointer font-semibold transition-transform duration-300 ease-in-out ${slide === 2 ? "translate-x-1" : ""}`}>Jobs</Link>
        <hr className="w-full h-2" />
        <Link onClick={()=>setOpenMenus(false)} href="/JobDetails" onMouseEnter={() => setSlide(3)} onMouseLeave={() => setSlide(null)} className={`text-white text-[14px] cursor-pointer font-semibold transition-transform duration-300 ease-in-out ${slide === 3 ? "translate-x-1" : ""}`}>Job Details</Link>
        <hr className="w-full h-2" />
        <Link onClick={()=>setOpenMenus(false)} href="/AboutUs" onMouseEnter={() => setSlide(4)} onMouseLeave={() => setSlide(null)} className={`text-white text-[14px] cursor-pointer font-semibold transition-transform duration-300 ease-in-out ${slide === 4 ? "translate-x-1" : ""}`}>About Us</Link>
        <hr className="w-full h-2" />
        <p onMouseEnter={() => setSlide(5)} onMouseLeave={() => setSlide(null)} className={`text-white text-[14px] cursor-pointer font-semibold transition-transform duration-300 ease-in-out ${slide === 5 ? "translate-x-1" : ""}`}>Contact Us</p>
        <Link onClick={()=>setOpenMenus(false)} href="/Login" className="text-white text-lg cursor-pointer font-semibold text-center mt-2">Login</Link>
        <Link onClick={()=>setOpenMenus(false)} href="/Register" className="text-white text-lg cursor-pointer font-semibold px-5 py-2 bg-[#309689] rounded-2xl text-center">Register</Link>
      </motion.div>
    </div>
  );
};

export default Navbar;
