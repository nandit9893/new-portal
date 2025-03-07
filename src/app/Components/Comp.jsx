"use client";
import React from "react";
import { Bookmark, Briefcase, Clock, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

const JobCard = ({ job }) => {
	return (
		<div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 border rounded-lg shadow-md bg-white w-full mx-auto mb-4">
			<div className="flex items-start md:items-center gap-4 w-full">
				<div className="flex-shrink-0 w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
					<img
						src={job.companyLogo}
						alt="Company Logo"
						className="w-12 h-12 rounded-full object-cover"
					/>
				</div>
				<div className="w-full">
					<span className="text-xs text-gray-500">
						{job.createdAt.split("T")[0]}
					</span>
					<h3 className="text-lg sm:text-xl font-bold">
						{job.jobTitle}
					</h3>
					<p className="text-gray-600 text-sm">{job.company}</p>
					<div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 mt-3 text-gray-600 text-sm">
						<div className="flex items-center gap-2">
							<Briefcase size={18} /> {job.category}
						</div>
						<div className="flex items-center gap-2">
							<Clock size={18} /> {job.jobType}
						</div>
						<div className="flex items-center gap-2">
							<DollarSign size={18} />{" "}
							{job.jobPackage ? job.jobPackage : "Not Disclosed"}
						</div>
						<div className="flex items-center gap-2">
							<MapPin size={18} /> {job.location}
						</div>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-4 mt-4 md:mt-0">
				<Bookmark
					className="text-gray-400 cursor-pointer hover:text-gray-600"
					size={22}
				/>
				<Link href={`/JobDetails/${job._id}`}>
					<button className="bg-teal-500 text-white px-4 py-2 rounded-lg whitespace-nowrap">
						Job Details
					</button>
				</Link>
			</div>
		</div>
	);
};

const JobList = ({ jobs, setJobs }) => {

	return (
		<div className="p-4 sm:p-6 w-full">
			{/* Header Section with Job Count & Sort Dropdown */}
			<div className="flex justify-between items-center mb-4">
				<p className="text-gray-600 text-sm">
					Showing 1-{jobs.length} of {jobs.length} results
				</p>
				<select className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 cursor-pointer">
					<option>Sort by latest</option>
					<option>Sort by oldest</option>
					<option>Sort by salary</option>
				</select>
			</div>

			{/* Job Listings */}
			{jobs?.map((job, index) => (
				<JobCard key={index} job={job} />
			))}
		</div>
	);
};

export default JobList;