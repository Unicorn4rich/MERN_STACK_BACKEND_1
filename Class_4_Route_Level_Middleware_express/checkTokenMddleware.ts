import { Request, Response, NextFunction } from "express";


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

export default checkToken