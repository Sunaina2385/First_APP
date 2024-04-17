import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const app=express();

//Database Connect
mongoose.connect("mongodb://127.0.0.1:27017/UserDetails").then(()=>{
    console.log("Database Connected Successfully");
}).catch((err)=>{
    console.log(err);
})

//Schema
const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})

//Model
const User=mongoose.model("UserModel",userSchema);

//Middlewares
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Check Authentication
const isAuthenticated=async(req,res,next)=>{
    
    const {token}=req.cookies;
    
    if(token){
        const decoded=jwt.verify(token,"gffegfuefkufekf");
        console.log(token);
        req.user=await User.findById(decoded._id);
        console.log(decoded);
        next();
    }
    else{
        res.render("login.ejs");
    }
}

app.get("/",isAuthenticated,(req,res)=>{
    // console.log(req.user);
    res.render("logout.ejs",{name:req.user.name});
})

app.get("/login",(req,res)=>{
    res.render("login.ejs");
})

app.get("/register",(req,res)=>{
    res.render("register.ejs");
})

//Login Route
app.post("/login",async(req,res)=>{

    const {email,password}=req.body;

    let user=await User.findOne({email});
    if(!user){
        return res.redirect("/register");
    }
    
    const isPassword=await bcrypt.compare(password,user.password);
    if(isPassword==false){
        return res.render("login.ejs",{email,message:"Incorrect Password"});
    }

    const token=jwt.sign({_id:user._id},"gffegfuefkufekf");``
    console.log(token);

    res.cookie("token",token,{
        httpOnly:true,
        expires:new Date(Date.now()+15*60*1000)
    })

    res.redirect("/");
})

//Register Route
app.post("/register",async(req,res)=>{

    const {name,email,password}=req.body;
    let user=await User.findOne({email});
    if(user){
        return res.redirect("/login");
    }

    const hashedPassword=await bcrypt.hash(password,10);
    user=await User.create({
        name,
        email,
        password:hashedPassword
    });
    // console.log(user);
    const token=jwt.sign({_id:user._id},"gffegfuefkufekf");

    res.cookie("token",token,{
        httpOnly:true,
        expires:new Date(Date.now()+15*60*1000)
    })

    res.redirect("/");
})

//Logout Route
app.get("/logout",(req,res)=>{

    res.cookie("token",null,{
        httpOnly:true,
        expires:new Date(Date.now())
    })

    res.render("login.ejs");
})

app.listen(3000,()=>{
    console.log("Server get Started Successfully!");
})

