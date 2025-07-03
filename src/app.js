const express = require("express");

const app=express();



app.use("/test",(req,res)=>{
    res.send("response from test route");
})

app.use("/home",(req,res)=>{
    res.send("response from home route");
})

app.use((req,res)=>{
    res.send("Hello from Server");
})

app.listen(3000,()=>{
    console.log("server is listening on port 3000..");
})