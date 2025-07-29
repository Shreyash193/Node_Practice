const express = require("express");
const {validateSignUpData}=require("../utils/validate");
const bycrpt =require('bcrypt');
const jwt = require('jsonwebtoken');
const {User}=require("../models/userSchema");

const authRouter = express.Router();

authRouter.post("/signup",async (req,res)=>{
    try{
    //validate data
    validateSignUpData(req);

    const {firstName,lastName,emailId,password} =req.body;

    //encrypt password
    const passwordHash=await bycrpt.hash(password,10);
    
    //creating an instance
    const user=new User({firstName,lastName,emailId,password:passwordHash});
    
    
        await user.save();
        res.send("user saved successfull");
    }
    catch(err){
        res.status(400).send("Error in saving user " + err.message );
    };
});


authRouter.post("/login",async (req,res)=>{
    try{
    const {emailId,password}=req.body;

    const user=await User.findOne({emailId:emailId});
    if(!user){
        throw new Error("Invalid crediantials");
    }

    const isPasswordValid =await user.validatePassword(password);

    if(isPasswordValid){
        
        //create jwt token
        const token=await user.getJwt();

        
        res.cookie("token",token,{expires:new Date(Date.now() + 8 * 3600000)});
        res.send("login Suucessfull!!");  
    }
    else{
        throw new Error("Invalid Crediantials");
    }
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});


authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())});
    res.send("logout successfull");
})

module.exports = authRouter;