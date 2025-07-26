const express = require("express");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest",userAuth,(req,res)=>{
    console.log("sending connection request");
    const user=req.user;

    res.send( user.firstName + " sent connection request");
});


module.exports = requestRouter;