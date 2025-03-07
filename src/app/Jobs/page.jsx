"use client";
import React, { useEffect, useState } from "react";
import JobList from "../Components/Comp";
import Hero from "../Components/Upper";
import JobFilterSidebar from "../Components/Sidebar";
import CompanyCarousel from "../Components/Last";
import axios from "axios";
import Navbar from "../Components/Navbar";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_SERVER_BASE_URL}/api/v1/job/listAllJobs`
        );

        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchAllJobs();
  }, []);
  return (
    <div>
		<Navbar/>
      <Hero />
      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4">
          <JobFilterSidebar jobs={jobs} setFilteredJobs={setFilteredJobs} />
        </aside>

        <main className="w-full md:w-3/4">
          {filteredJobs.length > 0 ? (
            <JobList jobs={filteredJobs} setJobs={setFilteredJobs} />
          ) : (
            <JobList jobs={jobs} setJobs={setJobs} />
          )}
        </main>
      </div>

      <CompanyCarousel />
    </div>
  );
};

export default JobsPage;
