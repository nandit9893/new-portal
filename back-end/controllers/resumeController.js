import Resume from "../models/resumeModel.js";  // Import Resume model correctly
import path from "path";
import fs from "fs";

// Handle resume upload
export const uploadResume = async (req, res) => {
  const userId = req.userId;  // Assuming req.userId is set by your authentication middleware

  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  try {
    const { filename, mimetype, size } = req.file;

    // Create a new resume document
    const newResume = new Resume({
      user: userId,
      resumeUrl: `/uploads/resumes/${filename}`,
      fileType: mimetype,
      fileSize: size,
    });

    await newResume.save();
    res.json({ msg: 'Resume uploaded successfully', resume: newResume });
  } catch (error) {
    res.status(500).json({ msg: 'Error uploading resume', error });
  }
};

// Get user's uploaded resumes
export const getResumes = async (req, res) => {
  const userId = req.userId;

  try {
    const resumes = await Resume.find({ user: userId });

    if (resumes.length === 0) {
      return res.status(404).json({ msg: 'No resumes found' });
    }

    res.json(resumes);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching resumes', error });
  }
};

// Delete a resume
export const deleteResume = async (req, res) => {
  const { resumeId } = req.params;

  try {
    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ msg: 'Resume not found' });
    }

    // Delete the file from the file system
    const filePath = path.join(__dirname, '../uploads', resume.resumeUrl);
    fs.unlinkSync(filePath);

    // Delete the resume record from DB
    await resume.remove();

    res.json({ msg: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting resume', error });
  }
};


