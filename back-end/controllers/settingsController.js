import Settings from '../models/Settings.js';

// Get Settings
export const getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne();
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update Settings
export const updateSettings = async (req, res) => {
    try {
        const updatedSettings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.status(200).json(updatedSettings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};