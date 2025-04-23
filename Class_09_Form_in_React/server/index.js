"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const enquiryRoutes_1 = __importDefault(require("./App/routes/web/enquiryRoutes"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)()); // userInterface se url ka agr koi port number alag bhi aye to usko allow kar dena.
app.use(express_1.default.json());
// Routes
app.use('/api/website/enquiry', enquiryRoutes_1.default);
// http://localhost:8020/api/website/enquiry/insert
// Connect to MongoDb
mongoose_1.default.connect(process.env.DBURL || 'mongodb://localhost:27017/').then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server is running");
    });
}).catch((error) => { console.log("Error while connecting to MongoDb", error); });
function Funcors() {
    throw new Error('Function not implemented.');
}
