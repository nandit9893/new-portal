import express from "express";
import multer from "multer";
import { userAuth } from "../middlewares/authMiddleware.js";
import { 
  createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog 
} from "../controllers/blogController.js";

const router = express.Router();

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Blog Routes
router.post("/", userAuth, upload.single("image"), createBlog); // Create Blog
router.get("/", getAllBlogs); // Get All Blogs
router.get("/:id", getBlogById); // Get Single Blog
router.put("/:id", userAuth, upload.single("image"), updateBlog); // Update Blog
router.delete("/:id", userAuth, deleteBlog); // Delete Blog

export default router;