import express from 'express'; // Expresses import
import { Request, Response, NextFunction } from 'express';
let app = express();
app.use(express.json()) // app ke andar initilize kar diyya.

//<--------------------------------------------------------------------------------------->
// Middleware work start => Ye middleware pori appp pe kaam kar rha hai har aik route pe.
// middleware successfully access data url => http://localhost:8000/news?token=12345&pass=007


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

let myToken = "12345"; // for first middleware.
let myPass = "007";    // for second middleware.


// Middleware token checking function.
let checkToken = (req: CustomRequest, res: Response, next: NextFunction): void => { // 1.pehly ye chalega.
    console.log("😈", req.query.token);

    if (!req.query.token) { // Agr user token nahi dalta to usko ye response send kardo.
        res.send({
            status: 0,
            msg: "Please provide token"
        });
        return;
    }

    if (req.query.token !== myToken){ // Agr user ghalat token dalta hai to ye response send kar do. 
        res.send({
            status: 1,
            msg: "Please Enter Correct token"
        });
        return;
    }

    // Agr token correct hai to next() aagy file mein rakha code chala dega jahn user jana chahta hai.
    next();
};

app.use(checkToken);


//=================================
// another middleware
app.use((req, res, next)=>{  // 2. opar wala middleware successfully complete hony ke bad next chlaega uske bad phir is middleware ki condition ko check kiyya jaega.
    if (!req.query.pass) { // Agr user token nahi dalta to usko ye response send kardo.
        res.send({
            status: 0,
            msg: "Please fill the password"
        });
        return;
    }

    if (req.query.pass !== myPass){ // Agr user ghalat token dalta hai to ye response send kar do. 
        res.send({
            status: 1,
            msg: "Please Enter the Correct password"
        });
        return;
    }

    // Agr token correct hai to next() aagy file mein rakha code chala dega jahn user jana chahta hai.
    next();
})


//<--------------------------------------------------------------------------------------->
// creating route for news page


app.get("/news", (req, res)=>{
    res.send({status: 2, msg: "News API page"})
})

app.listen(8000, () => {
    console.log("😎 Server running on port 8000");
});

