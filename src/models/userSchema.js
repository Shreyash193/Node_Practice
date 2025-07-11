const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        min:4,
        max:50,
        required:true, 
    },
    lastName:{
        type:String 
    },
    emailId:{
        type:String,
        required:true, 
    },
    age:{
        type:Number,
        min:18,
    },
    password:{
        type:String
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"User Profile Photo",
    },
    about:{
        type:String,
        default:"This is default about of user",
    },
    skills:{
        type:[String],
    }
},{
    timestamps:true,
});

const User = mongoose.model("User",userSchema);

module.exports={User};