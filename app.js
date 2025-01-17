//to connect .env file with app.js//

require('dotenv').config()

//to require express ??
const express = require("express");

//to access database connection  i this file //
const connectdatabase = require("./database");

const app = express();
 app.use(express.json())
connectdatabase()

// create API and response in 200 status which means successfully worked //
app.get("/",(req,res)=>{
   res.status(200).json(  {
    message : " hey this is my webpage."
})
} )


// to create get api//

app.get("/about",(req,res)=>{
    res.json({
        message:"hey i am learning backend development"
    })
})
// post api //

app.post('/blog',(req,res)=>{
    console.log(req.body)
    res.status(200).json({
        message : "post api successful"
    })
})

// its a port 3000 messsage //
app.listen(process.env.PORT,()=>{
    console.log("nodejs project has been started .")
})

//mongodb+srv://mongodb-user:<db_password>@cluster0.5xr2y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

