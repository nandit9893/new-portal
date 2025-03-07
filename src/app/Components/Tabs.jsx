"use client";
import { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Today");

  const tabs = ["Today", "Yesterday", "Week", "Month"];

  return (
    <div className="bg-green-100 rounded-xl p-3 w-full max-w-3xl mx-auto mt-6">
      {/* Tab Container with Scroll on Small Screens */}
      <div className="flex overflow-x-auto md:flex-nowrap flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 min-w-[90px] md:min-w-0 text-center py-2 px-4 rounded-xl text-black font-medium transition-all 
              ${activeTab === tab ? "bg-gray-400 text-white" : "hover:bg-gray-300"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;