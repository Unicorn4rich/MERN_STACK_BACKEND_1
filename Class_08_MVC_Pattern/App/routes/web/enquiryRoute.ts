import express from "express";
import { deleteEnquiry, enquiry_insert, enquiryList, enquiryUpdate } from "../../controlers/web/userEnquiryControler";
let enquiryRoutes = express.Router();  



//1. create data on database
enquiryRoutes.post('/enquiry-insert', enquiry_insert) // ye file hamne dosry folder se import ki hai jese component import kar ke unka code use karte thy same wesy.

// 2. get data from database
enquiryRoutes.get('/enquiry-list', enquiryList)

// 3. delete data
enquiryRoutes.delete("/enquirt-delete/:id", deleteEnquiry)

// 4. update data
enquiryRoutes.put("/enquiry-update/:id", enquiryUpdate)


export {enquiryRoutes}