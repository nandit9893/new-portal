import Job from "../models/job.js";
import Application from "../models/Application.js";
import moment from "moment";

export const jobDisplay = async (req, res) => {
  try {
    // Fetch all jobs (only jobTitle and createdAt fields)
    const jobs = await Job.find({}, "jobTitle createdAt");
    console.log("Jobs fetched:", jobs);

    // Aggregate application counts, grouping by the job reference
    const applicationCounts = await Application.aggregate([
      {
        $group: {
          _id: "$job",  // Group by job
          count: { $sum: 1 }
        }
      }
    ]);
    console.log("Application counts:", applicationCounts);

    // Build a lookup map: { jobId (as string) : count }
    const appCountMap = {};
    applicationCounts.forEach(({ _id, count }) => {
      if (_id) {
        appCountMap[_id.toString()] = count;
      }
    });
    console.log("Application count map:", appCountMap);

    // Determine the maximum application count among all jobs
    const allCounts = Object.values(appCountMap);
    const maxApplications = allCounts.length ? Math.max(...allCounts) : 0;
    console.log("Max applications:", maxApplications);

    // Map each job to include a calculated priority:
    // - "High" if its application count equals the maximum and is > 0.
    // - "Low" if it has zero applications.
    // - "Medium" otherwise.
    const jobData = jobs.map(job => {
      const jobId = job._id.toString();
      const count = appCountMap[jobId] || 0;
      let priority = "Medium"; // default

      if (count === maxApplications && count > 0) {
        priority = "High";
      } else if (count === 0) {
        priority = "Low";
      }

      return {
        jobTitle: job.jobTitle,
        createdAt: moment(job.createdAt).format("DD MMM, YYYY"),
        endDate: moment(job.createdAt).add(30, "days").format("DD MMM, YYYY"),
        priority
      };
    });

    console.log("Final job data:", jobData);
    res.json({ success: true, jobs: jobData });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch job data", error: error.message });
  }
};


export const jobSearch = async (req, res) => {
    try {
        const { jobTitle, company, createdAt, endDate } = req.query;

        let filter = {};

        if (jobTitle) {
            filter.jobTitle = { $regex: jobTitle, $options: "i" };
        } else if (company) {
            filter.company = { $regex: company, $options: "i" };
        } else if (createdAt) {
            filter.createdAt = { 
                $gte: new Date(createdAt), 
                $lt: new Date(new Date(createdAt).setDate(new Date(createdAt).getDate() + 1)) 
            };
        } else if (endDate) {
            const startDate = moment(endDate, "YYYY-MM-DD").subtract(30, "days").toDate();
            filter.createdAt = { 
                $gte: startDate, 
                $lt: new Date(new Date(startDate).setDate(startDate.getDate() + 1))
            };
        } else {
            return res.status(400).json({ success: false, message: "Please provide either jobTitle, company, createdAt, or endDate to search." });
        }

        // Search for jobs based on the selected field
        const jobs = await Job.find(filter).select("_id jobTitle company createdAt");

        if (jobs.length === 0) {
            return res.status(404).json({ success: false, message: "No jobs found" });
        }

        // Add endDate (30 days after createdAt) and shorten jobId
        const jobResults = jobs.map(job => ({
            jobId: job._id.toString().substring(0, 4),  // Extract only first 4 characters of _id
            jobTitle: job.jobTitle,
            company: job.company,
            createdAt: moment(job.createdAt).format("YYYY-MM-DD"),
            endDate: moment(job.createdAt).add(30, "days").format("YYYY-MM-DD")
        }));

        res.json({ success: true, jobs: jobResults });
    } catch (error) {
        console.error("Error in jobSearch:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// user insight


export const userInsight = async (req, res) => {
    try {
        // ---------------------------
        // Application Insights: Count applications by status
        // ---------------------------
        const statusCounts = await Application.aggregate([
            {
                $group: {
                    _id: "$status", // Group by application status
                    count: { $sum: 1 }
                }
            }
        ]);

        // Map the results to insight keys
        const insight = {
            pending: 0,
            approved: 0,
            hired: 0
        };

        statusCounts.forEach(item => {
            if (item._id === "pending") {
                insight.pending = item.count;
            } else if (item._id === "shortlisted") {
                insight.approved = item.count;
            } else if (item._id === "rejected") {
                insight.hired = item.count;
            }
        });

        // ---------------------------
        // Job Metrics: Total jobs posted this month, active jobs, and expired jobs
        // ---------------------------
        const now = new Date();
        const startOfMonth = moment().startOf("month").toDate();

        // Total jobs posted in the current month
        const totalJobsThisMonth = await Job.countDocuments({
            createdAt: { $gte: startOfMonth, $lte: now }
        });

        // Active jobs: A job is active if its expiry date (createdAt + 30 days) is in the future
        const activeJobs = await Job.countDocuments({
            $expr: { $gt: [{ $add: ["$createdAt", 30 * 24 * 60 * 60 * 1000] }, now] }
        });

        // Expired jobs: A job is expired if its expiry date (createdAt + 30 days) is less than or equal to now
        const expiredJobs = await Job.countDocuments({
            $expr: { $lte: [{ $add: ["$createdAt", 30 * 24 * 60 * 60 * 1000] }, now] }
        });

        const jobMetrics = {
            totalJobsThisMonth,
            activeJobs,
            expiredJobs
        };

        // ---------------------------
        // Top Hiring Companies (Based on number of hires)
        // ---------------------------
        const topHiringCompanies = await Application.aggregate([
            { $match: { status: "rejected" } }, // Consider "rejected" as hired
            {
                $group: {
                    _id: "$companyId",
                    hiredCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "jobs", // Assuming the Job collection is named "jobs"
                    localField: "_id",
                    foreignField: "companyId",
                    as: "companyJobs"
                }
            },
            {
                $addFields: {
                    totalJobs: { $size: "$companyJobs" } // Count total jobs for each company
                }
            },
            { $sort: { hiredCount: -1 } }, // Sort by highest number of hires
            { $limit: 5 } // Top 5 hiring companies
        ]);

        // ---------------------------
        // Candidates Hired Daily (Grouped by Date)
        // ---------------------------
        const candidatesHiredDaily = await Application.aggregate([
            { $match: { status: "rejected" } }, // Consider "rejected" as hired
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } } // Sort by date ascending
        ]);

        // ---------------------------
        // Total Candidates Hired This Month (Approved Jobs Count)
        // ---------------------------
        const candidatesHiredThisMonth = await Application.countDocuments({
            status: "shortlisted",
            createdAt: { $gte: startOfMonth, $lte: now }
        });

        // ---------------------------
        // Count total jobs per company
        // ---------------------------
        const totalJobsByCompany = await Job.aggregate([
            {
                $group: {
                    _id: "$companyId",
                    totalJobs: { $sum: 1 }
                }
            }
        ]);

        // Map totalJobsByCompany to an object for easy lookup
        const jobCountMap = {};
        totalJobsByCompany.forEach(item => {
            jobCountMap[item._id] = item.totalJobs;
        });

        // Update topHiringCompanies with total job counts
        const topHiringCompaniesWithJobs = topHiringCompanies.map(company => ({
            ...company,
            totalJobs: jobCountMap[company._id] || 0
        }));

        // ---------------------------
        // Send the combined response
        // ---------------------------
        res.status(200).json({
            success: true,
            insight,
            jobMetrics,
            topHiringCompanies: topHiringCompaniesWithJobs,
            candidatesHiredDaily,
            candidatesHiredThisMonth // Added approved jobs count for this month
        });

    } catch (error) {
        console.error("Error in userInsight:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user insight",
            error: error.message
        });
    }
};
