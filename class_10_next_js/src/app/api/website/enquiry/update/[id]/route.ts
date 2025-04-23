import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import EnquiryModel from "@/app/models/enquiry.model"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const updateRow = params.id
    const body = await request.json()
    const { name, email, phone, message } = body

    const updateObj = {
      name,
      email,
      phone,
      message,
    }

    const updateRes = await EnquiryModel.updateOne({ _id: updateRow }, updateObj)
    return NextResponse.json({ status: 1, message: "Enquiry updated successfully!", updateRes })
  } catch (error: any) {
    return NextResponse.json({ status: 0, message: "Error updating enquiry", error: error.message }, { status: 500 })
  }
}
