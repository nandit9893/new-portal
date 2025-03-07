import express from "express";
import { uploadProfile, createProfile,getProfile } from "../controllers/profileController.js";

import { authenticateUser } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post("/profile", authenticateUser, uploadProfile, createProfile);

router.get("/getProfile", authenticateUser, getProfile);
export default router;