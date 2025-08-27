// controllers/schoolController.js
import schoolService from '../services/schoolService.js';

export const listSchools = async (req, res, next) => {
    try {
        const { latitude, longitude, page = 1, limit = 10, city, maxDistance } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        const result = await schoolService.getSchools({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            page: parseInt(page),
            limit: parseInt(limit),
            city,
            maxDistance: maxDistance ? parseFloat(maxDistance) : null
        });

        res.json(result);
    } catch (err) {
        next(err);
    }
};
