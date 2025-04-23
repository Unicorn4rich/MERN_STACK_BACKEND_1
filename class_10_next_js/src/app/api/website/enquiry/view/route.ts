import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import EnquiryModel from "@/app/models/enquiry.model"

export async function GET() {
  try {
    await connectToDatabase()
    const enquiry = await EnquiryModel.find()
    return NextResponse.json({ status: 1, enquiryList: enquiry })
  } catch (error: any) {
    return NextResponse.json({ status: 0, message: "Error fetching enquiries", error: error.message }, { status: 500 })
  }
}
