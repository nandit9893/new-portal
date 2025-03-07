"use client"
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import axios from "axios";
import toast from "react-hot-toast";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase.js";
import Navbar from "../Components/Navbar.jsx";

const AdminLoginPage = () => {
  const [userLoginIn, setUserLoginIn] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const inputChangeHandler= (event) => {
    const { name, value } = event.target;
    setUserLoginIn((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const loginUser = async () => {
    if (!userLoginIn.email || !userLoginIn.password) {
      toast.error("Both fields are required");
      return;
    }
    const url = `${process.env.NEXT_PUBLIC_STRAPI_SERVER_BASE_URL}/api/admin/login`;
    try {
      const response = await axios.post(url, {
        email: userLoginIn.email,
        password: userLoginIn.password,
      });
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        toast.success(response.data.message); 
        router.push("/AdminEmployer");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const newURL = `${process.env.NEXT_PUBLIC_STRAPI_SERVER_BASE_URL}/api/admin/login/singup`;
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;
      const response = await axios.post(newURL, {
        name: displayName,
        email,
      });
      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        toast.success("Login successful!");
        router.push("/AdminEmployer");
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      toast.error("An error occurred while signing in.");
    }
  };

  return (
    <>
    <Navbar />
    <div className="bg-[#0F0F0F] sm:px-20 sm:py-10 p-5">
      <div className="flex flex-col sm:flex-row sm:gap-0 gap-5 justify-between w-full min-h-screen relative">
        <div className="flex flex-col gap-5 justify-center w-full sm:w-1/3 h-full border-[1px] border-white shadow-2xl p-8 rounded-2xl">
          <p className="text-white text-2xl font-semibold text-center">Admin Login</p>
          <div className="flex flex-col gap-3 w-full">
              <input value={userLoginIn.email} required onChange={inputChangeHandler} name="email" type="email" placeholder="Email" className="text-white text-[16px] border-[1px] border-white rounded-xl px-4 py-3 bg-black w-full placeholder:text-white placeholder:text-lg"/>
              <input value={userLoginIn.password} required onChange={inputChangeHandler} name="password" type="password" placeholder="Password" className="text-white text-[16px] border-[1px] border-white rounded-xl px-4 py-3 bg-black w-full placeholder:text-white placeholder:text-lg"/>
          </div>
          <div className="flex justify-start gap-3 items-center">
            <input type="checkbox" className="peer hidden" id="customCheckbox" />
            <p className="w-4 h-4 flex items-center justify-center bg-violet-700 rounded cursor-pointer peer-checked:bg-violet-900">✓</p>
            <label htmlFor="customCheckbox" className="text-gray-400 peer-checked:text-white cursor-pointer text-[14px]">Remember me</label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <button onClick={loginUser} className="bg-[#309689] rounded-2xl text-white p-2 text-xl font-semibold text-center w-full">Login</button>
            <p className="text-white text-center text-[14px]">Forgot Password ?</p>
            <Link href="/Login" className="text-white text-center text-[18px] bg-black p-2 rounded-2xl border-2 border-white">User Login</Link>
          </div>
          <div className="flex gap-3 items-center w-full">
            <div className="w-full h-[1px] bg-gray-400"></div>
            <p className="text-gray-400">Or</p>
            <div className="w-full h-[1px] bg-gray-400"></div>
          </div>
          <div className="flex justify-center items-center gap-5">
            <Image onClick={loginWithGoogle} src="/google_icon.jpeg" width={50} height={50} alt="Picture of the author" className="w-10 h-10 rounded-full bg-[#0F0F0F] cursor-pointer"/>
          </div>
          <Link href="/AdminSignUp" className="text-white text-center text-[14px]">Don’t have an account ? Signup</Link>
          <div className="flex gap-10 items-center justify-center">
            <p className="text-white text-[14px] font-semibold">Terms & Conditions</p>
            <p className="text-white text-[14px] font-semibold">Support</p>
            <p className="text-white text-[14px] font-semibold">Customer Care</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 sm:w-2/3 w-full h-full mt-[10%]">
          <h4 className="text-white sm:text-7xl text-6xl font-semibold text-center">Welcome Back .!</h4>
          <div className="justify-end gap-1 absolute right-[400px] top-60 hidden sm:flex">
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
            <div className="w-5 h-[2px] bg-[#4D4D4D]"></div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminLoginPage;
