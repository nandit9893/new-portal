const Resume = require('../models/Resume');

// Generate a resume using a template (for paid users only)
const generateResume = async (req, res) => {
    const { userId } = req.user;
    const { templateId } = req.body;

    try {
        // Fetch the user's resume data
        const resume = await Resume.findOne({ userId });
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        // Simulate resume generation using a template
        const generatedResume = {
            name: resume.name,
            email: resume.email,
            skills: resume.skills,
            experience: resume.experience,
            education: resume.education,
            templateId,
            generatedAt: new Date(),
        };

        res.json({ message: 'Resume generated successfully', generatedResume });
    } catch (err) {
        res.status(500).json({ error: 'Error generating resume' });
    }
};

module.exports = { generateResume };