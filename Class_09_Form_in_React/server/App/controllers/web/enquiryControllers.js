"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRow = exports.enquiryEditRow = exports.enquiryDelete = exports.enquiryList = exports.enquiryInsert = void 0;
const enquiry_model_1 = __importDefault(require("../../models/enquiry.model"));
// 1. POST Insert API 
const enquiryInsert = (req, res) => {
    const { name, email, phone, message } = req.body; // un properties ko req.body se destructure kry hain.
    // console.log(sName, sEmail, sPhone, sMessage);  // print krwa ke check kar rhy hain data aya ya nahi.
    const enquiry = new enquiry_model_1.default({
        name: name, // isme (name) ki property schema ki hai or (sName) ki property user ne jo post request ki hai data create karne ke liye ye wo hai.
        email: email,
        phone: phone,
        message: message
    });
    // ye sara data yahn se save ho rha hai.
    enquiry.save().then(() => {
        res.send({ status: 1, message: "Enquiry saved successfully" });
    }).catch((error) => {
        res.send({ status: 0, message: "Error while saving enquiry", error: error.message });
    });
};
exports.enquiryInsert = enquiryInsert;
// 2. GET data API
const enquiryList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const enquiry = yield enquiry_model_1.default.find(); // 
    console.log("🤬", enquiry);
    res.send({ status: 1, enquiryList: enquiry });
});
exports.enquiryList = enquiryList;
// 3. delete data API
const enquiryDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteID = req.params.id;
    const enquiry = yield enquiry_model_1.default.deleteOne({ _id: deleteID });
    res.send(({ status: 1, message: "Enquiry deleted successfully!", enquiry }));
});
exports.enquiryDelete = enquiryDelete;
// 4. edit row data API
const enquiryEditRow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const editRow = req.params.id;
    const enquiry = yield enquiry_model_1.default.findOne({ _id: editRow });
    res.send({ status: 1, enquiry });
});
exports.enquiryEditRow = enquiryEditRow;
// 5. update row data API
const updateRow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateRow = req.params.id;
    const { name, email, phone, message } = req.body;
    const updateObj = {
        name: name,
        email: email,
        phone: phone,
        message: message
    };
    const updateRes = yield enquiry_model_1.default.updateOne({ _id: updateRow }, updateObj);
    res.send({ status: 1, message: "Enquiry updated successfully!", updateRes });
});
exports.updateRow = updateRow;
