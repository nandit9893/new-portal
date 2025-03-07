import mongoose from "mongoose";

const HRSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
});

export default mongoose.model("HR", HRSchema);