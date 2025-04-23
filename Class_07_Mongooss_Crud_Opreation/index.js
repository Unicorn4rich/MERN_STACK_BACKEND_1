"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const enquiry_model_1 = __importDefault(require("./models/enquiry.model"));
const dbUrl = process.env.DBURL || "your-default-db-url";
app.use(express_1.default.json());
//1. create data on database
app.post('/api/enquiry-insert', (req, res) => {
    const { sName, sEmail, sPhone, sMessage } = req.body; // un properties ko req.body se destructure kry hain.
    // console.log(sName, sEmail, sPhone, sMessage);  // print krwa ke check kar rhy hain data aya ya nahi.
    const enquiry = new enquiry_model_1.default({
        name: sName, // isme (name) ki property schema ki hai or (sName) ki property user ne jo post request ki hai data create karne ke liye ye wo hai.
        email: sEmail,
        phone: sPhone,
        message: sMessage
    });
    // ye sara data yahn se save ho rha hai.
    enquiry.save().then(() => {
        res.send({ status: 1, message: "Enquiry saved successfully" });
    }).catch((error) => {
        res.send({ status: 0, message: "Error while saving enquiry", error: error.message });
    });
});
// 2. get data from database
app.get('/api/enquiry-list', async (req, res) => {
    let enquiryList = await enquiry_model_1.default.find();
    res.status(200).json({ status: 1, message: "enquiry list", data: enquiryList });
});
// 3. delete data
app.delete("/api/enquirt-delete/:id", async (req, res) => {
    const enquiryId = req.params.id; // id ko nikala 
    const deleteEnquiry = await enquiry_model_1.default.deleteOne({ _id: enquiryId });
    res.send({ status: 1, message: "Enquiry deleted successsfully", id: deleteEnquiry });
});
// 4. update data
app.put("/api/enquiry-update/:id", async (req, res) => {
    const updateId = req.params.id;
    const { sName, sEmail, sPhone, sMessage } = req.body; // un properties ko req.body se destructure kry hain.
    let updateObj = {
        name: sName,
        email: sEmail,
        phone: sPhone,
        message: sMessage
    };
    let updateRes = await enquiry_model_1.default.updateOne({ _id: updateId }, updateObj);
    res.send({ status: 1, message: "Enquiry updated successfully", updateRes });
});
mongoose_1.default.connect(dbUrl).then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server is running", process.env.PORT);
    });
});
