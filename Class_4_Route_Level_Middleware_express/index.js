"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Expresses import
let app = (0, express_1.default)();
app.use(express_1.default.json()); // app ke andar initilize kar diyya.
const checkTokenMddleware_1 = __importDefault(require("./checkTokenMddleware")); // middleware import from another file.
//<--------------------------------------------------------------------------------------->
// creating route for news page
// creating home page route.
app.get('/', (req, res) => {
    res.send({ status: 1, msg: "Home page API" });
});
app.listen(8000, () => {
    console.log("Server running on port 8000");
});
// creating news page route with middlware authentication.
app.get("/news", checkTokenMddleware_1.default, (req, res) => {
    res.send({ status: 2, msg: "News API page" });
});
app.listen(8000, () => {
    console.log("😎 Server running on port 8000");
});
