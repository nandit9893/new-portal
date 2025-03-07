import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["Resume Tips", "Interview Preparation", "Career Growth", "Industry Insights"],
      required: true,
    },
    content: { type: String, required: true },
    image: { type: String, default: "" }, // Store image URL
    status: {
      type: String,
      enum: ["Published", "Draft", "Scheduled"],
      default: "Draft",
    },
    scheduledDate: { type: Date }, // If the blog is scheduled
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true }, // Admin reference
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;