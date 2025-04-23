import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import enquiryRouter from './App/routes/web/enquiryRoutes';
dotenv.config();
import cors from 'cors';



app.use(cors()); // userInterface se url ka agr koi port number alag bhi aye to usko allow kar dena.
app.use(express.json()); // 

// Routes
app.use('/api/website/enquiry', enquiryRouter);
// http://localhost:8020/api/website/enquiry/insert



// Connect to MongoDb
mongoose.connect(process.env.DBURL || 'mongodb://localhost:27017/').then(()=> {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, ()=> {
        console.log("Server is running");
    })
}).catch((error)=> { console.log("Error while connecting to MongoDb", error)})

function Funcors(): any {
    throw new Error('Function not implemented.');
}
