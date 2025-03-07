"use client";
import React, { useEffect, useState } from "react";
import { FaHotel, FaClock, FaLocationArrow } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import Image from "next/image";
import Head from "next/head";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/app/Components/Navbar";

const JobDetailsPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const router = useRouter();
  const { _id } = useParams();
  const [specificJob, setSpecificJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState(null);
  const [resume, setResume] = useState(null);

  const navigateToJobDetails = (id) => {
    router.push(`/JobDetails/${id}`);
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_SERVER_BASE_URL;
      const jobUrl = `${baseUrl}/api/v1/job/listJobById/${_id}`;
      const allJobsUrl = `${baseUrl}/api/v1/job/listAllJobs`;
      try {
        const jobResponse = await axios.get(jobUrl);
        if (!jobResponse.data.success) return;
        const jobData = jobResponse.data.job;
        setSpecificJob(jobData);
        const allJobsResponse = await axios.get(allJobsUrl);
        if (!allJobsResponse.data.success) return;
        const related = allJobsResponse.data.jobs.filter(
          (job) => job.category === jobData.category && job._id !== _id
        );
        setRelatedJobs(related);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobDetails();
  }, [_id]);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formData.fullName) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email) {
      toast.error("Email is required");
      return;
    }
    if (!formData.phoneNumber) {
      toast.error("Mobile Number is required");
      return;
    }
    if (!formData.message) {
      toast.error("Message is required");
      return;
    }

    const formDataToSend = new FormData(event.target);
    formDataToSend.append("access_key", process.env.NEXT_PUBLIC_FORM_ACCESS_KEY);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Thank you for inquiring us");
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const capitalizeWords = (str) => {
    if (!str) return "";
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

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

  const inputImageHandler = (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("No file selected.");
      return;
    }
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }
    setResume(file);
    toast.success("PDF uploaded successfully.");
  };

  const applyThisJob = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (!token) {
      toast.error("You are not logged in!");
      router.push("/Login");
      return;
    }
    if (!resume) {
      toast.error("Please upload a resume.");
      return;
    }
    const formData = new FormData();
    formData.append("jobId", specificJob._id);
    formData.append("resume", resume);
    const newURL = `${process.env.NEXT_PUBLIC_STRAPI_SERVER_BASE_URL}/api/applications/applyForJob`;
    try {
      const response = await axios.post(newURL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Job Applied Successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <>
    <Navbar />
    <div>
      <div className="bg-gray-100 min-h-screen">
        <Head>
          <title>Job Details</title>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          />
        </Head>
        <header className="bg-black text-white text-center py-4">
          <h1 className="text-3xl font-bold">Job Details</h1>
        </header>
        <main className="max-w-7xl mx-auto p-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3">
                <div className="flex items-center mb-4">
                  <Image
                    src="/hrimg.png"
                    width={50}
                    height={50}
                    alt="Company Logo"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">
                      {capitalizeWords(specificJob?.jobTitle)}
                    </h2>
                    <p className="text-gray-600">
                      {capitalizeWords(specificJob?.company)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 ml-4">
                    {capitalizeWords(specificJob?.category)}
                  </span>
                  <span className="text-gray-600 ml-4">
                    {capitalizeWords(specificJob?.jobType)}
                  </span>
                  {specificJob?.jobPackage ? (
                    <span className="text-gray-600">
                      ${specificJob?.jobPackage}
                    </span>
                  ) : null}
                  <span className="text-gray-600 ml-4">
                    {capitalizeWords(specificJob?.location)}
                  </span>
                  <button
                    className="bg-teal-700 text-white mr-2 px-4 py-0.5 rounded hover:bg-teal-800 transition duration-300"
                    onClick={applyThisJob}
                  >
                    Apply Job
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-2">Job Description</h3>
                <p className="text-gray-700 mb-4">
                  {capitalizeWords(specificJob?.jobDescription)}
                </p>
                <h3 className="text-xl font-bold mb-2">Key Responsibilities</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                  {specificJob?.keyResponsibilities &&
                    specificJob.keyResponsibilities.map((item, index) => (
                      <li key={index}> {capitalizeWords(item)}</li>
                    ))}
                </ul>
                <h3 className="text-xl font-bold mb-2">
                  Preferred Skills and Requirements
                </h3>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                  {specificJob?.skills &&
                    specificJob.skills.map((item, index) => (
                      <li key={index}> {capitalizeWords(item)}</li>
                    ))}
                </ul>
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">Tags:</h3>
                  <span className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                    {capitalizeWords(specificJob?.category)}
                  </span>
                  <span className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                    {capitalizeWords(specificJob?.jobType)}
                  </span>
                  <span className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                    {capitalizeWords(specificJob?.location)}
                  </span>
                  <span className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                    {capitalizeWords(specificJob?.experience)}
                  </span>
                </div>
                <div className="flex flex-col gap-10 items-center mb-6">
                  <span className="mr-2 text-xl font-semibold mb-5">
                    Job Information
                  </span>
                  <div className="flex justify-between items-center w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {specificJob?.category && (
                        <div className="flex gap-3 items-center">
                          <FaHotel className="text-2xl text-[#309689]" />
                          <p className="text-gray-600 text-lg">
                            {capitalizeWords(specificJob.category)}
                          </p>
                        </div>
                      )}
                      {specificJob?.jobType && (
                        <div className="flex gap-3 items-center">
                          <FaClock className="text-2xl text-[#309689]" />
                          <p className="text-gray-600 text-lg">
                            {capitalizeWords(specificJob.jobType)}
                          </p>
                        </div>
                      )}
                      {specificJob?.location && (
                        <div className="flex gap-3 items-center">
                          <FaLocationArrow className="text-2xl text-[#309689]" />
                          <p className="text-gray-600 text-lg">
                            {capitalizeWords(specificJob.location)}
                          </p>
                        </div>
                      )}
                      {specificJob?.experience && (
                        <div className="flex gap-3 items-center">
                          <MdWork className="text-2xl text-[#309689]" />
                          <p className="text-gray-600 text-lg">
                            {specificJob.experience} experience
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    className="p-2 w-full border border-green-700 rounded"
                    type="file"
                    id="resume"
                    name="resume"
                    accept="application/pdf" // Only allow PDFs
                    onChange={inputImageHandler}
                    required
                  />
                </div>
              </div>
              <div className="lg:w-1/3 lg:pl-6">
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <h3 className="text-xl font-bold mb-4">Job Overview</h3>
                  <ul className="text-gray-700">
                    <li className="mb-2">
                      {" "}
                      <strong>Job Title:</strong>{" "}
                      {capitalizeWords(specificJob?.jobTitle)}
                    </li>
                    <li className="mb-2">
                      <strong>Job Type:</strong>{" "}
                      {capitalizeWords(specificJob?.jobType)}
                    </li>
                    <li className="mb-2">
                      <strong>Category:</strong>{" "}
                      {capitalizeWords(specificJob?.category)}
                    </li>
                    <li className="mb-2">
                      <strong>Experience:</strong> {specificJob?.experience}
                    </li>
                    <li className="mb-2">
                      {specificJob?.jobPackage && (
                        <>
                          <strong>Offered Salary:</strong> $
                          {specificJob.jobPackage}
                        </>
                      )}
                    </li>
                    <li className="mb-2">
                      <strong>Location:</strong>{" "}
                      {capitalizeWords(specificJob?.location)}
                    </li>
                  </ul>
                  {/* <iframe
                    className="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62239.35697276339!2d77.61550395!3d12.912139999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae151c9d05f3c7%3A0x7b69aa7e2c0418cd!2sHSR%20Layout%2C%20Bengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1706301453151!5m2!1sen!2sin"
                    allowfullscreen
                    loading="lazy"
                  ></iframe> */}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                  <form onSubmit={submitHandler}>
                    <input
                      name="fullName"
                      type="text"
                      placeholder="Full name"
                      value={formData.fullName}
                      onChange={inputChangeHandler}
                      className="w-full mb-2 p-2 border rounded-md"
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={inputChangeHandler}
                      className="w-full mb-2 p-2 border rounded-md"
                    />
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={inputChangeHandler}
                      className="w-full mb-2 p-2 border rounded-md"
                    />
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={inputChangeHandler}
                      className="w-full mb-2 p-2 border rounded-md"
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-teal-700 text-white px-4 py-2 rounded-md w-full"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {relatedJobs && relatedJobs.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Related Jobs</h2>
              <p className="text-gray-600 mb-6">
                Latest Job Openings Matching Your Skills
              </p>
              <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedJobs?.map((item) => (
                    <div
                      className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm"
                      key={item._id}
                    >
                      <Image
                        src="/operation.jpg"
                        width={50}
                        height={50}
                        alt="Company Logo"
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div className="flex-1 flex-col">
                        <div className="flex justify-between w-full">
                          <h3 className="text-xl font-bold">
                            {capitalizeWords(item?.jobTitle)}
                          </h3>
                          <p
                            onClick={() => navigateToJobDetails(item._id)}
                            className="cursor-pointer text-white bg-[#309689] px-4 py-2 rounded-2xl"
                          >
                            Job Details
                          </p>
                        </div>
                        <p className="text-gray-600">
                          {capitalizeWords(item?.company)}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {timeAgo(item?.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
    </>
  );
};

export default JobDetailsPage;
