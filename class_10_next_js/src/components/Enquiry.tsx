"use client"

import { Button, Label, TextInput, Textarea } from "flowbite-react"
import axios from "axios"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import Swal from "sweetalert2"
import { EnquiryList } from "./enquiryList"

function Enquiry() {
  const [enquiryList, setEnquiryList] = useState([])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  })

  const saveEnquiry = async (e: any) => {
    e.preventDefault()

    try {
      if (formData._id) {
        // Update
        const res = await axios.put(`/api/website/enquiry/update/${formData._id}`, formData)
        toast.success("Enquiry Data updated successfully")
      } else {
        // Insert
        const res = await axios.post("/api/website/enquiry/insert", formData)
        toast.success("Enquiry Data saved successfully")
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        _id: "",
      })

      getAllEnquiry()
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    }
  }

  // Get data from API
  const getAllEnquiry = async () => {
    try {
      const res = await axios.get("/api/website/enquiry/view")
      const finalData = res.data
      if (finalData.status) {
        setEnquiryList(finalData.enquiryList)
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error)
    }
  }

  useEffect(() => {
    getAllEnquiry()
  }, [])

  // Function for receiving data from inputs
  const getValue = (e: any) => {
    const inputName = e.target.name
    const inputValue = e.target.value

    const oldData: any = { ...formData }
    oldData[inputName] = inputValue
    setFormData(oldData)
  }

  return (
    <>
      <ToastContainer />
      <h1 className="text-[40px] text-center py-[20px] font-bold">User Enquiry</h1>

      <div className="grid grid-cols-1 md:grid-cols-[30%_auto] gap-[40px]">
        {/* left part */}
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-[20px] font-bold">Enquiry Form</h2>

          <form action="" onSubmit={saveEnquiry}>
            <div className="py-3">
              <Label htmlFor="name">Name</Label>
              <TextInput
                value={formData.name}
                onChange={getValue}
                type="text"
                name="name"
                placeholder="Enter Your Name"
                required
              />
            </div>

            <div className="py-3">
              <Label htmlFor="name">Email</Label>
              <TextInput
                value={formData.email}
                onChange={getValue}
                type="email"
                name="email"
                placeholder="Enter Your Email"
                required
              />
            </div>

            <div className="py-3">
              <Label htmlFor="name">Your Phone</Label>
              <TextInput
                value={formData.phone}
                onChange={getValue}
                type="text"
                name="phone"
                placeholder="Enter Your Phone"
                required
              />
            </div>

            <div className="py-3">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                value={formData.message}
                onChange={getValue}
                placeholder="Message..."
                name="message"
                required
                rows={4}
              />
            </div>

            <div className="py-3">
              <Button type="submit" className="w-[100%]">
                {formData._id ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </div>

        {/* right part enquiry list table */}
        <EnquiryList Data={enquiryList} onDeleteComplete={getAllEnquiry} dheet={Swal} setFormEditData={setFormData} />
      </div>
    </>
  )
}

export default Enquiry
