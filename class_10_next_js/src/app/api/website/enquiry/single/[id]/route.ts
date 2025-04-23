import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import EnquiryModel from "@/app/models/enquiry.model"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const editRow = params.id
    const enquiry = await EnquiryModel.findOne({ _id: editRow })
    return NextResponse.json({ status: 1, enquiry })
  } catch (error: any) {
    return NextResponse.json({ status: 0, message: "Error fetching enquiry", error: error.message }, { status: 500 })
  }
}
