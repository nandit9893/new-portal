import path from "path";
import multer from "multer";
import moment from "moment";
import Job from "../models/job.js";
import fs from "fs";

// Ensure upload directory exists
const uploadPath = path.join("public", "uploads");
fs.mkdirSync(uploadPath, { recursive: true });

// Multer storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export const createJob = async (req, res, next) => {
    try {
        // Ensure admin is authenticated (Handled by `protectAdmin`)
        if (!req.admin) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }

        // Handle file upload
        upload.single("companyLogo")(req, res, async function (err) {
            if (err) return res.status(500).json({ success: false, error: err.message });

            try {
                const { 
                    category, location, jobType, experience, 
                    jobDescription, skills, jobTitle, jobPackage, 
                    company, keyResponsibilities 
                } = req.body;

                // Validate required fields
                if (!category || !location || !jobType || !experience || !jobDescription || !skills || !jobTitle || !company) {
                    return res.status(400).json({ success: false, message: "All required fields must be filled" });
                }

                // Construct image URL if file is uploaded
                let imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

                // Convert `skills` and `keyResponsibilities` to arrays
                const skillsArray = Array.isArray(skills) ? skills : JSON.parse(skills || "[]");
                const keyResponsibilitiesArray = Array.isArray(keyResponsibilities) ? keyResponsibilities : JSON.parse(keyResponsibilities || "[]");

                // Create a new job listing
                const newJob = await Job.create({
                    category,
                    location,
                    jobType,
                    experience,
                    jobDescription,
                    skills: skillsArray,
                    jobTitle,
                    jobPackage,
                    company,
                    keyResponsibilities: keyResponsibilitiesArray,
                    companyLogo: imageUrl,
                    createdAt: moment().utcOffset("+05:30").toDate(),
                    createdBy: req.admin._id // Store the admin's ID who created the job
                });

                res.status(201).json({
                    success: true,
                    message: "Job created successfully",
                    job: newJob
                });
            } catch (error) {
                next(error);
            }
        });
    } catch (error) {
        next(error);
    }
};




export const updateJob = async (req, res, next) => {
    try {
        // Ensure admin is authenticated (Handled by `protectAdmin`)
        if (!req.admin) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }

        // Handle file upload
        upload.single("companyLogo")(req, res, async function (err) {
            if (err) return res.status(500).json({ success: false, error: err.message });

            try {
                const { jobId } = req.params; // Job ID from URL params
                const body = req.body;

                // Find the existing job
                const existingJob = await Job.findById(jobId);
                if (!existingJob) {
                    return res.status(404).json({ success: false, message: "Job not found" });
                }

                // Construct image URL if a new file is uploaded, else retain the old one
                let imageUrl = existingJob.companyLogo;
                if (req.file) {
                    imageUrl = `/uploads/${req.file.filename}`;
                }

                // Convert `skills` and `keyResponsibilities` to arrays if they are JSON strings
                const skillsArray = Array.isArray(body.skills) ? body.skills : JSON.parse(body.skills || "[]");
                const keyResponsibilitiesArray = Array.isArray(body.keyResponsibilities)
                    ? body.keyResponsibilities
                    : JSON.parse(body.keyResponsibilities || "[]");

                // Update job fields
                existingJob.category = body.category || existingJob.category;
                existingJob.location = body.location || existingJob.location;
                existingJob.jobType = body.jobType || existingJob.jobType;
                existingJob.experience = body.experience || existingJob.experience;
                existingJob.jobDescription = body.jobDescription || existingJob.jobDescription;
                existingJob.skills = skillsArray.length > 0 ? skillsArray : existingJob.skills;
                existingJob.jobTitle = body.jobTitle || existingJob.jobTitle;
                existingJob.jobPackage = body.jobPackage || existingJob.jobPackage;
                existingJob.company = body.company || existingJob.company;
                existingJob.keyResponsibilities = keyResponsibilitiesArray.length > 0
                    ? keyResponsibilitiesArray
                    : existingJob.keyResponsibilities;
                existingJob.companyLogo = imageUrl;
                existingJob.updated_date = moment().utcOffset("+05:30").toDate();

                // Save updated job
                await existingJob.save();

                res.json({
                    success: true,
                    message: "Job updated successfully",
                    job: existingJob
                });
            } catch (error) {
                next(error);
            }
        });
    } catch (error) {
        next(error);
    }
};




export const listAllJobs = async (req, res, next) => {
    try {
        // Fetch all jobs from the database
        const jobs = await Job.find();

        // Check if there are any jobs
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found"
            });
        }

        // Modify jobs array to include full image URL if necessary
        const jobsWithImages = jobs.map(job => ({
            ...job._doc,
            companyLogo: job.companyLogo ? `${req.protocol}://${req.get("host")}${job.companyLogo.startsWith("/") ? job.companyLogo : "/" + job.companyLogo}` : null

        }));

        // Return the list of jobs
        res.status(200).json({
            success: true,
            jobs: jobsWithImages
        });
    } catch (error) {
        next(error);
    }
};

export const listJobById = async (req, res, next) => {
    try {
        const { jobId } = req.params; // Extract job ID from URL params

        // Find job by ID
        const job = await Job.findById(jobId);

        // Check if job exists
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        // Return job details
        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
};


export const deleteJobById = async (req, res, next) => {
    try {
        const { jobId } = req.params; // Extract job ID from URL params

        // Find and delete the job
        const deletedJob = await Job.findByIdAndDelete(jobId);

        // Check if job exists
        if (!deletedJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Job deleted successfully",
            job: deletedJob
        });
    } catch (error) {
        next(error);
    }
};
export const searchJobs = async (req, res, next) => {
    try {
        const { jobTitle, location, experience, jobPackage, category, jobType } = req.query;

        let filter = {};

        // 🔹 Apply text-based filters (case-insensitive)
        if (jobTitle) filter.jobTitle = { $regex: `^${jobTitle.trim()}$`, $options: "i" };
        if (location) filter.location = { $regex: `^${location.trim()}$`, $options: "i" };
        if (experience) filter.experience = { $regex: `^${experience.trim()}$`, $options: "i" };
        if (category) filter.category = { $regex: `^${category.trim()}$`, $options: "i" };
        if (jobType) filter.jobType = { $regex: `^${jobType.trim()}$`, $options: "i" };

        // ✅ Correct Salary Range Filtering
        if (jobPackage) {
            const salaryRange = jobPackage.split("-").map(Number);
            if (salaryRange.length === 2 && !isNaN(salaryRange[0]) && !isNaN(salaryRange[1])) {
                filter.jobPackage = { $gte: salaryRange[0], $lte: salaryRange[1] };
            } else {
                console.log("❌ Invalid salary range format:", jobPackage);
            }
        }

        console.log("🔎 Filter Used:", JSON.stringify(filter, null, 2));

        const jobs = await Job.find(filter);

        console.log("✅ Jobs Found:", jobs.length ? jobs : "No jobs found");

        if (!jobs.length) {
            return res.status(404).json({ success: false, message: "No jobs found" });
        }

        res.status(200).json({ success: true, jobs });
    } catch (error) {
        console.error("❌ Error:", error);
        next(error);
    }
};



export const filterJobs = async (req, res) => {
    try {
        const filterCriteria = req.query;
        const filter = {};

        if (filterCriteria.category) {
            filter.category = { $regex: `.*${filterCriteria.category.trim()}.*`, $options: "i" };
        }
        if (filterCriteria.jobType) {
            filter.jobType = { $regex: `.*${filterCriteria.jobType.trim()}.*`, $options: "i" };
        }
        if (filterCriteria.experience) {
            filter.experience = { $regex: `.*${filterCriteria.experience.trim()}.*`, $options: "i" };
        }
        if (filterCriteria.jobPackage) {
            filter.jobPackage = parseInt(filterCriteria.jobPackage);
        }
        if (filterCriteria.createdAt) {
            const [startDate, endDate] = filterCriteria.createdAt.split("to").map(date => new Date(date.trim()));
            if (!isNaN(startDate) && !isNaN(endDate)) {
                filter.createdAt = { $gte: startDate, $lte: endDate };
            }
        }

        console.log("Applying Filters:", JSON.stringify(filter, null, 2));

        // Fetch all fields but add a custom 'details' field
        const jobs = await Job.find(filter);

        if (!jobs.length) {
            return res.status(404).json({
                success: false,
                message: "No jobs found with the selected filters",
            });
        }

        console.log(" Filtered Jobs Found:", jobs.length);

        // Modify job data to include 'details' array
        const formattedJobs = jobs.map(job => ({
            ...job.toObject(), // Convert Mongoose document to plain object
            details: [
                job.category,
                job.jobType,
                `${job.jobPackage} LPA`, // Format job package
                job.location
            ]
        }));

        return res.status(200).json({
            success: true,
            jobs: formattedJobs
        });
    } catch (error) {
        console.error(" Error Filtering Jobs:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const listMyJobs = async (req, res) => {
    try {
        // Ensure admin is authenticated (Handled by `protectAdmin` middleware)
        if (!req.admin) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }

        // Fetch jobs uploaded by the authenticated admin
        const jobs = await Job.find({ createdBy: req.admin._id });

        res.status(200).json({
            success: true,
            jobs,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || "Failed to fetch jobs" });
    }
};
