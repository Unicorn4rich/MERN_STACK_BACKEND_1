import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import EnquiryModel from "@/app/models/enquiry.model"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const deleteID = params.id
    const enquiry = await EnquiryModel.deleteOne({ _id: deleteID })
    return NextResponse.json({ status: 1, message: "Enquiry deleted successfully!", enquiry })
  } catch (error: any) {
    return NextResponse.json({ status: 0, message: "Error deleting enquiry", error: error.message }, { status: 500 })
  }
}
