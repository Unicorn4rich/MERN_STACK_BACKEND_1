import {MongoClient} from "mongodb"

const dbConnection_Url = `mongodb://127.0.0.1:27017`  // get Ip from mongodb documents and past here localhost ki jagah taky run time mein koi masla na aye.
const client = new MongoClient(dbConnection_Url); // ye aik connection ban gaya mongo url se.

let dbConnection = async()=>{
    await client.connect(); // client ko hamne bola mongodb ke sarh connect ho jao..
    let db = client.db("mongo_DbTestProject_Database"); // client connect hony ke bad ham aik database bana rhy hain.
    return db;
}

export default dbConnection;