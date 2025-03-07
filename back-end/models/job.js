import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    category: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    experience: { type: String, required: true },
    jobDescription: { type: String, required: true },
    skills: { type: [String], required: true },
    jobTitle: { type: String, required: true },
    jobPackage: { type: Number, required: false },
    company: { type: String, required: true },
    companyLogo: { type: String, required: false }, // New Field: Logo URL
    keyResponsibilities: { type: [String], required: false }, // New Field: Responsibilities List
   
    createdAt: { type: Date, default: Date.now },
});

// Export the model
const Job = mongoose.model("Job", jobSchema);
export default Job;
