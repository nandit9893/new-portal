"use client";
import { useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";

export default function PaymentStatus() {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const paymentData = [
    { title: "Payment failed", value: 230, action: "Resume Upload", count: 36 },
    { title: "Payment Complete today", value: 46, action: "Resume Make", count: 24 },
  ];

  return (
    <div className="p-4 w-full">
      {paymentData.map((item, index) => (
        <div
          key={index}
          className={`flex flex-wrap sm:flex-nowrap justify-between items-center px-4 py-3 rounded-lg shadow-md ${
            index % 2 === 0 ? "bg-white" : "bg-gray-100"
          } mb-2 w-full`}
        >
          {/* Title & Amount */}
          <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto">
            <p className="font-medium text-sm sm:text-base">{item.title}</p>
            <p className="font-semibold text-sm sm:ml-4">{item.value}</p>
          </div>

          {/* Action & Count */}
          <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto mt-2 sm:mt-0">
            <p
              className={`text-sm sm:text-base cursor-pointer ${
                index % 2 !== 0 ? "text-green-600" : "text-black"
              }`}
            >
              {item.action}
            </p>
            <p className="font-semibold text-sm sm:ml-4">{item.count}</p>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => toggleExpand(index)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition sm:ml-4 mt-2 sm:mt-0"
          >
            {expanded === index ? <IoIosRemove size={20} /> : <IoIosAdd size={20} />}
          </button>
        </div>
      ))}
    </div>
  );
}
