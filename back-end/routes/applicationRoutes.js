// routes/applicationRoutes.js
import express from "express";
import { applyForJob,listAllApplications,listApplicationsByUserId } from "../controllers/applicationController.js";
import { authenticateUser } from "../middlewares/applicationMiddleware.js";


const router = express.Router();

router.post("/applyForJob", authenticateUser, applyForJob);
router.get("/listAllApplications", listAllApplications);
router.get("/listApplicationsByUserId", authenticateUser, listApplicationsByUserId);

export default router;