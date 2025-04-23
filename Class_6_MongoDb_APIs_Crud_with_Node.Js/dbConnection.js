"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dbConnection_Url = `mongodb://127.0.0.1:27017`; // get Ip from mongodb documents and past here localhost ki jagah taky run time mein koi masla na aye.
const client = new mongodb_1.MongoClient(dbConnection_Url); // ye aik connection ban gaya mongo url se.
let dbConnection = async () => {
    await client.connect(); // client ko hamne bola mongodb ke sarh connect ho jao..
    let db = client.db("mongo_DbTestProject_Database"); // client connect hony ke bad ham aik database bana rhy hain.
    return db;
};
exports.default = dbConnection;
