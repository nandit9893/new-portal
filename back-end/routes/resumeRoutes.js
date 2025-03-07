import express from "express";
import multer from "multer";
import { uploadResume, getResumes, deleteResume } from "../controllers/resumeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/resumes/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Allow only PDF, DOCX, and TXT files
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOCX, and TXT files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
});

const router = express.Router();

// Upload resume
router.post('/upload', authMiddleware, upload.single('resume'), uploadResume);

// Get all resumes for the logged-in user
router.get('/', authMiddleware, getResumes);

// Delete a resume
router.delete('/:resumeId', authMiddleware, deleteResume);

export default router;
