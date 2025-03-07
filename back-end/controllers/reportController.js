import Report from '../models/Report.js';

// Get Reports Data
export const getReports = async (req, res) => {
    try {
        const reports = await Report.findOne();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update Reports Data
export const updateReports = async (req, res) => {
    try {
        const updatedReport = await Report.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
