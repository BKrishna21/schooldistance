import express from 'express';
import dotenv from 'dotenv';
import schoolroutes from './routes/schoolroutes.js';


const app=express();
dotenv.config();
const PORT=process.env.PORT;

app.use(express.json());
app.use("/",schoolroutes);

app.get('/', (req, res) => {
  res.send('School Management API is running 🚀');
});


app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Server is running at ${PORT}`);
})