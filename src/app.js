const express = require("express");

const app=express();

const {adminAuth ,userAuth}=require("./middlewares/auth");

app.use("/admin",adminAuth);
app.use("/user",userAuth);

app.get("/admin/getAllUsers",(req,res,next)=>{
     res.send("all users data sent")
});

app.delete("/admin/deleteUser",(req,res)=>{
    res.send("user data deleted")
});

app.get("/user",(req,res)=>{
    res.send("user auth is called");
});
   
  

app.listen(3000,()=>{
    console.log("server is listening on port 3000..");
})