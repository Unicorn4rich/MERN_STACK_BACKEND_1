import mongoose from "mongoose";


// ye ham apne table ka schema bana rhy hain.
const userEnquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

//                               collection name  schema fields object name
const enquiryModel = mongoose.model("enquiry",    userEnquirySchema);
export default enquiryModel;

