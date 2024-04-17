const http=require("http");
const fs=require("fs");

const server=http.createServer((req,res)=>{
    
    /*
    console.log(req.url);
    res.write("Hello World");
    res.end();
    */

    const reqUrl=req.url;
    if(reqUrl=="/"){
        fs.readFile("./views/Home.html",(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                res.end(data);
            }
        })
    }
    else if(reqUrl=="/about"){
        fs.readFile("./views/About.html",(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                res.end(data);
            }
        })
    }
    else if(reqUrl=="/contact"){
        fs.readFile("./views/Contact.html",(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                res.end(data);
            }
        })
    }
})

server.listen(3000,"localhost",()=>{
    console.log("Server Started!!");
})