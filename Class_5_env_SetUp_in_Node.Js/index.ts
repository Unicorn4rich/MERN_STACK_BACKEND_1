import express from 'express'; // Expresses import
let app = express();
app.use(express.json()) // app ke andar initilize kar diyya.

import dotenv from 'dotenv';  // env file ko load karne ke liye.
dotenv.config();  // variable configration

import { Request, Response, NextFunction } from "express";



// check kar rhy hain env variable ka data aa rha hai ya nahi.
// console.log("😍MY_TOKEN: ", process.env.MY_TOKEN)    // 😍 MY_TOKEN 12345

interface CustomRequest extends Request { // middleware data types
    body: {
        username?: string;
        password?: string;
    };
    query: {
        userName?: string;
        password?: string;
        token?: string;
    };
    params: {
        id?: string;
    };
}


// Middleware token checking function.
let checkToken = (req: CustomRequest, res: Response, next: NextFunction): void => { // 1.pehly ye chalega.
    console.log(" ", req.query.token);

    if (!req.query.token) { // Agr user token nahi dalta to usko ye response send kardo.
        res.send({
            status: 0,
            msg: "Please provide token"
        });
        return;
    }

    if (req.query.token !== process.env.MY_TOKEN){ // Agr user ghalat token dalta hai to ye response send kar do. 
        res.send({
            status: 1,
            msg: "Please Enter Correct token"
        });
        return;
    }

    // Agr token correct hai to next() aagy file mein rakha code chala dega jahn user jana chahta hai.
    next();
};

export default checkToken

//<--------------------------------------------------------------------------------------->
// creating route for news page

// creating home page route.
app.get('/', (req, res)=>{  // http://localhost:8000
    res.send({status: 1, msg: "Home page API"})
})


// creating news page route with middlware authentication.
app.get("/news", checkToken ,(req, res)=>{
    res.send({status: 2, msg: "News API page"})
})



app.listen(process.env.PORT || 5000, () => {
    console.log(" Server running on port 8000");
});


{
    "sName": "Shoaib Ahmed",
    "sEmail": "sk9952908@gmail.com"
}