const User = require('../models/User');

const paidUserMiddleware = async (req, res, next) => {
    const { userId } = req.user;

    try {
        const user = await User.findById(userId);
        if (!user || !user.isPaidUser) {
            return res.status(403).json({ error: 'Access denied. Paid subscription required.' });
        }
        next();
    } catch (err) {
        res.status(500).json({ error: 'Error checking user subscription' });
    }
};

module.exports = paidUserMiddleware;