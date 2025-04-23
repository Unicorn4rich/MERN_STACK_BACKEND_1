import express from "express";
import dbConnection from "./dbConnection";
import { ObjectId } from "mongodb";
const app = express();




app.use(express.json())


//1. Data get API
app.get("/student-read", async (req, res) =>{
    let myDb = await dbConnection()
    let studentCollection = myDb.collection("students") 

    let data = await studentCollection.find().toArray(); // database mein aik collection mein rakhy data ko get kar rhy hain.
    let resObj_get = {
        status: 1,
        msg: "Student List",
        data
    }
    
    res.send(resObj_get) // successfully recieve data from database.
})



//2. Data insert APi
app.post("/student-insert", async (req: any, res: any)=>{
    let myDb = await dbConnection()  // ye database hamne dosri file mein bana akr yahn import kara hai.
    let studentCollection = myDb.collection("students") // hamne students ke naam ka database mein collection/tablle bnaya hai.
    
    // let obj = {
    //     name: req.body.Name,
    //     email: req.body.Email
    // }

    // destructuring
    let {Name, Email} = req.body;
    let obj = { Name, Email}
    // console.log("😈 Data get", obj)  // 😈 Data get { Name: 'Shoaib', Email: 'sk9952908@gmail.com' }

    // user ki di hui email ko check karta hai database collection mein agr key already hai to ye hamen wo object return krta hai same email wala or agr wo email nahi to null return karta hai.
    let checkEmail = await studentCollection.findOne({Email})
    // console.log("😑 checkEmail: ", checkEmail)

    if (checkEmail){ // agr email match hoti hai to yahi se response ke sath return kardo aagy ka code check hi mat karo agr email match nahi hoti to aagy ka code chala do.
        return res.send({status: 0, msg: "Email Id already exist"})
    }
     
    // now insert data to database
    let insertRes = await studentCollection.insertOne(obj) // user se aya data database mein insert ho rha hai.

    let resObj = {  // after data save to database ye object ham response mein bhejenge.
        status: 1,
        msg: "Data insert",
        insertRes
    }    
    
      res.send(resObj)

})



//3. Delete student data API
app.delete("/student-delete/:id", async (req, res)=>{ // yr url apne sath aik query parameter ley kar aaa rha hai.
    let paramsId =  req.params.id; // query parameter ko get kar rhy hain jo ke aik object hoga.
    // console.log("😁", paramsData) // id get successfully 

    let myDb = await dbConnection()  // database se hamne connection bnaya
    let studentCollection = myDb.collection("students") // databse ke andar rakhy collection/table ko bulaya.
    let delRes = await studentCollection.deleteOne({_id:new ObjectId(paramsId)}) // isme wo id dey denge jo params se nikali hai delete karne ke liye.

    let resObj = {  // after data save to database ye object ham response mein bhejenge.
        status: 1,
        msg: "Data delete",
        delRes
    }    
    res.send(resObj)

})




// 4. Update student data API
app.put("/student-update/:id", async (req, res)=>{
    let updteId = req.params.id; // params se id get ki jis object data ko update karna hai uski. 
    let {Name, Email} = req.body // isme user ka new data aega jo set karna hai.

    let Obj: { [key: string]: string } = {}; // user se aye data ko object mein rakha hai condition checking ke bad.

// ye logic hamne isliye likhi hai ke user agr agr aik bhi property dey to sirf usi property ki key generate ho or us data ko object mein store krwa diyya jaye.    
    if(Name !== "" && Name !== undefined && Name !== null){
        Obj['Name'] = Name; // name data ke aty hi Name ke naam se hi key generate ho or usme value rakh ke object ko dey do.
    }
    if(Email !== "" && Email !== undefined && Email !== null){
        Obj['Email'] = Email;
    }
    // console.log("🖐 userData: ", Obj)


    let myDb = await dbConnection()  // database se hamne connection bnaya
    let studentCollection = myDb.collection("students") // databse ke andar rakhy collection/table ko bulaya.
    //                                                        update this id obj    from this propertys  
    let updateRes = await studentCollection.updateOne({_id: new ObjectId(updteId)}, {$set: Obj}) 

    let resObj = {  // after data save to database ye object ham response mein bhejenge.
        status: 1,
        msg: "Data Update",
        updateRes
    }    
    res.send(resObj)

})

app.listen("8000")
