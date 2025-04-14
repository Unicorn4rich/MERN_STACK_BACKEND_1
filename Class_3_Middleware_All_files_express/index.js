"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Expresses import
let app = (0, express_1.default)();
app.use(express_1.default.json()); // app ke andar initilize kar diyya.
let myToken = "12345";
let myPass = "007";
// Middleware token checking function.
let checkToken = (req, res, next) => {
    console.log("😈", req.query.token);
    if (!req.query.token) { // Agr user token nahi dalta to usko ye response send kardo.
        res.send({
            status: 0,
            msg: "Please provide token"
        });
        return;
    }
    if (req.query.token !== myToken) { // Agr user ghalat token dalta hai to ye response send kar do. 
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
app.use((req, res, next) => {
    if (!req.query.pass) { // Agr user token nahi dalta to usko ye response send kardo.
        res.send({
            status: 0,
            msg: "Please fill the password"
        });
        return;
    }
    if (req.query.pass !== myPass) { // Agr user ghalat token dalta hai to ye response send kar do. 
        res.send({
            status: 1,
            msg: "Please Enter the Correct password"
        });
        return;
    }
    // Agr token correct hai to next() aagy file mein rakha code chala dega jahn user jana chahta hai.
    next();
});
//<--------------------------------------------------------------------------------------->
// creating route for news page
app.get("/news", (req, res) => {
    res.send({ status: 2, msg: "News API page" });
});
app.listen(8000, () => {
    console.log("😎 Server running on port 8000");
});
