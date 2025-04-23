import { Button,  Label, TextInput, Textarea } from "flowbite-react";
import { EnquiryList } from "./enquiry/enquiryList";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';


function Enquiry() {

  const [enquiryList, setEnquiryList] = useState([]) // data saving from get api 
  // console.log("😈", enquiryList);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: '',
  })




  const saveEnquiry = (e: any) => {
    e.preventDefault() // refresh hony se rokta hai.


    if(formData._id){
      // Update
      // agr id pari hai to update ka login chaly.
      axios.put(`http://localhost:8020/api/website/enquiry/update/${formData._id}`, formData)
      .then((res: any)=> {
        // console.log(res.data)
        toast.success("Enquiry Data updated successfully") // for beatifull msg loading

        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          _id: ''
        });

        getAllEnquiry();
      });

    }
    else{ // agr id khali hai to insert ka logic lagega.
    //1. post request to create data
    axios.post("http://localhost:8020/api/website/enquiry/insert", formData)
    .then((res: any)=> {
      // console.log(res.data)

      toast.success("Enquiry Data saved successfully") // for beatifull msg loading

      setFormData({ // then complete hoti hai ye sari value empty kar dena.
        name: '',
        email: '',
        phone: '',
        message: '',
        _id: ''
      });

      getAllEnquiry()
    })
    }



  };


  //2. get data from api
  const getAllEnquiry = ()=> {
    axios.get("http://localhost:8020/api/website/enquiry/view")
    .then((res: any)=> {
      return res.data
    })
    .then((finalData)=> {
      if(finalData.status){
        setEnquiryList(finalData.enquiryList)
      }
    })
  }

  useEffect(()=> {
    getAllEnquiry()
  },[])


  // function for recives data from inputs
  const getValue = (e: any) => {
    const inputName = e.target.name // name/email/phone/message => in mein se kuch bhi mil sakta hai.
    const inputValue = e.target.value

    const oldData: any = {...formData} // copy object
    // console.log("😈 ", inputName) // check from browser.

    oldData[inputName] = inputValue;
    setFormData(oldData)
  }

  return (
    <>
      <ToastContainer /> {/* from toast msg component */}
      <h1 className="text-[40px] text-center py-[20px] font-bold">
        User Enquiry
      </h1>

      <div className="grid grid-cols-[30%_auto] gap-[40px]">
        {/* left part */}
        <div className="bg-gray-200 p-4">
          <h2 className="text-[20px] font-bold">Enquiry Form</h2>

          <form action='' onSubmit={saveEnquiry}>
            <div className="py-3">
              <Label htmlFor="name">Name</Label>
              <TextInput value={formData.name} onChange={getValue}
                type="text"
                name='name'
                placeholder="Enter Your Name"
                required
              />
            </div>

            <div className="py-3">
              <Label htmlFor="name">Email</Label>
              <TextInput value={formData.email} onChange={getValue}
                type="email"
                name='email'
                placeholder="Enter Your Email"
                required
              />
            </div>

            <div className="py-3">
              <Label htmlFor="name">Your Phone</Label>
              <TextInput value={formData.phone} onChange={getValue}
                type="text"
                name='phone'
                placeholder="Enter Your Phone"
                required
              />
            </div>

            <div className="py-3">
              <Label htmlFor="message">Your Message</Label>
              <Textarea value={formData.message} onChange={getValue}
                placeholder="Message..."
                name='message'
                required
                rows={4}
              />
            </div>

            <div className="py-3">
              <Button type="submit" className="w-[100%]">
                {formData._id ? 'Update' : 'Save'}
              </Button>
            </div>
          </form>
        </div>

        {/* right part enquiry list table */}
        <EnquiryList Data={enquiryList} onDeleteComplete={getAllEnquiry} dheet={Swal} setFormEditData={setFormData} />

      </div>
    </>
  );
}

export default Enquiry;




