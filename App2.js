import express from "express";
const app=express();
import mongoose from "mongoose";

//middlewares
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb://127.0.0.1:27017",{
    dbname:"users"
}).then(()=>{
    console.log("Database Connected Successfully");
}).catch((err)=>{
    console.log(err);
});

const userSchema=new mongoose.Schema({
    email:String,
    password:String
})

const UserMode=mongoose.model("Users",userSchema);

app.get("/",(req,res)=>{
    res.render("Form.ejs");
    console.log("Form Filled Immediately")
})

app.get("/success",(req,res)=>{
    res.send("<h1> Form Submit Successfully </h1>")
})


app.post("/users",async(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    await UserMode.create({email,password});
    res.redirect("/success");
})

app.get("/getUsers",async(req,res)=>{
    try{
        const users=await UserMode.find();
        res.json({
            success:true,
            users
        })
    }
    catch(err){
        console.log("There is some error",err);
        res.send({
            success:false,
            message:"There is some issue in fetching data"
        })
    }
   
    
})

app.listen(3000,()=>{
    console.log("Server get Started Successfully!");
})