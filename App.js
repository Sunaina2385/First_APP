import express from "express";
const app=express();
import path from "path";

app.get("/",(req,res,next)=>{
    // res.send("Hello World");
    // res.sendStatus(500);
    res.json({
        "success":true,
        "products":[]
    })
})

app.get("/about",(req,res)=>{
    res.sendFile("./views/About.html",{root:path.resolve()});
})

app.listen(3000,(req,res)=>{
    console.log("Server get started easily");
}) 