import express from 'express'; // Expresses import
let app = express();
app.use(express.json()) // app ke andar initilize kar diyya.


// creating route
app.get('/', (req, res)=>{  // http://localhost:8000/
    res.send({status: 1, msg: "Home page API"})
})

app.listen(8000, () => {
    console.log("Server running on port 8000");
});



// creating route for news page
app.get("/news", (req, res)=>{
    res.send({status: 2, msg: "News page API"})
})

app.listen(8000, () => {
    console.log("Server running on port 8000");
});



// Data ham 3 tarhn se user se get karte hain User se.
//                                              1. body data
//                                              2. Query data
//                                              3. params data

app.post("/login", (req, res)=> {  // user ne body se jo data bheja hai wo (req) ke pass aya hai or phir (res) se hamne user ko response send kiyya.
    console.log("😎 request data:", req.body) // { username: 'shoaib', password: 'sho123' }
    res.send(
        {
            status: 4,
            msg: "Login API",
            bodyData: req.body, // user ne jo data bheja hai wo bodyData ke andar aayega. or ham data hmesha body mein rakh kar nikalty hain or use karte hain.
        })
})



// thunder client se post request ki query parameter => http://localhost:8000/login?userName=ws&password=ws3231@23 

app.post("/login", (req, res)=> {  // user ne body se jo data bheja hai wo (req) ke pass aya hai or phir (res) se hamne user ko response send kiyya.
    console.log("😎 request data:", req.body) // { username: 'ws', password: 'w8232' }
    res.status(200).json( // response ham status code ke sath bhi bhej sakty hain.
        res.send(
            {
                status: 4,
                msg: "Login API",
                queryData: req.query // query ka data yahn se get kar rhy hain.
            })
    )
})


app.listen(8000, () => {
    console.log("Server running on port 8000");
});


// Params get => http://localhost:8000/news/3
app.get("/news/:id", (req, res)=>{ // params id in => res
    let curruntId = req.params.id  // extract param dynamic id
    res.send("News details API :" + curruntId) // News details API :3
})