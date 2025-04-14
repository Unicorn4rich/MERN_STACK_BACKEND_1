"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Expresses import
let app = (0, express_1.default)();
app.use(express_1.default.json()); // app ke andar initilize kar diyya.
// creating route
app.get('/', (req, res) => {
    res.send({ status: 1, msg: "Home page API" });
});
app.listen(8000, () => {
    console.log("Server running on port 8000");
});
// creating route for news page
app.get("/news", (req, res) => {
    res.send({ status: 2, msg: "News page API" });
});
app.listen(8000, () => {
    console.log("Server running on port 8000");
});
// query data
app.post("/login", (req, res) => {
    console.log("😎 request ka data:", req.body); // { username: 'ws', password: 'w8232' }
    res.send({
        status: 4,
        msg: "Login API",
        bodyData: req.body,
        queryData: req.query
    });
});
app.listen(8000, () => {
    console.log("Server running on port 8000");
});
app.get("/news/:id", (req, res) => {
    let curruntId = req.params.id;
    res.send("News details API :" + curruntId);
});
