import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connection } from './config/db.js';
// Routes
import authRoutes from './routes/auth.js';

// Configure App
const app = express();

// MiddleWare
dotenv.config();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api',authRoutes);

// Server Listening
app.listen(process.env.PORT,(err)=>{
    if(err) console.log(err.message);
    connection();
   console.log(`Server is running on port ${process.env.PORT}`);
})