import mongoose from "mongoose"

// Check if the Enquiry model already exists to prevent overwriting
const EnquiryModel =
  mongoose.models.Enquiry ||
  mongoose.model(
    "Enquiry",
    new mongoose.Schema({
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
    }),
  )

export default EnquiryModel
