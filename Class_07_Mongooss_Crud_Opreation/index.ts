import mongoose from "mongoose";
import express from "express";
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import enquiryModel from './models/enquiry.model';



const dbUrl = process.env.DBURL || "your-default-db-url";

app.use(express.json());

//1. create data on database
app.post('/api/enquiry-insert', (req, res)=> { // thunder client se usr ban kar ham propertys bhej rhy hain.
    const {sName, sEmail, sPhone, sMessage} = req.body;  // un properties ko req.body se destructure kry hain.
    // console.log(sName, sEmail, sPhone, sMessage);  // print krwa ke check kar rhy hain data aya ya nahi.

    const enquiry = new enquiryModel({ // ye wo model hai jo ham apne table ka schema bana rhy hain.
        name: sName,     // isme (name) ki property schema ki hai or (sName) ki property user ne jo post request ki hai data create karne ke liye ye wo hai.
        email: sEmail,
        phone: sPhone,
        message: sMessage
    });
    // ye sara data yahn se save ho rha hai.
    enquiry.save().then(() =>{
        res.send({status: 1, message: "Enquiry saved successfully"});
    }).catch((error) => {
        res.send({status: 0, message: "Error while saving enquiry", error: error.message});
    })

})



// 2. get data from database
app.get('/api/enquiry-list', async (req, res)=> {
    let enquiryList = await enquiryModel.find();
    res.status(200).json({status: 1, message: "enquiry list", data: enquiryList})
})


// 3. delete data
app.delete("/api/enquirt-delete/:id", async (req, res)=> { // request mein user ne value delete karne wali id bheji hai. 
    const enquiryId = req.params.id; // id ko nikala 
    const deleteEnquiry = await enquiryModel.deleteOne({_id: enquiryId})
    res.send({status: 1, message: "Enquiry deleted successsfully", id: deleteEnquiry})
})


// 4. update data
app.put("/api/enquiry-update/:id", async (req, res)=>{
    const updateId = req.params.id;
    const {sName, sEmail, sPhone, sMessage} = req.body;  // un properties ko req.body se destructure kry hain.

    let updateObj ={
        name: sName,
        email: sEmail,
        phone: sPhone,
        message: sMessage
    }
    let updateRes = await enquiryModel.updateOne({_id:updateId}, updateObj)

    res.send({status: 1, message: "Enquiry updated successfully", updateRes})
})



mongoose.connect(dbUrl).then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT || 5000, ()=> {
        console.log("Server is running", process.env.PORT)
    })
})