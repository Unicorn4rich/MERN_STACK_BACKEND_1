"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enquiryControllers_1 = require("../../controllers/web/enquiryControllers");
const enquiryRouter = express_1.default.Router();
// 1. post
enquiryRouter.post('/insert', enquiryControllers_1.enquiryInsert);
// 2. get
enquiryRouter.get('/view', enquiryControllers_1.enquiryList);
// 3. delete
enquiryRouter.delete('/delete/:id', enquiryControllers_1.enquiryDelete);
// 4. edit
enquiryRouter.get('/single/:id', enquiryControllers_1.enquiryEditRow);
// 5. update
enquiryRouter.put('/update/:id', enquiryControllers_1.updateRow);
exports.default = enquiryRouter; // index.ts ke andar call hoga ye
