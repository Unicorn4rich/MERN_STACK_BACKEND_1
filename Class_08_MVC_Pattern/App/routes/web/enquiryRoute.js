"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enquiryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userEnquiryControler_1 = require("../../controlers/web/userEnquiryControler");
let enquiryRoutes = express_1.default.Router();
exports.enquiryRoutes = enquiryRoutes;
//1. create data on database
enquiryRoutes.post('/enquiry-insert', userEnquiryControler_1.enquiry_insert); // ye file hamne dosry folder se import ki hai jese component import kar ke unka code use karte thy same wesy.
// 2. get data from database
enquiryRoutes.get('/enquiry-list', userEnquiryControler_1.enquiryList);
// 3. delete data
enquiryRoutes.delete("/enquirt-delete/:id", userEnquiryControler_1.deleteEnquiry);
// 4. update data
enquiryRoutes.put("/enquiry-update/:id", userEnquiryControler_1.enquiryUpdate);
