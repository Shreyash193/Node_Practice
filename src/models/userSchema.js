const mongoose=require("mongoose");
const validator=require("validator");


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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid emial address " + value);
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    password:{
        type:String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter Strong Password " + value);
            }
        }
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