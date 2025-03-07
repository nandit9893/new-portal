"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

export default function User() {
  const employeesData = [
    { name: "Mharde Marshall", role: "Marketing Consultant", status: "Active", id: 26, joinDate: "6/3/22" },
    { name: "Caesar Vance", role: "Operations Manager", status: "Active", id: 35, joinDate: "12/2/22" },
    { name: "Grill Ross", role: "Investment Banker", status: "Inactive", id: 48, joinDate: "4/19/23" },
    { name: "Brielle Williamson", role: "Finance Manager", status: "Suspended", id: 90, joinDate: "1/2/23" },
    { name: "Bradley Greer", role: "Head of Marketing", status: "Active", id: 67, joinDate: "9/4/23" },
    { name: "Ashton Cox", role: "Director of Management", status: "Active", id: 35, joinDate: "6/3/22" },
    { name: "MaDai Rios", role: "IT Manager", status: "Active", id: 48, joinDate: "12/2/22" },
    { name: "Colleen ", role: "Chief Financial Officer", status: "Inactive", id: 90, joinDate: "4/4/23" },
  ];

  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const filteredEmployees = employeesData.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-center sm:text-left">User Management</h1>

      <div className="bg-white p-4 mt-4 rounded-lg shadow-lg">
        {/* Header with Toggle Button */}
        <div className="flex justify-between items-center border-b pb-2">
          <p className="font-semibold text-lg">Employees Details...</p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-lg bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300 transition"
          >
            {isExpanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
          </button>
        </div>

        {/* Search & Filters */}
        {isExpanded && (
          <>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              {/* Search Bar */}
              <div className="flex items-center bg-gray-100 p-2 rounded-md w-full sm:w-72">
                <FaSearch className="text-gray-400 mx-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none w-full"
                />
              </div>

              {/* Sortable Buttons with Proper Spacing */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                {["Status", "User ID", "Join Date", "Options"].map((label, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-center bg-gray-200 px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-gray-300 transition"
                  >
                    {label}
                    <span className="ml-2 flex flex-col">
                      <IoIosArrowUp className="text-xs" />
                      <IoIosArrowDown className="text-xs" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Employee List - Scrollable on Mobile */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full bg-white border rounded-lg shadow-lg text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    {["Employee", "Status", "User ID", "Join Date", "Options"].map((heading, index) => (
                      <th key={index} className="px-4 py-3 text-left whitespace-nowrap">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp, index) => (
                      <tr key={index} className="border-t text-sm hover:bg-gray-50">
                        {/* Employee Name & Role with Radio */}
                        <td className="px-4 py-3 flex items-center gap-2 whitespace-nowrap">
                          <input
                            type="radio"
                            name="employee"
                            value={emp.name}
                            checked={selectedEmployee === emp.name}
                            onChange={() => setSelectedEmployee(emp.name)}
                            className="cursor-pointer"
                          />
                          <div>
                            <p className="font-semibold">{emp.name}</p>
                            <p className="text-xs sm:text-sm text-gray-500">{emp.role}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">{emp.status}</td>
                        <td className="px-4 py-3 text-center">{emp.id}</td>
                        <td className="px-4 py-3 text-center">{emp.joinDate}</td>
                        <td className="px-4 py-3 text-center">...</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-gray-500 py-4">
                        No employees found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

