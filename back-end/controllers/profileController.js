import path from "path";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from "url";
import userModel from "../models/userModel.js";
import Profile from "../models/profileModel.js";

// ✅ Corrected __filename and __dirname
const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

// ✅ Ensure "uploads" directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Recursive ensures parent dirs exist
}

// ✅ Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save files in "uploads" folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, uniqueSuffix); // Generate unique filename
    }
});

const upload = multer({ storage: storage });

// ✅ Middleware for Profile Picture Upload
export const uploadProfile = upload.single("profilePicture");

// ✅ Create Profile Controller
export const createProfile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Profile picture is required!" });
        }

        // ✅ Extract user from token (Assumes authenticate.js middleware adds req.user)
        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: "Unauthorized: No valid token provided" });
        }

        const { firstName, lastName, phoneNumber, gender, dob, highestDegree, university, passingYear, skills, experience } = req.body;
        const email = req.user.email; // ✅ Use email from token

        // ✅ Check if a profile already exists for this user
        const existingProfile = await Profile.findOne({ email });
        if (existingProfile) {
            return res.status(400).json({ message: "Profile already exists!" });
        }

        // ✅ Create a new Profile document
        const newProfile = new Profile({
            firstName,
            lastName,
            email, // ✅ Ensure the email comes from the token
            phone: phoneNumber,
            gender,
            dob,
            profilePicture: `/uploads/${req.file.filename}`, // ✅ Corrected path formatting
            education: {
                highestDegree,
                university,
                passingYear,
                skills: Array.isArray(skills) ? skills : skills?.split(",") || [], // ✅ Handle skills as array
                experience
            }
        });

        // ✅ Save to MongoDB
        await newProfile.save();

        res.status(201).json({ message: "Profile created successfully!", profile: newProfile });
    } catch (error) {
        console.error("Error creating profile:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Get Profile Controller
export const getProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.email) {
            return res.status(400).json({ success: false, message: "User email not found in request" });
        }

        // ✅ Fetch Profile from Profile model using the email from the token
        const profile = await Profile.findOne({ email: req.user.email });

        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        res.status(200).json({ success: true, profile });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
