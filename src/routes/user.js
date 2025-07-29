const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequestModal = require("../models/connectionRequest");

const userRouter = express.Router();

userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
    try{

        const loggedInUser = req.user;

        const connectionRequests = await connectionRequestModal.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId",["firstName" , "lastName"]);

        res.send({
            message:"Data Fetched Succesfully",
            data :connectionRequests,
        })


    }
    catch(err){
        res.status(400).send("ERROR " + err.message);
    }
})

userRouter.get("/user/connections",userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequestModal.find({
            $or:[
                {toUserId : loggedInUser._id ,status : "accepted"},
                {fromUserId : loggedInUser._id,status:"accepted"},
            ]
        }).populate("toUserId",["firstName" , "lastName"])
          .populate("fromUserId",["firstName" , "lastName"]);

        const data = connectionRequests.map((row) => {
             if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
             }
             else{
                return row.fromUserId;
             }
         })

        res.json({data : connectionRequests});
    }
    catch(err){
        res.status(400).send("ERROR " + err.message);
    }
})

module.exports = userRouter;