import express from 'express';
import { enquiryInsert, enquiryList, enquiryDelete, enquiryEditRow, updateRow } from '../../controllers/web/enquiryControllers';
const enquiryRouter = express.Router();

// 1. post
enquiryRouter.post('/insert', enquiryInsert);

// 2. get
enquiryRouter.get('/view', enquiryList);

// 3. delete
enquiryRouter.delete('/delete/:id', enquiryDelete);

// 4. edit
enquiryRouter.get('/single/:id', enquiryEditRow);

// 5. update
enquiryRouter.put('/update/:id', updateRow);




export default enquiryRouter; // index.ts ke andar call hoga ye