import HR from "../models/HR.js";

export const getHRData = async (req, res) => {
    try {
        const hrData = await HR.find();
        res.json(hrData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};