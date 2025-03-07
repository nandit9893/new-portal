import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaHotel, FaClock, FaLocationArrow } from "react-icons/fa";
import { MdWork } from "react-icons/md"
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

const HomeJobsAvailable = () => {
  const router = useRouter();
  const [jobFromDatabase, setJobFromDatabase] = useState(null);

  const navigateToJobDetails = (id) => {
    router.push(`/JobDetails/${id}`);
  }

  useEffect(() => {
    const fetchLocationsJobsCompanyLocations = async () => {
      const url = `${process.env.NEXT_PUBLIC_STRAPI_SERVER_BASE_URL}/api/v1/job/listAllJobs`;
      try {
        const response = await axios.get(url);
        if (response.data.success) {
          const sortedJobs = response.data.jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setJobFromDatabase(sortedJobs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocationsJobsCompanyLocations();
  }, []);

  const timeAgo = (timestamp) => {
    const now = new Date();
    const postedDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postedDate) / 1000);
    if (diffInSeconds < 60) {
      return `${diffInSeconds} sec ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} min ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="bg-white sm:p-20 p-5 flex flex-col gap-4">
      <h4 className="sm:text-4xl text-3xl text-black font-semibold text-left">MBA/BBA Jobs Available</h4>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row w-full justify-between items-center">
          <p className="text-lg text-black sm:text-left text-center">Elite jobs for elite minds - start your journey!</p>
          <p className="text-[#309689] text-lg font-semibold underline sm:mt-0 mt-3">View all</p>
        </div>
        <div className="flex flex-col gap-8">
          {
            jobFromDatabase && jobFromDatabase.map((item) => (
              <div className="sm:p-10 p-5 flex flex-col gap-4 w-full shadow-2xl rounded-2xl" key={item._id}>
                <div className="flex justify-between items-center w-full">
                    <p className="text-[#309689] bg-green-100 px-4 py-2 rounded-2xl">{timeAgo(item.createdAt)}</p>
                    <Bookmark className="text-black text-2xl"/>
                </div>
                <div className="flex items-center gap-5">
                  <Image src="/job.jpeg" className="rounded-full" width={40} height={40} style={{width: "auto"}} alt="Picture of the author"/>
                  <div className="flex flex-col gap-1">
                    <p className="text-xl font-semibold">{capitalizeWords(item.jobTitle)}</p>
                    <p className="text-lg font-medium">{capitalizeWords(item.company)}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-10 gap-5">
                    {
                      item.category && (
                        <div className="flex gap-3 items-center">
                          <FaHotel className="text-xl text-[#309689]" />
                          <p className="text-gray-600">{capitalizeWords(item.category)}</p>
                        </div>
                      )
                    }
                    {
                      item.jobType && (
                        <div className="flex gap-3 items-center">
                          <FaClock className="text-xl text-[#309689]" />
                          <p className="text-gray-600">{capitalizeWords(item.jobType)}</p>
                        </div>
                      )
                    }
                    {
                      item.location && (
                        <div className="flex gap-3 items-center">
                          <FaLocationArrow className="text-xl text-[#309689]" />
                          <p className="text-gray-600">{capitalizeWords(item.location)}</p>
                        </div>
                      )
                    }
                    {
                      item.experience && (
                        <div className="flex gap-3 items-center">
                          <MdWork className="text-xl text-[#309689]" />
                          <p className="text-gray-600">{item.experience} experience</p>
                        </div>
                      )
                    }
                  </div>
                  <p onClick={()=>navigateToJobDetails(item._id)} className="cursor-pointer text-white bg-[#309689] px-4 py-2 rounded-2xl">Job Details</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default HomeJobsAvailable;
