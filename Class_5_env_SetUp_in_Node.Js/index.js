"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Expresses import
let app = (0, express_1.default)();
app.use(express_1.default.json()); // app ke andar initilize kar diyya.
const dotenv_1 = __importDefault(require("dotenv")); // env file ko load karne ke liye.
dotenv_1.default.config(); // variable configration
// Middleware token checking function.
let checkToken = (req, res, next) => {
    console.log(" ", req.query.token);
    if (!req.query.token) { // Agr user token nahi dalta to usko ye response send kardo.
        res.send({
            status: 0,
            msg: "Please provide token"
        });
        return;
    }
    if (req.query.token !== process.env.MY_TOKEN) { // Agr user ghalat token dalta hai to ye response send kar do. 
        res.send({
            status: 1,
            msg: "Please Enter Correct token"
        });
        return;
    }
    // Agr token correct hai to next() aagy file mein rakha code chala dega jahn user jana chahta hai.
    next();
};
exports.default = checkToken;
//<--------------------------------------------------------------------------------------->
// creating route for news page
// creating home page route.
app.get('/', (req, res) => {
    res.send({ status: 1, msg: "Home page API" });
});
// creating news page route with middlware authentication.
app.get("/news", checkToken, (req, res) => {
    res.send({ status: 2, msg: "News API page" });
});
app.listen(process.env.PORT || 5000, () => {
    console.log(" Server running on port 8000");
});
