"use client";
import { Bell, Bookmark, Eye, User2Icon, UserIcon } from "lucide-react";
import Image from "next/image";
import { BiMoneyWithdraw, BiShoppingBag } from "react-icons/bi";
import {
  FaBell,
  FaBlog,
  FaCog,
  FaEnvelope,
  FaLocationArrow,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { MdLiveHelp } from "react-icons/md";
import {
  HiOutlineDocument,
  HiOutlineMenu,
  HiOutlineQuestionMarkCircle,
  HiOutlineUser,
} from "react-icons/hi";
import React, { useEffect, useState } from "react";
import AdminMainContent from "../Components/AdminMainContent";
import GeneralSettings from "../Components/GeneralSettings";
import Tabs from "../Components/Tabs";
import SortableTable from "../Components/SortableTable";
import BlogManager from "../Components/BlogManager";
import JobSearchComponent from "../Components/JobSearchComponent";
import EmailSettings from "../Components/Email";
import Reports from "../Components/Reports";
import UserManagement from "./UserManagement";
import AdminHeader from "./AdminHeader";

const AdminEmployerPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentSideTitle, setCurrentSideTitle] = useState("Dashboard");
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showMenu, setShowMenu] = useState(false);

  const jobData = [
    {
      name: "Banking",
      start: "24-Jan-2025",
      end: "1-Feb-2025",
      priority: "High",
    },
    {
      name: "Finance Jobs",
      start: "07-March-2025",
      end: "NA",
      priority: "Medium",
    },
    {
      name: "IT Manager",
      start: "17-Feb-2025",
      end: "16-March-2025",
      priority: "High",
    },
    {
      name: "Operations Posting",
      start: "03-March-2025",
      end: "NA",
      priority: "Low",
    },
    {
      name: "Consulting Jobs",
      start: "26-Feb-2025",
      end: "20-March-2025",
      priority: "High",
    },
  ];
  const [sortedData, setSortedData] = useState(jobData);
  const sortTable = (key) => {
    const sorted = [...sortedData].sort((a, b) =>
      sortOrder === "asc"
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key])
    );
    setSortedData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sideBarDashboard = [
    { _id: 1, title: "Dashboard", icon: <FaStar /> },
    { _id: 2, title: "User Management", icon: <UserIcon /> },
    { _id: 3, title: "Job Management", icon: <User2Icon /> },
    { _id: 4, title: "Payment", icon: <BiMoneyWithdraw /> },
    { _id: 5, title: "Blog", icon: <FaBlog /> },
    { _id: 6, title: "Job Search", icon: <HiOutlineUser /> },
    {
      _id: 7,
      title: "Help and Support",
      icon: <HiOutlineQuestionMarkCircle />,
    },
    { _id: 8, title: "Reports", icon: <HiOutlineDocument /> },
    { _id: 9, title: "Email Support", icon: <FaEnvelope /> },
    { _id: 10, title: "Settings", icon: <FaCog /> },
  ];

  const handleActivity = (title) => {
    setCurrentSideTitle(title);
    setActiveMenu(title);
  };


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setIsCollapsed(true);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  },);


  return (
    <div className="sm:px-5 sm:py-2 flex-col min-h-screen w-full">
      <div className="flex justify-between w-full gap-5 min-h-screen">
        <div
          className={`flex flex-col gap-5 rounded-2xl bg-[#211C84] ${
            isCollapsed ? "w-[70px]" : "w-1/5"
          } min-h-screen transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col gap-2 p-5">
            <div className="flex justify-between items-center">
              {!isCollapsed && (
                <div className="flex gap-2 items-center">
                  <p className="text-2xl font-semibold text-white">
                    JOB PORTAL
                  </p>
                  <BiShoppingBag className="text-2xl text-white font-semibold" />
                </div>
              )}
              <div
                onClick={toggleSidebar}
                className="hover:bg-gray-500 transition-colors duration-300 ease-in-out p-1 rounded-2xl cursor-pointer"
              >
                <HiOutlineMenu className="text-2xl text-white hover:text-black transition-colors duration-300 ease-in-out" />
              </div>
            </div>
            <hr className="w-full h-[2px] bg-white" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 mt-5">
              {sideBarDashboard.slice(0, 6).map((item) => (
                <div
                  onClick={() => handleActivity(item.title)}
                  key={item._id}
                  className={`flex items-center gap-5 ${
                    activeMenu === item.title
                      ? "bg-[#003092]"
                      : null
                  } cursor-pointer hover:bg-[#4635B1] py-2 px-5 rounded-2xl`}
                >
                  <span className="text-lg font-semibold text-white">
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <p className="text-lg font-semibold text-white">
                      {item.title}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div
              onClick={() => setShowMenu((prev) => !prev)}
              className="flex items-center gap-5 cursor-pointer hover:bg-[#4635B1] py-2 px-5 rounded-2xl"
            >
              <span className="text-lg font-semibold text-white">
                <HiOutlineQuestionMarkCircle />
              </span>
              {!isCollapsed && (
                <p className="text-lg font-semibold text-white">
                  Help & Support
                </p>
              )}
            </div>
            {showMenu ? (
              <>
                <hr className="w-full h-[2px] bg-white" />
                <div className="flex flex-col gap-1">
                  {sideBarDashboard.slice(7).map((item) => (
                    <div
                      onClick={() => handleActivity(item.title)}
                      key={item._id}
                      className={`flex items-center gap-5 ${
                        activeMenu === item.title
                          ? "bg-[#003092]"
                          : null
                      } cursor-pointer hover:bg-[#4635B1] py-2 px-5 rounded-2xl`}
                    >
                      <span className="text-lg font-semibold text-white">
                        {item.icon}
                      </span>
                      {!isCollapsed && (
                        <p className="text-lg font-semibold text-white">
                          {item.title}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
        {currentSideTitle === "Dashboard" && (
          <AdminMainContent isCollapsed={isCollapsed} />
        )}
        {currentSideTitle === "Settings" && (
          <div className="flex-1 flex flex-col max-w-screen-xl mx-auto w-full">
            <AdminHeader />
            <main className="p-6">
              <SettingsHeading />
              <GeneralSettings />
            </main>
          </div>
        )}
        {currentSideTitle === "Payment" && (
          <div className="flex-1 flex flex-col max-w-screen-xl mx-auto w-full">
            <AdminHeader />
            <Tabs />
            <div className="overflow-x-auto">
              <SortableTable />
            </div>
          </div>
        )}
        {currentSideTitle === "Job Management" && (
          <div className="flex-1 flex flex-col max-w-screen-xl mx-auto w-full">
            <AdminHeader />
            <div className="flex flex-wrap gap-4 mb-6">
              <select className="p-2 border rounded">
                <option>Timeframe: All-time</option>
                <option>Last 30 days</option>
                <option>Last 7 days</option>
              </select>
              <select className="p-2 border rounded">
                <option>Source: All</option>
                <option>LinkedIn</option>
                <option>Indeed</option>
              </select>
              <select className="p-2 border rounded">
                <option>Medium: All</option>
                <option>Referral</option>
                <option>Direct</option>
              </select>
            </div>

            {/* User Insights */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-white shadow-md rounded-lg text-center">
                <h3 className="text-lg font-bold">Pending</h3>
                <p className="text-xl">500</p>
              </div>
              <div className="p-4 bg-white shadow-md rounded-lg text-center">
                <h3 className="text-lg font-bold">Shortlisted</h3>
                <p className="text-xl">150</p>
              </div>
              <div className="p-4 bg-white shadow-md rounded-lg text-center">
                <h3 className="text-lg font-bold">Hired</h3>
                <p className="text-xl">9800</p>
              </div>
            </div>

            {/* Image */}

            {/* Job Posting Table */}
            <div className="bg-white p-4 shadow-md rounded-lg overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-gray-200">
                    <th
                      className="p-2 cursor-pointer"
                      onClick={() => sortTable("name")}
                    >
                      Job Posting Name ⬆⬇
                    </th>
                    <th
                      className="p-2 cursor-pointer"
                      onClick={() => sortTable("start")}
                    >
                      Start Date ⬆⬇
                    </th>
                    <th
                      className="p-2 cursor-pointer"
                      onClick={() => sortTable("end")}
                    >
                      End Date ⬆⬇
                    </th>
                    <th
                      className="p-2 cursor-pointer"
                      onClick={() => sortTable("priority")}
                    >
                      Priority ⬆⬇
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((job, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{job.name}</td>
                      <td className="p-2">{job.start}</td>
                      <td className="p-2">{job.end}</td>
                      <td className="p-2">{job.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="font-bold mb-2">Job Statistics & Insights</h3>
                <p>
                  Total Jobs Posted Monthly:{" "}
                  <span className="font-bold">900+</span>
                </p>
                <p>
                  Active Jobs: <span className="font-bold">560+</span>
                </p>
                <p>
                  Expired Jobs: <span className="font-bold">150</span>
                </p>
              </div>
              <div className="p-4 bg-white shadow-md rounded-lg">
                <h3 className="font-bold mb-2">Companies & Hiring Insights</h3>
                <p>
                  Top Hiring Companies: <span className="font-bold">60+</span>
                </p>
                <p>
                  List of Pending Jobs: <span className="font-bold">NA</span>
                </p>
                <p>
                  Candidate Hired Daily: <span className="font-bold">10+</span>
                </p>
              </div>
            </div>
          </div>
        )}
        {currentSideTitle === "Blog" && (
          <div
            className={`flex flex-col gap-3 min-h-screen transition-all duration-300 ease-in-out ${
              isCollapsed ? "w-full" : "w-4/5"
            }`}
          >
            <AdminHeader />
            <BlogManager />
          </div>
        )}
        {currentSideTitle === "Job Search" && (
          <div
            className={`flex flex-col gap-3 min-h-screen transition-all duration-300 ease-in-out ${
              isCollapsed ? "w-full" : "w-4/5"
            }`}
          >
            <AdminHeader />
            <JobSearchComponent />
          </div>
        )}
        {currentSideTitle === "Email Support" && (
          <div
            className={`flex flex-col gap-3 min-h-screen transition-all duration-300 ease-in-out ${
              isCollapsed ? "w-full" : "w-4/5"
            }`}
          >
            <AdminHeader />
            <EmailSettings />
          </div>
        )}
        {currentSideTitle === "Reports" && (
          <div
            className={`flex flex-col gap-3 min-h-screen transition-all duration-300 ease-in-out ${
              isCollapsed ? "w-full" : "w-4/5"
            }`}
          >
            <AdminHeader />
            <Reports />
          </div>
        )}
        {currentSideTitle === "User Management" && (
          <div
            className={`flex flex-col gap-3 min-h-screen transition-all duration-300 ease-in-out ${
              isCollapsed ? "w-full" : "w-4/5"
            }`}
          >
            <AdminHeader />
            <UserManagement />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEmployerPage;

const SettingsHeading = () => (
  <div className="bg-gray-300 text-black text-lg md:text-xl font-bold text-center p-3 md:p-4 rounded-lg shadow-md w-full max-w-4xl mx-auto">
    Settings
  </div>
);
