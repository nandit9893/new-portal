import path from "path";
import Application from "../models/Application.js";
import Job from "../models/job.js";
import fs from "fs";
import multer from "multer";

// 🟢 Apply for a Job (Protected Route)
// Set up resume upload directory
const resumeUploadPath = path.join("public", "uploads", "resumes");

// Ensure the upload directory exists
fs.mkdirSync(resumeUploadPath, { recursive: true });

// Multer storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resumeUploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer file filter to allow only PDF and Word files
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [".pdf", ".docx", ".doc"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and Word documents are allowed"), false);
  }
};

const uploadResume = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
}).single("resume");

export const applyForJob = async (req, res) => {
  uploadResume(req, res, async function (err) {
    if (err)
      return res.status(400).json({ success: false, error: err.message });

    try {
      const { jobId } = req.body;
      const candidateId = req.user.userId; // Extracted from authenticated user's token
      console.log(jobId, candidateId);
      // Validate inputs
      if (!jobId) {
        return res
          .status(400)
          .json({ success: false, message: "Job ID is required" });
      }

      // Fetch job details based on jobId
      const job = await Job.findById(jobId);
      if (!job) {
        return res
          .status(404)
          .json({ success: false, message: "Job not found" });
      }
      console.log(job);
      // Prevent duplicate applications
      const existingApplication = await Application.findOne({
        candidate: candidateId,
        job: jobId,
      });
      if (existingApplication) {
        return res
          .status(400)
          .json({
            success: false,
            message: "You have already applied for this job",
          });
      }

      // Construct resume URL if a file is uploaded
      let resumeUrl = null;
      if (req.file) {
        resumeUrl = `${req.protocol}://${req.get("host")}/uploads/resumes/${
          req.file.filename
        }`;
      }

      // Create new job application
      const application = new Application({
        candidate: candidateId,
        job: jobId,
        resume: resumeUrl, // Store resume URL
        status: "pending",
      });

      await application.save();

      res.status(201).json({
        success: true,
        message: "Job application submitted successfully",
        application,
      });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Server error",
          error: error.message,
        });
    }
  });
};

export const listAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate({
        path: "candidate",
        select: "name email -password", // Explicitly exclude the password
      })
      .populate("job", "title company"); // Populate job details

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const listApplicationsByUserId = async (req, res) => {
  try {
    console.log("User in Request:", req.user); // ✅ Debugging step

    const userId = req.user.userId; // Access userId from token

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID not found in token" });
    }

    // Fetch applications and populate job fields correctly
    const applications = await Application.find({ candidate: userId })
      .populate("candidate", "name email")
      .populate("job", "jobTitle company"); // ✅ Correct field name

    if (!applications || applications.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No applications found for this user",
        });
    }

    // Format the response correctly
    const formattedApplications = applications.map((app) => ({
      _id: app._id,
      candidate: {
        _id: app.candidate?._id,
        name: app.candidate?.name,
        email: app.candidate?.email,
      },
      job: {
        _id: app.job?._id,
        jobTitle: app.job?.jobTitle, // ✅ Display jobTitle
        company: app.job?.company, // ✅ Display company
      },
      resume: app.resume,
      status: app.status,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
    }));

    res
      .status(200)
      .json({ success: true, applications: formattedApplications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};