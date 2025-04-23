"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enquiryUpdate = exports.deleteEnquiry = exports.enquiryList = exports.enquiry_insert = void 0;
const enquiry_model_1 = __importDefault(require("../../models/enquiry.model"));
//1. create data on database
let enquiry_insert = (req, res) => {
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
};
exports.enquiry_insert = enquiry_insert;
// 2. get data from database
let enquiryList = async (req, res) => {
    let enquiryList = await enquiry_model_1.default.find();
    res.status(200).json({ status: 1, message: "enquiry list", data: enquiryList });
};
exports.enquiryList = enquiryList;
// 3. delete data
let deleteEnquiry = async (req, res) => {
    const enquiryId = req.params.id; // id ko nikala 
    const deleteEnquiry = await enquiry_model_1.default.deleteOne({ _id: enquiryId });
    res.send({ status: 1, message: "Enquiry deleted successsfully", id: deleteEnquiry });
};
exports.deleteEnquiry = deleteEnquiry;
let enquiryUpdate = async (req, res) => {
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
};
exports.enquiryUpdate = enquiryUpdate;
