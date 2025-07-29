const mongoose =require("mongoose");
const userSchema = require("./userSchema");

const connectionRequestSchema = new mongoose.Schema({
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    status:{
        type:String,
        enum:{
            values:["ignored","accepted","rejected","interested"],
            message:`{VALUE} is incorrect status type`,
        }
    }
},
{
    timestamps:true,
});

connectionRequestSchema.pre('save',function (next){
    const connectionRequest =this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send request to yourself !!");
    }
    next();
});

const connectionRequestModal = new mongoose.model("connectionrequest",connectionRequestSchema)

module.exports = connectionRequestModal;