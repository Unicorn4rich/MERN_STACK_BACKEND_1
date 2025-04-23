import mongoose from 'mongoose';
const Schema =mongoose.Schema


const enquirySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },

})


const enquiryModel = mongoose.model('Enquiry', enquirySchema)
export default enquiryModel