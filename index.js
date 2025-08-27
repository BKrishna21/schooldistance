import express from 'express';
import dotenv from 'dotenv';
import schoolroutes from './routes/schoolroutes.js';


const app=express();
dotenv.config();
const PORT=process.env.PORT;

app.use(express.json());
app.use("/",schoolroutes);


app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})