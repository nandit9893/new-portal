"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaTools, FaBriefcase, FaWrench, FaGraduationCap, FaHandHoldingUsd, FaBus } from "react-icons/fa";
import { BiShoppingBag } from "react-icons/bi";

const Tilt = ({ children, rotationFactor = 15, isReverse = false }) => {
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    const rotateX = (1 - y) * rotationFactor * (isReverse ? -1 : 1);
    const rotateY = (x - 1) * rotationFactor * (isReverse ? -1 : 1);

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transform, transition: "transform 0.1s ease-out" }} className="hover:shadow-lg">
      {children}
    </div>
  );
};

const JobsCategory = () => {
  const jobsCategory = [
    { _id: 1, title: "Agriculture", icon: <FaLeaf />, number: "1254" },
    { _id: 2, title: "Metal Production", icon: <FaTools />, number: "816" },
    { _id: 3, title: "Commerce", icon: <FaBriefcase />, number: "2082" },
    { _id: 4, title: "Construction", icon: <FaWrench />, number: "1520" },
    { _id: 5, title: "Hotel & Tourism", icon: <BiShoppingBag />, number: "1022" },
    { _id: 6, title: "Education", icon: <FaGraduationCap />, number: "1496" },
    { _id: 7, title: "Financial Services", icon: <FaHandHoldingUsd />, number: "1529" },
    { _id: 8, title: "Transport", icon: <FaBus />, number: "1244" },
  ];

  return (
    <div className="bg-green-50 sm:p-20 p-5 flex flex-col gap-10">
      <div className="flex flex-col my-5 items-center gap-5">
        <p className="text-black text-3xl sm:text-5xl font-semibold ">Browse by Category</p>
        <p className="text-black font-normal text-lg text-center">Connecting ambitious MBAs with top companies!</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-10 lg:gap-5 mx-auto">
      {
        jobsCategory.map((item, index) => (
          <Tilt key={item._id}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
              className="flex flex-col cursor-pointer items-center gap-4 rounded-2xl shadow-2xl bg-white w-[280px] h-52 p-10"
            >
              <span className="text-3xl text-[#309689]">{item.icon}</span>
              <p className="text-xl font-semibold text-black">{item.title}</p>
              <p className="text-[#309689] bg-green-100 px-2 text-[13px] py-1 rounded-2xl">
                {item.number} jobs
              </p>
            </motion.div>
          </Tilt>
        ))
      }
      </div>
    </div>
  );
};

export default JobsCategory;
