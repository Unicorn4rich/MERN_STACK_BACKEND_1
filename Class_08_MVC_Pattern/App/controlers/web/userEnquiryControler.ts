import enquiryModel from "../../models/enquiry.model";



//1. create data on database
let enquiry_insert = (req: any, res: any)=> { // thunder client se usr ban kar ham propertys bhej rhy hain.
    const {sName, sEmail, sPhone, sMessage} = req.body;  // un properties ko req.body se destructure kry hain.
    // console.log(sName, sEmail, sPhone, sMessage);  // print krwa ke check kar rhy hain data aya ya nahi.

    const enquiry = new enquiryModel({ // ye wo model hai jo ham apne table ka schema bana rhy hain.
        name: sName,     // isme (name) ki property schema ki hai or (sName) ki property user ne jo post request ki hai data create karne ke liye ye wo hai.
        email: sEmail,
        phone: sPhone,
        message: sMessage
    });
    // ye sara data yahn se save ho rha hai.
    enquiry.save().then(() =>{
        res.send({status: 1, message: "Enquiry saved successfully"});
    }).catch((error) => {
        res.send({status: 0, message: "Error while saving enquiry", error: error.message});
    })

}


// 2. get data from database
let enquiryList = async (req: any, res: any)=> {
    let enquiryList = await enquiryModel.find();
    res.status(200).json({status: 1, message: "enquiry list", data: enquiryList})
}


// 3. delete data
let deleteEnquiry =  async (req: any, res: any)=> { // request mein user ne value delete karne wali id bheji hai. 
    const enquiryId = req.params.id; // id ko nikala 
    const deleteEnquiry = await enquiryModel.deleteOne({_id: enquiryId})
    res.send({status: 1, message: "Enquiry deleted successsfully", id: deleteEnquiry})
}


let enquiryUpdate = async (req: any, res: any)=>{
    const updateId = req.params.id;
    const {sName, sEmail, sPhone, sMessage} = req.body;  // un properties ko req.body se destructure kry hain.

    let updateObj ={
        name: sName,
        email: sEmail,
        phone: sPhone,
        message: sMessage
    }
    let updateRes = await enquiryModel.updateOne({_id:updateId}, updateObj)

    res.send({status: 1, message: "Enquiry updated successfully", updateRes})
}


export { enquiry_insert, enquiryList, deleteEnquiry, enquiryUpdate };