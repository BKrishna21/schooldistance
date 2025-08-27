import express from 'express';
import pool from '../db.js';
// import { parse } from 'dotenv';

const schoolroutes=express.Router();

schoolroutes.post("/addSchool",async(req,res)=>{
    const { sname,address,latitude,longitude } =req.body;

    if(!sname || !address || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({error:"invalid input data"});
    }

    try {
        const [result] = await pool.query(
            "insert into schools (sname,address,latitude,longitude) values (?,?,?,?)",
            [sname,address,latitude,longitude]
        );
        res.json({message: "School added successfully", schoolId: result.insertId });

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

schoolroutes.get("/listSchools", async (req,res)=>{
    const {latitude,longitude}=req.query;

    if(isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({error:"invalid location data"});
    }

    try {
        const [schools] = await pool.query("select * from schools");

        const userLat=parseFloat(latitude);
        const userLon=parseFloat(longitude);

        const schoolsWithDistance= schools.map(school =>{
            const R=6371;
            const dLat= (school.latitude-userLat)*(Math.PI / 180);
            const dLon= (school.longitude-userLon)*(Math.PI / 180);
            const a = 
                Math.sin(dLat/2)** 2 +
                Math.cos(userLat*Math.PI / 180)*
                Math.cos(school.latitude*Math.PI / 180 )*
                Math.sin(dLon / 2) ** 2;
            const c=2* Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
            const distance=R*c;

            return {...school,distance_km: parseFloat(distance.toFixed(2)) };
        });

        schoolsWithDistance.sort((a,b)=>a.distance_km - b.distance_km);

        res.json(schoolsWithDistance);
    } catch (error) {
        res.status(500).json({error: "Database error"});
    }
});

export default schoolroutes;