import { useState } from "react";
import { Search } from "lucide-react";

export default function JobList() {
  const jobs = [
    { name: "Marshal & Company", status: "Active", id: "CER7826", startDate: "6/3/25", lastDate: "6/4/25" },
    { name: "Caesar Tech Solutions", status: "Active", id: "76893V5", startDate: "12/2/25", lastDate: "12/5/25" },
    { name: "JPMC", status: "Inactive", id: "87bvb48", startDate: "4/3/25", lastDate: "4/5/25" },
    { name: "Brian & Sons", status: "Suspended", id: "654VF90", startDate: "1/2/26", lastDate: "12/2/26" },
    { name: "Meta", status: "Active", id: "654UHJ7", startDate: "9/4/25", lastDate: "19/4/25" },
    { name: "PhonePay", status: "Active", id: "3MJ54N5", startDate: "6/3/25", lastDate: "26/3/25" },
    { name: "DIAS", status: "Active", id: "48YGY6", startDate: "12/12/24", lastDate: "12/12/25" },
    { name: "Sprint", status: "Inactive", id: "90gh78M", startDate: "4/10/25", lastDate: "24/11/25" },
    { name: "Garrett & Company", status: "Suspended", id: "6FGH467", startDate: "1/2/25", lastDate: "11/2/25" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = jobs.filter(
      (job) =>
        job.name.toLowerCase().includes(value) ||
        job.status.toLowerCase().includes(value) ||
        job.id.toLowerCase().includes(value)
    );

    setFilteredJobs(filtered);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded shadow-lg max-w-5xl mx-auto w-full">
      <h2 className="text-lg font-semibold mb-4 text-center">Job Search Details</h2>

      {/* Search Bar */}
      <div className="flex items-center p-2 rounded mb-6 bg-gray-50 border border-gray-300">
        <Search className="text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          className="ml-2 outline-none w-full bg-gray-50 p-2"
        />
      </div>
      
      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-max">
          <thead>
            <tr className="bg-gray-100 text-xs sm:text-sm md:text-base">
              <th className="p-2 whitespace-nowrap">Job</th>
              <th className="p-2 whitespace-nowrap">Status</th>
              <th className="p-2 whitespace-nowrap">Job ID</th>
              <th className="p-2 whitespace-nowrap">Start Date</th>
              <th className="p-2 whitespace-nowrap">Last Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 text-xs sm:text-sm md:text-base">
                  <td className="p-2 whitespace-nowrap">{job.name}</td>
                  <td className="p-2 whitespace-nowrap">{job.status}</td>
                  <td className="p-2 whitespace-nowrap">{job.id}</td>
                  <td className="p-2 whitespace-nowrap">{job.startDate}</td>
                  <td className="p-2 whitespace-nowrap">{job.lastDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-2 text-sm sm:text-base">
                  No jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Sample Job Data
