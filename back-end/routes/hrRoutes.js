import express from "express";
import { getHRData } from "../controllers/hrController.js";


const hrrouter = express.Router();

hrrouter.get("/data", getHRData);

export default hrrouter;