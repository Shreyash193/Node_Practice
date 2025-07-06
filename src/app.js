const express = require("express");
const {connectDB}=require("./config/database");
const {User}=require("./models/userSchema");

const app=express();


app.post("/signup",async (req,res)=>{

    const user=new User({
        firstName:"Samarth",
        lastName:"Madale",
        email:"samarth@gmial.com",
        gender:"male"
    });
    
    try{
        await user.save();
        res.send("user saved successfull");
    }
    catch(err){
        res.status(400).send("Error in saving user " + err.message );
    }

    


})

connectDB().then(()=>{
    console.log("Database connection established..");
    app.listen(3000,()=>{
    console.log("server is listening on port 3000..");
})
}).catch((err)=>{
    console.error("Database cannot be connected");
})


