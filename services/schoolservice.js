
import db from '../config/db.js';
import haversine from 'haversine-distance';

export const getSchools = async ({ latitude, longitude, page, limit, city, maxDistance }) => {
    let query = 'SELECT * FROM schools';
    const params = [];

    
    if (city) {
        query += ' WHERE address LIKE ?';
        params.push(`%${city}%`);
    }

    const [schools] = await db.execute(query, params);

    
    let processedSchools = schools.map(school => {
        const distance_km = haversine(
            { lat: latitude, lon: longitude },
            { lat: school.latitude, lon: school.longitude }
        ) / 1000;

        return { ...school, distance_km: parseFloat(distance_km.toFixed(2)) };
    });

    if (maxDistance) {
        processedSchools = processedSchools.filter(s => s.distance_km <= maxDistance);
    }

    
    processedSchools.sort((a, b) => a.distance_km - b.distance_km);


    const total = processedSchools.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedSchools = processedSchools.slice(startIndex, startIndex + limit);

    return {
        data: paginatedSchools,
        pagination: {
            total,
            totalPages,
            currentPage: page,
            limit
        }
    };
};
