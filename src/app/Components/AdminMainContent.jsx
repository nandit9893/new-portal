"use client"
import React, { useEffect, useState } from "react";
import { FaBell, FaUser, FaSearch, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "../globals.css";
import axios from "axios";
import AdminHeader from "./AdminHeader";

const AdminMainContent = ({ isCollapsed }) => {
  const employeesData = [
    {
      _id: 1,
      name: "Alan Liveli",
      position: "Operations",
      salary: "$45,234",
      mobileNo: "852356412",
    },
    {
      _id: 2,
      name: "Dexter",
      position: "IT Manager",
      salary: "$23,345",
      mobileNo: "625471236",
    },
    {
      _id: 3,
      name: "Alan Liveli",
      position: "Operations",
      salary: "$45,234",
      mobileNo: "785235642",
    },
    {
      _id: 4,
      name: "Dexter",
      position: "IT Manager",
      salary: "$23,345",
      mobileNo: "625471236",
    },
    {
      _id: 5,
      name: "Vasco DIgama",
      position: "Management",
      salary: "$54,090",
      mobileNo: "478937894",
    },
    {
      _id: 6,
      name: "Alan Liveli",
      position: "Operations",
      salary: "$45,234",
      mobileNo: "785235642",
    },
    {
      _id: 7,
      name: "Dexter",
      position: "IT Manager",
      salary: "$23,345",
      mobileNo: "625471236",
    },
    {
      _id: 8,
      name: "Vasco DIgama",
      position: "Management",
      salary: "$54,090",
      mobileNo: "478937894",
    },
    {
      _id: 9,
      name: "Sophia Wilson",
      position: "HR Manager",
      salary: "$60,500",
      mobileNo: "789654123",
    },
    {
      _id: 10,
      name: "James Anderson",
      position: "Finance Analyst",
      salary: "$48,750",
      mobileNo: "654789321",
    },
    {
      _id: 11,
      name: "Emily Carter",
      position: "Marketing Lead",
      salary: "$52,600",
      mobileNo: "741852963",
    },
    {
      _id: 12,
      name: "Michael Brown",
      position: "Software Engineer",
      salary: "$70,000",
      mobileNo: "369852147",
    },
    {
      _id: 13,
      name: "Olivia Taylor",
      position: "Product Manager",
      salary: "$80,200",
      mobileNo: "258147369",
    },
    {
      _id: 14,
      name: "William Scott",
      position: "Data Scientist",
      salary: "$75,450",
      mobileNo: "159753468",
    },
    {
      _id: 15,
      name: "Ava Martinez",
      position: "UI/UX Designer",
      salary: "$55,300",
      mobileNo: "753951852",
    },
    {
      _id: 16,
      name: "Ethan Davis",
      position: "DevOps Engineer",
      salary: "$68,900",
      mobileNo: "852741963",
    },
    {
      _id: 17,
      name: "Liam Wilson",
      position: "Cybersecurity Analyst",
      salary: "$74,500",
      mobileNo: "965874123",
    },
    {
      _id: 18,
      name: "Emma Rodriguez",
      position: "Project Manager",
      salary: "$79,200",
      mobileNo: "896574321",
    },
    {
      _id: 19,
      name: "Noah Johnson",
      position: "AI Engineer",
      salary: "$85,700",
      mobileNo: "789123654",
    },
    {
      _id: 20,
      name: "Isabella Moore",
      position: "Business Analyst",
      salary: "$62,300",
      mobileNo: "951236478",
    },
    {
      _id: 21,
      name: "Mason Lee",
      position: "Quality Assurance",
      salary: "$58,900",
      mobileNo: "753468159",
    },
    {
      _id: 22,
      name: "Mia Thompson",
      position: "Customer Support",
      salary: "$40,600",
      mobileNo: "369741258",
    },
    {
      _id: 23,
      name: "Elijah Clark",
      position: "Network Engineer",
      salary: "$67,200",
      mobileNo: "147258369",
    },
    {
      _id: 24,
      name: "Charlotte Hall",
      position: "Legal Advisor",
      salary: "$92,400",
      mobileNo: "951753468",
    },
  ];

  const [prevIndex, setPrevIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(10);
  const [hrData, setHrData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.NEXT_PUBLIC_STRAPI_SERVER_BASE_URL}/api/hr/data`
      try {
        const response = await axios.get(url);
        setHrData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
      }
    };
    fetchData();
  }, []);
  
  const previousData = () => {

  }

  const nextData = () => {
  }
  
  return (
    <div className={`flex flex-col gap-3 min-h-screen transition-all duration-300 ease-in-out ${ isCollapsed ? "w-full" : "w-3/5 sm:w-4/5"}`}>
      <AdminHeader />
      <p className="text-2xl text-black font-semibold p-2 text-center bg-gray-200 rounded-2xl">Dashboard</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center gap-5 place-items-center">
        <div className="flex flex-col rounded-xl p-3 items-center justify-center border-2 border-gray-300 bg-white w-44 shadow-2xl">
          <p className="text-2xl font-semibold text-black">Views</p>
          <div className="flex gap-2 w-full justify-between items-center">
            <p className="text-xl font-semibold">2,314</p>
            <FaArrowRight className="transform -rotate-45 text-2xl text-green-600" />
          </div>
        </div>
        <div className="flex flex-col rounded-xl p-3 items-center justify-center border-2 border-gray-300 bg-white w-44 shadow-2xl">
          <p className="text-2xl font-semibold text-black">Visits</p>
          <div className="flex gap-2 w-full justify-between items-center">
            <p className="text-xl font-semibold">2,45</p>
            <FaArrowRight className="transform -rotate-45 text-2xl text-red-700" />
          </div>
        </div>
        <div className="flex flex-col rounded-xl p-3 items-center justify-center border-2 border-gray-300 bg-white w-44 shadow-2xl">
          <p className="text-2xl font-semibold text-black">New Users</p>
          <div className="flex gap-2 w-full justify-between items-center">
            <p className="text-xl font-semibold">2,158</p>
            <FaArrowRight className="transform -rotate-45 text-2xl text-green-600" />
          </div>
        </div>
        <div className="flex flex-col rounded-xl p-3 items-center justify-center border-2 border-gray-300 bg-white w-44 shadow-2xl">
          <p className="text-2xl font-semibold text-black">Active Users</p>
          <div className="flex gap-2 w-full justify-between items-center">
            <p className="text-xl font-semibold">1088</p>
            <FaArrowRight className="transform rotate-45 text-2xl text-red-700" />
          </div>
        </div>
      </div>
      <div className="flex flex-col border-[1px] h-full w-full border-black rounded-2xl">
        <div className="flex flex-col p-2 gap-5">
          <div className="flex items-center justify-center gap-10">
            <p className="text-3xl font-semibold text-black text-center">HR Information</p>
            <div className="flex items-center gap-2 p-2 bg-gray-200 rounded-2xl">
              <FaSearch />
              <span className="text-lg">Search</span>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <span className="sm:text-2xl md:text-3xl text-lg font-semibold text-black w-1/4">Name</span>
            <span className="sm:text-2xl md:text-3xl text-lg font-semibold text-black w-1/4 text-center">Position</span>
            <span className="sm:text-2xl md:text-3xl text-lg font-semibold text-black w-1/4 text-center">Salary</span>
            <span className="sm:text-2xl md:text-3xl text-lg font-semibold text-black w-1/4 text-right">Mobile No</span>
          </div>
        </div>
        <hr className="w-full h-[2px] bg-black" />
        <div className="flex flex-col px-2 py-5">
          {
            hrData?.map((item, index) => (
              <div key={item._id} className={`flex justify-between w-full items-center px-2 py-2 rounded-2xl ${ index % 2 != 0 ? "bg-gray-200" : "bg-white"}`}>
                <p className="sm:text-xl text-lg font-normal sm:font-medium text-black w-1/4">{item.name}</p>
                <p className="sm:text-xl text-lg font-normal sm:font-medium text-black w-1/4 text-center">{item.position}</p>
                <p className="sm:text-xl text-lg font-normal sm:font-medium text-black w-1/4 text-center">${item.salary}</p>
                <p className="sm:text-xl text-lg font-normal sm:font-medium text-black w-1/4 text-right">{item.mobile}</p>
              </div>
            ))
          }
        </div>
        {/* <div className="flex justify-end gap-5 p-5">
          <button disabled={prevIndex === 0} onClick={previousData} id={prevIndex === 0 ? undefined : "animation"} className="disabled:cursor-not-allowed w-40 justify-center cursor-pointer flex gap-2 items-center bg-gradient-to-br from-slate-950 to-gray-400 p-3 rounded-2xl">
            <FaArrowLeft className="text-xl text-white font-semibold" />
            <p className="text-white text-lg font-semibold">Previous</p>
          </button>
          <button disabled={nextIndex === employeesData.length} onClick={nextData} id={nextIndex === employeesData.length ? undefined : "animation"}className="disabled:cursor-not-allowed w-40 justify-center cursor-pointer flex gap-2 items-center bg-gradient-to-br from-slate-950 to-gray-400 p-3 rounded-2xl">
            <p className="text-white text-lg font-semibold">Next</p>
            <FaArrowRight className="text-xl text-white font-semibold" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AdminMainContent;
