//to connect .env file with app.js//
require('dotenv').config()

//to require express ??
const express = require("express");

//to access database connection //
const connectdatabase = require("./database");


const blog = require('./model/blogModel');
const { storage, multer } = require('./middleWare/multerConfig');
const fs = require('fs')


const upload = multer({storage : storage});

const app = express();
 app.use(express.json());
connectdatabase()

//fix of cors error
const cors =require("cors")
app.use(cors({
    origin:["http://localhost:5173","https://myfirstproject-chi-snowy.vercel.app"]
}))
app.get("/",(req,res)=>{
   res.status(200).json(  {
    message : " hey this is my webpage."
})
} );




// get() api kehi linupara ma use huncha //
// post() api kehi dinu para ma use huncha //
// upload.single() single file ko lagi matra use huncha // 
app.post("/blog",upload.single('image'),(req,res)=>{
console.log(req.body)

  const{title, subtitle, description } = req.body
  if(!title || !subtitle || !description){
    return res.status(400).json({
        message : "please enter title ,subtitle , description"
    })
  }
console.log(req.file)

const filename ="https://localhost:4000/" + req.file.filename

// blog bhana folder ma halnuparama create() method use huncha // 
     blog.create({
        title : title,
        subtitle : subtitle,
        description : description,
        image : filename

    })
    res.status(200).json({
        message : "post api successful"
    })
})
// kehi linu parama find() method use huncha// 






app.get("/blog", async (req,res)=>{
const   blogs = await blog.find() //return array
res.status(200).json({
    message : "blog feched successfully.",
    data : blogs
})
})





app.get("/blog/:id", async(req,res)=>{
  
    const id = req.params.id // params capture the id from the url
const Blog = await blog.findById(id) //find the id which is capture from the url
 
if(!Blog){
      res.status(404).json({
        message : "something went wrong.",

    })
 }

 res.status(200).json({
    message : "id feched successfully",
    data : Blog

 })
 
}) 




app.delete("/blog/:id",async(req,res)=>{
    const id = req.params.id
const Blog = await blog.findById(id)
const imageName = Blog.image
    fs.unlink(`./storage/${imageName}`, (err) =>{
        if(err){
            console.log(" failed to delete")
        }else{
            console.log("blog deleted successfully")
        }
       
    })
    await blog.findByIdAndDelete(id)
    res.status(200).json({
        message : "blog delete successfully"
    })
    
    
})

app.patch('/blog/:id' ,upload.single('image') , async(req,res) =>{
    const id = req.params.id
    const {title,subtitle,description} = req.body
    let filename;
 if(req.file){
    filename = "https://localhost:4000/" + req.file.filename
    const id = req.params.id
    const Blog = await blog.findById(id)
    const imageName = Blog.image
        fs.unlink(`./storage/${imageName}`, (err) =>{
            if(err){
                console.log(" failed to delete")
            }else{
                console.log("blog deleted successfully")
            }
           
        })

 }
    await blog.findByIdAndUpdate(id,{
     title : title,
    subtitle : subtitle,
   description : description,
   image :filename
    })
    res.status(200).json({
        message :"blog updated successfully"
    })
})





// user can access img src//
// localhost:3000/ritesh-Screenshot_22-11-2024_6467_www.youtube.com.jpeg //

app.use(express.static("./storage"))
// its a port 3000 messsage //
app.listen(process.env.PORT,()=>{
    console.log("nodejs project has been started .")
})

//mongodb+srv://mongodb-user:<db_password>@cluster0.5xr2y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

