const express = require("express");
const {userAuth} = require("../middlewares/auth");
const connectionRequestModal = require("../models/connectionRequest");
const {User}=require("../models/userSchema");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
   
    try{

        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored","interested"];
        if(!allowedStatus.includes(status)){
            res.status(400).send("Invalid Status Request");
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).send({message: "User not found"});
        }

        const existingConnectionRequest = await connectionRequestModal.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId , toUserId:fromUserId}
            ],
        });

        if(existingConnectionRequest){
            return res.status(400).send({message :"Connection Request Already Exists!!"});
        }

        const connectionrequest =new connectionRequestModal({
            fromUserId,toUserId,status
        });

        
        const data = await connectionrequest.save();

        let message;
        if (status === "interested") {
        message = req.user.firstName + " is " + status + " in " + toUser.firstName;
        } else {
        message = req.user.firstName + " " + status + " " + toUser.firstName;
        }

        res.json({
        message,
        data, 
});


    }
    catch(err){
        res.status(400).send("ERROR " + err.message);
    }

});


requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const {status , requestId} = req.params;

        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message : "invalid status request"});
        }

        const connectionrequest = await connectionRequestModal.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested",
        });
        if(!connectionrequest){
            return res.status(400).json({message:"Connection request not found"});
        }

        connectionrequest.status = status;

        const data = await connectionrequest.save();

        res.json({message : "connection request " + status ,data});

    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})


module.exports = requestRouter;