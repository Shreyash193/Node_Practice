const express = require("express");

const app=express();


app.get("/user",(req,res)=>{
    res.send({firstName:"Shreyash",lastName:"Gore"});
})

app.post("/user",(req,res)=>{
    res.send("Data Saved Successfully");
})

app.delete("/user",(req,res)=>{
    res.send("Data Deleted Successfully");
})

app.listen(3000,()=>{
    console.log("server is listening on port 3000..");
})