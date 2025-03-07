// index.js

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import "express-async-errors";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import session from "express-session";
import passport from "passport";
// File imports
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js"; // ✅ Fixed import
import "./config/Passport.js";
import hrrouter from "./routes/hrRoutes.js";

// Load environment variables early

// Log Mongo URL for debugging (to ensure it's being loaded)
console.log("Mongo URL: ", process.env.MONGO_URL);

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads")); // Serve uploaded files
app.use("/uploads", express.static(path.join("public", "uploads")));
app.use(
  session({ secret: "your-secret", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

app.use("/api/v1/job", jobRoutes);
app.use("/api/admin", adminRoutes);
// app.use("/payment", paymentRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api", profileRoutes);
app.use("/api/v1/report", reportRoutes);
app.use("/api/v1/settings", settingsRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/hr", hrrouter);

app.get("/", (req, res) => {
  res.send("MBA job portal admin backend is running.");
});

//validation middelware
app.use(errorMiddleware);

//port
const PORT = process.env.PORT || 5001;
//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`
      .bgCyan.white
  );
});
