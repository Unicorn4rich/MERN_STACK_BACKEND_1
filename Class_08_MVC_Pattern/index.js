"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const enquiryRoute_1 = require("./App/routes/web/enquiryRoute");
dotenv_1.default.config();
const dbUrl = process.env.DBURL || "your-default-db-url";
app.use(express_1.default.json());
// ye main url hoga iske bad jolgaenge wo endpoints honge.
app.use("/web/api/enquiry", enquiryRoute_1.enquiryRoutes);
// http://localhost:8000/web/api/enquiry/enquiry-insert
mongoose_1.default.connect(dbUrl).then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server is running", process.env.PORT);
    });
});
