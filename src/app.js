const express = require("express");

const app=express();


app.use("/user",
    (req,res,next)=>{
    console.log("1 route");
    // res.send("Route Handler 1");
    next();
},  (req,res,next)=>{
    console.log("2 route");
    // res.send("Route Handler 2");
    next();
   },
    (req,res,next)=>{
    console.log("3 route");
    // res.send("Route Handler 3");
    next();
});
   
  

app.listen(3000,()=>{
    console.log("server is listening on port 3000..");
})