import mongoose from "mongoose";
import express from "express";
const app = express();
import dotenv from 'dotenv';
import { enquiryRoutes } from "./App/routes/web/enquiryRoute";
dotenv.config();




const dbUrl = process.env.DBURL || "your-default-db-url";

app.use(express.json());

// ye main url hoga iske bad jo lgaenge wo endpoints honge baqi routes ke..
app.use("/web/api/enquiry", enquiryRoutes)
// http://localhost:8000/web/api/enquiry/enquiry-insert


mongoose.connect(dbUrl).then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT || 5000, ()=> {
        console.log("Server is running", process.env.PORT)
    })
})