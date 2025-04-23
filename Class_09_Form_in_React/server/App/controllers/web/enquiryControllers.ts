import enquiryModel from "../../models/enquiry.model";


// 1. POST Insert API 
const enquiryInsert = (req: any, res: any)=> { // thunder client se usr ban kar ham propertys bhej rhy hain.
    const {name, email, phone, message} = req.body;  // un properties ko req.body se destructure kry hain.
    // console.log(sName, sEmail, sPhone, sMessage);  // print krwa ke check kar rhy hain data aya ya nahi.

    const enquiry = new enquiryModel({ // ye wo model hai jo ham apne table ka schema bana rhy hain.
        name: name,     // isme (name) ki property schema ki hai or (sName) ki property user ne jo post request ki hai data create karne ke liye ye wo hai.
        email: email,
        phone: phone,
        message: message
    });
    // ye sara data yahn se save ho rha hai.
    enquiry.save().then(() =>{
        res.send({status: 1, message: "Enquiry saved successfully"});
    }).catch((error: any) => {
        res.send({status: 0, message: "Error while saving enquiry", error: error.message});
    })

}



// 2. GET data API
const enquiryList = async (req: any, res: any) => {
    const enquiry = await enquiryModel.find(); // 
    // console.log("🤬", enquiry);
    res.send({status: 1, enquiryList: enquiry});
}


// 3. delete data API
const enquiryDelete = async (req: any, res: any)=>{
    const deleteID = req.params.id;
    const enquiry = await enquiryModel.deleteOne({_id: deleteID});
    res.send(({status: 1, message: "Enquiry deleted successfully!", enquiry}));
}


// 4. edit row data API
const enquiryEditRow = async (req: any, res: any)=> {
    const editRow = req.params.id;
    const enquiry = await enquiryModel.findOne({_id: editRow});
    res.send({status: 1, enquiry});
}


// 5. update row data API
const updateRow = async (req: any, res: any)=> {
    const updateRow = req.params.id;
    const {name, email, phone, message} = req.body;

    const updateObj = {
        name: name,
        email: email,
        phone: phone,
        message: message
    };
    const updateRes = await enquiryModel.updateOne({_id: updateRow}, updateObj);
    res.send({status: 1, message: "Enquiry updated successfully!", updateRes});

}



export {enquiryInsert, enquiryList, enquiryDelete, enquiryEditRow, updateRow}