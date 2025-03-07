import express from 'express';
import { getReports, updateReports } from '../controllers/reportController.js';

const router = express.Router();

router.get('/admin', getReports);
router.put('/update', updateReports);

export default router;