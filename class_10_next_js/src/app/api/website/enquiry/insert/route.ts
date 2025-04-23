import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import EnquiryModel from "@/app/models/enquiry.model"

export async function POST(request: Request) {
  try {
    await connectToDatabase()
    const body = await request.json()
    const { name, email, phone, message } = body

    const enquiry = new EnquiryModel({
      name,
      email,
      phone,
      message,
    })

    await enquiry.save()
    return NextResponse.json({ status: 1, message: "Enquiry saved successfully" })
  } catch (error: any) {
    return NextResponse.json(
      { status: 0, message: "Error while saving enquiry", error: error.message },
      { status: 500 },
    )
  }
}
