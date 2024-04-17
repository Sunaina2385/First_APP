import express from "express";
const app=express();

app.set("view engine","ejs");

app.get("/about",(req,res)=>{
    res.render("About",{fname:"Prakshi",lname:"Sharma"});
})

app.listen(3000,(req,res)=>{
    console.log("Server get Started!!");
})