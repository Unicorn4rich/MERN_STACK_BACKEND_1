"use client"

import axios from "axios"
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react"
import { toast, ToastContainer } from "react-toastify"

type Enquiry = {
  _id: string
  name: string
  email: string
  phone: string
  message: string
}

interface EnquiryListProps {
  Data: Enquiry[]
  onDeleteComplete: () => void
  dheet: any // Swal
  setFormEditData: (data: Enquiry) => void
}

export function EnquiryList({ Data, onDeleteComplete, dheet, setFormEditData }: EnquiryListProps) {
  // Delete API
  function deleteRow(deleteId: string): void {
    dheet
      .fire({
        title: "Do you want to delete the data?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete",
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          axios
            .delete(`/api/website/enquiry/delete/${deleteId}`)
            .then((res: any) => {
              onDeleteComplete()
            })
            .catch((error) => {
              toast.error("Error deleting record")
              console.error(error)
            })

          dheet.fire("Saved!", "", "success")
        } else if (result.isDenied) {
          dheet.fire("Changes are not saved", "", "info")
        }
      })
  }

  // Edit API
  const editRow = (editId: string) => {
    axios
      .get(`/api/website/enquiry/single/${editId}`)
      .then((res: any) => {
        const data = res.data
        setFormEditData(data.enquiry)
        onDeleteComplete()
      })
      .catch((error) => {
        toast.error("Error fetching record")
        console.error(error)
      })
  }

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <ToastContainer />
      <h2 className="text-[20px] font-bold mb-4">Enquiry List</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Sr No</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Phone</TableHeadCell>
              <TableHeadCell>Message</TableHeadCell>
              <TableHeadCell>
                <span>Delete</span>
              </TableHeadCell>
              <TableHeadCell>
                <span>Edit</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {Data.length >= 1 ? (
              Data.map((item: Enquiry, index: number) => (
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.message}</TableCell>
                  <TableCell>
                    <button onClick={() => deleteRow(item._id)}>
                      <span className="font-medium text-red-600 hover:underline dark:text-cyan-500">Delete</span>
                    </button>
                  </TableCell>
                  <TableCell>
                    <button onClick={() => editRow(item._id)}>
                      <span className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">Edit</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell colSpan={7} className="text-center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
