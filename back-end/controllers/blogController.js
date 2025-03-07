import Blog from "../models/Blog.js";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, category, content, status, scheduledDate } = req.body;

    const newBlog = new Blog({
      title,
      category,
      content,
      image: req.file ? req.file.path : "", // Handle image upload
      status,
      scheduledDate: status === "Scheduled" ? new Date(scheduledDate) : null,
      author: req.admin._id, // Admin ID from auth middleware
    });

    await newBlog.save();
    res.status(201).json({ success: true, message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get a single blog
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { title, category, content, status, scheduledDate } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    blog.title = title || blog.title;
    blog.category = category || blog.category;
    blog.content = content || blog.content;
    blog.image = req.file ? req.file.path : blog.image;
    blog.status = status || blog.status;
    blog.scheduledDate = status === "Scheduled" ? new Date(scheduledDate) : null;

    await blog.save();
    res.status(200).json({ success: true, message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    await blog.deleteOne();
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};