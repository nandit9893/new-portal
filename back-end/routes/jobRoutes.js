import express from "express";
import { createJob,updateJob,listAllJobs,listJobById,deleteJobById,searchJobs,filterJobs,listMyJobs} from "../controllers/jobController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";
import { jobDisplay,jobSearch,userInsight } from "../controllers/jobdashboard.js"; 
const router = express.Router();

// Route for creating a job
router.post("/createJob", protectAdmin, createJob);
router.put("/updateJob/:jobId", protectAdmin, updateJob);
router.get("/listAllJobs", listAllJobs);
router.get("/listMyJobs", protectAdmin, listMyJobs);

router.get("/listJobById/:jobId", listJobById);
router.delete("/deleteJobById/:jobId", deleteJobById);
router.get("/jobs/search", searchJobs);
router.get("/jobs/filter", filterJobs);

// ✅ Add a new route to display job details with calculated end date this is wht has to be displayed in admin
router.get("/jobDisplay", jobDisplay);
router.get("/jobSearch", jobSearch);
router.get("/userInsight", userInsight);
export default router;
