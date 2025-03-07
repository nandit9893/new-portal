const express = require('express');
const { generateResume } = require('../controllers/resumeBuilderController');
const authMiddleware = require('../middleware/authMiddleware');
const paidUserMiddleware = require('../middleware/paidUserMiddleware');

const router = express.Router();

// Generate a resume (for paid users only)
router.post('/generate', authMiddleware, paidUserMiddleware, generateResume);

module.exports = router;