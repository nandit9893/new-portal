import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    profilePicture: { type: String },  // Cloudinary/AWS URL or local path
    education: {
        highestDegree: { type: String, required: true },
        university: { type: String, required: true },
        passingYear: { type: String, required: true },
        skills: { type: [String], required: true },
        experience: { type: String, required: true }
    },
    resume: { type: String },  // Cloudinary/AWS URL or local path
}, { timestamps: true });

export default mongoose.model("Profile", ProfileSchema);