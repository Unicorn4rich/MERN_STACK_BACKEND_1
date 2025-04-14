import express from 'express'; // Expresses import
let app = express();
app.use(express.json()) // app ke andar initilize kar diyya.

import checkToken from './checkTokenMddleware'; // middleware import from another file.



//<--------------------------------------------------------------------------------------->
// creating route for news page

// creating home page route.
app.get('/', (req, res)=>{  // http://localhost:8000
    res.send({status: 1, msg: "Home page API"})
})

app.listen(8000, () => {
    console.log("Server running on port 8000");
});



// creating news page route with middlware authentication.
app.get("/news", checkToken ,(req, res)=>{
    res.send({status: 2, msg: "News API page"})
})

app.listen(8000, () => {
    console.log("😎 Server running on port 8000");
});

